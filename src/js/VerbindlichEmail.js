import {validationEmail, validationEmailCode} from '../js/Validation'
import {trim} from '../js/global/PublicMethods'
import { Message, MessageBox } from 'element-ui';
import {requestSendCode, requestOnSubmit} from '../js/request/VerbindlichEmailApi'

/**
 * 验证
 * @param {*} that 
 */
export function onSubmiting(that) {
    if(validationEmailCode(that.emails.emailCode.trim())) {
        const params = new URLSearchParams();
        params.append("id", that.userDTO.id);
        params.append("role", that.userDTO.role);
        params.append("email", trim(that.emails.email));
        params.append("emailCode", trim(that.emails.emailCode));

        if(that.userDTO.role == 1) {
            params.append("no", that.userDTO.sno);
        } else if(that.userDTO.role == 3) {
            params.append("no", that.userDTO.ano);
        } else if(that.userDTO.role == 2 || that.userDTO.role == 4) {
            params.append("no", that.userDTO.tno);
        } else {
            Message.error('系统异常，请稍后再试');
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("tokenStartTime");
            window.localStorage.removeItem("userDTO");
            that.$router.push({path: '/login'});
        }

        var newEmail = that.emails.email;
        requestOnSubmit(params).then(response => {
            if(response.data.state >= 1) {
                var userDTO = JSON.parse(window.localStorage.getItem('userDTO'));
                window.localStorage.removeItem("userDTO");
                userDTO.email = newEmail;
                window.localStorage.setItem('userDTO', JSON.stringify(userDTO));

                if(userDTO.role == 1) {
                that.$router.push({
                    path: '/StudentManagement'
                });
                } else if(userDTO.role == 3) {
                    that.$router.push({
                        path: '/AdminManagement'
                    });
                } else if(userDTO.role == 2 || that.userDTO.role == 4) {
                    that.$router.push({
                        path: '/TeacherManagement'
                    });
                } else {
                    Message.error('绑定失败，请稍后再试');
                    window.localStorage.removeItem("token");
                    window.localStorage.removeItem("tokenStartTime");
                    window.localStorage.removeItem("userDTO");
                    that.$router.push({path: '/login'});
                }
            } else {
                Message.error('绑定失败，请稍后再试');
                window.localStorage.removeItem("token");
                window.localStorage.removeItem("tokenStartTime");
                window.localStorage.removeItem("userDTO");
                that.$router.push({path: '/login'});
            }
        });

        that.emails.email = '';
        that.emails.emailCode = '';
        that.emails.id = '';
    }
}

/**
 * 发送验证码
 * @param {*} that
 */
export function sendCodeing(that) {
    if(that.userDTO.id == null || that.userDTO.id.length == 0) {
        Message({
            message: '请求参数错误',
            type: 'error'
        })
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("tokenStartTime");
        that.$router.push({path: '/login'});
        return;
    }
    if(that.userDTO.role == null || that.userDTO.role.length == 0) {
        Message({
            message: '请求参数错误',
            type: 'error'
        })
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("tokenStartTime");
        window.localStorage.removeItem("userDTO");
        that.$router.push({path: '/login'});
        return;
    }
    if(that.userDTO.role == 1) {
        if(that.userDTO.sno == null || that.userDTO.sno.length == 0) {
            Message({
                message: '请求参数错误',
                type: 'error'
            })
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("tokenStartTime");
            window.localStorage.removeItem("userDTO");
            that.$router.push({path: '/login'});
            return;
        }
    } else if(that.userDTO.role == 3) {
        if(that.userDTO.ano == null || that.userDTO.ano.length == 0) {
            Message({
                message: '请求参数错误',
                type: 'error'
            })
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("tokenStartTime");
            window.localStorage.removeItem("userDTO");
            that.$router.push({path: '/login'});
            return;
        }
    } else if(that.userDTO.role == 2 || that.userDTO.role == 4) {
        if(that.userDTO.tno == null || that.userDTO.tno.length == 0) {
            Message({
                message: '请求参数错误',
                type: 'error'
            })
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("tokenStartTime");
            window.localStorage.removeItem("userDTO");
            that.$router.push({path: '/login'});
            return;
        }
    } else {
        MessageBox({
            title: '提示',
            message: '系统异常，请稍后再试',
            type: 'error'
        });
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("tokenStartTime");
        window.localStorage.removeItem("userDTO");
        that.$router.push({path: '/login'});
        return;
    }

    if(validationEmail(that.emails.email.trim())) {
        const params = new URLSearchParams();
        params.append("email", trim(that.emails.email));
        params.append("id", that.userDTO.id);

        if(that.userDTO.role == 1) {
            params.append("no", that.userDTO.sno);
        } else if(that.userDTO.role == 3) {
            params.append("no", that.userDTO.ano);
        } else if(that.userDTO.role == 2 || that.userDTO.role == 4) {
            params.append("no", that.userDTO.tno);
        } else {
            MessageBox({
                title: '提示',
                message: '系统异常，请稍后再试',
                type: 'error'
            });
        }

        requestSendCode(params);
    }
}