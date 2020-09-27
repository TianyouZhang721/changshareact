import React, { Component } from 'react'
import Test from '../../components/Test'
export default class Recommend extends Component {
    login() {
        if (this.uname.value == "admin" && this.upwd.value == "123") {
            // 跳到热歌
            console.log(this)
            // 查询字符串
            // this.props.history.push("/home/hot?id=1&name=zhang")
            // 动态路由
            // this.props.history.push("/home/hot/1")
            // state
            this.props.history.push({
                pathname: "/home/hot",
                state: {
                    id: 1
                }
            })
            // this.props.history.push("/home/hot")
        }
    }
    render() {
        return (
            <div>
                <input type="text" ref={uname => this.uname = uname}/>
                <br/>
                <input type="text" ref={upwd => this.upwd = upwd}/>
                <br/>
                <button onClick={this.login.bind(this)}>登录</button>
                <Test a="1"/>
            </div>
        )
    }
}
