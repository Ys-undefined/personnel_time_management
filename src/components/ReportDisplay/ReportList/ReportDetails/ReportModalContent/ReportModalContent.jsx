import PropTypes from 'prop-types'
import {useState} from 'react'
import {Button, DatePicker, Form, Input, Radio, Space} from 'antd'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import {post} from '../../../../../utils/request.js'
import PubSub from 'pubsub-js'

dayjs.extend(isSameOrAfter)
const {RangePicker}=DatePicker
const config = {
    rules: [
        {
            type: 'object',
            required: true,
            message: "选择日期",
        },
    ],
};
const rangeConfig = {
    rules: [
        {
            type: 'array',
            required: false,
            message: "选择日期",
        },
    ],
};
export const ReportModalContent = (props) => {
    const type = props.type || 'daily'
    const [report]=useState(props.report)
    let datePicker;
    let content;
    let isBalance;
    let riskInfo;
    let nextWeekPlan;
    const initDate={
        reportTime:report ? dayjs(report.reportTime):null,
        startTime:report ? dayjs(report.startTime):null,
        endTime: report ? dayjs(report.endTime):null,
    }
    const initContent = report?report.content:null
    const initIsBalance=report?report.isBalance?"yes":"no":null
    const initRiskInfo = report?report.riskInfo:null
    const initNextWeekPlan=report?report.nextWeekPlan:null
    let getDateValue;
    const [dates,setDates] = useState([null,null])
    const [value,setValue] = useState(null)
    const getThisWeekMondayOrFriDay = (isMonday)=>{
        const today = dayjs()
        const day = today.day();
        if (isMonday){
            return today.subtract(day - 1, "day")
        }else {
            return today.subtract(day - 5, "day")
        }
    }
    const rangePresets = [
        {
            label:"本周",
            value:[getThisWeekMondayOrFriDay(true),getThisWeekMondayOrFriDay(false)]
        },
    ]
    const disableDate = (current)=>{
        const today = dayjs();
        const dayOfWeek = current.day();
        if (dates){
            const currentSelected = dates[0];
            return !!(currentSelected && !current.isSame(currentSelected.add(4, 'day'), 'day'));
        }
        if (current.isSameOrAfter(today)){
            return true
        }
        if (dayOfWeek!==1 && dayOfWeek !==5){
            return true
        }
    }
    const onOpenChange =(open)=>{
        if (open){
            setDates(null)
        }else {
            setDates([null,null])
        }
    }

    switch (type){
        case "daily":
            datePicker = <Form.Item name={"time"} label="日报时间" {...config} initialValue={initDate.reportTime}>
                             <DatePicker
                                 disabled={!!report}
                                 disabledDate={(current)=>current && current > dayjs().endOf('day')}
                             />
                         </Form.Item>
            getDateValue=(dateValue)=>{
                return dayjs(dateValue).format("YYYY-MM-DD")
            }
             break;
        case "weekly":
            datePicker = <Form.Item name={"time"} rules={[{required:true,message:"必填"}]} label="周报时间" {...rangeConfig} initialValue={[initDate.startTime,initDate.endTime]}>
                            <RangePicker
                                disabled={!!report}
                                disabledDate={disableDate}
                                onOpenChange={onOpenChange}
                                value={dates||value}
                                presets={rangePresets}
                                onCalendarChange={(val)=>{
                                    setDates(val)
                                }}
                                onChange={(val)=>{
                                    setValue(val)
                                }}
                                changeOnBlur
                            />
                         </Form.Item>
            nextWeekPlan= <Form.Item name={"nextWeekPlan"} rules={[{required:true,message:"必填"}]} label="下周计划内容" initialValue={initNextWeekPlan} >
                             <Input.TextArea autoSize={{minRows:5,maxRows:10}}/>
                          </Form.Item>;
            getDateValue=(dateValue)=>{
                return [dayjs(dateValue[0]).format("YYYY-MM-DD"),dayjs(dateValue[1]).format("YYYY-MM-DD")]
            }
            break;
    }
    content = <Form.Item name={"content"} rules={[{required:true,message:"必填"}]} label="完成内容描述" initialValue={initContent} >
                 <Input.TextArea autoSize={{minRows:5,maxRows:10}}/>
              </Form.Item>;
    isBalance = <Form.Item label="是否有延迟" name={"isBalance"} initialValue={initIsBalance}>
                    <Radio.Group>
                        <Radio value="yes"> 是 </Radio>
                        <Radio value="no"> 否 </Radio>
                    </Radio.Group>
                </Form.Item>
    riskInfo =  <Form.Item rules={[{required:true,message:"必填"}]} name={"riskInfo"} label="风险内容描述" initialValue={initRiskInfo} >
                    <Input.TextArea autoSize={{minRows:3,maxRows:6}}/>
                </Form.Item>;

    const api={
        addOrModifyWeekly:"/api/weeklyReport/addWeeklyReport",
        addOrModifyDaily:"/api/dailyReport/addDailyReport"
    }
    const addOrModifyReport=async (type,data)=>{
        let res;
        if (type==='daily'){
            res= await post(api.addOrModifyDaily,data,true)
        }else {
            res= await post(api.addOrModifyWeekly,data,true)
        }
        return res;
    }
    async function onFinish(allValues){
        const dateValue = allValues["time"]
        const values={
            ...allValues,
            'time':getDateValue(dateValue)
        }
        const mergeReport={...report}
        if (type==="weekly"){
            values["startTime"]=values.time[0]
            values["endTime"]=values.time[1]
        }
        for (let key in values){
            let newKey
            if (type==="daily"){
                newKey = key === "time" ? "reportTime" : key
            }else {
                if (key==="time") continue
                newKey =key
            }
            mergeReport[newKey]=values[key]
        }
        for (let key in mergeReport){
            if (key==="isBalance"){
                mergeReport[key]=mergeReport[key] === "yes"
            }
        }
        delete mergeReport.submit
        delete mergeReport.userId
        mergeReport.isBalance=mergeReport.isBalance?"1":"0"
        const res = addOrModifyReport(type,mergeReport)
        if (res){
            PubSub.publish("update_report")
        }
        props.onOk()
    }
    return (
        <>
            <Form
                layout={"horizontal"}
                labelCol={{span: 4}}
                wrapperCol={{span:14}}
                onFinish={onFinish}

            >
                {datePicker}
                {content}
                {isBalance}
                {riskInfo}
                {nextWeekPlan}
                <Form.Item name="submit" wrapperCol={{ span: 12, offset: 6 }}>
                    <Space>
                        <Button type="primary" htmlType="submit">提交</Button>
                        <Button type="dashed" onClick={props.onCancel}>关闭</Button>
                    </Space>
                </Form.Item>
            </Form>
        </>
    )
}

ReportModalContent.propTypes={
    report:PropTypes.object,
    type:PropTypes.string.isRequired,
    onOk:PropTypes.func,
    onCancel:PropTypes.func
}