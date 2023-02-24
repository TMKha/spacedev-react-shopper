import { message } from 'antd'
import classNames from 'classnames'
import React, { useState } from 'react'
import { Navigate } from 'react-router'
import styled from 'styled-components'
import { useAuth } from '../components/AuthContext'
import Button from '../components/Button'
import Input from '../components/Input'
import { PATH } from '../config/path'
import { useAsync } from '../hooks/useAsync'
import { useForm } from '../hooks/useForm'
import { userService } from '../services/user'
import { LoadingOutlined } from '@ant-design/icons';
import { confirmPassword, minMax, regexp, required } from '../utils/validate'


export const Signup = () => {
  const {user} = useAuth()
  const {execute: signupService ,loading:signupLoading} = useAsync(userService.signup)
  const {execute: resendEmailService,loading:resendEmailLoading} = useAsync(userService.resendEmail)
  const [isSignupSuccess,setIsSignupSuccess] = useState(false)
  const {validate,values,register} = useForm({
    name:[
      required(),

    ],
    password:[
      required(),
      minMax(6,32)
    ],
    confirmPassword:[
      required(),
      confirmPassword('password')

    ],
    username:[
     required(),
     regexp('email')
    ]
  })
  
  const onSubmit = async () =>{
    try {
      if(validate()){
       await signupService(values)
       setIsSignupSuccess(true)
        console.log(values)
      }
    } catch (error) {
      console.log(error)
      if(error?.response?.data?.message)
      {
        message.error(error?.response?.data?.message)
      }
    }
  
  }

  const onResendEmail = async(ev) => {
    ev.preventDefault()
    try {
      await resendEmailService({username:values.username})
      message.success('Email kích hoạt đã được gửi lại thành công')
    } catch (error) {
      console.log(error)
      if(error?.response?.data?.message)
      {
        message.error(error?.response?.data?.message)
      }
    }
  }



  if(user){
    return <Navigate to={PATH.profile.index}/>
  } 
  return (
    <main className="auth" id="main">
      {
         isSignupSuccess ?( 
          <div className='container wrap flex flex-col text-center gap-5' >
            <h1 className='text-2xl font-bold'>Đăng ký tài khoản thành công</h1>
            <p>Vui lòng kiểm tra email để kích hoạt. Nếu bạn không nhận được email vui lòng bấm <span className='font-bold'>"Gửi lại email"</span> bên dưới</p>
            <div className='flex justify-center'>
              <a href="#" onClick={onResendEmail} className={classNames('link flex gap-2',{'opacity-50 pointer-events-none':resendEmailLoading})}>
                  {
                    resendEmailLoading &&  <LoadingOutlined/>
                  }
                  Gửi lại email kích hoạt</a>
            </div>
          </div>):
          (
            <div className="wrap">
            <h2 className="title">Đăng ký</h2>
            <Input {...register('username')} className="mb-5"  placeholder="Địa chỉ Email" />
            <Input {...register('name')} className="mb-5"  placeholder="Họ và tên" />
            <Input {...register('password')} className="mb-5" type='password'  placeholder="Mật khẩu" />
            <Input {...register('confirmPassword')} type='password' className="mb-5"  placeholder="Nhập lại mật khẩu" />
            <p className="policy">
              Bằng việc đăng kí, bạn đã đồng ý <a href="#">Điều khoản bảo mật</a> của Spacedev
            </p>
            <Button onClick={onSubmit}  className="btn-login" loading={signupLoading}>
                 đăng ký
            </Button>
          </div>
          )
      }
 
  </main>
  )
}
