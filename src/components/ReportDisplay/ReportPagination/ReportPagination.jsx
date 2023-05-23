import {Pagination} from 'antd'
import PropTypes from 'prop-types'
import {useEffect, useState} from 'react'


const ReportPagination=(props)=> {
    const total = props.total
    const changePage = props.changePage
    const getPage = props.getPage
    const [current,setCurrent] = useState(props.curPage)
    useEffect(()=>{
        setCurrent(props.curPage)
    },[props.curPage])
    function onChange(page){
        setCurrent(page)
        changePage(page);
        getPage(page)
    }
    return (
        <>
            <Pagination
                total={total}
                showSizeChanger={false}
                showQuickJumper
                showTotal={(total) => `共 ${total} 条记录`}
                hideOnSinglePage={true}
                pageSize={8}
                onChange={onChange}
                current={current}
            />
        </>
    )
}
ReportPagination.propTypes={
    total:PropTypes.number.isRequired,
    changePage:PropTypes.func.isRequired,
    getPage:PropTypes.func.isRequired,
    curPage:PropTypes.number.isRequired
}
export default ReportPagination