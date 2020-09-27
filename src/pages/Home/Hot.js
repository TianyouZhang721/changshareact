import React, { Component } from 'react'
import qs from 'querystring' // qs.parse() 
export default class Hot extends Component {
    componentDidMount() {
        // let str = this.props.location.search.slice(1); // id=1&name=zhang => {id: 1, name: zhang}
        // let obj = qs.parse(str)
        // console.log(obj)
        // console.log(this.props.match.params.xxx)
        console.log(this.props.location.state.id)
    }
    render() {
        return (
            <div>
                热歌
            </div>
        )
    }
}
