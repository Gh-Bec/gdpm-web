import Global from "../../global/Global";
import { MessageBox } from "element-ui";
import service from "../request";

var GDPM_FILE = Global.GDPM_FILE;
var GDPM_ADMIN = Global.GDPM_ADMIN;

var POST_HEADER_DATA = Global.POST_HEADER_DATA;
var POST_HEADER_URLENCODED = Global.POST_HEADER_URLENCODED;

var STUURL = '/student';

export async function requestIsStuPass() {
    try {
        const response = await service({
            url: GDPM_ADMIN + STUURL + '/isStuPass',
            method: 'GET',
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

/**
 * 修改学生数据
 * @param {*} studentForm 
 * @returns 
 */
export async function requestUpdateStudent(studentForm) {
    return service({
        url: GDPM_ADMIN + STUURL + '/update',
        method: 'POST',
        data: studentForm
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
 * 添加学生
 * @param {*} studentForm 
 * @returns 
 */
export async function requestInsertStudent(studentForm) {
    return service({
        url: GDPM_ADMIN + STUURL + '/add',
        method: 'POST',
        data: studentForm
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
 * 学生表格上传
 * @param {*} formData 
 */
export async function requestStudentImport(formData) {
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
        // console.log(error);
    })
}

/**
 * 删除
 * @param {*} params 
 * @returns 
 */
export async function requestHandleDelete(params) {
    return service({
        url: GDPM_ADMIN + STUURL + '/delete',
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
 * 模糊查询
 * @param {*} params 
 * @returns 
 */
export async function requestOnSubmit(current, size, keywords) {
    return service({
        url: GDPM_ADMIN + STUURL + '/search',
        method: 'GET',
        headers: {'Content-type': POST_HEADER_URLENCODED},
        params: {
            "current": current,
            "size": size,
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