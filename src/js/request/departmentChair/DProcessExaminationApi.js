import Global from "../../global/Global";
import { MessageBox, Message } from "element-ui";
import service from "../request";

var GDPM_DIRECTOR = Global.GDPM_DIRECTOR;

var POST_HEADER_URLENCODED = Global.POST_HEADER_URLENCODED;

var Examination_URL = '/dProcess';

var COM_URL = '/dCommitment';
var OPEN_URL = '/dOpenReport';
var MID_URL = '/dIntermediate';
var FIRST_URL = '/dFirst';
var FINALIZED_URL = '/dFinalized';
var FINAL_URL = '/dFinal';

export async function requestFinalRefused(params) {
    return service({
        url: GDPM_DIRECTOR + Examination_URL + FINAL_URL + '/refused',
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

export async function requestFinalAgree(params) {
    return service({
        url: GDPM_DIRECTOR + Examination_URL + FINAL_URL + '/agree',
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

export async function requestFinalFindPage(current, size, tid, keywords) {
    return service({
        url: GDPM_DIRECTOR + Examination_URL + FINAL_URL +  '/finalFindPage',
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

export async function requestFinalizedRefused(params) {
    return service({
        url: GDPM_DIRECTOR + Examination_URL + FINALIZED_URL + '/refused',
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

export async function requestFinalizedAgree(params) {
    return service({
        url: GDPM_DIRECTOR + Examination_URL + FINALIZED_URL + '/agree',
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

export async function requestFinalizedFindPage(current, size, tid, keywords) {
    return service({
        url: GDPM_DIRECTOR + Examination_URL + FINALIZED_URL +  '/finalizedFindPage',
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

export async function requestFirstRefused(params) {
    return service({
        url: GDPM_DIRECTOR + Examination_URL + FIRST_URL + '/refused',
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

export async function requestFirstAgree(params) {
    return service({
        url: GDPM_DIRECTOR + Examination_URL + FIRST_URL + '/agree',
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

export async function requestFirstFindPage(current, size, tid, keywords) {
    return service({
        url: GDPM_DIRECTOR + Examination_URL + FIRST_URL +  '/firstFindPage',
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

export async function requestIntermediateRefused(params) {
    return service({
        url: GDPM_DIRECTOR + Examination_URL + MID_URL + '/refused',
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

export async function requestIntermediateAgree(params) {
    return service({
        url: GDPM_DIRECTOR + Examination_URL + MID_URL + '/agree',
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

export async function requestMidFindPage(current, size, tid, keywords) {
    return service({
        url: GDPM_DIRECTOR + Examination_URL + MID_URL +  '/intermediateFindPage',
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

export async function requestOpenFindPage(current, size, tid, keywords) {
    return service({
        url: GDPM_DIRECTOR + Examination_URL + OPEN_URL +  '/openReportFindPage',
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

export async function requestCommitFindPage(current, size, tid, keywords) {
    return service({
        url: GDPM_DIRECTOR + Examination_URL + COM_URL +  '/commitmentFindPage',
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