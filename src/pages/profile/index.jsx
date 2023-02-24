import { useAuth } from '@/components/AuthContext'
import Button from '@/components/Button'
import { Field } from '@/components/Field'
import { useAsync } from '@/hooks/useAsync'
import { useForm } from '@/hooks/useForm'
import { userService } from '@/services/user'
import { handleError } from '@/utils/handleError'
import { regexp, required } from '@/utils/validate'
import { message } from 'antd'
import React from 'react'

export const Profile = () => {
  const {user,setUser} = useAuth()
  const {loading,execute:updateInforService} = useAsync(userService.updateInfor)
  const {register,values,validate} = useForm({
    name:[
      required()
    ],
    phone:[
      required(),
      regexp('phone')
    ],
    fb:[
      required(),
      regexp('url')
    ],
  },user)

  const onSubmit = async () =>{
    try {
      if(validate()){
        const res = await updateInforService(values)
        console.log(res)
        setUser(res.data)
        message.success('Bạn đã cập nhật thông tin thành công')
        
    } }
    catch (error) {
      handleError(error)
     }
    }
  

  return (
    <div className="tab1">
      <Field {...register('name')}  placeholder="Nguyễn Văn A" label="Họ và tên" required/>
      <Field {...register('phone')}  placeholder="0949******" label="Số điện thoại" required/>
      <Field {...register('username')} label="Email" disabled/>
      <Field {...register('fb')} placeholder="Facebook url" required label="Facebook"/>

    <Button loading={loading} onClick={onSubmit}>LƯU LẠI</Button>
  </div>
  )
}
