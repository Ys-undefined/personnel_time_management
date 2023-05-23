import {Layout, Menu ,Avatar, Space } from 'antd';
const { Header } = Layout;
import styles from './home.module.scss'
import {post} from '../../utils/request.js'
import Cookies from 'js-cookie';
import {useEffect, useState} from 'react'
import {Outlet, useLocation, useNavigate} from 'react-router-dom'
const api= {
    getUser:"/api/user/getUser",
    loginOut:"/api/user/logout"
}
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
    },
    {
    label: "统计信息",
        key: "/information"
    }
];

export const Home = () => {
    const navigate = useNavigate();
    const [current, setCurrent] = useState('/schedule');
    const location = useLocation();

    useEffect(()=>{
        setCurrent("/"+location.pathname.split("/")[2])
    },[])

    const onClick = (e) => {
        setCurrent(e.key);
        navigate("/home"+e.key)
    };


    const getUserInfo=async () =>{ {
        const res= await post(api.getUser,null,false)
            if(res){
                Cookies.set('photoUrl',res.data.photoUrl)
                Cookies.set('name',res.data.nickName)
            }
    }

    }
      //退出登录
    const loginOut=async () =>{
        const res= await post(api.loginOut,null,false)
        if(res){
            Cookies.remove('token')
            Cookies.remove('name')
            Cookies.remove('photoUrl')
            navigate('/ ')
        }
      }
      getUserInfo()
    return (
        <>      
                <Layout>
                    <Header className={styles.headerStyle} >
                      <div className={styles.leftStyle} style={{fontSize:"30px"}}>🧠</div>
                        <Menu className={styles.middleStyle} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
                        <div className={styles.lastStyle}>
                         <div className='photo'>
                         <Space wrap size={16}>
                          <Avatar src={<img src={Cookies.get('photoUrl')} alt={''}/>} />
                         </Space>
                         </div>   
                           <div className='username'> {Cookies.get('name')} </div> 
                           <div >
                            {/*<div className={styles.userInformation}><a onClick={userInformation}>个人中心</a></div>*/}
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