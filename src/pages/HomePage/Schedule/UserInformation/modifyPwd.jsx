import React from 'react'

import {
    AutoComplete, Button, Cascader, Checkbox, Col, Form, Input, InputNumber, Row, Select,
} from 'antd';
import { useState } from 'react';
const { Option } = Select;
import { LockOutlined, UserOutlined } from '@ant-design/icons'


export const ModifyPwd = () => {
    const onFinish = (values) => {
        console.log('Received values of form:', values);
    };

    return (

        <div >
            <h1>修改密码</h1>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 12 }}
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
    )
}

export default ModifyPwd;
