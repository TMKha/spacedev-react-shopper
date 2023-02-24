import { useAuth } from "@/components/AuthContext";
import Button from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { Select } from "@/components/Select";
import { PATH } from "@/config/path";
import { useAsync } from "@/hooks/useAsync";
import { handleError } from "@/utils/handleError";
import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { Field } from "../../components/Field";
import Skeleton from "../../components/Skeleton";
import { useFetch } from "../../hooks/useFetch";
import { useForm } from "../../hooks/useForm";
import { useScrollTop } from "../../hooks/useScrollTop";
import { courseService } from "../../services/course";
import { currency } from "../../utils/currency";
import { regexp, required, validate } from "../../utils/validate";

export const RegisterPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { data, loading } = useFetch(() => courseService.getCourseDetail(id));
  const {loading:registerCourseLoading,execute:registerCourseService}= useAsync(courseService.register)
  useScrollTop(id);
  useEffect(() => {
    if (!user) {
      message.warning("Vui lòng đăng nhập để đăng ký khóa học");
      navigate(PATH.signin, { state: { redirect: pathname } });
    }
  }, [user]);
  
 
  const { validate, register, values } = useForm(
    {
      name: [required("Xin vui lòng nhập họ và tên")],
      email: [
        required("Xin vui lòng nhập email của bạn"),
        regexp("email", "Xin vui lòng nhập đúng định dạng email"),
      ],
      phone: [
        required("Xin vui lòng nhập số điện thoại của bạn"),
        regexp("phone", "Xin vui lòng nhập đúng số điện thoại"),
      ],
      fb: [
        required("Xin vui lòng điền link facebook"),
        regexp(
          /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/,
          "Xin vui lòng nhập đúng link facebook"
        ),
      ],
      payment: [required("Xin vui lòng chọn hình thức thanh toán")],
    },
    {
      email: user.username,
      name: user.name,
      phone: user.phone,
      fb: user.fb
    }
  );
  let [isSucces, setIsSucces] = useState(false);

  const onSubmit = async() => {
    try {
      if (validate()) {
        await registerCourseService(id,values)
        setIsSucces(true);
      } else {
          console.log('Validate error')
      }
    } catch (error) {
        handleError(error)
    }
   
  };
  if (loading) {
    return (
      <main className="register-course" id="main">
        <section>
          <div className="container">
            <div className="wrap container">
              <div className="main-sub-title">
                <Skeleton width={150} height={24} />
              </div>
              <h1 className="main-title">
                <Skeleton width={700} height={60} />
              </h1>
              <div className="main-info">
                <div className="date">
                  <Skeleton width={150} height={24} />
                </div>
                <div className="time">
                  <Skeleton width={150} height={24} />
                </div>
                <div className="time">
                  <Skeleton width={150} height={24} />
                </div>
              </div>
              <div className="form">
                <Skeleton height={60} />

                <Skeleton height={60} style={{ marginTop: 25 }} />
                <Skeleton height={60} style={{ marginTop: 25 }} />
                <Skeleton height={60} style={{ marginTop: 25 }} />
                <Skeleton height={60} style={{ marginTop: 25 }} />
                <Skeleton height={60} style={{ marginTop: 25 }} />
                <Skeleton height={60} style={{ marginTop: 25 }} />

                <div style={{ textAlign: "center" }}>
                  <Skeleton height={50} width={150} style={{ marginTop: 30 }} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const { data: detail } = data;
  if (!detail) {
    return (
      <div style={{ marginTop: 100, textAlign: "center" }}>...Not Found...</div>
    );
  }
  return (
    <main className="register-course" id="main">
      {isSucces ? (
        <div
          className="register-success"
          style={{ margin: "40px auto", textAlign: "center" }}
        >
          <div className="contain">
            <div className="main-title">đăng ký thành công</div>
            <p>
              <strong>
                Chào mừng {values.name} đã trở thành thành viên mới của Spacedev
                Team.
              </strong>{" "}
              <br />
              Cảm ơn bạn đã đăng ký khóa học tại <strong>Spacedev</strong>,
              chúng tôi sẽ chủ động liên lạc với bạn thông qua facebook hoặc số
              điện thoại của bạn.
            </p>
          </div>
          <Link to={PATH.profile.course} className="btn main rect">
            về trang khóa học của tôi
          </Link>
        </div>
      ) : (
        <section>
          <div className="container">
            <div className="wrap container">
              <div className="main-sub-title">ĐĂNG KÝ</div>
              <h1 className="main-title">{detail.title}</h1>
              <div className="main-info">
                <div className="date">
                  <strong>Khai giảng:</strong> 15/11/2020
                </div>
                <div className="time">
                  <strong>Thời lượng:</strong> 18 buổi
                </div>
                <div className="time">
                  <strong>Học phí:</strong>
                  {currency(detail.money)}VNĐ
                </div>
              </div>
              <div className="form">
                <Field
                  label={"Họ và tên"}
                  placeholder="Họ và tên"
                  required
                  {...register("name")}
                />

                <Field
                  label={"Số điện thoại"}
                  placeholder="Số điện thoại"
                  required
                  {...register("phone")}
                />

                <Field
                  disabled
                  label={"Email"}
                  placeholder="Email"
                  required
                  {...register("email")}
                />

                <Field
                  label={"URL Facebook"}
                  required
                  placeholder="https://facebook.com"
                  {...register("fb")}
                />

                <Field
                  label={"Sử dụng COIN"}
                  {...register("coin")}
                  renderInput={(props) => (
                    <Checkbox {...props}>
                      Hiện có <strong>300 COIN</strong>
                    </Checkbox>
                  )}
                />
                <Field
                  label={"Nội Hình thức thanh toán"}
                  placeholder="nội dung"
                  {...register("payment")}
                  renderInput={(props) => (
                    <Select
                      {...props}
                      placeholder="Hình thức thanh toán"
                      options={[
                        { value: "chuyen-khoan", label: "Chuyển khoản" },
                        {
                          value: "thanh-toan-tien-mat",
                          label: "Thanh toán tiền mặt",
                        },
                      ]}
                    />
                  )}
                />

                <Button loading={registerCourseLoading} onClick={onSubmit} >
                  đăng ký
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};
