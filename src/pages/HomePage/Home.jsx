import { Layout, Menu, Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
const { Header } = Layout;
import styles from './home.module.scss';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { post } from '../../utils/request.js';
import Cookies from 'js-cookie';
const items = [
  {
    label: '个人日程',
    key: '/schedule',
  },
  {
    label: '日报周报',
    key: '/record',
  },
  {
    label: '分享课表',
    key: '/course-list',
  },
  {
    label: '我的统计信息',
    key: '/information',
  },
];
export const Home = () => {
  const [current, setCurrent] = useState('/schedule');
  //发送请求获取数据

  const navigate = useNavigate();
  const onClick = (e) => {
    setCurrent(e.key);
    navigate('/home' + e.key);
  };

  //startTime是向服务器发送请求响应的时间
  // const startTime='1684463874159'
  // const inputTime=parseInt(startTime)+parseInt(29500*1000)//设置每50秒存储的值过期
  // const nowTime=+new Date().getTime()

  // const times=(inputTime-nowTime)/1000
  // console.log(times)
  function userInformation() {
    navigate('/home/schedule/user-info');
  }
  //退出登录
  function loginOut() {
    localStorage.removeItem(user);
    navigate('/ ');
  }
  // if(times < 0){
  //   //缓存过期，清除缓存，跳到登录页面
  //     localStorage.removeItem(user);
  //     console.log('个人中心',user.userName);
  //     navigate("/ ")

  //   }
  return (
    <>
      <Layout>
        <Header className={styles.headerStyle}>
          <div className={styles.leftStyle} style={{ fontSize: '30px' }}>
            🧠
          </div>
          <Menu
            className={styles.middleStyle}
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            defaultSelectedKeys={['/schedule']}
            items={items}
          />
          <div className={styles.lastStyle}>
            <div className="photo">
              <Space wrap size={16}>
                <Avatar src={<img src={Cookies.get('photoUrl')} />} />
              </Space>
            </div>
            <div className="username"> {Cookies.get('name')} </div>
            <div className={styles.select}>
              <div className={styles.userInformation}>
                <a onClick={userInformation}>个人中心</a>
              </div>
              <div className={styles.loginOut}>
                <a onClick={loginOut}>退出登录</a>
              </div>
            </div>
          </div>
        </Header>
        <Layout className={styles.contentStyle}>
          <Outlet />
        </Layout>
      </Layout>
    </>
  );
};
