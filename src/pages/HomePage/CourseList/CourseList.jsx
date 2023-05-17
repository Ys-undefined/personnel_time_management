import {Layout} from 'antd';
import styles from '../../HomePage/general.module.scss'
import  course_style from './courseList.module.scss'
import SideNavi from '../../../components/SideNavi/SideNavi'
import {Outlet, useLocation} from 'react-router-dom'
const {Sider, Content } = Layout;
import {PlusCircleOutlined} from "@ant-design/icons";
const items=[
    {
        label:'前端分享课程',
        key:'/frontend-course',
    },
    {
        label: '后端分享课程',
        key:'/backend-course',
    },
    {
        label:'测试分享课程',
        key:'/test-course',
    },
    {
        label: '软件技能分享课程',
        key:'/software-skill-course',
    }

]
export const CourseList = () => {
    const location = useLocation()
    return (
        <>

            <Sider className={styles.siderStyle} >
                <div className={course_style.header}>
                   分享课表
                    <PlusCircleOutlined className={course_style.icon}/>
                </div>
                <SideNavi items={items} naviUrl={location.pathname} defaultDisplayKey="/frontend-course"/>
            </Sider>
            <Content className={styles.contentStyle} style={{display:"",overflow:'scroll',height:'93vh'}}>
                <Outlet  />
            </Content>
        </>
    )
}