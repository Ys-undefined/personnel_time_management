import axios from 'axios';
import QS from 'query-string'
import Cookies from 'js-cookie'
import {message} from 'antd'
//todo
axios.defaults.baseURL = "";

// 请求超时时间
axios.defaults.timeout = 10000;

// post请求头
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// 请求拦截器
axios.interceptors.request.use(
    config => {
        //todo
        // 目前为将token存入本地 以及对登录页取消token
        config.headers["token"] = Cookies.get("token");
        if (config.url === "/user/login") {
            config.headers.delete("token");
        }
        return config;
    },
    error => {
        return Promise.error(error);
    })

// 响应拦截器
axios.interceptors.response.use(
    response => {

        if (response.data.code === 200) {
            return Promise.resolve(response);
        } 
        if (response.data.code === 401) {
            message.error(response.data.msg,3).then(r=>r)
            return Promise.resolve(response);
        }else {
            message.error(response.data.msg,3).then(r=>r)
            return Promise.reject(response);
        }
    },
    error => {
        if (error.response.status) {
            message.error(error.message,3).then(r=>r)
            return Promise.reject(error.response);
        }
    }
);
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}

export function del(url, params) {
    return new Promise((resolve, reject) => {
        axios.delete(url, QS.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}
