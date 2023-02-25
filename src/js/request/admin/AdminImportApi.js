import Global from "../../global/Global";
import { MessageBox } from "element-ui";
import service from "../request";

var GDPM_ADMIN = Global.GDPM_ADMIN;

var POST_HEADER_URLENCODED = Global.POST_HEADER_URLENCODED;

var ADMINURL = '/admin';

export async function requestOnSubmit(current, size, aid) {
    try {
        const response = await service({
            url: GDPM_ADMIN + ADMINURL + '/search',
            method: 'GET',
            headers: { 'Content-type': POST_HEADER_URLENCODED },
            params: {
                "current": current,
                "size": size,
                "aid": aid
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

export async function requestHandleDelete(params) {
    return service({
        url: GDPM_ADMIN + ADMINURL + '/delete',
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

export async function requestInsertAdmin(adminForm) {
    return service({
        url: GDPM_ADMIN + ADMINURL + '/add',
        method: 'POST',
        data: adminForm
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

export async function requestupdateAdmin(adminForm) {
    return service({
        url: GDPM_ADMIN + ADMINURL + '/update',
        method: 'POST',
        data: adminForm
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

/**
 * 院系数据查询
 * @param {*} orderArray 
 */
export async function requestDepartmentList() {
    return service({
        url: GDPM_ADMIN +  ADMINURL + '/findAll',
        method: 'GET'
    }).then(response => {
        if(response.msg == 'success') {
            return response;
        }
    }).catch(error => {
        // console.log(error);
    })
}