import { NavLink, Outlet } from 'react-router-dom'
import {Button, Form, Input, Select, } from 'antd';
import {post,get} from '../../../../utils/request'
import { useState,useEffect } from 'react';
import style from '../UserInformation/UserInformation.module.scss'


export const ModifyUser = () => {
  const [form] = Form.useForm();
  const api={
    login:"/api/user/login",
    getUser:"/api/user/getUser",
    modifyUser:'/api/user/updateUserInfo',
    modifyPwd:'/api/user/updatePwd',
    getCollege:"/api/user/getCollege",
    loadphotoUrl:"/api//user/uploadPhoto"

  }

  //请求用户信息
  const getUserInfo=async () =>{
    const res= await post(api.getUser,null,false)
    // setUserInfo(res.data)

    form.setFieldsValue({
      'nickName':res.data.nickName,
      'photoUrl':res.data.photoUrl,
      'level':res.data.level,
      'major':res.data.major,
      'collegeName':res.data.collegeName
    })
}
  //上传头像
  const updatephotoUrl=async () => {
    const res = await post(api.loadphotoUrl, photoUrl, false)
    if(res){
      console.log('上传头像成功')
    }
  }
  //获取学院信息
  const [college,setCollege] = useState([])


  const college1 = async ()=>{
    const res = await get(api.getCollege,null)
    if (res){
      const colleges = res.data.map(c=>{
        // console.log('学院名',c.collegeId)
        return {
          label:c.collegeName,
          value:c.collegeName
        }
      })
      setCollege(colleges)

    }
  }



  useEffect(() => {
      post(api.getUser,null,false).then(res=>{
      console.log('个人中心请求成功')
      console.log(res.data)
      form.setFieldsValue({
        'nickName':res.data.nickName,
        'photoUrl':res.data.photoUrl,
        'level':res.data.level,
        'major':res.data.major,
        'collegeName':res.data.collegeName
      })
    })
    //请求学院信息
    college1()
    //请求用户头像
    updatephotoUrl()
  }, [])




  const handleChange = () => {
    form.setFieldsValue({
      sights: [],
    });
  };

  const onFinish = async(values) => {
        const {collegeId,collegeName,level,major,nickName,photoUrl} = values
        console.log(values)
        const res= await post(api.modifyUser, values, true)
        console.log(res)
        //请求成功后还是走一遍获取用户信息的途径
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
        <div><Outlet /> </div>
        <div className={style.navbar}>
          <NavLink to='/home/schedule/user-info'>修改个人信息</NavLink>
          <NavLink to='/home/schedule/user-info/pwd'>修改密码</NavLink>
        </div>
        <div className={style.user_form}>
          <Form form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 12 }}
            onFinish={onFinish}
          >
            <Form.Item
              name="nickName"
              label= "用户昵称"
              rules={[{ message: 'Please input your nickname!', whitespace: true },
              {
                pattern:/^[A-Za-z0-9]+$/ ,message: '请输入数字和字母组合'
              },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (getFieldValue('nickName')!='') {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('请输入用户名'));
                  },
                })


              ]}


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
              // rules={[{ message: 'Please select grad!' }]}

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