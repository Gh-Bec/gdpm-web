import Global from "../../global/Global";
import { MessageBox, Message } from "element-ui";
import service from "../request";

var GDPM_TEACHER = Global.GDPM_TEACHER;

var POST_HEADER_URLENCODED = Global.POST_HEADER_URLENCODED;

var URL = '/teacherSelect';
var STUDENT_LIST_URL = '/studentList';
var SITUATION_LIST_URL = '/tSelectSituation';

export async function requestInitData(tid) {
    try {
        const response = await service({
            url: GDPM_TEACHER + URL + STUDENT_LIST_URL + '/initData',
            method: 'GET',
            headers: { 'Content-type': POST_HEADER_URLENCODED },
            params: {
                "tid" : tid
            }
        });
        return response;
    } catch (error) {
        MessageBox({
            title: '提示',
            message: '系统异常，请稍后再试',
            type: 'error'
        });
        // console.log(error);
    }
}

export async function requestHasRefused(tid, hasRefusedCurrent, hasRefusedSize) {
    try {
        const response = await service({
            url: GDPM_TEACHER + URL + SITUATION_LIST_URL + '/hasRefusedFindPage',
            method: 'GET',
            params: {
                "current": hasRefusedCurrent,
                "size": hasRefusedSize,
                "tid": tid
            } 
        });
        return response;
    } catch (error) {
        MessageBox({
            title: '提示',
            message: '数据查询失败，请稍后再试',
            type: 'error'
        });
        // console.log(error);
    }
}

export async function requestAcceptInvit(tid, acceptInvitCurrent, acceptInvitSize) {
    try {
        const response = await service({
            url: GDPM_TEACHER + URL + SITUATION_LIST_URL + '/acceptInvitFindPage',
            method: 'GET',
            params: {
                "current": acceptInvitCurrent,
                "size": acceptInvitSize,
                "tid": tid
            }
        });
        return response;
    } catch (error) {
        MessageBox({
            title: '提示',
            message: '数据查询失败，请稍后再试',
            type: 'error'
        });
        // console.log(error);
    }
}

export async function requestHasDetermine(tid, hasDetermineCurrent, hasDetermineSize) {
    try {
        const response = await service({
            url: GDPM_TEACHER + URL + SITUATION_LIST_URL + '/hasDetermineFindPage',
            method: 'GET',
            params: {
                "current": hasDetermineCurrent,
                "size": hasDetermineSize,
                "tid": tid
            }
        });
        return response;
    } catch (error) {
        MessageBox({
            title: '提示',
            message: '数据查询失败，请稍后再试',
            type: 'error'
        });
        // console.log(error);
    }
}

export async function requestRefused(params) {
    return service({
        url: GDPM_TEACHER + URL + STUDENT_LIST_URL +  '/refused',
        method: 'POST',
        data: params,
        headers: {'Content-type': POST_HEADER_URLENCODED}
    }).then(response => {
        if(response.msg == 'success') {
            return response;
        } else {
            Message.error("拒绝邀请失败，请稍后再试");
        }
    }).catch(error => {
        Message.error("拒绝邀请失败，请稍后再试");
        // console.log(error);
    })
}

export async function requestAccept(params) {
    return service({
        url: GDPM_TEACHER + URL + STUDENT_LIST_URL +  '/accept',
        method: 'POST',
        data: params,
        headers: {'Content-type': POST_HEADER_URLENCODED}
    }).then(response => {
        if(response.msg == 'success') {
            return response;
        } else {
            Message.error("接受邀请失败，请稍后再试");
        }
    }).catch(error => {
        Message.error("接受邀请失败，请稍后再试");
        // console.log(error);
    })
}

export async function requestTeaStuFindPage(tid, keywords, current, size) {
    return service({
        url: GDPM_TEACHER + URL + STUDENT_LIST_URL + '/findPage',
        method: 'GET',
        headers: {'Content-type': POST_HEADER_URLENCODED},
        params: {
            "current": current,
            "size": size,
            "tid": tid,
            "keywords": keywords,
        }
    }).then(response => {
        return response;
    }).catch(error => {
        MessageBox({
            title: '提示',
            message: '数据查询失败，请稍后再试',
            type: 'error'
        })
        // console.log(error);
    })
}