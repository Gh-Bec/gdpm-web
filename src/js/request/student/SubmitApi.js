import Global from "../../global/Global";
import { MessageBox } from "element-ui";
import service from "../Request";

var GDPM_FILE = Global.GDPM_FILE;
var GDPM_STUDENT = Global.GDPM_STUDENT;

var POST_HEADER_DATA = Global.POST_HEADER_DATA;
var POST_HEADER_URLENCODED = Global.POST_HEADER_URLENCODED;

var UPLOAD_URL = '/upload';
var URL = '/sumbit';
var COM_URL = '/com';
var OPEN_URL = '/open';
var MID_URL = '/mid';
var FIRST_URL = '/first';
var DEFINE_URL = '/define';
var FINAL_URL = '/final';

export async function requestIsComPass(sid) {
    try {
        const response = await service({
            url: GDPM_STUDENT + URL + COM_URL + '/isComPass',
            method: 'GET',
            headers: { 'Content-type': POST_HEADER_URLENCODED },
            params: {
                "sid" : sid
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

export async function requestInsertCom(params) {
    try {
        const response = await service({
            url: GDPM_STUDENT + URL + COM_URL + '/insert',
            method: 'POST',
            data: params,
            headers: { 'Content-type': POST_HEADER_URLENCODED }
        });
        return response;
    } catch (error) {
        MessageBox({
            title: '提示',
            message: '系统异常，请重新上传文件',
            type: 'error'
        });
        // console.log(error);
    }
}

export async function requestComFindPageing(current, size, sid) {
    try {
        const response = await service({
            url: GDPM_STUDENT + URL + COM_URL + '/findPage',
            method: 'GET',
            headers: { 'Content-type': POST_HEADER_URLENCODED },
            params: {
                "current": current,
                "size": size,
                "sid": sid,
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

export async function requestIsOpenPass(sid) {
    try {
        const response = await service({
            url: GDPM_STUDENT + URL + OPEN_URL + '/isOpenPass',
            method: 'GET',
            headers: { 'Content-type': POST_HEADER_URLENCODED },
            params: {
                "sid" : sid
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

export async function requestInsertOpen(params) {
    try {
        const response = await service({
            url: GDPM_STUDENT + URL + OPEN_URL + '/insert',
            method: 'POST',
            data: params,
            headers: { 'Content-type': POST_HEADER_URLENCODED }
        });
        return response;
    } catch (error) {
        MessageBox({
            title: '提示',
            message: '系统异常，请重新上传文件',
            type: 'error'
        });
        // console.log(error);
    }
}

export async function requestOpenFindPage(current, size, sid) {
    try {
        const response = await service({
            url: GDPM_STUDENT + URL + OPEN_URL + '/findPage',
            method: 'GET',
            headers: { 'Content-type': POST_HEADER_URLENCODED },
            params: {
                "current": current,
                "size": size,
                "sid": sid,
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

export async function requestIsMidPass(sid) {
    try {
        const response = await service({
            url: GDPM_STUDENT + URL + MID_URL + '/isMidPass',
            method: 'GET',
            headers: { 'Content-type': POST_HEADER_URLENCODED },
            params: {
                "sid" : sid
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

export async function requestInsertMid(params) {
    try {
        const response = await service({
            url: GDPM_STUDENT + URL + MID_URL + '/insert',
            method: 'POST',
            data: params,
            headers: { 'Content-type': POST_HEADER_URLENCODED }
        });
        return response;
    } catch (error) {
        MessageBox({
            title: '提示',
            message: '系统异常，请重新上传文件',
            type: 'error'
        });
        // console.log(error);
    }
}

export async function requestMidFindPage(current, size, sid) {
    try {
        const response = await service({
            url: GDPM_STUDENT + URL + MID_URL + '/findPage',
            method: 'GET',
            headers: { 'Content-type': POST_HEADER_URLENCODED },
            params: {
                "current": current,
                "size": size,
                "sid": sid,
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

export async function requestIsFirst(sid) {
    try {
        const response = await service({
            url: GDPM_STUDENT + URL + FIRST_URL + '/isFirstPass',
            method: 'GET',
            headers: { 'Content-type': POST_HEADER_URLENCODED },
            params: {
                "sid" : sid
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

export async function requestInsertFirst(params) {
    try {
        const response = await service({
            url: GDPM_STUDENT + URL + FIRST_URL + '/insert',
            method: 'POST',
            data: params,
            headers: { 'Content-type': POST_HEADER_URLENCODED }
        });
        return response;
    } catch (error) {
        MessageBox({
            title: '提示',
            message: '系统异常，请重新上传文件',
            type: 'error'
        });
        // console.log(error);
    }
}

export async function requestFirstFindPage(current, size, sid) {
    try {
        const response = await service({
            url: GDPM_STUDENT + URL + FIRST_URL + '/findPage',
            method: 'GET',
            headers: { 'Content-type': POST_HEADER_URLENCODED },
            params: {
                "current": current,
                "size": size,
                "sid": sid,
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

export async function requestIsFinalPass(sid) {
    try {
        const response = await service({
            url: GDPM_STUDENT + URL + FINAL_URL + '/isFinalPass',
            method: 'GET',
            headers: { 'Content-type': POST_HEADER_URLENCODED },
            params: {
                "sid" : sid
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

export async function requestInsertFinal(params) {
    try {
        const response = await service({
            url: GDPM_STUDENT + URL + FINAL_URL + '/insert',
            method: 'POST',
            data: params,
            headers: { 'Content-type': POST_HEADER_URLENCODED }
        });
        return response;
    } catch (error) {
        MessageBox({
            title: '提示',
            message: '系统异常，请重新上传文件',
            type: 'error'
        });
        // console.log(error);
    }
}

export async function requestFinalFindPage(current, size, sid) {
    try {
        const response = await service({
            url: GDPM_STUDENT + URL + FINAL_URL + '/findPage',
            method: 'GET',
            headers: { 'Content-type': POST_HEADER_URLENCODED },
            params: {
                "current": current,
                "size": size,
                "sid": sid,
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

export async function requestInsertDefinte(params) {
    try {
        const response = await service({
            url: GDPM_STUDENT + URL + DEFINE_URL + '/insert',
            method: 'POST',
            data: params,
            headers: { 'Content-type': POST_HEADER_URLENCODED }
        });
        return response;
    } catch (error) {
        MessageBox({
            title: '提示',
            message: '系统异常，请重新上传文件',
            type: 'error'
        });
        // console.log(error);
    }
}

export async function requestIsFinalizedPass(sid) {
    try {
        const response = await service({
            url: GDPM_STUDENT + URL + DEFINE_URL + '/isDefinePass',
            method: 'GET',
            headers: { 'Content-type': POST_HEADER_URLENCODED },
            params: {
                "sid" : sid
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

export async function requestDefineFindPage(current, size, sid) {
    try {
        const response = await service({
            url: GDPM_STUDENT + URL + DEFINE_URL + '/findPage',
            method: 'GET',
            headers: { 'Content-type': POST_HEADER_URLENCODED },
            params: {
                "current": current,
                "size": size,
                "sid": sid,
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