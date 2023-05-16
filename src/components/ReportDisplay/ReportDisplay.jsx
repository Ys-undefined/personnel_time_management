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

const {Header,Footer,Content} = Layout
dayjs.extend(isBetween)

const ReportDisplay= (props)=>{
    //测试数据
    const [reports,setReports] = useState([])
    // const [url] = useState(props.url)
    const [total,setTotal]=useState(0)
    const type = props.type
    useEffect(()=>{
        //todo 请求所有数据 后set reports 和 total
        //订阅消息
        PubSub.subscribe("update_report",(msg,report)=>{
            const index = reports.findIndex(r=>report.reportId===r.reportId)
            if (index!==-1){
                const updateReports=reports.map(r=>{
                    if (r.reportId===report.reportId){
                        return report
                    }
                    return r
                })
                setReports(updateReports)
            }
        })
    },[])

    function handleGetReports(page,pageSize){
        console.log(page,pageSize)
        //todo 请求数据 && setReports
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
                <ReportHeader type={props.type} filterReportByDate={handleFilterReports}></ReportHeader>
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
