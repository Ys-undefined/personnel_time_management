import {Pagination} from 'antd'
import PropTypes from 'prop-types'
import {useState} from 'react'


const ReportPagination=(props)=> {
    const total = props.total
    const changePage = props.changePage
    const [current,setCurrent] = useState(1)
    function onChange(page){
        setCurrent(page)
        changePage(page);
    }
    return (
        <>
            <Pagination
                total={total}
                showSizeChanger={false}
                showQuickJumper
                showTotal={(total) => `共 ${total} 条记录`}
                hideOnSinglePage={true}
                onChange={onChange}
                current={current}
            />
        </>
    )
}
ReportPagination.propTypes={
    total:PropTypes.number.isRequired,
    changePage:PropTypes.func.isRequired
}
export default ReportPagination