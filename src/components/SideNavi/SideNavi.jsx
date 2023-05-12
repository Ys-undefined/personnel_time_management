import {Component} from 'react'
import { Menu } from 'antd';

export class SideNavi extends Component {
    state={
        openKeys:"",
        rootSubmenuKeys:[],
        items:[]
    }
    render() {
        const {openKeys,items} = this.state
        return (
            <>
                <Menu
                    mode="inline"
                    openKeys={openKeys}
                    onOpenChange={this.onOpenChange.bind(this)}
                    style={{
                        width: 256,
                    }}
                    items={items}
                />
            </>
        )
    }
    onOpenChange(keys){
        const {openKeys,rootSubmenuKeys} = this.state
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({
                openKeys: keys
            })
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : []
            })
        }
    }
}