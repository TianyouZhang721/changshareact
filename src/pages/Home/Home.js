import React, { Component } from 'react'
import "./Home.css"
import { NavLink, Switch, Route, Redirect, Link } from 'react-router-dom'
import Recommend from './Recommend'
import Hot from './Hot'
import Search from './Search'
export default class Home extends Component {
    render() {
        return (
            <div className="home">
                <header>
                    <NavLink to="/home/recommend">推荐</NavLink>
                    <NavLink to="/home/hot">热歌</NavLink>
                    <NavLink to="/home/search">搜索</NavLink>
                </header>
                <main>
                    <Switch>
                        <Route path="/home/recommend" component={Recommend} />
                        <Route path="/home/hot" component={Hot} />
                        <Route path="/home/search" component={Search} />
                        <Redirect path="/home" to="/home/recommend" />
                    </Switch>
                </main>
            </div>
        )
    }
}
