import { Message, MessageBox } from 'element-ui';
import {validationEmail, validationEmailCode, validationNewPassword, validationOldPassword} from '../Validation';
import {trim} from '../global/PublicMethods';
import {requestUpdatePerson, requestSendCode, requestUpdatePass, requestExit, requestImageUpload} from '../request/ManagementHeaderApi'

export function imageUploading(param) {
    const formData = new FormData();
    formData.append('file', param.file);
    return requestImageUpload(formData);
}

/**
 * 退出登录
 * @param {*} that 
 */
export function exiting(that) {
    var id = that.personalForm.id;

    if(id == null) {
        Message.error('系统异常，请稍后再试');
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("tokenStartTime");
        window.localStorage.removeItem("userDTO");
        that.$router.push({path: '/login'});
    }

    const params = new URLSearchParams();
    params.append("id", id);

    requestExit(params);
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("tokenStartTime");
    window.localStorage.removeItem("userDTO");
    that.$router.push({path: '/login'});
}

export function showUpdateForming(that) {
    that.updateForm.name = that.personalForm.name;
    that.updateForm.sex = that.personalForm.sex;
    that.updateForm.email = that.personalForm.email;
    that.updateForm.headUrl = that.personalForm.headUrl;
    that.updateFormVisible = true;
}

/**
 * 获取性别下拉框选中的值
 * @param {*} that 
 * @param {*} val 
 */
export function selectSexing(that, val) {
    that.updateForm.sex = val;
}

/**
 * 设置个人信息
 * @param {*} that 
 */
export function setPersonInfoing(that) {
    that.personalForm.id = that.userDTO.id;
    that.personalForm.role = that.userDTO.role;
    that.personalForm.name = that.userDTO.name;
    that.personalForm.sex = that.userDTO.sex;
    that.personalForm.email = that.userDTO.email;

    that.personalForm.headUrl = that.userDTO.headUrl;
    if(that.personalForm.headUrl != null && that.personalForm.headUrl.length != 0) {
        that.url = that.personalForm.headUrl;
    }

    if(that.userDTO.role == 1) {
        that.studentPersonalForm.sno = that.userDTO.sno;
        that.studentPersonalForm.year = that.userDTO.year;
        that.studentPersonalForm.departmentName = that.userDTO.departmentName;
        that.studentPersonalForm.professionalName = that.userDTO.professionalName;
        that.studentPersonalForm.grade = that.userDTO.grade;
    } else if(that.userDTO.role == 3) {
        that.adminPersonalForm.ano = that.userDTO.ano;
    } else if(that.userDTO.role == 2 || that.userDTO.role == 4) {
        that.teacherPersonalForm.tno = that.userDTO.tno;
        that.teacherPersonalForm.professionalTitle = that.userDTO.professionalTitle;
        that.teacherPersonalForm.departmentName = that.userDTO.departmentName;
        that.teacherPersonalForm.professionalName = that.userDTO.professionalName;
        that.teacherPersonalForm.educationBackground = that.userDTO.educationBackground;
    } else {
        MessageBox({
            message: '系统异常，请重新登录',
            type: 'error',
            title: '提示'
        });
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("tokenStartTime");
        window.localStorage.removeItem("userDTO");
        that.$router.push({path: '/login'});
    }
}

/**
 * 控制侧边栏伸缩的点击事件
 * 并向父组件传递变量
 * @param {*} that 
 */
export function scaling(that) {
    if(that.isCollapse === false) {
        that.isCollapse = true;
    } else {
        that.isCollapse = false;
    }
    that.$emit('scalingClick', that.isCollapse);
}

/**
 * 修改个人信息
 * @param {*} that 
 */
export function updatePersoning(that) {
    var sex;
    var email;
    var name;

    if(that.updateForm.name == null || that.updateForm.name.length == 0) {
        Message({
            title: '提示',
            message: '姓名不能为空',
            type: 'warning'
        })
        return;
    }
    name = trim(that.updateForm.name);

    if(that.updateForm.sex == null || that.updateForm.sex.length == 0) {
        Message({
            title: '提示',
            message: '性别不能为空',
            type: 'warning'
        })
        return;
    }
    sex = that.updateForm.sex;

    if(that.personalForm.id == null) {
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

    if(that.personalForm.role == null) {
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

    if(validationEmail(that.updateForm.email)) {
        email = trim(that.updateForm.email);
        const params = new URLSearchParams();
        params.append("headUrl", that.updateForm.headUrl);
        params.append("sex", sex);
        params.append("email", email);
        params.append("name", name);
        params.append("id", that.personalForm.id);
        params.append("role", that.personalForm.role);
        requestUpdatePerson(params).then(response => {
            if(response.data.state >= 1) {
                that.personalForm.name = that.updateForm.name;
                that.personalForm.sex = that.updateForm.sex;
                that.personalForm.email = that.updateForm.email;
                that.personalForm.headUrl = that.updateForm.headUrl;

                var userDTO = JSON.parse(window.localStorage.getItem('userDTO'));
                window.localStorage.removeItem("userDTO");
                userDTO.email = email;
                userDTO.name = name;
                userDTO.sex = sex;
                userDTO.headUrl = that.updateForm.headUrl;
                window.localStorage.setItem('userDTO', JSON.stringify(userDTO));
                that.url = that.updateForm.headUrl;
                
                Message.success('修改成功');
            } else {
                Message.error('修改失败');
            }
        });
    } else {
        return;
    }
    that.updateFormVisible = false;
}

/**
 * 发送验证码
 * @param {*} that
 */
export function sendCodeing(that) {
    var oldPassword;
    var newPassword;

    if(validationOldPassword(that.passwordForm.password)) {
        oldPassword = trim(that.passwordForm.password);
    } else {
        return;
    }

    if(validationNewPassword(that.passwordForm.newPassword)) {
        newPassword = trim(that.passwordForm.newPassword);
    } else {
        return;
    }

    if(oldPassword === newPassword) {
        Message({
            message: '新密码和旧密码不能一致',
            type: 'warning'
        })
        return;
    }

    var id = that.personalForm.id;
    var role = that.personalForm.role;
    var no;

    if(that.personalForm.role == 1) {
        no = that.studentPersonalForm.sno;
    } else if(that.personalForm.role == 3) {
        no = that.adminPersonalForm.ano;
    } else if(that.personalForm.role == 2 || that.personalForm.role == 4) {
        no = that.teacherPersonalForm.tno;
    } else {
        Message.error('系统异常，请稍后再试');
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("tokenStartTime");
        window.localStorage.removeItem("userDTO");
        that.$router.push({path: '/login'});
    }

    if(id == null) {
        Message.error('系统异常，请稍后再试');
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("tokenStartTime");
        window.localStorage.removeItem("userDTO");
        that.$router.push({path: '/login'});
    }
    if(role == null) {
        Message.error('系统异常，请稍后再试');
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("tokenStartTime");
        window.localStorage.removeItem("userDTO");
        that.$router.push({path: '/login'});
    }
    if(no == null) {
        Message.error('系统异常，请稍后再试');
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("tokenStartTime");
        window.localStorage.removeItem("userDTO");
        that.$router.push({path: '/login'});
    }

    const params = new URLSearchParams();
    params.append("role", role);
    params.append("no", no);
    params.append("id", id);
    requestSendCode(params);
}

/**
 * 修改密码
 * @param {*} that 
 */
export function updatePassing(that) {    
    var emailCode;
    
    if(that.passwordForm.password == null || that.passwordForm.password.length == 0) {
        Message.warning('旧密码不能为空');
        return;
    }
    if(that.passwordForm.newPassword == null || that.passwordForm.newPassword.length == 0) {
        Message.warning('新密码不能为空');
        return;
    }
    if(that.passwordForm.newPassword === that.passwordForm.password) {
        Message.error('新密码和旧密码不能一致');
        return;
    }
    if(validationEmailCode(that.passwordForm.emailCode)) {
        emailCode = trim(that.passwordForm.emailCode);
    } else {
        return;
    }

    var id = that.personalForm.id;
    var role = that.personalForm.role;
    var no;

    if(that.personalForm.role == 1) {
        no = that.studentPersonalForm.sno;
    } else if(that.personalForm.role == 3) {
        no = that.adminPersonalForm.ano;
    } else if(that.personalForm.role == 2 || that.personalForm.role == 4) {
        no = that.teacherPersonalForm.tno;
    } else {
        Message.error('系统异常，请稍后再试');
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("tokenStartTime");
        window.localStorage.removeItem("userDTO");
        that.$router.push({path: '/login'});
    }

    if(id == null) {
        Message.error('系统异常，请稍后再试');
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("tokenStartTime");
        window.localStorage.removeItem("userDTO");
        that.$router.push({path: '/login'});
    }
    if(role == null) {
        Message.error('系统异常，请稍后再试');
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("tokenStartTime");
        window.localStorage.removeItem("userDTO");
        that.$router.push({path: '/login'});
    }
    if(no == null) {
        Message.error('系统异常，请稍后再试');
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("tokenStartTime");
        window.localStorage.removeItem("userDTO");
        that.$router.push({path: '/login'});
    }

    var password = that.$encruption(trim(that.passwordForm.password));
    var newPassword = that.$encruption(trim(that.passwordForm.newPassword));

    const params = new URLSearchParams();
    params.append("role", role);
    params.append("no", no);
    params.append("id", id);
    params.append("password", password);
    params.append("newPassword", newPassword);
    params.append("emailCode", emailCode);
    requestUpdatePass(params).then(response => {
        if(response.data.state >= 1) {
            Message.success('修改密码成功');
        } else {
            Message.error('修改密码失败');
        }
    });
    that.updatePasswordVisible = false;
    that.passwordForm.password = '';
    that.passwordForm.newPassword = '';
    that.passwordForm.emailCode = '';
}