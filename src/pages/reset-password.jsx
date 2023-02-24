import { useAuth } from "@/components/AuthContext";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useAsync } from "@/hooks/useAsync";
import { useForm } from "@/hooks/useForm";
import { userService } from "@/services/user";
import { handleError } from "@/utils/handleError";
import { setToken } from "@/utils/token";
import { confirmPassword, regexp, required } from "@/utils/validate";
import { message } from "antd";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

export const ResetPassword = () => {
  const {getProfile} = useAuth()
  const [search] = useSearchParams();
  const [isSuccess,setIsSuccess] = useState(false)

  const {
    execute: sendEmailResetPasswordService,
    loading: sendEmailResetPasswordLoading,
  } = useAsync(userService.sendEmailResetPassword);
  const {
    execute: changePasswordByCodeService,
    loading: changePasswordByCodeLoading,
  } = useAsync(userService.changePasswordByCode);
  const code = search.get("code");
  console.log(code);

  const resetPasswordForm = useForm({
    password: [required()],
    confirmPassword: [required(), confirmPassword("password")],
  });
  const sendEmailForm = useForm({
    username: [required(), regexp("email")],
  });

  const onSendEmail = async() => {
    try {
      if (sendEmailForm.validate()) {
        const res =  await sendEmailResetPasswordService(sendEmailForm.values)
        message.success(res.message)
        setIsSuccess(true)
      }
    } catch (error) {
      handleError(error);
    }
  };
  const onResetPassword = async() => {
    try {
      if (resetPasswordForm.validate()) {
          const res  = await changePasswordByCodeService(
          {
            password:resetPasswordForm.values.password,
            code
          })
          setToken(res.data)
          getProfile()
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <main className="auth" id="main">
      {!code ?
       (
        isSuccess ?(
          <div className="flex flex-col gap-10 text-center max-w-2xl m-auto pb-10 pt-10">
            <h1 className="text-2xl font-bold">Gửi email lấy lại mật khẩu thành công</h1>
            <p>Chúng tôi đã gửi cho bạn email lấy lại mật khẩu, vui lòng kiểm tra email</p>
          </div>
        ): (

          <div className="wrap">
          <h2 className="title">Đặt lại mật khẩu</h2>
          <Input
            className="mb-5"
            placeholder="Email"
            {...sendEmailForm.register("username")}
          />
          <Button onClick={onSendEmail} loading={sendEmailResetPasswordLoading}>
            Tiếp theo
          </Button>
        </div>
        )

      ) : (
        <div className="wrap">
          <h2 className="title">Xác nhận mật khẩu</h2>

          <Input
            className="mb-5"
            type="password"
            placeholder="Mật khẩu"
            {...resetPasswordForm.register("password")}
          />
          <Input
            className="mb-5"
            type="password"
            placeholder="Nhập lại mật khẩu"
            {...resetPasswordForm.register("confirmPassword")}
          />

          <p style={{ marginBottom: "15px" }}>
            Nếu chưa nhận được email nào, vui lòng bấm nút{" "}
            <a className="link" href="#">
              Gửi lại
            </a>{" "}
            trong 20 giây
          </p>
          <Button
            onClick={onResetPassword}
            loading={changePasswordByCodeLoading}
          >
            Xác nhận
          </Button>
        </div>
      )}
    </main>
  );
};
