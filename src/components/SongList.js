import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
class SongList extends Component {
    goPlay(id) {
        this.props.history.push("/play?id=" + id)
    }
    render () {
        let { newList } = this.props
        return (
            <ul className="n-m">
                {
                    newList.map(item => {
                        return (
                            <li key={item.id} onClick={this.goPlay.bind(this, item.id)}>
                                <div className="sing-box">
                                    <p>{item.name}</p>
                                    <p className="singername">
                                        <span>{item.song.artists[0].name}</span>
                                        -
                                        <span>{item.name}</span>
                                    </p>
                                </div>
                                <i className="iconfont icon-bofang"></i>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}
export default withRouter(SongList)
