import React, { Component } from 'react'
import SongList from '../../components/SongList'
export default class Recommend extends Component {
    constructor() {
        super()
        this.state = {
            recommendList: [],
            newList: []
        }
    }
    componentDidMount() {
        // 调用推荐音乐接口
        this.$http.get("/personalized?limit=6").then(res => {
            console.log(res)
            this.setState({
                recommendList: res.data.result
            })
        })

        this.$http.get('/personalized/newsong').then(res => {
            console.log(res)
            this.setState({
                newList: res.data.result
            })
        })
    }

    render() {
        let { recommendList, newList } = this.state
        return (
            <div className="recommend">
                <div className="recommend-music">
                    <p>推荐音乐</p>
                    <ul className="r-m">
                        {
                            recommendList.map((item, index) => {
                                return (
                                    <li key={item.id}>
                                        <div className="img-box">
                                            <img src={item.picUrl} alt=""/>
                                        </div>
                                        <p>{item.name}</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>

                {/* 最新音乐 */}
                <div className="new-music">
                    <p>最新音乐</p>
                    <SongList newList={newList} />
                </div>
            </div>
        )
    }
}
