import React, { Component } from 'react'

export default class Register extends Component {
    send() {
        this.$http.get("/captcha/sent?phone=" + this.phone.value).then(res => {
            console.log(res)
        })
    }
    // 15115322217
    register() {
        this.$http.get(`/captcha/verify?phone=${this.phone.value}&captcha=${this.code.value}`).then(res => {
            console.log(res)
            if (res.data.code == 200) {
                // 说明验证码是正确的，调用注册接口
                console.log({
                    phone: this.phone.value,
                    nickname: this.nickname.value,
                    password: this.password.value,
                    captcha: this.code.value
                })
                this.$http.get(`/register/cellphone`, {
                    params: {
                        phone: this.phone.value,
                        nickname: this.nickname.value,
                        password: this.password.value,
                        captcha: this.code.value
                    }
                }).then(res => {
                    console.log(res)
                })
            }
        }).catch(err => {
            console.log(err)
            alert("验证码错误")
        })
    }
    render() {
        return (
            <div>
                <input type="text" ref={el => this.phone = el}/>
                <br/>
                <input type="text" ref={el => this.nickname = el}/>
                <br/>
                <input type="text" ref={el => this.password = el}/>
                <br/>
                <input type="text" ref={el => this.code = el}/>
                <button onClick={this.send.bind(this)}>发送验证码</button>
                <br/>
                <button onClick={this.register.bind(this)}>注册</button>
            </div>
        )
    }
}
