import {requestLoging,  requestSentCode, requestBeginVerify} from '../js/request/UserApi'
import {validationUsername, validationEmailCode} from '../js/Validation'
import {trim} from '../js/global/PublicMethods'
import { Message } from 'element-ui';

/**
 * 登录方法
 * @param {*} that 
 * @returns 
 */
export function logining(that) {
    if(that.username == null || that.username.length == 0) {
        Message({
            message: '账号不能为空',
            type: 'warning'
        })
        return;
    }
    if(that.password == null || that.password.length == 0) {
        Message({
            message: '密码不能为空',
            type: 'warning'
        })
        return;
    }
    if(that.verificationcode == null || that.verificationcode.length == 0) {
        Message({
            message: '图片验证码不能为空',
            type: 'warning'
        })
        return;
    }
    if(that.loginFlag == null || that.loginFlag.length == 0) {
        Message({
            message: '未选择登录角色',
            type: 'warning'
        })
        return;
    }
    if(that.uuid == null || that.uuid == 0) {
        Message({
            message: '验证码异常，请再次获取',
            type: 'error'
        })
        return;
    }
    
    const data = {
        username: trim(that.username),
        password: that.$encruption(trim(that.password)),
        verificationcode: trim(that.verificationcode),
        uuid: that.uuid,
        role: that.loginFlag    
    }
    return requestLoging(data);
}

export function beginVerifying(that) {
    if(that.forgetPassWordForm.role == null || that.forgetPassWordForm.role.length == 0) {
        Message({
            message: '未选择角色',
            type: 'warning'
        })
        return;
    }
    if(validationUsername(that.forgetPassWordForm.no.trim()) && validationEmailCode(that.forgetPassWordForm.code.trim())) {
        const params = new URLSearchParams();
        params.append("role", trim(that.forgetPassWordForm.role));
        params.append("no", trim(that.forgetPassWordForm.no));
        params.append("emailCode", trim(that.forgetPassWordForm.code));
        requestBeginVerify(params);
    } else {
        return;
    }
    that.forgetPassWordShow = false;
}

export function sentCodeing(that) {
    if(that.forgetPassWordForm.role == null || that.forgetPassWordForm.role.length == 0) {
        Message({
            message: '未选择角色',
            type: 'warning'
        })
        return;
    }
    if(that.forgetPassWordForm.no == null || that.forgetPassWordForm.no.length == 0) {
        Message({
            message: '账号不能为空',
            type: 'warning'
        })
        return;
    }

    const params = new URLSearchParams();
    params.append("role", trim(that.forgetPassWordForm.role));
    params.append("no", trim(that.forgetPassWordForm.no));
    requestSentCode(params);
}