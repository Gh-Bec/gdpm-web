import Global from "../../global/Global";
import { MessageBox, Message } from "element-ui";
import service from "../Request";

var GDPM_STUDENT = Global.GDPM_STUDENT;

var ANNOCUNCEMENT_URL = '/sAnnouncement';

export async function requestOnSubmit(current, size, keywords, sid) {
    return service({
        url: GDPM_STUDENT + ANNOCUNCEMENT_URL +  '/findPage',
        method: 'GET',
        params: {
            "current" : current,
            "size" : size,
            "sid" : sid,
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