import React, { Component } from 'react'
import SongList from '../../components/SongList'
export default class Hot extends Component {
    constructor() {
        super()
        this.state = {
            hotList: []
        }
    }
    componentDidMount() {
        this.$http.get("/top/list?idx=1").then(res => {
            console.log(res)
            this.setState({
                hotList: res.data.playlist.tracks
            })
        })
    }
    render() {
        let {hotList} = this.state
        return (
            <div className="hot">
                <SongList newList={hotList} flag={true} />
            </div>
        )
    }
}
