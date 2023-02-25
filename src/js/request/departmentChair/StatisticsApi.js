import Global from "../../global/Global";
import { MessageBox, Message } from "element-ui";
import service from "../request";

var GDPM_DIRECTOR = Global.GDPM_DIRECTOR;
var POST_HEADER_URLENCODED = Global.POST_HEADER_URLENCODED;
var DIRECTOR_STATISTICS_URL = '/dStatistics';

export async function requestDefineUpdate(params) {
    return service({
        url: GDPM_DIRECTOR + DIRECTOR_STATISTICS_URL + '/updateSelect',
        method: 'POST',
        data: params,
        headers: {'Content-type': POST_HEADER_URLENCODED}
    }).then(response => {
        if(response.msg == 'success') {
            return response;
        } else {
            Message.error('修改失败，请稍后再试');
        }
    }).catch(error => {
        Message.error('修改失败，请稍后再试');
        // console.log(error);
    })
}

export async function requestGetTeacherList(sid) {
    return service({
        url: GDPM_DIRECTOR + DIRECTOR_STATISTICS_URL + '/getTeacherList',
        method: 'GET',
        params: {
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

export async function requestDistributionFindPage(current, size, tid, keywords) {
    return service({
        url: GDPM_DIRECTOR + DIRECTOR_STATISTICS_URL + '/distributionFindPage',
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

export async function finishStatisticalRequest(tid) {
    return service({
        url: GDPM_DIRECTOR + DIRECTOR_STATISTICS_URL + '/finishStatistical',
        method: 'GET',
        params: {
            "tid" : tid,
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

