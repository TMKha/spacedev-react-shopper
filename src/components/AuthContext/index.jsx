import { message } from 'antd'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PATH } from '../../config/path'
import { clearToken, clearUser, getUser, setToken, setUser } from '../../utils/token'
import { authService } from '../../services/auth'
import { userService } from '../../services/user'
import { useAsync } from '@/hooks/useAsync'

const Context = createContext({})


export const AuthProvider = ({children}) => {

    const [user,_setUser] = useState(getUser)
    const {state} = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
  
      setUser(user || null)
    }, [user])
    

      const login =async (data) =>{
        try {
           const res = await authService.login(data)
            if(res.data){
              setToken(res.data)
              await getProfile()
             
            }
        } catch (error) {
          console.log(error)
          if(error?.response?.data?.message)
            message.error(error?.response.data.message)
        }
      }

      const getProfile = async () =>{
        const user = await  userService.getProfile()
        _setUser(user.data)
        message.success('Đăng nhập tài khoản thành công')
        if(state?.redirect){
          navigate(state.redirect)
        }
        else {
          navigate(PATH.profile.index)

        }
      }
  
      const logout =() =>{
        clearToken()
        clearUser()
        _setUser(null)
        message.success('Đăng xuất tài khoản thành công')
      }


  return (
    <Context.Provider value={{user,login,logout,setUser:_setUser,getProfile}}>{children}</Context.Provider>
  )
}
export const  useAuth= () => useContext(Context)
