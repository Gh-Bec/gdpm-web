import Global from "../../global/Global";
import { Message, MessageBox } from "element-ui";
import service from "../request";

var GDPM_STUDENT = Global.GDPM_STUDENT;
var POST_HEADER_URLENCODED = Global.POST_HEADER_URLENCODED;
var URL = '/teacherList';

export async function requestTeacherListInitData(sid) {
    try {
        const response = await service({
            url: GDPM_STUDENT + URL + '/initData',
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

export async function requestInvitation(params) {
    return service({
        url: GDPM_STUDENT + URL + '/invit',
        method: 'POST',
        data: params,
        headers: {'Content-type': POST_HEADER_URLENCODED}
    }).then(response => {
        if(response.msg == 'success') {
            Message.success("邀请成功");
            return response;
        } else {
            if(response.msg == null || response.msg.length == 0) {
                Message.error("邀请失败");
            } else {
                Message.error(response.msg);
            }
        }
    }).catch(error => {
        Message.error("邀请失败，请稍后再试");
        // console.log(error);
    })
}

/**
 * 模糊查询
 * @param {*} params 
 * @returns 
 */
export async function requestOnSubmit(keywords, current, size, professional) {
    return service({
        url: GDPM_STUDENT + URL + '/findPage',
        method: 'GET',
        headers: {'Content-type': POST_HEADER_URLENCODED},
        params: {
            "current": current,
            "size": size,
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