import {Layout} from 'antd'
import PropTypes from 'prop-types'
import styles from './reportDisplay.module.scss'
import {ReportList} from './ReportList/ReportList'
import ReportPagination from './ReportPagination/ReportPagination.jsx'
import ReportHeader from './ReportHeader/ReportHeader.jsx'
import {useEffect, useState} from 'react'
const {Header,Footer,Content} = Layout
//测试数据
const reports = [
    {
        key:'1',
        date:"11111111",
        completed:"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        risky:"xxxxxxxxxxxxxxx",
        isDelay:false,
    },
    {
        key:'2',
        date:"22222222",
        completed:"xxxxxxxxxxx",
        risky:"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        isDelay:true,
    },
    {
        key:'3',
        date:"33333333",
        completed:"xxxxxxxxxxx",
        risky:"xxxxxxxxxxxxxxx",
        isDelay:true,
    },
]

const ReportDisplay= (props)=>{
    // const [url] = useState(props.url)
    // const [reports,setReports] = useState([])
    const [total,setTotal]=useState(0)
    useEffect(()=>{
        //todo 请求所有数据
        setTotal(20)
    },[])

    function handleGetReports(page,pageSize){
        console.log(page,pageSize)
        //todo 请求数据 && setReports
    }
    return (
        <>
            <Header className={styles.headerStyle}>
                <ReportHeader type={props.type}></ReportHeader>
            </Header>
            <Content className={styles.contentStyle}>
                <ReportList reports={reports} type={props.type}></ReportList>
            </Content>
            <Footer className={styles.footerStyle}>
                <ReportPagination total={total} changePage={handleGetReports}></ReportPagination>
            </Footer>
        </>
    )
}

ReportDisplay.propTypes={
    type:PropTypes.string.isRequired,
    // url:PropTypes.string.isRequired,
}
export default ReportDisplay
