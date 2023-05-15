import {Layout,Button} from 'antd'
import {DatePicker,Form} from 'antd'
import {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {get} from  '../../utils/request.js'
import styles from './reportDisplay.module.scss'
const {Header,Footer,Content} = Layout
const {RangePicker} = DatePicker
const rangeConfig = {
    rules: [
        {
            type: 'array',
            required: true,
            message: 'Please select time!',
        },
    ],
};
//测试数据
const reports = [
    {
        id:'1',
        date:"11111111",
        completed:"xxxxxxxxxxx",
        risky:"xxxxxxxxxxxxxxx",
        isDealy:true,
    },
    {
        id:'2',
        date:"22222222",
        completed:"xxxxxxxxxxx",
        risky:"xxxxxxxxxxxxxxx",
        isDealy:true,
    },
    {
        id:'3',
        date:"33333333",
        completed:"xxxxxxxxxxx",
        risky:"xxxxxxxxxxxxxxx",
        isDealy:true,
    },
]
const ReportDisplay= (props)=>{
    const [type] = useState(props.type)
    // const [url] = useState(props.url)
    // const [reports,setReports] = useState([])
    useEffect( ()=>{
        //todo 默认参数（页码,日期）
        // async function getReports(){
        //
        // }
        // setReports(getReports())
    },[])

    const [startDate,setStartDate]=useState("")
    const [endDate,setEndDate] = useState("")

    return (
        <>
            <Header className={styles.headerStyle}>
                <Form.Item name="date-range-picker" label="日期范围" {...rangeConfig}>
                    <RangePicker />
                </Form.Item>
                <Form>
                    <Button type="primary" htmlType="submit">登录</Button>
                </Form>
            </Header>
            <Content className={styles.contentStyle}></Content>
            <Footer className={styles.footerStyle}></Footer>
        </>
    )
}
// ReportDisplay.propTypes={
//     type:PropTypes.string.isRequired,
//     url:PropTypes.string.isRequired,
// }
export default ReportDisplay
