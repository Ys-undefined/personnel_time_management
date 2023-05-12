import { Menu } from 'antd';
import { useState } from 'react';
import PropTypes from 'prop-types'
import {useNavigate} from 'react-router-dom'

//todo 做更详细的类型限定 使用下面的方法
// function getItem(label, key, icon, children, type) {
//     return {key, icon, children, label, type,};
// }
const SideNavi = (props) => {
    const [items] = useState(props.items)
    const [naviUrl] = useState(props.naviUrl)
    const navigate = useNavigate()

    function onClick(item){
        const {key} = item
        const array = naviUrl.split('/')
        if (array.length>=4){
            array.pop()
        }
        const dest = array.join('/')
        navigate(dest+key)
    }
    return (
        <Menu
            mode="inline"
            style={{
                width: 256,
            }}
            items={items}
            onClick={onClick}
        />
    );
};
SideNavi.propTypes={
    items:PropTypes.array.isRequired,
    naviUrl:PropTypes.string.isRequired
}
export default SideNavi