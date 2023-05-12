import {Component} from 'react'
import { Menu } from 'antd';

export class TopNavi extends Component {
    state={
        items:[]
    }
    static getDerivedStateFromProps(props){
        console.log(props)
        return props
    }
    render() {
        const {current,items} = this.state
        return (
            <>
                <Menu onClick={this.onClick.bind(this)} selectedKeys={[current]} mode="horizontal" items={items} />;
            </>
        )
    }
    onClick(e){
        console.log('TopNavi', e);
        this.setState({
            current: e.key
        })
        //todo 路由逻辑
    }
}