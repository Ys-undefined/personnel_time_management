import {Layout, Menu ,Avatar, Space } from 'antd';
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
    const url='data:image/jpeg;base64,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'
    const navigate = useNavigate();
    const onClick = (e) => {
        if (e.key!==current){
            setCurrent(e.key);
            navigate("/home"+e.key)
        }
    };
    const [fileList, setFileList] = useState([
        {
          uid: '-1',
          name: 'image.png',
          url: url
        },
      ]);

      function userInformation (){
        navigate("/home/schedule/user-info")
      }
      function loginOut(){
        navigate('/')
      }
    
    return (
        <>
                <Layout>
                    <Header className={styles.headerStyle} >
                      <div className={styles.leftStyle} style={{fontSize:"30px"}}>🧠</div>
                        <Menu className={styles.middleStyle} onClick={onClick} selectedKeys={[current]} mode="horizontal" defaultSelectedKeys={["/schedule"]} items={items} />
                        <div className={styles.lastStyle}>
                         <div className='photo'>
                         <Space wrap size={16}>
                          <Avatar src={<img src={url} alt={"avatar"} />} />
                         </Space>
                         </div>   
                           <div className='username'> 123 </div> 
                           <div className={styles.select}>
                            <div className={styles.userInformation}><a onClick={userInformation}>个人中心</a></div>
                            <div className={styles.loginOut}><a onClick={loginOut}>退出登录</a></div>
                            </div>       
                        </div>
                    </Header>
                    <Layout className={styles.contentStyle} >
                        <Outlet/>
                    </Layout>
                </Layout>

        </>
    )
}