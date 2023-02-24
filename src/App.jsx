
import { useEffect, useState } from 'react'
import { Route, Routes, useRoutes } from 'react-router-dom'
import './assets/css/taildwin.css'
import './assets/css/custome.css'

import AuthRouter from './AuthRouter'
import Footer from './components/Footer'
import Header from './components/Header'
import PrivateRouter from './components/PrivateRouter'
import { PATH } from './config/path'
import { MainLayout } from './layouts/MainLayout'
import { ProfileLayout } from './layouts/ProfileLayout'
import { Home } from './pages'
import { Page404 } from './pages/404'
import { Coin } from './pages/coin'
import ContactPage from './pages/contact'
import { Course } from './pages/course'
import { CourseDetail } from './pages/course/[slug]'
import { Faq } from './pages/faq'
import { Payment } from './pages/payment'
import { Profile } from './pages/profile'
import { MyCoin } from './pages/profile/coin'
import { Mycourse } from './pages/profile/course'
import { MyPayment } from './pages/profile/payment'
import { MyProject } from './pages/profile/project'
import { Project } from './pages/project'
import { RegisterPage } from './pages/register/[slug]-id[id]'
import { ResetPassword } from './pages/reset-password'
import { Signin } from './pages/signin'
import { Signup } from './pages/signup'
import { Team } from './pages/team'
import { routers } from './routers'






function App() {

  

  const element = useRoutes(routers)

  return (
      <>
        {element}
        {/* <Routes >
          <Route element={<MainLayout user={user} logout={logout} />} >
          <Route index element={<Home/>}/>
          <Route path={PATH.contact} element={<ContactPage/>}/>
          <Route path={PATH.course}>
              <Route index element={<Course/>} />
              <Route path={PATH.courseDetail} element={<CourseDetail/>} />
          </Route>
          <Route path={PATH.courseRegister} element={<RegisterPage/>} />
          <Route path={PATH.team} element={<Team/>}/>
          <Route path={PATH.faq} element={<Faq/>}/>
          <Route path={PATH.coin} element={<Coin/>}/>
          <Route path={PATH.payment} element={<Payment/>}/>
          <Route path={PATH.project} element={<Project/>}/>
         
          <Route element={<AuthRouter redirect={PATH.profile.index} user={user} />}>
            <Route path={PATH.signin}element={<Signin login={login} />}/>
            <Route path={PATH.signup}element={<Signup />}/>
            <Route path={PATH.resetPassWord} element={<ResetPassword/>}/>
          </Route>

          <Route element={<PrivateRouter user={user} redirect={PATH.signin}/>}>
            <Route path={PATH.profile.index} element={<ProfileLayout user={user}/>} >
                <Route index element={<Profile/>}/>
                <Route path={PATH.profile.course} element={<Mycourse/>}/>
                <Route path={PATH.profile.payment} element={<MyPayment/>}/>
                <Route path={PATH.profile.coin} element={<MyCoin/>}/>
                <Route path={PATH.profile.project} element={<MyProject/>}/>
            </Route>
          </Route>
        
          <Route path='*' element={<Page404/>}/>
          </Route>
        </Routes> */}
      </>
  )
}

export default App
