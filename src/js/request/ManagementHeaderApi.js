import Global from "../global/Global";
import service from "./request";
import { Message, MessageBox } from 'element-ui';

var GDPM_USER = Global.GDPM_USER
var GDPM_EMAIL = Global.GDPM_EMAIL
var GDPM_FILE = Global.GDPM_FILE;

var POST_HEADER_URLENCODED = Global.POST_HEADER_URLENCODED
var POST_HEADER_DATA = Global.POST_HEADER_DATA;

var LOGIN_AND_EXIT = '/loginAndExit';
var USER_EMAIL_URL = '/userEmail';
var USEURL = '/user';
var UPLOAD_URL = '/upload';

export async function requestImageUpload(formData) {
    try {
        const response = await service({
            url: GDPM_FILE + UPLOAD_URL + '/image',
            method: 'POST',
            data: formData,
            headers: { 'Content-type': POST_HEADER_DATA }
        });
        return response;
    } catch (error) {
        MessageBox({
            title: '提示',
            message: '图片上传失败，请稍后再试',
            type: 'error'
        });
        // console.log(error);
    }
}

/**
 * 退出登录
 * @param {*} params 
 * @returns 
 */
export async function requestExit(params) {
    try {
        const response = await service({
            url: GDPM_USER + LOGIN_AND_EXIT + '/exit',
            method: 'POST',
            data: params,
            headers: { 'Content-type': POST_HEADER_URLENCODED },
        });
        Message.success('退出成功');
    } catch (error) {
        Message.success('退出成功');
        // console.log(error);
    }
}

/**
 * 发送验证码
 * @returns 
 */
export async function requestSendCode(params) {
    return service({
        url: GDPM_EMAIL + USER_EMAIL_URL + '/sendUpdatePasswordEmailCode',
        method: 'POST',
        data: params,
        headers: {'Content-type': POST_HEADER_URLENCODED}
    }).then(response => {
        if(response.msg == 'success') {
            Message.success('验证码发送成功，请注意查收');
            return;
        } else {
            if(response.msg == null || response.msg.length == 0) {
                Message.error('验证码发送失败，请检查邮箱是否有效');
            } else {
                Message.error(response.msg);
            }
        }
    }).catch(error => {
        Message.error('验证码发送失败，请检查邮箱是否有效');
        // console.log(error);
    });
}

/**
 * 修改个人信息
 * @param {*} params 
 * @returns 
 */
export async function requestUpdatePerson(params) {
    return service({
        url: GDPM_USER + USEURL + '/updatePerson',
        method: 'POST',
        data: params,
        headers: {'Content-type': POST_HEADER_URLENCODED}
    }).then(response => {
        if(response.msg == 'success') {
            return response;
        } else {
            if(response.msg == null || response.msg.length == 0) {
                Message.error('修改失败');
            } else {
                Message.error(response.msg);
            }
        }
    }).catch(error => {
        Message.error('修改失败');
        // console.log(error);
    })
}

/**
 * 修改密码
 * @param {*} params 
 * @returns 
 */
export async function requestUpdatePass(params) {
    return service({
        url: GDPM_USER + USEURL + '/updatePassword',
        method: 'POST',
        data: params,
        headers: {'Content-type': POST_HEADER_URLENCODED}
    }).then(response => {
        if(response.msg == 'success') {
            return response;
        } else {
            if(response.msg == null || response.msg.length == 0) {
                Message.error('修改密码失败');
            } else {
                Message.error(response.msg);
            }
        }
    }).catch(error => {
        Message.error('修改密码失败');
        // console.log(error);
    })
}