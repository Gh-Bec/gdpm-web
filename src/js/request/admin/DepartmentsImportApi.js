import Global from "../../global/Global";
import { MessageBox } from "element-ui";
import service from "../request";

var GDPM_FILE = Global.GDPM_FILE;
var GDPM_ADMIN = Global.GDPM_ADMIN;

var POST_HEADER_DATA = Global.POST_HEADER_DATA;
var POST_HEADER_URLENCODED = Global.POST_HEADER_URLENCODED;

var DEPURL = '/department';

/**
 * 模糊查询
 * @param {*} params 
 * @returns 
 */
export async function requestOnSubmit(current, size, keywords) {
    try {
        const response = await service({
            url: GDPM_ADMIN + DEPURL + '/search',
            method: 'GET',
            headers: { 'Content-type': POST_HEADER_URLENCODED },
            params: {
                "current": current,
                "size": size,
                "keywords": keywords
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

/**
 * 删除院系
 * @param {*} params 
 * @returns 
 */
export async function requestHandleDelete(params) {
    return service({
        url: GDPM_ADMIN + DEPURL + '/delete',
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

/**
 * 添加院系
 * @param {*} departmentForm 
 * @returns 
 */
export async function requestInsertDepart(departmentForm) {
    return service({
        url: GDPM_ADMIN + DEPURL + '/add',
        method: 'POST',
        data: departmentForm
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

/**
 * 修改院系数据
 * @param {*} departmentForm 
 * @returns 
 */
export async function requestUpdateDepart(departmentForm) {
    return service({
        url: GDPM_ADMIN + DEPURL + '/update',
        method: 'POST',
        data: departmentForm
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
        url: GDPM_ADMIN +  DEPURL + '/findAll',
        method: 'GET'
    }).then(response => {
        if(response.msg == 'success') {
            return response;
        }
    }).catch(error => {
        // console.log(error);
    })
}

/**
 * 院系表格上传
 * @param {*} orderArray 
 */
export async function requestDepartmentsImport(formData) {
    return service({
        url: GDPM_FILE + '/excel/importData',
        method: 'POST',
        data: formData,
        headers: {'Content-type': POST_HEADER_DATA}
    }).then(response => {
        if(response.msg == 'success') {
            MessageBox({
                title: '提示',
                message: '数据导入成功',
                type: 'success'
            })
            return response;
        } else {
            if(response.msg.length == 0 || response.msg == null) {
                MessageBox({
                    title: '提示',
                    message: '导入失败，请检查表格的数据',
                    type: 'error'
                })
            } else {
                MessageBox({
                    title: '提示',
                    message: response.msg,
                    type: 'error'
                })
            }
        }
    }).catch(error => {
        MessageBox({
            title: '提示',
            message: '数据查询失败，请稍后再试',
            type: 'error'
        })
        // console.log(error);
    })
}