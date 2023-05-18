import {useNavigate} from 'react-router-dom'
import style from './Login.module.scss'
import {Button,Form,Input,message } from 'antd'
import {LockOutlined,UserOutlined} from '@ant-design/icons'
import '../../api/index'


export const Login = () => {
 
   const navigate = useNavigate()
    //跳转到后台
    function login(){
        navigate("/home")
    }
 
  const [form] = Form.useForm();

  //提交表单
  // const onSubmit=(e)=>{
  //   //获取表单元素
  //   console.log(username,password)
  //   api.Login({
  //     username:'',
  //     password:''
  //   })
  //   }

  const onSubmit=(e)=>{
    e.preventDefault();
    // 调登录接口
    api.toLogin({
      username:'',
      password:''
    })
  }
    
    //该事件是为了收集后台数据
    const onFinish=(values)=>{
        console.log('Received values of form:', values);
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
     
        <div className={style.login_form}>
        <Form form={form}
        // 栅格化
        labelCol={{ span: 8 }}
        wrapperCol={{ span:8  }}
        // initialValues={{
        //      remember:true,
        //  }}
         onSubmit={onSubmit}
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

