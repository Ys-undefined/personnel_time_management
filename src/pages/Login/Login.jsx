import {useNavigate} from 'react-router-dom'
import style from './Login.module.scss'
import {Button,Form,Input } from 'antd'
import {LockOutlined,UserOutlined} from '@ant-design/icons'
import Cookies from 'js-cookie'
import {post} from '../../utils/request.js'

const api={
    login:"/api/user/login"
}
export const Login = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const login = async (values)=>{
      const res = post(api.login,values)
      if (res){
          console.log(res.data)
      }
  }
    const onFinish = (values)=>{
        // login(values)
        navigate('/home')
    }
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
        onFinish={onFinish}
        >
         <Form.Item
         label="用户名"
         name="username"
         
         rules={[
             {
                //  required:true,
                 message:'Please input your Username!'

             },
             {
              pattern: /^\w+$/,message: '用户名必须由数字、字母、下划线组成'
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

