import Global from "../../global/Global";
import { MessageBox, Message } from "element-ui";
import service from "../Request";

var GDPM_DIRECTOR = Global.GDPM_DIRECTOR;

var POST_HEADER_URLENCODED = Global.POST_HEADER_URLENCODED;

var ANNOCUNCEMENT_URL = '/dAnnouncement';

export async function requestUpdate(params) {
    return service({
        url: GDPM_DIRECTOR + ANNOCUNCEMENT_URL + '/update',
        method: 'POST',
        data: params,
        headers: {'Content-type': POST_HEADER_URLENCODED}
    }).then(response => {
        if(response.msg == 'success') {
            return response;
        } else {
            MessageBox({
                title: '提示',
                message: '修改失败，请稍后再试',
                type: 'error'
            })
        }
    }).catch(error => {
        MessageBox({
            title: '提示',
            message: '修改失败，请稍后再试',
            type: 'error'
        })
        // console.log(error);
    })
}

export async function requestInsert(params) {
    return service({
        url: GDPM_DIRECTOR + ANNOCUNCEMENT_URL + '/add',
        method: 'POST',
        data: params,
        headers: {'Content-type': POST_HEADER_URLENCODED},
        timeout: 20 * 1000
    }).then(response => {
        if(response.msg == 'success') {
            return response;
        } else {
            MessageBox({
                title: '提示',
                message: '添加失败，请稍后再试',
                type: 'error'
            })
        }
    }).catch(error => {
        MessageBox({
            title: '提示',
            message: '添加失败，请稍后再试',
            type: 'error'
        })
        // console.log(error);
    })
}

export async function requestHandleDelete(params) {
    return service({
        url: GDPM_DIRECTOR + ANNOCUNCEMENT_URL + '/delete',
        method: 'POST',
        data: params,
        headers: {'Content-type': POST_HEADER_URLENCODED}
    }).then(response => {
        if(response.msg == 'success') {
            return response;
        } else {
            MessageBox({
                title: '提示',
                message: '删除失败，请稍后再试',
                type: 'error'
            })
        }
    }).catch(error => {
        MessageBox({
            title: '提示',
            message: '删除失败，请稍后再试',
            type: 'error'
        })
        // console.log(error);
    })
}

export async function requestOnSubmit(current, size, keywords, tid) {
    return service({
        url: GDPM_DIRECTOR + ANNOCUNCEMENT_URL +  '/findPage',
        method: 'GET',
        params: {
            "current" : current,
            "size" : size,
            "tid" : tid,
            "keywords" : keywords
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