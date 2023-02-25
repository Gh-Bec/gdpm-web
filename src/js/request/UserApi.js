import Global from '../global/Global';
import service from './request';
import { Message, MessageBox } from 'element-ui';

var GDPM_USER = Global.GDPM_USER
var GDPM_EMAIL = Global.GDPM_EMAIL

var POST_HEADER_JSON = Global.POST_HEADER_JSON
var POST_HEADER_URLENCODED = Global.POST_HEADER_URLENCODED

var LOGIN_AND_EXIT = '/loginAndExit';
var USER_EMAIL_URL = '/userEmail';
var USEURL = '/user';

/**
 * 登录方法
 * @param {*} data 学号 密码 验证码
 * @returns 
 */
export function requestLoging(data) {
    return service({
        url: GDPM_USER + LOGIN_AND_EXIT + '/login',
        method: 'POST',
        data: JSON.stringify(data),
        headers: {'Content-type': POST_HEADER_JSON}
    }).then(response => {
        if(response.msg == 'success') {
            window.localStorage.setItem('token', JSON.stringify(response.data.token));
            window.localStorage.setItem('tokenStartTime', new Date().getTime());  //  存储token开始时间
            return response;
        } else {
            if(response.msg == null || response.msg.length == 0) {
                MessageBox({
                    title: '提示',
                    message: '登录失败',
                    type: 'error'
                })
            }
            MessageBox({
                title: '提示',
                message: response.msg,
                type: 'error'
            })
        }
    }).catch(error => {
        console.log(error);
    });
}

/**
 * 发送验证码
 * @returns 
 */
export function requestSentCode(params) {
    return service({
        url: GDPM_EMAIL + USER_EMAIL_URL + '/sendForgetEmailCode',
        method: 'POST',
        data: params,
        headers: {'Content-type': POST_HEADER_URLENCODED}
    }).then(response => {
        if(response.msg == 'success') {
            Message.success('验证码发送成功，请注意查收');
            return;
        } else {
            if(response.msg == null || response.msg.length == 0) {
                Message.error('验证码发送失败，请稍后再试');
            } else {
                Message.error(response.msg);
            }
        }
    }).catch(error => {
        Message.error('验证码发送失败，请稍后再试');
        console.log(error);
    });
}

export function requestBeginVerify(params) {
    return service({
        url: GDPM_USER + USEURL + '/resetPassword',
        method: 'POST',
        data: params,
        headers: {'Content-type': POST_HEADER_URLENCODED}
    }).then(response => {
        if(response.msg == 'success') {
            Message.success('密码重置成功，请使用初始密码重新登录');
            return;
        } else {
            if(response.msg == null || response.msg.length == 0) {
                Message.error('密码重置失败，请稍后再试');
            } else {
                Message.error(response.msg);
            }
        }
    }).catch(error => {
        Message.error('密码重置失败，请稍后再试');
        console.log(error);
    });
}

/**
 * 获取图片验证码
 */
export function getCaptcha() {
    return service({
        url: '/captcha?t='+(new Date()).getTime().toString(),
        method: 'GET',
        timeout: 3000
    })
}