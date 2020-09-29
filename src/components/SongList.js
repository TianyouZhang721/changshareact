import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
class SongList extends Component {
    goPlay(id) {
        this.props.history.push("/play?id=" + id)
    }
    render () {
        let { newList, flag, pullUp, end } = this.props
        let a = true
        if (end >= newList.length) {
            a = false
        }
        newList = newList.length > 50 ? newList.slice(0, end) : newList
        return (
            <ul className="n-m">
                {
                    newList.map((item, index) => {
                        return (
                            <li key={item.id} onClick={this.goPlay.bind(this, item.id)}>
                                { flag && <p style={ {color: index < 3 ? 'red' : '#000'} } className="order">{index + 1}</p> }
                                <div className="sing-box">
                                    <p>{item.name}</p>
                                    <p className="singername">
                                        {/* <span>{item.song.artists[0].name}</span> */}
                                        { 
                                            item.song ? <span>{item.song.artists[0].name}</span> : 
                                            <span>{
                                                item.ar.map(item => {
                                                    return item.name
                                                }).join(" / ")
                                            }</span>
                                        }
                                        -
                                        <span>{item.name}</span>
                                    </p>
                                </div>
                                <i className="iconfont icon-bofang"></i>
                            </li>
                        )
                    })
                }
                {
                    a ? <p className="pullup">{pullUp ? "上拉加载" : "释放加载"}</p> : <p className="pullup">没数据了</p>
                }
            </ul>
        )
    }
}
export default withRouter(SongList)
