import { Message } from 'element-ui';
import {requestFileUpload, requestInsertFirst, requestFirstFindPage, requestIsFirst} from '../request/student/SubmitApi';
import {isUserInfoNotNull, isUserDtoNotNull} from '../../js/global/PublicMethods'

export function isFirstPassing(that) {
    isUserDtoNotNull(window.localStorage.getItem('userDTO'), that);
    var sid = JSON.parse(window.localStorage.getItem('userDTO')).id;
    isUserInfoNotNull(sid, that);
    requestIsFirst(sid).then(response => {
        if(response.data.state == null) {
            return;
        }
        if(response.data.state == 1 || response.data.state == "1") {
            that.isPass = false;
        }
    })
}

export function firstFindPageing(that) {
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

    requestFirstFindPage(that.current, that.size, sid).then(response => {
        if(response.result == null) {
            return;
        }
        that.total = response.total;
        that.tableData = response.result;
    })
}

export function insertFirsting(that) {
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

    if(that.tableData.url == null || that.tableData.url == 0) {
        Message({
            message: '系统异常，请重新上传文件',
            type: 'error'
        })
        return;
    }

    const params = new URLSearchParams();
    params.append("url", that.tableData.url);
    params.append("sid", sid);
    return requestInsertFirst(params);
}

export function fileUploading(param) {
    const formData = new FormData();
    formData.append('file', param.file);
    return requestFileUpload(formData);
}

/**
 * 点击下一页或跳转到某一页时会触发
 * 回调参数：当前页
 * @param {*} that 
 * @param {*} cpage 
 */
export function currentChangeing(that, cpage) {
    that.$data.currentPage = cpage;
    console.log(cpage)
}