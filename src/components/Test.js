import React, { Component } from 'react'
import {withRouter}  from "react-router-dom"
class Test extends Component {
    render() {
        console.log(this)
        return (
            <div>
                测试
            </div>
        )
    }
}
export default withRouter(Test)
