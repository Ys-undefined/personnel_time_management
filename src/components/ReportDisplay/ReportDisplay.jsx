import {Layout} from 'antd'
import PropTypes from 'prop-types'
import styles from './reportDisplay.module.scss'
import {ReportList} from './ReportList/ReportList'
import ReportPagination from './ReportPagination/ReportPagination.jsx'
import ReportHeader from './ReportHeader/ReportHeader.jsx'
import {useEffect, useState} from 'react'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import PubSub from 'pubsub-js'
import {post} from '../../utils/request.js'

const {Header,Footer,Content} = Layout
dayjs.extend(isBetween)

const api = {
    getDailyReport:"/api/dailyReport/getDailyReport",
    getWeeklyReport:"/api/weeklyReport/getWeeklyReport",
}
const ReportDisplay= (props)=>{
    //测试数据
    const [reports,setReports] = useState([])
    // const [url] = useState(props.url)
    const [total,setTotal]=useState(0)
    const type = props.type
    const handleRes = (res)=>{
        if (res){
            setTotal(res.data.total)
            const {data: {records}}=res
            const curReports=records.map(r=>{
                r.isBalance = r.isBalance === "1";
                return r
            })
            setReports(curReports)
        }
    }
    const getAllReports= async (type,page)=>{
        if (type==="daily"){
            const res = await post(api.getDailyReport,{pageNo:page||1,pageSize:8},false)
            handleRes(res)
        }else {
            const res = await post(api.getWeeklyReport,{pageNo:page||1,pageSize:8},false)
            handleRes(res)
        }
    }
    useEffect(()=>{
        getAllReports(type).then()
        //订阅消息
        PubSub.subscribe("update_report",()=>{
            getAllReports(type).then()
        })
    },[])

    const handleGetReports= async (page)=>{
        await getAllReports(type,page)
    }
    const reset = async ()=>{
       await getAllReports(type)
    }
    function handleFilterReports(start,end){
        const startDate = dayjs(start)
        const endDate = dayjs(end)
        let res;
        switch (type){
            case "daily":
                res=reports.filter((report)=>{
                    if(dayjs(report.reportTime).isBetween(startDate,endDate,'date','[]'))
                        return report
                })
                break;
            case "weekly":
                res=reports.filter(report=>{
                    if (dayjs(report.startTime).isBetween(startDate,endDate,'date','[]') && dayjs(report.endTime).isBetween(startDate,endDate,'date','[]'))
                        return report
                })
                break;
            default:
                res=[]
        }
        setReports(res)
    }
    return (
        <>
            <Header className={styles.headerStyle}>
                <ReportHeader type={props.type} filterReportByDate={handleFilterReports} resetFuc={reset}></ReportHeader>
            </Header>
            <Content className={styles.contentStyle}>
                <ReportList reports={reports} type={props.type} ></ReportList>
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
