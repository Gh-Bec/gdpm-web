import Global from "../../global/Global";
import { MessageBox, Message } from "element-ui";
import service from "../request";

var GDPM_DIRECTOR = Global.GDPM_DIRECTOR;

var SUBJECT_URL = '/dSubject';
var TOPIC_DECLARATION_URL = '/dDeclaration';
var TOPIC_DEPLACE_URL = '/dReplace';

var POST_HEADER_URLENCODED = Global.POST_HEADER_URLENCODED;

export async function requestReplaceRefused(params) {
    return service({
        url: GDPM_DIRECTOR + SUBJECT_URL + TOPIC_DEPLACE_URL + '/refused',
        method: 'POST',
        data: params,
        headers: {'Content-type': POST_HEADER_URLENCODED}
    }).then(response => {
        if(response.msg == 'success') {
            return response;
        } else {
            Message.error('审批失败，请稍后再试');
        }
    }).catch(error => {
        Message.error('审批失败，请稍后再试');
        // console.log(error);
    })
}

export async function requestReplaceAgree(params) {
    return service({
        url: GDPM_DIRECTOR + SUBJECT_URL + TOPIC_DEPLACE_URL + '/agree',
        method: 'POST',
        data: params,
        headers: {'Content-type': POST_HEADER_URLENCODED}
    }).then(response => {
        if(response.msg == 'success') {
            return response;
        } else {
            Message.error('审批失败，请稍后再试');
        }
    }).catch(error => {
        Message.error('审批失败，请稍后再试');
        // console.log(error);
    })
}

export async function requestReplaceFindPage(current, size, tid, keywords) {
    return service({
        url: GDPM_DIRECTOR + SUBJECT_URL + TOPIC_DEPLACE_URL +  '/replaceFindPage',
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

export async function requestDeclarationFindPage(current, size, tid, keywords) {
    return service({
        url: GDPM_DIRECTOR + SUBJECT_URL + TOPIC_DECLARATION_URL +  '/declarationFindPage',
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

export async function requestDeclaretionAgree(params) {
    return service({
        url: GDPM_DIRECTOR + SUBJECT_URL + TOPIC_DECLARATION_URL + '/agree',
        method: 'POST',
        data: params,
        headers: {'Content-type': POST_HEADER_URLENCODED}
    }).then(response => {
        if(response.msg == 'success') {
            return response;
        } else {
            Message.error('审批失败，请稍后再试');
        }
    }).catch(error => {
        Message.error('审批失败，请稍后再试');
        // console.log(error);
    })
}

export async function requestDeclaretionRefused(params) {
    return service({
        url: GDPM_DIRECTOR + SUBJECT_URL + TOPIC_DECLARATION_URL + '/refused',
        method: 'POST',
        data: params,
        headers: {'Content-type': POST_HEADER_URLENCODED}
    }).then(response => {
        if(response.msg == 'success') {
            return response;
        } else {
            Message.error('审批失败，请稍后再试');
        }
    }).catch(error => {
        Message.error('审批失败，请稍后再试');
        // console.log(error);
    })
}