import Global from "../../global/Global";
import { MessageBox, Message } from "element-ui";
import service from "../Request";

var GDPM_TEACHER = Global.GDPM_TEACHER;
var GDPM_FILE = Global.GDPM_FILE;

var POST_HEADER_URLENCODED = Global.POST_HEADER_URLENCODED;
var POST_HEADER_DATA = Global.POST_HEADER_DATA;

var UPLOAD_URL = '/upload';
var SUBJECT_URL = '/tSubject';
var Examination_URL = '/tProcess';

var TOPIC_DECLARATION_URL = '/tDeclaration';
var TOPIC_DEPLACE_URL = '/tReplace';

var COM_URL = '/tCommitment';
var OPEN_URL = '/tOpenReport';
var MID_URL = '/tIntermediate';
var FIRST_URL = '/tFirst';
var FINALIZED_URL = '/tFinalized';
var FINAL_URL = '/tFinal';

export async function requestFileUpload(formData) {
    try {
        const response = await service({
            url: GDPM_FILE + UPLOAD_URL + '/file',
            method: 'POST',
            data: formData,
            headers: { 'Content-type': POST_HEADER_DATA }
        });
        return response;
    } catch (error) {
        MessageBox({
            title: '提示',
            message: '文件上传失败，请稍后再试',
            type: 'error'
        });
        // console.log(error);
    }
}

export async function requestDeclaretionAgree(params) {
    return service({
        url: GDPM_TEACHER + SUBJECT_URL + TOPIC_DECLARATION_URL + '/agree',
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
        url: GDPM_TEACHER + SUBJECT_URL + TOPIC_DECLARATION_URL + '/refused',
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

export async function requestDeclarationFindPage(current, size, tid) {
    return service({
        url: GDPM_TEACHER + SUBJECT_URL + TOPIC_DECLARATION_URL +  '/declarationFindPage',
        method: 'GET',
        params: {
            "current" : current,
            "size" : size,
            "tid" : tid
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

export async function requestReplaceFindPage(current, size, tid) {
    return service({
        url: GDPM_TEACHER + SUBJECT_URL + TOPIC_DEPLACE_URL +  '/replaceFindPage',
        method: 'GET',
        params: {
            "current" : current,
            "size" : size,
            "tid" : tid
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

export async function requestReplaceAgree(params) {
    return service({
        url: GDPM_TEACHER + SUBJECT_URL + TOPIC_DEPLACE_URL + '/agree',
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

export async function requestReplaceRefused(params) {
    return service({
        url: GDPM_TEACHER + SUBJECT_URL + TOPIC_DEPLACE_URL + '/refused',
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

export async function requestCommitFindPage(current, size, tid) {
    return service({
        url: GDPM_TEACHER + Examination_URL + COM_URL +  '/commitmentFindPage',
        method: 'GET',
        params: {
            "current" : current,
            "size" : size,
            "tid" : tid
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

export async function requestCommitmentAgree(params) {
    return service({
        url: GDPM_TEACHER + Examination_URL + COM_URL + '/agree',
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

export async function requestCommitmentRefused(params) {
    return service({
        url: GDPM_TEACHER + Examination_URL + COM_URL + '/refused',
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

export async function requestOpenFindPage(current, size, tid) {
    return service({
        url: GDPM_TEACHER + Examination_URL + OPEN_URL +  '/openReportFindPage',
        method: 'GET',
        params: {
            "current" : current,
            "size" : size,
            "tid" : tid
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

export async function requestOpenRecordAgree(params) {
    return service({
        url: GDPM_TEACHER + Examination_URL + OPEN_URL + '/agree',
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

export async function requestOpenRecordRefused(params) {
    return service({
        url: GDPM_TEACHER + Examination_URL + OPEN_URL + '/refused',
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

export async function requestMidFindPage(current, size, tid) {
    return service({
        url: GDPM_TEACHER + Examination_URL + MID_URL +  '/intermediateFindPage',
        method: 'GET',
        params: {
            "current" : current,
            "size" : size,
            "tid" : tid
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

export async function requestIntermediateAgree(params) {
    return service({
        url: GDPM_TEACHER + Examination_URL + MID_URL + '/agree',
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

export async function requestIntermediateRefused(params) {
    return service({
        url: GDPM_TEACHER + Examination_URL + MID_URL + '/refused',
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

export async function requestFirstFindPage(current, size, tid) {
    return service({
        url: GDPM_TEACHER + Examination_URL + FIRST_URL +  '/firstFindPage',
        method: 'GET',
        params: {
            "current" : current,
            "size" : size,
            "tid" : tid
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

export async function requestFirstAgree(params) {
    return service({
        url: GDPM_TEACHER + Examination_URL + FIRST_URL + '/agree',
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

export async function requestFirstRefused(params) {
    return service({
        url: GDPM_TEACHER + Examination_URL + FIRST_URL + '/refused',
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

export async function requestFinalizedFindPage(current, size, tid) {
    return service({
        url: GDPM_TEACHER + Examination_URL + FINALIZED_URL +  '/finalizedFindPage',
        method: 'GET',
        params: {
            "current" : current,
            "size" : size,
            "tid" : tid
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

export async function requestFinalizedAgree(params) {
    return service({
        url: GDPM_TEACHER + Examination_URL + FINALIZED_URL + '/agree',
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

export async function requestFinalizedRefused(params) {
    return service({
        url: GDPM_TEACHER + Examination_URL + FINALIZED_URL + '/refused',
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

export async function requestFinalFindPage(current, size, tid) {
    return service({
        url: GDPM_TEACHER + Examination_URL + FINAL_URL +  '/finalFindPage',
        method: 'GET',
        params: {
            "current" : current,
            "size" : size,
            "tid" : tid
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

export async function requestFinalAgree(params) {
    return service({
        url: GDPM_TEACHER + Examination_URL + FINAL_URL + '/agree',
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

export async function requestFinalRefused(params) {
    return service({
        url: GDPM_TEACHER + Examination_URL + FINAL_URL + '/refused',
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