import { Message } from "element-ui";

/**
 * 检查账号的格式
 * @param {*} username 
 * @returns 
 */
export function validationUsername(username) {
    var numReg = /^[0-9]+$/;
    var numRe = new RegExp(numReg)

    if(username == null || username.length == 0) {
        Message({
            message: '账号不能为空',
            type: 'warning'
        })
        return false;
    }

    return true;
}

/**
 * 检查密码是否为空
 * @param {*} password 密码
 * @returns 
 */
export function validationPassword(password) {
    if(password == null || password.length == 0) {
        Message({
            message: '密码不能为空',
            type: 'warning'
        })
        return false;
    }

    return true;
}

/**
 * 检查新密码是否为空
 * @param {*} password 新密码
 * @returns 
 */
export function validationNewPassword(password) {
    if(password == null || password.length == 0) {
        Message({
            message: '新密码不能为空',
            type: 'warning'
        })
        return false;
    }

    return true;
}

/**
 * 检查旧密码是否为空
 * @param {*} password 旧密码
 * @returns 
 */
export function validationOldPassword(password) {
    if(password == null || password.length == 0) {
        Message({
            message: '旧密码不能为空',
            type: 'warning'
        })
        return false;
    }

    return true;
}

/**
 * 检查图片验证码的格式
 * @param {*} verificationcode 图片验证码
 * @returns 
 */
export function validationVerificationcode(verificationcode) {
    if(verificationcode == null || verificationcode.length == 0) {
        Message({
            message: '图片验证码不能为空',
            type: 'warning'
        })
        return false;
    }

    if(verificationcode.length != 4) {
        Message({
            message: '图片验证码格式错误',
            type: 'error'
        })
        return false;
    }

    return true;
}

/**
 * 检查邮箱格式
 * @param {*} email 邮箱
 * @returns 
 */
export function validationEmail(email) {
    var regEmail = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
    if(email == null || email.length == 0) {
        Message({
            type: 'warning',
            message: '邮箱不能为空'
        });
        return false;
    }
    if(!regEmail.test(email)) {
        Message({
            type: 'error',
            message: '邮箱格式不正确'
        });
        return false;
    }
    return true;
}

/**
 * 检查邮箱验证码格式
 * @param {*} emailCode 邮箱验证码
 * @returns 
 */
export function validationEmailCode(emailCode) {
    if(emailCode == null || emailCode.length == 0) {
        Message({
            title: '提示',
            message: '邮箱验证码不能为空',
            type: 'warning'
        })
        return false;
    }
    if(emailCode.length != 6) {
        Message({
            title: '提示',
            message: '邮箱验证码格式错误',
            type: 'error'
        })
        return false;
    }
    return true;
}

/**
 * 检查性别格式
 * @param {*} sex 
 * @returns 
 */
export function validationSex(sex) {
    if(sex == null || sex.length == 0) {
        Message({
            title: '提示',
            message: '性别不能为空',
            type: 'warning'
        })
        return false;
    }

    return true;
}

/**
 * 检查姓名是否为空
 * @param {*} name 
 * @returns 
 */
export function validationName(name) {
    if(name == null || name.length == 0) {
        Message({
            title: '提示',
            message: '姓名不能为空',
            type: 'warning'
        })
        return false;
    }

    return true;
}

/**
 * 判断是否全为字符串
 * @param {*} val 
 * 全为数字返回true，反之
 */
export function isAllNumber(val) {
    return /^\d+$/.test(val);
}