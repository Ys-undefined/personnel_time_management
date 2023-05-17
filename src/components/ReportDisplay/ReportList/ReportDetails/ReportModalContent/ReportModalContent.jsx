import PropTypes from 'prop-types'
import {useState} from 'react'
import {Form, DatePicker, Input, Radio, Button,Space} from 'antd'
import dayjs from 'dayjs'
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
    switch (type){
        case "daily":
            datePicker = <Form.Item name={"time"} label="日报时间" {...config} initialValue={initDate.reportTime}>
                             <DatePicker disabled={!!report} disabledDate={(current)=>current && current > dayjs().endOf('day')}/>
                         </Form.Item>
            getDateValue=(dateValue)=>{
                return dayjs(dateValue).format("YYYY-MM-DD")
            }
             break;
        case "weekly":
            datePicker = <Form.Item name={"time"} label="周报时间" {...rangeConfig} initialValue={[initDate.startTime,initDate.endTime]}>
                            <RangePicker
                                disabled={!!report}
                                disabledDate={(current)=>current && current > dayjs().endOf('day')}
                            />
                         </Form.Item>
            nextWeekPlan= <Form.Item name={"nextWeekPlan"} label="下周计划内容" initialValue={initNextWeekPlan} >
                             <Input.TextArea autoSize={{minRows:5,maxRows:10}}/>
                          </Form.Item>;
            getDateValue=(dateValue)=>{
                return [dayjs(dateValue[0]).format("YYYY-MM-DD"),dayjs(dateValue[1]).format("YYYY-MM-DD")]
            }
            break;
    }
    content = <Form.Item name={"content"} label="完成内容描述" initialValue={initContent} >
                 <Input.TextArea autoSize={{minRows:5,maxRows:10}}/>
              </Form.Item>;
    isBalance = <Form.Item label="是否有延迟" name={"isBalance"} initialValue={initIsBalance}>
                    <Radio.Group>
                        <Radio value="yes"> 是 </Radio>
                        <Radio value="no"> 否 </Radio>
                    </Radio.Group>
                </Form.Item>
    riskInfo =  <Form.Item name={"riskInfo"} label="风险内容描述" initialValue={initRiskInfo} >
                    <Input.TextArea autoSize={{minRows:3,maxRows:6}}/>
                </Form.Item>;

    function onFinish(allValues){
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
        // todo 发送请求更新|新增请求
        // todo 请求成功更新ReportDisplay 使用PubSub,根据report是否有值添加一个字段表示新增和修改
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