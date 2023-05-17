import {useNavigate,useLocation,useSearchParams, useLoaderData} from 'react-router-dom'
import style from './Login.module.scss'
import { Button,Checkbox,Form,Input,message } from 'antd'
import {LockOutlined,UserOutlined} from '@ant-design/icons'
export const Login = () => {
    const [searchParams,setSearchParams]=useSearchParams()
    //跳转到后台
    const navigate = useNavigate()
    function login(){
     
        navigate("/home")
    }

    
    //该事件是为了收集后台数据
    const onFinish=(values)=>{
        const {username,password} = values
        if (username==='123' && password==='456'){
          message.info('This is a normal message');
          login();
         
        }
       
    }
    const onFinishFailed=(errorInfo)=>{
      console.log('Failed:',errorInfo)
    }
    const autoLogin=(values)=>{

    }
   
 

    return (
    <div className={style.login}>
      <div className={style.login_left}>
        <img className={style.login_img} src='../src/assets/login.png'></img>
      </div>
      <div className={style.login_right}>
        <div className={style.login_form}>
        <Form 
        name='normal_login'
        labelCol={{ span: 8 }}
        wrapperCol={{ span:12  }}
        initialValues={{
             remember:true,
         }}
         onFinish={onFinish}
        >
         <Form.Item
         label="用户名"
         name="username"
         rules={[
             {
                
                 message:'Please input your Username!'
             }
         ]}
         >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
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
            //  做一个偏移需求
            wrapperCol={
                {
                    offset:6,
                    span:16,
                }
            }
           >
             <Form.Item 
             name="remember" valuePropName="checked" noStyle>
               <Checkbox>Remember me</Checkbox>
             </Form.Item>
             {/* <a className="login-form-forgot" href="">
               Forgot password
             </a> */}
           </Form.Item>
           <Form.Item
             wrapperCol={
                {
                    offset:12,
                    span:16,
                }
            }>
             <Button type="primary" htmlType="submit" className="login-form-button">
               登录
             </Button>
             {/* Or <a href="">register now!</a> */}
           </Form.Item>
        </Form>
        </div>
    </div>
  </div>   
    )
}
export default Login;

