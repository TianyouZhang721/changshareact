/**
 * 重写get 和 post
 * 因为基础用法的get和post无法携带请求头，也就无法传递token
 */

 import axios from 'axios'


//  let instance = axios.create({
//      baseURL: "/",
//      timeout: 6000
//  })

//  // 请求拦截，所有的http请求都会被拦截下来
//  instance.interceptors.request.use((config) => {
//     // config 关于请求的所有信息
//     console.log(config)
//     // 
//     config.headers.authorization = store.state.user.token
//     return config
//  })


// //  // 相应拦截
//  instance.interceptors.response.use((res) => {
//     console.log(res)
//     if (res.data.code == 403) {
//         // 跳到登录页
//         router.push("/login")
//     }
//     return res
//  })


 // {id: 1}
 function get(url, params) {
    return axios.get(url, {
        params
    })
 }

 function post(url, params) {
     return axios.post(url, params)
 }


 export default {
     get,
     post
 }