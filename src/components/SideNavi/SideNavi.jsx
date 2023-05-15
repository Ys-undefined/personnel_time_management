import { Menu } from 'antd';
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types'
import {useNavigate} from 'react-router-dom'
//todo 做更详细的类型限定+使用下面的方法
// function getItem(label, key, icon, children, type) {
//     return {key, icon, children, label, type,};
// }
const SideNavi = (props) => {
    const [items] = useState(props.items)
    const [naviUrl] = useState(props.naviUrl)
    const [current,setCurrent] = useState(items[0].key)
    const navigate = useNavigate()
    const [defaultDisplayKey] = useState(props.defaultDisplayKey)
    useEffect(()=>{
        navigate(handleNaviUrl(naviUrl)+defaultDisplayKey)
    },[])
    function handleNaviUrl(url){
        const array = url.split('/')
        if (array.length>=4){
            array.pop()
        }
        return array.join('/')
    }
    function onClick(item){
        const {key} = item
        const dest = handleNaviUrl(naviUrl)
        navigate(dest+key)
        setCurrent(key)
    }
    return (
        <Menu
           // theme={"dark"}
           
            mode="inline"
            items={items}
            onClick={onClick}
            selectedKeys={[current]}
            defaultSelectedKeys={[items[0].key]}
        />
    );
};
SideNavi.propTypes={
    items:PropTypes.array.isRequired,
    naviUrl:PropTypes.string.isRequired,
    defaultDisplayKey:PropTypes.string.isRequired
}
export default SideNavi