import Global from "../../global/Global";
import { Message, MessageBox } from "element-ui";
import service from "../request";

var GDPM_STUDENT = Global.GDPM_STUDENT;
var POST_HEADER_URLENCODED = Global.POST_HEADER_URLENCODED;
var URL = '/selectSituation';

export async function requestRefused(params) {
    return service({
        url: GDPM_STUDENT + URL + '/refused',
        method: 'POST',
        data: params,
        headers: {'Content-type': POST_HEADER_URLENCODED}
    }).then(response => {
        if(response.msg == 'success') {
            Message.success("已拒绝该教师");
            return response;
        } else {
            if(response.msg == null || response.msg.length == 0) {
                Message.error("系统异常，拒绝失败");
            } else {
                Message.error(response.msg);
            }
        }
    }).catch(error => {
        Message.error("系统异常，拒绝失败");
        // console.log(error);
    })
}

export async function requestAccept(params) {
    return service({
        url: GDPM_STUDENT + URL + '/accept',
        method: 'POST',
        data: params,
        headers: {'Content-type': POST_HEADER_URLENCODED}
    }).then(response => {
        if(response.msg == 'success') {
            return response;
        } else {
            if(response.msg == null || response.msg.length == 0) {
                Message.error("接受邀请失败");
            } else {
                Message.error(response.msg);
            }
        }
    }).catch(error => {
        Message.error("接受邀请失败");
        // console.log(error);
    })
}

export async function requestHasInvitedFindPage(hasInvitedCurrent, hasInvitedSize, sid) {
    return service({
        url: GDPM_STUDENT + URL + '/hasInvitedFindPage',
        method: 'GET',
        headers: {'Content-type': POST_HEADER_URLENCODED},
        params: {
            "current" : hasInvitedCurrent,
            "size" : hasInvitedSize,
            "sid" : sid
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

export async function requestAcceptInvitFindPage(acceptInvitCurrent, acceptInvitSize, sid) {
    return service({
        url: GDPM_STUDENT + URL + '/acceptInvitFindPage',
        method: 'GET',
        params: {
            "current" : acceptInvitCurrent,
            "size" : acceptInvitSize,
            "sid" : sid
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

export async function requestHasRefusedFindPage(hasRefusedCurrent, hasRefusedSize, sid) {
    return service({
        url: GDPM_STUDENT + URL + '/hasRefusedFindPage',
        method: 'GET',
        params: {
            "current" : hasRefusedCurrent,
            "size" : hasRefusedSize,
            "sid" : sid
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