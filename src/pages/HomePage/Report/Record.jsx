import {Layout} from 'antd';
const {Sider, Content } = Layout;
import styles from './record.module.scss'
import SideNavi from '../../../components/SideNavi/SideNavi.jsx'
import {Outlet, useLocation} from 'react-router-dom'

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

export const Record = () => {
    const location = useLocation()
    return (
        <>
            <Sider className={styles.siderStyle}>
                <SideNavi items={items} naviUrl={location.pathname}/>
            </Sider>
            <Content className={styles.contentStyle}>
                <Outlet/>
            </Content>
        </>
    )
}