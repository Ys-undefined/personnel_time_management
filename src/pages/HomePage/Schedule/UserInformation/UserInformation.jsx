import React from 'react'
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from 'antd';
import { useState } from 'react';
const { Option } = Select;
import {LockOutlined,UserOutlined} from '@ant-design/icons'
import style from '../UserInformation/UserInformation.module.scss'


export const UserInformation =() => {
  return (
    <div className={style.info}>
      <div className={style.modify_info}>
       <h1>修改信息</h1>
      <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span:12  }}
      >
         <Form.Item
        name="nickname"
        label="用户昵称"
        rules={[{message: 'Please input your nickname!', whitespace: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="url"
        label="头像地址"
        rules={[{ message: ' ', whitespace: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="institute"
        label="学院"
        rules={[{ message: 'Please select institute!' }]}
      >
        <Select placeholder="select your institute">
          <Option value="one">材料与冶金学院</Option>
          <Option value="two">城市建设学院</Option>
          <Option value="three">管理学院</Option>
          <Option value="four">化学与化工学院</Option>
          <Option value="five">机械自动化学院</Option>
          <Option value="six">计算机科学与技术学院</Option>
      
        </Select>
      </Form.Item>

       
        <Form.Item
        name="professional"
        label="专业"
        rules={[{ message: ' ', whitespace: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="grad"
        label="年级"
        rules={[{  message: 'Please select grad!' }]}
      >
        <Select placeholder="select your grad">
          <Option value="one">2019</Option>
          <Option value="two">2020</Option>
          <Option value="three">2021</Option>
          <Option value="four">2022</Option>
          <Option value="five">2023</Option>
        </Select>
      </Form.Item>
      <Form.Item
      wrapperCol={
        {
            offset:6,
            span:16,
        }
      }
      >
      <Button type="primary" htmlType="submit">
          确认修改
        </Button>
      </Form.Item>

      </Form>  
      </div>
        
      <div className={style.modify_password}>

        
        <h1>修改密码</h1>
<Form
labelCol={{ span: 8 }}
wrapperCol={{ span:12  }}

>
<Form.Item
        name="password"
        label="当前密码"
        rules={[
          {
            
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
        </Form.Item>

        <Form.Item
        name="password"
        label="新密码"
        rules={[
          {
           
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
        </Form.Item>
       
     
      <Form.Item
        name="confirm"
        label="确认新密码"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
           
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item 
       wrapperCol={
        {
            offset:6,
            span:16,
        }
    }>
        <Button type="primary" htmlType="submit">
          确认修改
        </Button>
      </Form.Item>
      </Form>
      </div>
    </div>


    
  )
}
