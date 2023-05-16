import {useNavigate} from 'react-router-dom'
import style from './Login.module.scss'
import { Button,Checkbox,Form,Input,message } from 'antd'
import {LockOutlined,UserOutlined} from '@ant-design/icons'
export const Login = () => {
    //跳转到后台
    const navigate = useNavigate()
    function login(){
      debugger;
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
    return (
      <div className={style.login_form}>
        <Form 
        layout='inline'
        name='normal_login'
       
        labelCol={{ span: 6 }}
        wrapperCol={{ span:18  }}
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
                 required:true,
                 message:'Please input your Username!'
             }
         ]}
         >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
         </Form.Item>
         <Form.Item
             label="密码"
             name="password"
             rules={[
               {
                 required: true,
                 message: 'Please input your Password!',
               },
             ]}
           >
             <Input
               prefix={<LockOutlined className="site-form-item-icon" />}
               type="password"
               placeholder="Password"
             />
           </Form.Item>
           <Form.Item
            //  做一个偏移需求
            wrapperCol={
                {
                    offset:8,
                    span:16,
                }
            }
           >
             <Form.Item 
           
             name="remember" valuePropName="checked" noStyle>
               <Checkbox>Remember me</Checkbox>
             </Form.Item>
             <a className="login-form-forgot" href="">
               Forgot password
             </a>
           </Form.Item>
           <Form.Item
             wrapperCol={
                {
                    offset:8,
                    span:16,
                }
            }>
             <Button type="primary" htmlType="submit" className="login-form-button">
               Log in
             </Button>
             Or <a href="">register now!</a>
           </Form.Item>
        </Form>
        </div>
    )
}
export default Login;

