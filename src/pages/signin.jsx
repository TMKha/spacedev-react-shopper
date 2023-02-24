import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../components/AuthContext'
import Button from '../components/Button'
import { Field } from '../components/Field'
import Input from '../components/Input'
import { PATH } from '../config/path'
import { useAsync } from '../hooks/useAsync'
import { useForm } from '../hooks/useForm'
import { regexp, required, validate } from '../utils/validate'

export const Signin = () => {
  const {login} = useAuth()
  const {loading,execute:loginService} = useAsync(login)
  const {register,validate,values} = useForm({
      username: [
        required(),
        regexp('email')
      ],
      password:[
        required(),

      ]
  })

  const onSubmit =(ev) =>{
    if(validate())
    {
      loginService(values)
    }
  }

  return (
    <main className="auth" id="main">
    <div className="wrap">
      {/* login-form */}
      <div className="ct_login" >
        <h2 className="title">Đăng nhập</h2>
        <Input  placeholder="Email / Số điện thoại"  className="mb-5"  {...register('username')}/>
        <Input type="password" placeholder="Mật khẩu"  className="mb-5"  {...register('password')}/>

        {/* <input type="text" placeholder="Email / Số điện thoại" />
        <input type="password" placeholder="Mật khẩu" /> */}
        <div className="remember">
          <label className="btn-remember">
            <div>
              <input type="checkbox" />
            </div>
            <p>Nhớ mật khẩu</p>
          </label>
          <Link to={PATH.resetPassWord} className="forget">Quên mật khẩu?</Link>
        </div>
        <Button loading={loading} onClick={onSubmit} className="btn rect main btn-login">đăng nhập</Button>
        <div className="text-register" style={{}}>
          <span>Nếu bạn chưa có tài khoản?</span> <Link className="link" to={PATH.signup}>Đăng ký</Link>
        </div>
      </div>
    </div>
  </main>
  )
}
