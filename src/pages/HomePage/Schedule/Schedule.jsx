import {Layout} from 'antd';
const {Sider, Content } = Layout;
import styles from '../../HomePage/general.module.scss'
import {Outlet, useLocation} from 'react-router-dom'
import SideNavi from '../../../components/SideNavi/SideNavi.jsx'
import course_style from '../CourseList/courseList.module.scss'
import {PlusCircleOutlined} from '@ant-design/icons'
import {post} from '../../../utils/request'
const items=[
    {
        label:'空闲时段',
        key:'/spare-time',
    },
    {
        label: '上月打卡记录',
        key:'/clock-in'
    },
    {
        label: '个人中心',
        key:'/user-info'
    },
    
]
const api={
    modifyUser:"http://123.56.27.142:8888/user/getUser"
  }
export const Schedule = () => {
    const location = useLocation()
//     //获取token值
//   const token=localStorage.getItem('token')
//   console.log(token)
//   const res= post(api.modifyUser, token, false)
//   console.log(res)
    return (
        <>
            <Sider className={styles.siderStyle} >
                <div className={course_style.header}>
                    个人日程
                    <PlusCircleOutlined className={course_style.icon}/>
                </div>
                <SideNavi items={items} naviUrl={location.pathname} defaultDisplayKey="/spare-time"/>
            </Sider>
            <Content className={styles.contentStyle}>
                <Outlet/>
            </Content>
        </>
    )
}