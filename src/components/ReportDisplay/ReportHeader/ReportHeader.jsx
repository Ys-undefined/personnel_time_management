import {Button, DatePicker, Form} from 'antd'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'

const {RangePicker} = DatePicker

const disableDate=(current)=> {
    return current && current > dayjs().endOf('day')
}

const ReportHeader=(props)=>{
    const filterReportByDate = props.filterReportByDate
    const [form] = Form.useForm()
    function resetDate(){
        // dateFormRef.current.setFieldValue("date-range-picker",[])
        // dateFormRef.current.resetFields()
        form.resetFields()
        //todo 发送默认请求
    }
    function onFinish(fieldsValue){
        const rangeValue = fieldsValue['date-range-picker']
        const values ={
            ...fieldsValue,
            'date-range-picker':[rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')]
        }
        filterReportByDate(values['date-range-picker'][0],values['date-range-picker'][1])
    }
    return (
        <>
            <Form
                name="date_range_picker_form"
                onFinish={onFinish}
                layout={"inline"}
                form={form}
            >
                <Form.Item name="date-range-picker" label="日期范围" >
                    <RangePicker disabledDate={disableDate}/>
                </Form.Item>
                <Form.Item name="submit">
                    <Button type="primary" htmlType="submit">查询</Button>
                </Form.Item>
                <Form.Item name="reset">
                    <Button type="dashed" onClick={resetDate}>重置</Button>
                </Form.Item>
            </Form>
        </>
    )
}

ReportHeader.propTypes={
    filterReportByDate:PropTypes.func.isRequired
}

export default ReportHeader