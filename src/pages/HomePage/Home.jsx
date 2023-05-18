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
        label:'分享课表',
        key: '/course-list',

    }
];
export const Home = () => {
    const [current, setCurrent] = useState('/schedule');
    const navigate = useNavigate();
    const onClick = (e) => {
        if (e.key !== current){
            setCurrent(e.key);
            navigate("/home"+e.key)
        }
    };
    return (
        <>
                <Layout>
                    <Header className={styles.headerStyle} >
                      <div className={styles.leftStyle} style={{fontSize:"30px"}}>🧠</div>
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