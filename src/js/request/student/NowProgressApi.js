import Global from "../../global/Global";
import { Message, MessageBox } from "element-ui";
import service from "../Request";

var GDPM_STUDENT = Global.GDPM_STUDENT;
var NOWURL = '/nowProgress';

export function requestGetRelationInfo(id) {
    return service({
        url: GDPM_STUDENT + NOWURL + '/selectRelationVO',
        method: 'GET',
        params: {
            "id": id
        }
    }).then(response => {
        if(response.msg == 'success') {
            return response;
        } else {
            if(response.msg == null || response.msg.length == 0) {
                Message.error("数据查询失败");
            } else {
                Message.error(response.msg);
            }
        }
    }).catch(error => {
        Message.error(response.msg);
        // console.log(error);
    })
}

export function requestGetTeacher(tid) {
    return service({
        url: GDPM_STUDENT + NOWURL + '/selectTeacher',
        method: 'GET',
        params: {
            "id": tid
        }
    }).then(response => {
        if(response.msg == 'success') {
            return response;
        } else {
            if(response.msg == null || response.msg.length == 0) {
                Message.error("数据查询失败");
            } else {
                Message.error(response.msg);
            }
        }
    }).catch(error => {
        Message.error(response.msg);
        // console.log(error);
    })
}