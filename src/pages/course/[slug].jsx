import { Modal } from "@/components/Modal";
import { Teacher } from "@/components/Teacher";
import moment from "moment/moment";
import React, { useState } from "react";
import { generatePath, useParams } from "react-router";
import { Link } from "react-router-dom";
import Accordion2, { Accordion } from "../../components/Accordion";
import { CourseCard } from "../../components/CourseCard";
import Skeleton from "../../components/Skeleton";
import { PATH } from "../../config/path";
import { useFetch } from "../../hooks/useFetch";
import { useScrollTop } from "../../hooks/useScrollTop";

import { courseService } from "../../services/course";
import { currency } from "../../utils/currency";
import { Page404 } from "../404";

export const CourseDetail = () => {
  const { id } = useParams();
  const [isOpenVideoModal,setIsOpenVideoModal] = useState(false)
  useScrollTop([id])
  const { data, loading } = useFetch(
    () => courseService.getCourseDetail(id),
    [id]
  );
  const { data: related } = useFetch(
    () => courseService.getCourseRelated(id),
    [id]
  );
  if (loading) {
    return (
      <main className="course-detail" id="main">
        <section
          className="banner style2"
          style={{ "--background": "#cde6fb" }}
        >
          <div className="container">
            <div className="info">
              <h1>
                <Skeleton width={500} height={64} />
              </h1>
              <div className="row">
                <div className="date">
                  <Skeleton width={200} height={24} />
                </div>
                <div className="time">
                  <Skeleton width={200} height={24} />
                </div>
              </div>
              <Skeleton style={{ marginTop: 40 }} width={150} height={46} />
            </div>
          </div>
        </section>
      </main>
    );
  }
  const { data: detail } = data;
  if (!detail) {
    return (
     <Page404/>
    );
  }
  const registerPath = generatePath(PATH.courseRegister, {
    slug: detail.slug,
    id: detail.id,
  });
  const openTime = moment(detail.opening_time).format("DD/MM/YYYY");
  return (
    <>
      <main className="course-detail" id="main">
        <section
          className="banner style2"
          style={{ "--background": detail.template_color_btn || "#cde6fb" }}
        >
          <div className="container">
            <div className="info">
              <h1>{detail.title}</h1>
              <div className="row">
                <div className="date">
                  <strong>Khai gi???ng:</strong>
                  {openTime}
                </div>
                <div className="time">
                  <strong>Th???i l?????ng:</strong> 18 bu???i
                </div>
              </div>
              <Link
                className="btn white round"
                style={{
                  "--color-btn": detail.template_color_banner || "#70b6f1",
                }}
                to={registerPath}
              >
                ????ng k??
              </Link>
            </div>
          </div>
          <div className="bottom">
            <div className="container">
              <div className="video">
                <div className="icon" onClick={()=>setIsOpenVideoModal(true)}>
                  <img src="/img/play-icon-white.png" alt="" />
                </div>{" "}
                <span>gi???i thi???u</span>
              </div>
              <div className="money">{currency(detail.money)}VND</div>
            </div>
          </div>
          <Modal maskeCloseable visible={isOpenVideoModal} onCancel={()=>setIsOpenVideoModal(false)}>
            <iframe width="800" height="450" src="https://www.youtube.com/embed/rMbF5gVk2g4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </Modal>
        </section>
        <section className="section-2">
          <div className="container">
            <p className="des">{detail.long_description}</p>
            <h2 className="title">gi???i thi???u v??? kh??a h???c</h2>
            <div className="cover">
              <img src="/img/course-detail-img.png" alt="" />
            </div>
            <h3 className="title">n???i dung kh??a h???c</h3>
            <Accordion.Group>
              {detail.content.map((e, i) => (
                <Accordion date={i + 1} key={i} {...e}>
                  {e.content}
                </Accordion>
              ))}
            </Accordion.Group>

            <h3 className="title">y??u c???u c???n c??</h3>
            <div className="row row-check">
              {detail.required.map((e, i) => (
                <div key={i} className="col-md-6">
                  {e.content}
                </div>
              ))}
            </div>
            <h3 className="title">h??nh th???c h???c</h3>
            <div className="row row-check">
              {detail.benefits.map((e,i) => (
                <div key={i} className="col-md-6">
                  {e.content}
                </div>
              ))}
            </div>
            <h3 className="title">
              <div className="date-start">l???ch h???c</div>
              <div className="sub">
                *L???ch h???c v?? th???i gian c?? th??? th???ng nh???t l???i theo s??? ????ng h???c
                vi??n.
              </div>
            </h3>
            <p>
              <strong>Ng??y b???t ?????u: </strong> {openTime} <br />
              <strong>Th???i gian h???c: </strong>
              {detail.schedule}
            </p>
            <h3 className="title">Ng?????i d???y</h3>
            <div className="teaches">
              <Teacher {...detail.teacher} />
            </div>
            {detail.mentor.length > 0 && (
              <>
            
                <h3 className="title">Ng?????i h?????ng d???n</h3>
                <div className="teaches">
                  {detail.mentor.map((e) => (
                    <Teacher key={e.id} {...e} />
                  ))}
                </div>
              </>
            )}

            <div className="bottom">
              <div className="user">
                <img src="/img/user-group-icon.png" alt="" /> 12 b???n ???? ????ng k??
              </div>
              <Link to={registerPath} className="btn main btn-register round">????ng k??</Link>
              <div className="btn-share btn overlay round btn-icon">
                <img src="/img/facebook.svg" alt="" />
              </div>
            </div>
          </div>
        </section>
        <section className="section-4">
          <div className="container">
            <div className="textbox">
              <h3 className="sub-title">Kh??a h???c</h3>
              <h2 className="main-title">Li??n quan</h2>
            </div>
            <div className="list row">
              {related &&
                related?.data.map((e) => <CourseCard key={e.id} {...e} />)}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
