import {Layout} from 'antd';
const {Content,Sider } = Layout;
import styles from '../../HomePage/general.module.scss'
import {Outlet} from 'react-router-dom'
import SideNavi from '../../../components/SideNavi/SideNavi.jsx'

const items=[
    {
        label:'我的统计信息',
        key:'/infor-mation',
    }
]

export const Schedule = () => {
    // const location = useLocation()
    return (
        <>
            <Sider className={styles.siderStyle} >
                <SideNavi items={items} naviUrl={location.pathname} defaultDisplayKey="/infor-mation"/>
            </Sider>
            <Content className={styles.contentStyle}>
                <Outlet/>
            </Content>
            

            
        </>

    )
}