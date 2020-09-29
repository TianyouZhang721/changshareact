import React, { Component } from 'react'
import "./Search.css"
import SongList from '../../components/SongList'
export default class Search extends Component {
    constructor() {
        super()
        this.state = {
            hotSearch: [],
            searchVal: "",
            searchList: [],
            historyList: JSON.parse(localStorage.getItem("history")) || [],
            isShow: true
        }
    }
    componentDidMount () {
        this.$http.get("/search/hot").then(res => {
            console.log(res)
            this.setState({
                hotSearch: res.data.result.hots
            })
        })
    }
    search () {
        // 1. 调用搜索的接口
        this.$http.get("/search?keywords=" + this.state.searchVal).then(res => {
            console.log(res)
            this.setState({
                searchList: res.data.result.songs,
                isShow: false
            })
        })
        // 2. 将搜索的内容存入本地存储,用一个数组来承载所有的搜索记录
        let { historyList } = this.state
        historyList.unshift(this.state.searchVal)
        this.setState({
            historyList
        })
        localStorage.setItem("history", JSON.stringify(historyList))

    }
    change (e) {
        if (e.target.value == "") {
            this.setState({
                isShow: true
            })
        }
        this.setState({
            searchVal: e.target.value
        })
    }
    hot(str) {
        // 1. 点谁就设置到输入框内
        this.setState({
            searchVal: str
        }, () => {
            this.search()
        })
        // 2. 调用搜索
    }
    render () {
        let { hotSearch, searchVal, historyList, searchList, isShow } = this.state
        return (
            <div className="search">
                <div className="search-box">
                    <input type="text" value={searchVal} onChange={this.change.bind(this)} />
                    <button onClick={this.search.bind(this)}>搜索</button>
                </div>
                {
                    isShow ? (
                        <div>
                            <div className="hot-search">
                                <p>热门搜索</p>
                                <ul>
                                    {
                                        hotSearch.map((item, index) => {
                                            return <li onClick={this.hot.bind(this, item.first)} key={index}>{item.first}</li>
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="search-history">
                                <ul>
                                    {
                                        historyList.map((item, index) => {
                                            return <li key={index}>{item}</li>
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    ) : (
                            <div className="search-list">
                                <SongList newList={searchList} flag={false} />
                            </div>
                        )
                }


            </div>
        )
    }
}
