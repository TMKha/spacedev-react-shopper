import React, { useState } from 'react'
import { Field } from '../components/Field'
import { useForm } from '../hooks/useForm'
import { organizationService } from '../services/organization'
import { regexp, required, validate } from '../utils/validate'
import { message } from 'antd'
import Button from '../components/Button'
import { useAsync } from '../hooks/useAsync'




export default function ContactPage() {


  const {excute,loading} =useAsync(organizationService.contact)
  const [isSucces,setIsSucces] = useState(false)
  const {validate,register,values,reset} = useForm({
    name: [
      required('Xin vui lòng nhập họ và tên')
  ],
  email:[
      required('Xin vui lòng nhập email của bạn'),
      regexp('email','Xin vui lòng nhập đúng định dạng email')
  ],
   phone:[
      required('Xin vui lòng nhập số điện thoại của bạn'),
      regexp('phone','Xin vui lòng nhập đúng số điện thoại')
   ],
  website:[
      regexp('url','Xin vui lòng nhập đúng link website')
  ],
  title:[
    required('Xin vui lòng nhập tiêu đề')
  ],
   content:[
    required('Xin vui lòng nhập nội dung')
  ]
  })

  const onSubmit = async (ev) =>{
    try {
      ev.preventDefault()
      if(validate())
      {
        // setLoading(true)   
       const res = await excute(values)
       if(res){
          reset()
          message.success('Bạn đã gửi liên hệ thành công, chúng tôi sẽ sớm liên lạc với bạn.')
          setIsSucces(true)
       }
      }else {
        console.log('validate error')
      }
    } catch (error) {}
   
   
  }
  
  return (
    <>
   
    <main className="register-course" id="main">
      <section className="section-1 wrap container">

        {
          isSucces ? <>
         
            <div className="register-success">
            <div className="contain">
              <div className="main-title">liên hệ thành công</div>
              <p>
                Thông tin liên hệ của bạn đã được gửi, chúng tôi sẽ liên hệ đến bạn sớm nhất, xin cám ơn!
              </p>
            </div>
            <a href="/" className="btn main rect" onClick={(ev)=>{
              ev.preventDefault()
              setIsSucces(false)
            }}>Tiếp tục liên hệ</a>
          </div>
          </>: <>
            <h2 className="main-title">HỢP TÁC CÙNG Spacedev</h2>
        <p className="top-des">
          Đừng ngần ngại liên hệ với <strong>Spacedev</strong> để cùng nhau tạo ra những sản phẩm giá trị, cũng như
          việc hợp tác với các đối tác tuyển dụng và công ty trong và ngoài nước.
        </p>
        <form className="form" onSubmit={onSubmit}>
            <Field
             label={'Họ và tên'}
             placeholder="Họ và tên"
             required
              {...register('name')}
             />

            <Field
             label={'Số điện thoại'}
             placeholder="Số điện thoại"
             required
             {...register('phone')}
            
             />

            <Field
             label={'Email'}
             placeholder="Email"
             required
             {...register('email')}
             />

            <Field
             label={'Website'}
             placeholder="Website"
             {...register('website')}

             />
            
            <Field
             label={'Tiêu đề'}
             placeholder="tiêu đề"
             required
             {...register('title')}

             />
            
            <Field
             label={'Nội dung'}
             placeholder="nội dung"
             required
             {...register('content')}
              renderInput = { (props) =>  <textarea {...props} cols={30} rows={10}  /> }
           />
           <Button loading={loading}  >Đăng ký</Button>
          {/* <button className="btn main rect">đăng ký</button> */}
        </form>
        </>
        }
        {/* <div class="main-sub-title">liên hệ</div> */}
      
      </section>
    
    </main>
   
  </>
  )
}
