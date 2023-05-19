import PropTypes from 'prop-types'
import {Button,Table,Tag,Space} from 'antd'
import {ReportDetails} from './ReportDetails/ReportDetails'


export const ReportList = (props) => {
    const reports=props.reports
    const type= props.type || "daily"
    let columns;
    let addButton;
    switch (type){
        case "daily":
            columns = [
                {
                    title: '日期',
                    dataIndex: 'reportTime',
                    key: 'reportTime',
                },
                {
                    title: '完成工作内容',
                    dataIndex: 'content',
                    key: 'content',
                    ellipsis:true
                },
                {
                    title: '有风险内容',
                    dataIndex: 'riskInfo',
                    key: 'riskInfo',
                    ellipsis:true
                },
                {
                    title: '是否有延迟',
                    dataIndex: 'isBalance',
                    key: 'isBalance',
                    render:(value)=>{
                        const color = value?"red":"green"
                        const text =value?"是":"否"
                        return (
                            <>
                                <Tag color={color}>{text}</Tag>
                            </>
                        )
                    }
                },
                {
                    title: '操作',
                    dataIndex: 'actions',
                    render: (_,report) => (
                        <Space size="middle">
                            <ReportDetails report={report} type={type}/>
                        </Space>
                    )
                },
            ]
            // addButton=<Button type={"primary"} style={{display:"flex",justifyContent:"flex-start"}}>新增日报</Button>
            addButton=<ReportDetails style={{display:"flex",justifyContent:"flex-start"}} type={type}/>
            break;
        case "weekly":
            columns = [
                {
                title: '日期范围',
                dataIndex: ["startTime","endTime"],
                key: 'reportTime',
                render:(_,report)=>{
                    return (
                        <>
                            {report.startTime} ~ {report.endTime}
                        </>
                        )
                }
                },
                {
                    title: '本周完成内容',
                    dataIndex: 'content',
                    key: 'content',
                    ellipsis:true
                },
                {
                    title: '下周计划',
                    dataIndex: 'nextWeekPlan',
                    key: 'nextWeekPlan',
                    ellipsis:true
                },
                {
                    title: '是否有偏差',
                    dataIndex: 'isBalance',
                    key: 'isBalance',
                    render:(value)=>{
                        const color = value?"red":"green"
                        const text =value?"是":"否"
                        return (
                            <>
                                <Tag color={color}>{text}</Tag>
                            </>
                        )
                    }
                },
                {
                    title: '操作',
                    dataIndex: 'actions',
                    render: (_,report) => (
                        <Space size="middle">
                            <ReportDetails report={report} type={type}/>
                        </Space>
                    )
                },]
            addButton=<ReportDetails style={{display:"flex",justifyContent:"flex-start"}} type={type}/>
            break;
        default:
            columns=[]
            addButton=<Button danger>出错</Button>
    }
    return (
        <>
            {addButton}
            <Table columns={columns} dataSource={reports} pagination={false} rowKey={"id"}/>
        </>
    )
}

ReportList.propTypes={
    reports:PropTypes.array.isRequired,
    type:PropTypes.string.isRequired,
}