import {Layout} from 'antd';
const {Sider, Content } = Layout;
import styles from '../../HomePage/general.module.scss'
import SideNavi from '../../../components/SideNavi/SideNavi.jsx'
import {Outlet, useLocation} from 'react-router-dom'
import course_style from '../CourseList/courseList.module.scss'
import {PlusCircleOutlined} from '@ant-design/icons'

const items=[
    {
        label:'日报',
        key:'/daily-report',
    },
    {
        label:'周报',
        key:'/weekly-report',
    }
]

export const Report = () => {
    const location = useLocation()
    return (
        <>
            <Sider className={styles.siderStyle} >
                <div className={course_style.header}>
                    日报周报
                    <PlusCircleOutlined className={course_style.icon}/>
                </div>
                <SideNavi items={items} naviUrl={location.pathname} defaultDisplayKey='/daily-report'/>
            </Sider>
            <Content className={styles.contentStyle} >
                <Outlet/>
            </Content>
        </>
    )
}