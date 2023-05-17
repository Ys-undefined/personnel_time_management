import { Button, Modal } from 'antd';
import { useState } from 'react';
import PropTypes from 'prop-types'

export const ReportDetails = (props) => {
    const [open, setOpen] = useState(false);
    const report = props.report
    return (
        <>
            <Button type="link" onClick={() => setOpen(true)}>
                详情
            </Button>
            <Modal
                title={report.date}
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
            >
                {
                    Object.keys(report).map((key,index)=>{
                        if (key==="key"||key==="date"){
                            return
                        }
                        if (key==="isDelay"){
                            return <p key={index}><label>{key}:</label>{report[key]?"是":"否"}</p>
                        }
                        return <p key={index}><label>{key}:</label>{report[key]}</p>
                    })
                }
            </Modal>
        </>
    )
}
ReportDetails.propTypes={
    report:PropTypes.object.isRequired
}