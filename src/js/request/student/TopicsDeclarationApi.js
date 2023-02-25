import Global from "../../global/Global";
import { Message, MessageBox } from "element-ui";
import service from "../request";

var GDPM_STUDENT = Global.GDPM_STUDENT;
var POST_HEADER_URLENCODED = Global.POST_HEADER_URLENCODED;
var URL = '/subject';
var DECLARE_URL = '/declare';
var REPLACE_URL = '/replace'; 

export async function requestDeclarationInitData(sid) {
    try {
        const response = await service({
            url: GDPM_STUDENT + URL + DECLARE_URL + '/initData',
            method: 'GET',
            params: {
                "sid": sid
            }
        });
        if(response.msg == 'success') {
            return response;
        } else {
            Message.error("数据初始化失败，请稍后再试");
        }
    } catch (error) {
        MessageBox({
            title: '提示',
            message: '数据初始化失败，请稍后再试',
            type: 'error'
        });
        // console.log(error);
    }
}

export async function requestFindPage(current, size, sid) {
    try {
        const response = await service({
            url: GDPM_STUDENT + URL + DECLARE_URL + '/findPage',
            method: 'GET',
            params: {
                "current": current,
                "size": size,
                "sid": sid
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

export async function requestDeclare(params) {
    return service({
        url: GDPM_STUDENT + URL + DECLARE_URL+ '/insert',
        method: 'POST',
        data: params,
        headers: {'Content-type': POST_HEADER_URLENCODED}
    }).then(response => {
        if(response.msg == 'success') {
            return response;
        } else {
            Message.error("课题申报失败，请稍后再试");
        }
    }).catch(error => {
        Message.error("课题申报失败，请稍后再试");
        // console.log(error);
    })
}

export async function requestReplaceInitData(sid) {
    try {
        const response = await service({
            url: GDPM_STUDENT + URL + REPLACE_URL + '/initData',
            method: 'GET',
            params: {
                "sid": sid
            }
        });
        if(response.msg == 'success') {
            return response;
        } else {
            Message.error("数据初始化失败，请稍后再试");
        }
    } catch (error) {
        MessageBox({
            title: '提示',
            message: '数据初始化失败，请稍后再试',
            type: 'error'
        });
        // console.log(error);
    }
}

export async function requestRfindPage(current, size, sid) {
    return service({
        url: GDPM_STUDENT + URL + REPLACE_URL + '/findPage',
        method: 'GET',
        params: {
            "current" : current,
            "size" : size,
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

export async function requestReplace(params) {
    return service({
        url: GDPM_STUDENT + URL + REPLACE_URL+ '/insert',
        method: 'POST',
        data: params,
        headers: {'Content-type': POST_HEADER_URLENCODED}
    }).then(response => {
        if(response.msg == 'success') {
            return response;
        } else {
            Message.error("课题更换申请失败，请稍后再试");
        }
    }).catch(error => {
        Message.error("课题更换申请失败，请稍后再试");
        // console.log(error);
    })
}

export async function requestOnSubmit(current, size, department, professional, keywords) {
    return service({
        url: GDPM_STUDENT + URL + '/history',
        method: 'GET',
        headers: {'Content-type': POST_HEADER_URLENCODED},
        params: {
            "current": current, 
            "size": size,
            "department": department,
            "professional": professional,
            "keywords": keywords
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