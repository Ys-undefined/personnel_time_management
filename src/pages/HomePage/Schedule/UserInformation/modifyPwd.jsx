import React from 'react'
import style from '../UserInformation/UserInformation.module.scss'
import {Button, Form, Input, message} from 'antd';

import {post} from "../../../../utils/request.js";

const api= {
    updatePwd: "/api/user/updatePwd"
}
export const ModifyPwd = () => {

    const [form] = Form.useForm();

    const onFinish =async (values) => {
        const {password,newPassword} = values
        const res= await post(api.updatePwd, values, false)
        console.log(res)
        //请求成功后还是走一遍获取用户信息的途径
        if(res){
            console.log('修改成功')
        }
        //提示账号密码为空
        if (password==='' &&newPassword===''){
            message.info('密码不能为空');
        }
    };

    return (

     <div className={style.info} >

       <div className={style.pwd_form}>
               <h1>修改密码</h1>
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
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                        if (getFieldValue('password')!='') {
                        return Promise.resolve();
                    }
                        return Promise.reject(new Error('请输入旧密码'));
                    },
                    })

                    ]}
                
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="newPassword"
                    label="新密码"
                    rules={[

                        {
                            pattern:
                                /^(?!^\d+$)(?!^[a-z]+$)(?!^[A-Z]+$)(?!^[^a-z0-9]+$)(?!^[^A-Z0-9]+$)(?!^.*[\u4E00-\u9FA5].*$)^\S*.{6,11}$/, message:'输入密码等级太低，且不少于6位'
                        },
                        // {
                        // pattern:/^{6,16}$/,message:'密码长度至少为6位'
                        // },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (getFieldValue('newPassword')!='') {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('请输入新密码'));
                            },
                        })
                    ]}
                   
                >
                    <Input.Password />
                </Form.Item>


                <Form.Item
                    name="confirm"
                    label="确认新密码"
                    dependencies={['password']}
                    rules={[
                        {

                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('两次密码不一致!'));

                            },

                        }),
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (getFieldValue('confirm')!='') {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('请确认密码'));
                            },
                        })
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
