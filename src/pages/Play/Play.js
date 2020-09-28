import React, { Component } from 'react'
import './play.css'
import qs from 'querystring'
export default class Play extends Component {
    constructor() { //1
        super()
        this.state = {
            lyric: "",
            url: "",
            picUrl: "",
            songName: "",
            singerName: "",
            bgStyle: {},
            flag: true,
            timeArr: [],
            lrcArr: [],
            mt: 0,
            i: 0
        }
        this.getLyric = this.getLyric.bind(this)
        this.getUrl = this.getUrl.bind(this)
        this.getDetail = this.getDetail.bind(this)
    }
    // 调用接口 生命周期
    componentDidMount() { // 4
        // 获取id参数
        let obj = qs.parse(this.props.location.search.slice(1)) // {id: 1}
        this.$http.all([this.getLyric(obj.id), this.getUrl(obj.id), this.getDetail(obj.id)]).then(
            this.$http.spread((res1, res2, res3) => {
                this.setState({
                    lyric: res1.data.lrc.lyric,
                    url: res2.data.data[0].url,
                    picUrl: res3.data.songs[0].al.picUrl,
                    songName: res3.data.songs[0].al.name,
                    singerName: res3.data.songs[0].ar[0].name,
                    bgStyle: {
                        background: `url(${res3.data.songs[0].al.picUrl}) no-repeat center center`,
                        filter: "blur(10px)"
                    }
                },() => {
                    // console.log(this.state.lyric)
                    // 根据歌词格式，拆成一个纯歌词数组，和时间数组
                    // 按照换行进行字符串切割
                    let lyricArr = this.state.lyric.split(/\n/)
                    console.log(lyricArr)
                    let timeArr = [] // 时间数组
                    let lrcArr = [] // 歌词数组
                    lyricArr.forEach((item) => {
                        if (item.split("]")[1]) {
                            timeArr.push(item.slice(1, 10))
                            lrcArr.push(item.split("]")[1].trim())
                        }
                        
                    })
                    console.log(lrcArr)
                    timeArr = timeArr.map(item => {
                        // 01:05.345 => 65
                        return item.split(":")[0] * 60 + parseFloat(item.split(":")[1])
                    })
                    console.log(timeArr)
                    this.setState({
                        timeArr,
                        lrcArr
                    })
                })
            })
        )
    }
    getLyric(id) {
        return this.$http.get("/lyric?id=" + id)
    }
    getUrl(id) {
        return this.$http.get("/song/url?id=" + id)
    }
    getDetail(id) {
        return this.$http.get("/song/detail?ids=" + id)
    }
    play() {
        if (this.audio.paused) {
            this.audio.play()
            this.setState({
                flag: false
            })
        } else {
            this.audio.pause()
            this.setState({
                flag: true
            })
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.i == nextState.i && this.state.i != 0) {
            return false
        } else {
            return true
        }
    }
    timeUpdate() {
        // console.log(this.audio.currentTime)
        // 让歌词滚动起来
        // 具体哪句歌词可以显示出来？
        // 用当前音乐的播放时间，去时间数组内进行判断
        let i = this.state.timeArr.findIndex(item => {
            return item > this.audio.currentTime
        }) - 1
        console.log(i)
        if (i == -1) {
            i = 0
        }
        // 算一下i之前的所有li的高度之和
        // console.log(document.querySelectorAll("li"))
        var height = 0;
        [...document.querySelectorAll("li")].forEach((item, index) => {
            if (i > index) {
                height += item.clientHeight
            }
        })
        this.setState({
            i: i,
            mt: -height + 'px'
        })

    }
    
    render() { //3
        console.log("render")
        let { bgStyle, picUrl, url, flag, lrcArr, mt, i} = this.state
        return (
            <div className="play">
                <div className="bg" style={ bgStyle }></div>
                <div className="bgColor"></div>

                <div className={flag ? "circle-box pause" : "circle-box"}>
                    <div className="img-box">
                        <img src={ picUrl } alt=""/>

                    </div>
                    
                    <span onClick={this.play.bind(this)} style={ { opacity: flag ? 1 : 0 } }>播放</span>
                    
                </div>
                <div className="lyric-box">
                    <ul style={ { marginTop: mt } }>
                        {
                            lrcArr.map((item, index) => {
                                return <li className={i == index ? 'active' : ''} key={index}>{ item }</li>
                            })
                        }
                    </ul>
                </div>
                <audio ref={(audio) => this.audio = audio} src={ url } onTimeUpdate={this.timeUpdate.bind(this)}></audio>
            </div>
        )
    }
}
