import React from 'react'
import { generatePath, Link } from 'react-router-dom'
import { PATH } from '../../config/path'
import Skeleton from '../Skeleton'

export const CourseCard = ({money,long_description,thumbnailUrl,short_description,slug,title,id}) => {
    const path =generatePath(PATH.courseDetail,{slug,id})
 
    return (
    <div className="col-md-4 course">
    <div className="wrap">
      <Link className="cover" to={path}>
        <img src={thumbnailUrl} alt="" />
      </Link>
      <div className="info">
        <Link className="name" to={path}>
            {title}
        </Link>
        <p className="des">
         {short_description}
        </p>
      </div>
      <div className="bottom">
        <div className="teacher">
          <div className="avatar">
            <img src="/img/avt.png" alt="" />
          </div>
          <div className="name">Vương Đặng</div>
        </div>
        <Link to={path} className="register-btn">Đăng Ký</Link>
      </div>
    </div>
  </div>
  )
}


export const CourseCardLoading= ()=> {
  return (
    <div className="col-md-4 course">
    <div className="wrap">
      <Link className="cover" to='#'>
        {/* <img src={thumbnailUrl} alt="" /> */}
        <Skeleton height={310}/>
      </Link>
      <div className="info">
        <Link className="name" to='#'>
        <Skeleton height={30}/>

        </Link>
        <p className="des">
        <Skeleton height={80}/>
        </p>
      </div>
      <div className="bottom">
        <div className="teacher">
          <div className="avatar">
            {/* <img src="/img/avt.png" alt="" /> */}
            <Skeleton height={36} width={36} shap='circle'/>

          </div>
          <div className="name">
            <Skeleton height={24} width={150  }/>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}