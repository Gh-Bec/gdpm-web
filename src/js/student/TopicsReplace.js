import { Message } from 'element-ui';
import {requestRfindPage, requestReplace, requestReplaceInitData} from '../request/student/TopicsDeclarationApi'
import {isUserDtoNotNull, isUserInfoNotNull} from '../global/PublicMethods';


export function initDataing(that) {
    isUserDtoNotNull(window.localStorage.getItem('userDTO'), that);
    var sid = JSON.parse(window.localStorage.getItem('userDTO')).id;
    isUserInfoNotNull(sid, that);

    requestReplaceInitData(sid).then(response => {
        if(response.data.projectName != null && response.data.projectName.length > 0) {
            that.isOpen = false;
        }
    })
}

export function rFindPageing(that) {
    var sid = JSON.parse(window.localStorage.getItem('userDTO')).id;
    if(sid == null || sid.length == 0) {
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

    requestRfindPage(that.current, that.size, sid).then(response => {
        if(response.result == null) {
            return;
        }
        that.total = response.total;
        that.tableData = response.result;
    })
}


/**
 * 点击下一页或跳转到某一页时会触发
 * 回调参数：当前页
 * @param {*} that 
 * @param {*} cpage 
 */
export function currentChangeing(that, cpage) {
    that.$data.currentPage = cpage;
    var sid = JSON.parse(window.localStorage.getItem('userDTO')).id;
    if(sid == null || sid.length == 0) {
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

    requestRfindPage(cpage, that.size, sid).then(response => {
        if(response.result == null) {
            return;
        }
        that.total = response.total;
        that.tableData = response.result;
    })
}

/**
 * 更换按钮点击事件
 * @param {*} that 
 */
export function replaceing(that) {
    var sid = JSON.parse(window.localStorage.getItem('userDTO')).id;
    if(sid == null || sid.length == 0) {
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

    if(that.form.projectName.length == 0) {
        Message({
            message: '课题名称不能为空',
            type: 'warning'
        })
        return;
    }
    if(that.form.introduce.length == 0) {
        Message({
            message: '课题简介不能为空',
            type: 'warning'
        })
        return;
    }
    if(that.form.introduce.length > 200) {
        Message({
            message: '课题简介字数不能超过200',
            type: 'error'
        })
        return;
    }
    
    const params = new URLSearchParams();
    params.append("sid", sid);
    params.append("projectName", that.form.projectName);
    params.append("introduce", that.form.introduce);

    requestReplace(params).then(response => {
        if(response.data.state >= 1) {
            Message.success("课题更换申请成功");
            that.rFindPage();
        } else {
            Message.error("课题更换申请失败，请稍后再试");
        }
    })

    that.form.projectName = '';
    that.form.introduce = '';
    that.dialogFormVisible = false;
}
