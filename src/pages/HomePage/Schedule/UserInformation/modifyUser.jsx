import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import {Button, Form, Input, Select, } from 'antd';
import {post,get} from '../../../../utils/request'
import { useState,useEffect } from 'react';
import style from '../UserInformation/UserInformation.module.scss'
import Cookies from 'js-cookie';

  //取数据

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
  const getUserInfo=async () =>{
    const res= await post(api.getUser,null,false)
    setUserInfo(res.data)
    form.setFieldsValue({
      'nickName':userInfo.nickName,
      'photoUrl':userInfo.photoUrl,
      'level':userInfo.level,
      'major':userInfo.major,
    })
}
  //加载用户信息

  
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
  }
  useEffect(() => {
     post(api.getUser,null,false).then(res=>{
      setUserInfo({
        nickName:"1",
        photoUrl:"2",
        level:"3",
        major:"4"
      })
      form.setFieldsValue({
        'nickName':"userInfo.nickName",
        'photoUrl':userInfo.photoUrl,
        'level':userInfo.level,
        'major':userInfo.major,
      })
    })
    console.log(userInfo);
    college1()
  }, [])
  


  const formRef = React.useRef();

  const handleChange = () => {
    form.setFieldsValue({
      sights: [],
    });
  };

  const onFinish = async(values) => {
        const {collegeId,collegeName,level,major,nickName,photoUrl} = values
        const res= await post(api.modifyUser, values, true)
        if(res){
          getUserInfo()
        }
  };

  //清除输入内容
  const onReset = () => {
    formRef.current?.resetFields();
  };


  return (
    
    <div className={style.info}>
      <div >
        <div><Outlet /> </div>
        <div className={style.navbar}>
          <NavLink to='/home/schedule/user-info'>修改个人信息</NavLink>
          <NavLink to='/home/schedule/user-info/pwd'>修改密码</NavLink>
        </div>
        <div className={style.user_form}>
          <Form form={form}
            ref={formRef}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 12 }}

            onFinish={onFinish}
          >
            <Form.Item
              name="nickName"
              label= "用户名"
              rules={[{ message: 'Please input your nickname!', whitespace: true },
              {
                pattern: /^\w+$/, message: '用户名必须由数字、字母、下划线组成'
              }]}
              initialValue={userInfo.nickName} 
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
              initialValue={userInfo.photoUrl}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="collegeName"
              label="学院"
              initialValue={userInfo.collegeName}
            >
              <Select options={college} onChange={handleChange} placeholder="select your college" >
              </Select>
              
            </Form.Item>


            <Form.Item
              name="major"
              label="专业"
              rules={[{ message: ' ', whitespace: true }]}
              initialValue={userInfo.major}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="level"
              label="年级"
              rules={[{ message: 'Please select grad!' }]}
              initialValue={userInfo.level}
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