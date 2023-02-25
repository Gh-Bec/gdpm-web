import axios from 'axios';
import qs from 'qs'
import { MessageBox, Loading } from 'element-ui';

let loading;
let loadingNum = 0;  //  内存中正在请求的数量

function startLoading() {
    if(loadingNum == 0) {
        loading = Loading.service({
            lock: true,
            text: '拼命加载中...',
            background:'rgba(255,255,255,0.5)',
            target: document.querySelector('.content')
        })
    }
    loadingNum++;
}

function endLoading() {
    loadingNum--;
    if(loadingNum <= 0) {
        loading.close();
    }
}

const service  = axios.create({
    baseURL: process.env.API_ROOT,  //  基本地址
    responseType: 'json',
    withCredentials: true,  //  允许跨域设置，不然可能因为拿不到cookie而报错
    timeout: 1000 * 10  //  设置请求超时时间，单位为毫秒
})

// 环境的切换
if (process.env.NODE_ENV == 'development') {    
    service.defaults.baseURL = 'http://192.168.74.1:8888/';
} else if (process.env.NODE_ENV == 'debug') {    
    service.defaults.baseURL = 'http://192.168.74.1:8888/';
} else if (process.env.NODE_ENV == 'production') {    
    service.defaults.baseURL = 'http://192.168.74.1:8888/';
}

//  请求拦截器
service.interceptors.request.use(
    config => {
        startLoading();

        if (config.meth === 'post' && !(config.data instanceof FormData)) {
            config.data = qs.stringify(config.data, {
                arrayFormat: 'repeat'  //  后端要求传数组的时候做的设置
            })
        }
        
        // 将token放到请求头中发送给服务器
        if (window.localStorage.getItem('token')) {
            config.headers.common['Access-Token'] = window.localStorage.getItem('token');
        }

        return config;
    },
    error => {
        return Promise.error(error)
    }
)

// 响应拦截器
service.interceptors.response.use( 
    response => {
        endLoading();

        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
        // 否则的话抛出错误
        if (response.status === 200) {        
            return Promise.resolve(response.data);        
        } else {         
            return Promise.reject(response);        
        }    
    },    
    // 服务器状态码不是2开头的的情况
    // 要和后台统一的错误状态码    
    // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
    error => {
        endLoading();
        if (error && error.response && error.response.status) {
            switch (error.response.status) {                
                // 401: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。                
                case 401:
                    MessageBox({
                        message: '未授权，请重新登录',
                        type: 'error',
                        title: '提示'
                    })      
                    break;

                // 403 token过期
                // 登录过期对用户进行提示
                // 跳转登录页面                
                case 402:
                    MessageBox({
                        message: '登录过期，请重新登录',
                        type: 'error',
                        title: '提示'
                    });

                    // 清除token
                    localStorage.removeItem('token');

                    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面 
                    // setTimeout(() => {                        
                    //     router.replace({                            
                    //         path: '/login',                            
                    //         query: { 
                    //             redirect: router.currentRoute.fullPath 
                    //         }                     
                    //     });                    
                    // }, 1000);                 
                    break; 
                case 403:
                    MessageBox({
                        message: '拒绝访问',
                        type: 'error',
                        title: '提示'
                    });
                    break;
                case 404:
                    MessageBox({
                        message: '网络请求不存在',
                        type: 'error',
                        title: '提示'
                    });
                    break;
                case 405:
                    MessageBox({
                        message: '请求方法不允许',
                        type: 'error',
                        title: '提示'
                    });
                    break;
                case 408:
                    MessageBox({
                        message: '请求超时，请稍后再试',
                        type: 'error',
                        title: '提示'
                    });
                    break;
                case 429:
                    MessageBox({
                        message: '服务器繁忙，请稍后再试',
                        type: 'error',
                        title: '提示'
                    });
                    break;
                case 500:
                    MessageBox({
                        message: '服务器端错误',
                        type: 'error',
                        title: '提示'
                    });
                    break;
                case 501:
                    MessageBox({
                        message: '网络未实现',
                        type: 'error',
                        title: '提示'
                    });
                    break;
                case 502:
                    MessageBox({
                        message: '网络错误',
                        type: 'error',
                        title: '提示'
                    });
                    break;
                case 503:
                    MessageBox({
                        message: '服务不可用',
                        type: 'error',
                        title: '提示'
                    });
                    break;
                case 504:
                    MessageBox({
                        message: '网络超时',
                        type: 'error',
                        title: '提示'
                    });
                    break;
                case 50:
                    MessageBox({
                        message: 'http版本不支持该请求',
                        type: 'error',
                        title: '提示'
                    });
                    break;
                // 其他错误，直接抛出错误提示
                default:
                    MessageBox({
                        message: '服务器内部错误，请稍后再试',
                        type: 'error',
                        title: '提示'
                    });
            }
            return Promise.reject(error);
        }
    }    
);

export default service;