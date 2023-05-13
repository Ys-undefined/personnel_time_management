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
                <Layout>
                    <Header className={styles.headerStyle}>
                        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" defaultSelectedKeys={["/schedule"]} items={items} />
                    </Header>
                    <Layout className={styles.contentStyle}>
                        <Outlet/>
                    </Layout>
                </Layout>

        </>
    )
}