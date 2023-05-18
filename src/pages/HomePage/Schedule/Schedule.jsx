import {Layout} from 'antd';
const {Sider, Content } = Layout;
import styles from '../../HomePage/general.module.scss'
import {Outlet, useLocation} from 'react-router-dom'
import SideNavi from '../../../components/SideNavi/SideNavi.jsx'

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
        label: '我的设置',
        key:'/user-info'
    },
    
]
export const Schedule = () => {
    const location = useLocation()
    return (
        <>
            <Sider className={styles.siderStyle} >
                <SideNavi items={items} naviUrl={location.pathname} defaultDisplayKey="/spare-time"/>
            </Sider>
            <Content className={styles.contentStyle}>
                <Outlet/>
            </Content>
        </>
    )
}