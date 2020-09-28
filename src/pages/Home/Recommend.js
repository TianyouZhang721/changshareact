import React, { Component } from 'react'
export default class Recommend extends Component {
    constructor() {
        super()
        this.state = {
            recommendList: []
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
    }

    render() {
        let { recommendList } = this.state
        return (
            <div className="recommend">
                <div className="recommend-music">
                    <p>推荐音乐</p>
                    <ul>
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
            </div>
        )
    }
}
