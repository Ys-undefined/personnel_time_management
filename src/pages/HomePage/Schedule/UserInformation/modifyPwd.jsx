import React from 'react'
import { NavLink,Outlet } from 'react-router-dom'
import style from '../UserInformation/UserInformation.module.scss'

import {
    AutoComplete, Button, Cascader, Checkbox, Col, Form, Input, InputNumber, Row, Select,
} from 'antd';
import { useState} from 'react';
const { Option } = Select;
import { LockOutlined, UserOutlined } from '@ant-design/icons'


export const ModifyPwd = () => {
    const reg= /[_]/g 
    const [form] = Form.useForm();
    const newPwd=form.getFieldValue('newPassword')
    console.log(newPwd,reg.test(newPwd))

    const onFinish = (values) => {
        console.log('Received values of form:', values);
    };
   
    const checkPwd=(rule,newPassword)=>{
        if(rule.test(newPassword)){
        return Promise.reject('用户名里含有_')
    }else{
        return Promise.resolve();}
}
      

    return (

     <div >   
      <div><Outlet/> </div>
      <div className={style.navbar}>
      <NavLink to='/home/schedule/user-info'>修改个人信息</NavLink>
      <NavLink to='/home/schedule/user-info/pwd'>修改密码</NavLink>
      </div>
       <div className={style.pwd_form}>
      
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 12 }}
                form={form}
                onFinish={onFinish}
            >
                <Form.Item
                    name="password"
                    label="当前密码"
                    rules={[
                        {

                            message: 'Please input your password!',
                        },
                    ]}
                
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="newPassword"
                    label="hasFeedback新密码"
                    rules={[
                        {

                            message: 'Please input your password!',
                        },
                        {
                            pattern:
                            /^(?![0-9]+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{1,50}$/, message:'输入密码等级太低'
                        },
                        { //怎么拿到我们输入的密码

                        //    validator:checkPwd,
                            
                        }
                    ]}
                   
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
                            offset: 2,
                            span: 16,
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

export default ModifyPwd;
