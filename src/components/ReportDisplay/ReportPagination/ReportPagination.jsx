import {Pagination} from 'antd'
import PropTypes from 'prop-types'


const ReportPagination=(props)=> {
    const total = props.total
    const changePage = props.changePage
    function onChange(page,pageSize){
        changePage(page,pageSize);
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
                defaultCurrent={1}
            />
        </>
    )
}
ReportPagination.propTypes={
    total:PropTypes.number.isRequired,
    changePage:PropTypes.func.isRequired
}
export default ReportPagination