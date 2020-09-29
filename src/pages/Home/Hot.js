import React, { Component } from 'react'
import SongList from '../../components/SongList'
import './Hot.css'
import BScroll from 'better-scroll'
export default class Hot extends Component {
    constructor() {
        super()
        this.state = {
            hotList: [],
            pullUp: true,
            end: 50
        }
    }
    componentDidMount() {
        this.$http.get("/top/list?idx=1").then(res => {
            console.log(res)
            this.setState({
                hotList: res.data.playlist.tracks
            }, () => {
                // 保证了数据有了
                let bs = new BScroll(".hot", {
                    probeType: 2
                })
                // 实例身上有两个事件，其中一个就是scroll, 另一个叫做 scrollEnd
                bs.on("scroll", () => {
                    // 实例身上还有两个属性，其中一个就是 y ,另外一个叫做 maxScrollY
                    // 当下面的上拉加载完全漏出来，则将文字替换成释放加载
                    if (bs.y < bs.maxScrollY - 60) {
                        console.log("上拉加载完全漏出来了")
                        this.setState({
                            pullUp: false
                        })
                    }
                })
                bs.on("scrollEnd", () => {
                    if (!this.state.pullUp) {
                        this.setState({
                            end: this.state.end + 50
                        }, () => {
                            bs.refresh()
                            this.setState({
                                pullUp: true
                            })
                        })
                    }
                })
            })
            

        })
    }
    render() {
        // betterscroll用法
        /**
         * 1. 下载
         * 2. 引入  BScroll 的构造函数
         * 3. 实例  new BScroll("父元素", {})
         * 
         * 使用better-scroll需要满足以下3个条件
         * 1. html的结构必须为父元素嵌套一个子元素，且只有一个子元素
         * 2. 父元素的高度必须小于子元素的高度
         * 3. 父元素添加overflow：hidden
         */
        let {hotList, pullUp, end} = this.state
        return (
            <div className="hot">
                <SongList newList={hotList} flag={true} pullUp={pullUp} end={end} />
            </div>
        )
    }
}
