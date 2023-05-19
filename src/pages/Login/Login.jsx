import {useNavigate,useLocation,useSearchParams, useLoaderData} from 'react-router-dom'
import style from './Login.module.scss'
import {Button,Checkbox,Form,Input,message } from 'antd'
import {LockOutlined,UserOutlined} from '@ant-design/icons'
import { useState,useRef, useEffect } from 'react'
import Cookies from 'js-cookie'
import {post} from '../../utils/request.js'
// import storage from './storageUtils'
// import memoryUser from './memoryUser'
import Axios from 'axios'



export const Login = () => {
  const api={
    login:"http://123.56.27.142:8888/user/login"
  }
   const navigate = useNavigate()
    //跳转到后台
    function login(){
        navigate("/home")
    }

 
  const [form] = Form.useForm();

      const autoLogin=(param)=>{
        return Axios.post(base.host+base.login,param)
    }
    //该事件是为了收集后台数据
    const onFinish=async(values)=>{
        console.log('Received values of form:', values);
        const {userName,password} = values
        const res= await post(api.login, values, false)
        if (res){
            const user=res.data
            console.log(user)
            //startTime是向服务器发送请求响应的时间
            // const startTime='1684463874159'
            // const inputTime=parseInt(startTime)+parseInt(10500*1000)//设置每50秒存储的值过期
            // const nowTime=+new Date().getTime()
            // // console.log(inputTime)
            // // console.log(nowTime)
            // const times=(inputTime-nowTime)/1000
            // // console.log(times)
            // 
            // console.log(res.data.photoUrl)
            
            // Cookies.set("token",res.data.token,{ expires: 3, path: '' })
            // memoryUser.user=user
            // storage.saveUser(user)
            //存储用户名
            localStorage.setItem("name", JSON.stringify(user.userName));
            localStorage.setItem("url", JSON.stringify(user.photoUrl));
            localStorage.setItem("nickName",JSON.stringify(user.nickName))
            localStorage.setItem("token",user.token)
       
            //设定过期时间什么时间都可以，如果设定时间-现在时间>0证明没有过期，如果小于现在时间证明过期了
            // if(times < 0){
            //   //缓存过期，清除缓存，跳到登录页面
            //     localStorage.removeItem(user);
            //     console.log('登录失败',user.userName);
            //     navigate(" ")
            //   }else{
              //缓存未过期，返回值
              console.log('登录成功',user.userName);
              navigate("/home")
            // }  
        
            
           
        }
        
        //提示账号密码为空
        if (userName==='' && password===''){
          message.info('用户名和密码不能为空');
        }
       if(res.data.status===200){
        //成功
        
       }
       if(res.data.status===401){
        //成功
        alert('登录失败')
       }
       
    }

    // const onFinishFailed=(errorInfo)=>{
    //   console.log('Failed:',errorInfo)
    // }

  
   
   
    return (
    <div className={style.login}>
      <div className={style.login_left}>
        <img className={style.login_img} src='../src/assets/login.png'></img>
      </div>
     
        <div className={style.login_form}>
        <Form form={form}
        // 栅格化
        labelCol={{ span: 8 }}
        wrapperCol={{ span:8  }}
        // initialValues={{
        //      remember:true,
        //  }}
        //  onSubmit={onSubmit}
         onFinish={onFinish}
      
        >
         <Form.Item
         label="用户名"
         name="userName"
         
         rules={[
             {
                //  required:true,
                 message:'Please input your Username!'

             },
             {
              // pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,message: '请输入正确的手机号'
             }
         ]}
         >
            <Input prefix={<UserOutlined className="site-form-item-icon"  />} placeholder="请输入用户名" />
         </Form.Item>
         <Form.Item
             label="密码"
             name="password"
             
             rules={[
               {
                 
                 message: 'Please input your Password!',
               },
             ]}
           >
             <Input
               prefix={<LockOutlined className="site-form-item-icon" />}
               type="password"
               placeholder="请输入密码"
               
             />
           </Form.Item>
          
           <Form.Item
             wrapperCol={
                {
                    offset:12,
                    span:16,
                }
            }>
             <Button type="primary" htmlType="submit" className="login-form-button" >
               登录
             </Button>
             {/* Or <a href="">register now!</a> */}
           </Form.Item>
        </Form>
        </div>
       
    </div>
    
    )
}
export default Login;

