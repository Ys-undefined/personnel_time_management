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
  
export default function modifyPwd() {
  return (
    <div className={style.modify_password}>

        
    <h1>修改密码</h1>
<Form
labelCol={{ span: 4 }}
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
    name="newPassword"
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
  )
}
