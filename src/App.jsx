import {Component} from 'react'
import {TopNavi} from './components/TopNavi/TopNavi'
import {Layout} from 'antd'
import styles from './App.module.scss'
export class App extends Component {
    state ={
        items :[
            {
                label: '个人日程',
                key: 'schedule',
                children:[
                    {
                        label:"我的空闲时段",
                        key:"idle_time",
                    },
                    {
                        label:"上月打卡记录",
                        key:"punch_record",
                    },
                    {
                        label:"我的参与课程",
                        key:"my_courses",
                    },
                    {
                        label:"我的设置",
                        key:"my_settings",
                    },
                ]
            },
            {
                label: "日志周报",
                key: 'journals'
            },
            {
                label: "分享课表",
                key: "lessons"
            },
            {
                label: "统计信息",
                key: "statistics"
            }
        ],
        current:"schedule"
    }
    render() {
        const {Header,Content,Sider} = Layout
        const {items} = this.state
        return (
            <Layout className={styles.whole}>
                <Header style={{padding:"0"}}>
                    <TopNavi items={items}></TopNavi>
                </Header>
                <Layout>
                    <Sider width={200} style={{backgroundColor:"#eee"}}>
                        SideBar
                    </Sider>
                    <Layout style={{padding:'0 24px 24px'}}>
                        <Content style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            backgroundColor:"#eee"
                        }}>
                            Content
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }

}