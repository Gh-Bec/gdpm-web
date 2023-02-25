import Global from '../global/Global';
import service from './request';
import { Message, MessageBox } from 'element-ui';

var GDPM_EMAIL = Global.GDPM_EMAIL
var GDPM_USER = Global.GDPM_USER

var POST_HEADER_URLENCODED = Global.POST_HEADER_URLENCODED

var USER_EMAIL_URL = '/userEmail';
var USER_URL = '/user';

export async function requestSendCode(params) {
    try {
        const response = await service({
            url: GDPM_EMAIL + USER_EMAIL_URL + '/sendEmailCode',
            method: 'POST',
            data: params,
            headers: { 'Content-type': POST_HEADER_URLENCODED }
        });
        if (response.msg == 'success') {
            Message.success("验证码发送成功，请注意查收");
        } else {
            Message.error('验证码发送失败，请稍后再试');
        }
    } catch (error) {
        Message.error('验证码发送失败，请稍后再试');
        // console.log(error);
    }
}

export async function requestOnSubmit(params) {
    return service({
        url: GDPM_USER + USER_URL + '/binding',
        method: 'POST',
        data: params,
        headers: {'Content-type': POST_HEADER_URLENCODED}
    }).then(response => {
        if(response.msg == 'success') {
            Message.success('邮箱绑定成功');
            return response;
        } else {
            if(response.msg == null || response.msg.length == 0) {
                Message.error('邮箱绑定失败');
            } else {
                Message.error(response.msg);
            }
        }
    }).catch(error => {
        Message.error('邮箱绑定失败');
        // console.log(error);
    })
}