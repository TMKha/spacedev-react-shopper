import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../components/AuthContext'

export default function AuthRouter({redirect='/'}) {

  const {user} = useAuth()

  if(user) return <Navigate to={redirect}/>
  return  <Outlet/>
  
}
