import {Layout, Menu} from 'antd';
const { Header } = Layout;
import styles from './home.module.scss'
import {useState} from 'react'
import {Outlet, useNavigate} from 'react-router-dom'

const items =[
    {
        label: '个人日程',
        key: '/schedule',
    },
    {
        label: '日报周报',
        key: '/record',
    },
    {
        label: '我的统计信息',
        key: '/information',
    },
];
export const Home = () => {
    const [current, setCurrent] = useState('/schedule');
    const navigate = useNavigate();
    const onClick = (e) => {
        setCurrent(e.key);
        navigate("/home"+e.key)
    };
    return (
        <>
                <Layout style={{position: "relative"}}>
                    <Header className={styles.headerStyle} >
                      <div className={styles.leftStyle}>go run</div>
                        <Menu className={styles.middleStyle} onClick={onClick} selectedKeys={[current]} mode="horizontal" defaultSelectedKeys={["/schedule"]} items={items} />
                        <div className={styles.lastStyle}>div</div>
                    </Header>
                    <Layout className={styles.contentStyle} >
                        <Outlet/>
                    </Layout>
                </Layout>

        </>
    )
}