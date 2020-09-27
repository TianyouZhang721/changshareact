import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './base.css'
import axios from 'axios'
import  { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Home from './pages/Home/Home'
import Play from './pages/Play/Play';
Component.prototype.$http = axios

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/home" component={Home} />
            <Route path="/play" component={Play} />
            <Redirect path="/" to="/home" />
        </Switch>
    </BrowserRouter>
  ,
  document.getElementById('root')
);

