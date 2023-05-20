import {NavLink} from 'react-router-dom'
import {Button, Form, Input, Select,} from 'antd';
import {get, post} from '../../../../utils/request'
import {useEffect, useState} from 'react';
import style from '../UserInformation/UserInformation.module.scss'

export const ModifyUser = () => {
  const [form] = Form.useForm();
  const api={
    login:"/api/user/login",
    getUser:"/api/user/getUser",
    modifyUser:'/api/user/updateUserInfo',
    modifyPwd:'/api/user/updatePwd',
    getCollege:"/api/user/getCollege"
  }


  const [userInfo,setUserInfo] = useState({})
  //请求用户信息

  //获取学院信息
  const [college,setCollege] = useState([])
  const college1 = async ()=>{
    const res = await get(api.getCollege,null)
    if (res){
      const colleges = res.data.map(c=>{
        return {
          label:c.collegeName,
          value:c.collegeId
        }
      })
      setCollege(colleges)
    }
    getUserInfo().then(r=>{
      console.log(r)})
  }

  const getUserInfo= async () =>{
    const res= await post(api.getUser,null,false)
    if (res){
      const info= res.data
      setUserInfo({...info})
      return info
    }
  }
  useEffect(() => {
    college1().then()
  }, [])


  const handleChange = () => {
    form.setFieldsValue({
      sights: [],
    });
  };
  //表单提交
  const onFinish = async(values) => {
        const res= await post(api.modifyUser, values, true)
        if(res){
          await getUserInfo()
        }
  };
  //清除输入内容
  const onReset = () => {
    form.resetFields()
  };
  return (
    <div className={style.info}>
      <div >
        <div className={style.navbar}>
          <NavLink to='/home/schedule/user-info'>修改个人信息</NavLink>
          <NavLink to='/home/schedule/user-info/pwd'>修改密码</NavLink>
        </div>
        <div className={style.user_form}>
          <Form form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 12 }}
            onFinish={onFinish}
            initialValues={{nickName:userInfo.nickName,photoUrl:userInfo.photoUrl}}
          >
            <Form.Item
              name="nickName"
              label= "用户名"
              rules={[{ message: 'Please input your nickname!', whitespace: true },
              {
                pattern: /^\w+$/, message: '用户名必须由数字、字母、下划线组成'
              }]}

            >
              <Input />
            </Form.Item>
            <Form.Item
              name="photoUrl"
              label="头像地址"
              rules={[{ message: ' ', whitespace: true },
              {
                // pattern: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/,
                // message: '请输入正确的地址链接'
              }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="collegeName"
              label="学院"
            >
              <Select options={college} onChange={handleChange} placeholder="select your college" >
              </Select>

            </Form.Item>


            <Form.Item
              name="major"
              label="专业"
              rules={[{ message: ' ', whitespace: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="level"
              label="年级"
              rules={[{ message: 'Please select grad!' }]}
            >
              <Input />


            </Form.Item>
            <Form.Item
              wrapperCol={
                {
                  offset: 4,
                  span: 16,
                }
              }
            >
              <Button type="primary" htmlType="submit">
                确认修改
              </Button>
              <Button htmlType="button"
              style={
                {
                  margin:'0 50px'

                }
              }
              onClick={onReset}>
                重置
              </Button>
            </Form.Item>

          </Form>
        </div>
      </div>
    </div>
  )
}

export default ModifyUser;