import { Button, Modal } from 'antd';
import { useState } from 'react';
import PropTypes from 'prop-types'
import {ReportModalContent} from './ReportModalContent/ReportModalContent'

export const ReportDetails = (props) => {
    const [open, setOpen] = useState(false);
    const report = props.report
    const type = props.type || 'daily'
    let modalButton;
    let modalContent;

    function onOk(){
        setOpen(false)
    }
    function onCancel(){
        setOpen(false)
    }
    if (report){
        modalButton=<Button type={"link"} key={report.reportId} onClick={()=>{setOpen(true)}}>详情</Button>
        modalContent=<Modal
            title="查看或修改"
            centered
            open={open}
            onOk={onOk}
            onCancel={onCancel}
            width={1000}
            footer={null}
        >
            <ReportModalContent report={report} type={type} onOk={onOk} onCancel={onCancel}></ReportModalContent>
        </Modal>
    }else {
        modalButton=<Button type={"primary"} style={{display:"flex",justifyContent:'flex-start'}} onClick={()=>{setOpen(true)}}>新增{type==="daily"?"日报":"周报"}</Button>
        modalContent=<Modal
            title={`新增${type==="daily"?"日报":"周报"}`}
            centered
            open={open}
            onOk={onOk}
            onCancel={() => setOpen(false)}
            width={1000}
            footer={null}
        >
            <ReportModalContent type={type} onOk={onOk} onCancel={onCancel}></ReportModalContent>
        </Modal>
    }
    return (
        <>
            {modalButton}
            {modalContent}
        </>
    )
}
ReportDetails.propTypes={
    report:PropTypes.object,
    type:PropTypes.string
}