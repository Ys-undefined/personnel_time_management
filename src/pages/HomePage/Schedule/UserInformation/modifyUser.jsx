import React from 'react'
import { NavLink,Outlet } from 'react-router-dom'
import {AutoComplete,Button,Cascader,Checkbox,Col,Form,Input,InputNumber,Row,Select,} from 'antd';
  import { useState } from 'react';
  const { Option } = Select;
  import {LockOutlined,UserOutlined} from '@ant-design/icons'
  

export const ModifyUser =() => {
    
  //
  const formRef = React.useRef(null);
  const college=[
    {
      label:'料与冶金学院',
      value:'料与冶金学院'
    },
    {
      label:'城市建设学院',
      value:'城市建设学院'
    },
    {
      label:'管理学院',
      value:'管理学院'
    },
    {
      label:'化学与化工学院',
      value:'化学与化工学院'
    },
    {
      label:'机械自动化学院',
      value:'机械自动化学院'
    },
    {
      label:'计算机科学与技术学院',
      value:'计算机科学与技术学院'
      
    }
  ]
 
  const level=[
    {
      label:'2019',
      value:'2019'
    },
    {
      label:'2020',
      value:'2020'
    },
    {
      label:'2021',
      value:'2021'
    },
    {
      label:'2022',
      value:'2022'
    },
    {
      label:'2023',
      value:'2023'
    }
    
  ]
  const handleChange = () => {
    form.setFieldsValue({
      sights: [],
    });
  };

  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };



  function setUser(e){
    // 获取文本框输入内容
      console.log(e.target.value)
      // SetUsername(e.target.value)
  }
  //清除输入内容
 
  const onReset = () => {
    formRef.current?.resetFields();
  };
  return (
    
    <div >
      <div >
      <div><Outlet/> </div>
      <div>
      <NavLink >修改个人信息</NavLink>
      <NavLink to='/home/schedule/user-info/pwd'>修改密码</NavLink>
      </div>
      
       
      
      <Form 
      ref={formRef}
      labelCol={{ span: 6 }}
      wrapperCol={{ span:12  }}
      onFinish={onFinish}
      >
         <Form.Item
        name="nickName"
        label="用户昵称"
        rules={[{message: 'Please input your nickname!', whitespace: true },
        {
          pattern: /^\w+$/,message: '用户名必须由数字、字母、下划线组成'
         }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="photo_url"
        label="头像地址"
        rules={[{ message: ' ', whitespace: true },
      {pattern:/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/,
    message:'请输入正确的地址链接'}]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="college_id"
        label="学院"
        rules={[{ message: 'Please select college!' }]}
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
        rules={[{  message: 'Please select grad!' }]}
      >
        <Select options={level} onChange={handleChange} placeholder="select your grad">
         
        </Select>
      </Form.Item>
      <Form.Item
      wrapperCol={
        {
            offset:2,
            span:16,
        }
      }
      >
      <Button type="primary" htmlType="submit">
          确认修改
        </Button>
        <Button  htmlType="button" onClick={onReset}>
          重置
        </Button>
      </Form.Item>

      </Form>  
      </div>
    </div> 
  )
}

export default ModifyUser;