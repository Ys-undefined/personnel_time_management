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
    const [curPage,setCurPage]=useState(1)

    const type = props.type
    const handleRes = (res)=>{
        if (res){
            setTotal(res.data.total)
            const {data: {records}}=res
            return records.map(r => {
                r.isBalance = r.isBalance === "1";
                return r
            })
        }
    }
    let startTime=null;
    let endTime = null;
    const getAllReports= async (type,page)=>{
        if (type==="daily"){
            const res = await post(api.getDailyReport,{pageNo:page||1,pageSize:8},false)
            if (startTime && endTime){
                await handleFilterReports(startTime,endTime,handleRes(res))
            }else {
                setReports(handleRes(res))
            }
        }else {
            const res = await post(api.getWeeklyReport,{pageNo:page||1,pageSize:8},false)
            if (startTime && endTime){
                await handleFilterReports(startTime,endTime,handleRes(res))
            }else {
                setReports(handleRes(res))
            }
        }
    }

    useEffect(()=>{
        getAllReports(type).then()
        //订阅消息
        PubSub.subscribe("update_report",()=>{
            getAllReports(type).then()
        })

        PubSub.subscribe("saveDateRange",(msg,time)=>{
            startTime=time.start;
            endTime=time.end;
        })
    },[])

    const handleGetReports= async (page)=>{
        await getAllReports(type,page)
    }
    const reset = async ()=>{
        startTime=null;
        endTime=null;
        await getAllReports(type)
        setCurPage(1)
    }
    async function handleFilterReports(start,end,res){
        const startDate = dayjs(start)
        const endDate = dayjs(end)
        switch (type){
            case "daily":
                if (!res){
                    res = handleRes(await post(api.getDailyReport,{pageNo:curPage,pageSize:8},false))
                }
                res=res.filter((report)=>{
                    if(dayjs(report.reportTime).isBetween(startDate,endDate,'date','[]'))
                        return report
                })
                break;
            case "weekly":
                if (!res){
                    res = handleRes(await post(api.getWeeklyReport,{pageNo: curPage,pageSize:8},false))
                }
                res=res.filter(report=>{
                    if (dayjs(report.startTime).isBetween(startDate,endDate,'date','[]') && dayjs(report.endTime).isBetween(startDate,endDate,'date','[]'))
                        return report
                })
                break;
            default:
                res=[]
        }
        setReports(res)
    }
    function getPage(page){
        setCurPage(page)
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
                <ReportPagination total={total} changePage={handleGetReports} getPage={getPage} curPage={curPage}></ReportPagination>
            </Footer>
        </>
    )
}

ReportDisplay.propTypes={
    type:PropTypes.string.isRequired,
    // url:PropTypes.string.isRequired,
}
export default ReportDisplay
