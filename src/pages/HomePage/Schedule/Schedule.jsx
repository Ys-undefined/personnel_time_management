import {Layout} from 'antd';
const {Sider, Content } = Layout;
import styles from '../../HomePage/general.module.scss'
import {Outlet, useLocation} from 'react-router-dom'
import SideNavi from '../../../components/SideNavi/SideNavi.jsx'
import course_style from '../CourseList/courseList.module.scss'
import {PlusCircleOutlined} from '@ant-design/icons'


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
        label: '我参与的课程',
        key:'/my-course'
    },
    {
        label: '个人中心',
        key:'/user-info',
        children:[
            {
                label:'修改个人信息',
                key:'/user-info'
            },
            {
            label:'修改个人密码',
            key:'/pwd'
        }],


    },

]

export const Schedule = () => {
    const location = useLocation()
   
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