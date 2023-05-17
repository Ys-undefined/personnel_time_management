import PropTypes from 'prop-types'
import {Button,Table,Tag,Space} from 'antd'
import {ReportDetails} from './ReportDetails/ReportDetails'

const columns = [
    {
        title: '日期',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: '完成工作内容',
        dataIndex: 'completed',
        key: 'completed',
        ellipsis:true
    },
    {
        title: '有风险内容',
        dataIndex: 'risky',
        key: 'risky',
        ellipsis:true
    },
    {
        title: '是否有延迟',
        dataIndex: 'isDelay',
        key: 'isDelay',
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
                <ReportDetails report={report}/>
            </Space>
        )
    },
]
export const ReportList = (props) => {
    const reports=props.reports
    const type= props.type || "daily"
    let addButton;
    if (type==='daily'){
        addButton=<Button type={"primary"}>新增日报</Button>
    }else {
        addButton=<Button type={"primary"}>新增周报</Button>
    }
    return (
        <>
            {addButton}
            <Table columns={columns} dataSource={reports} pagination={false}/>
        </>
    )
}

ReportList.propTypes={
    reports:PropTypes.array.isRequired,
    type:PropTypes.string.isRequired,
}