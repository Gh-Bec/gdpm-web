import Global from "../../global/Global";
import { MessageBox } from "element-ui";
import service from "../request";

var GDPM_ADMIN = Global.GDPM_ADMIN;
var TEASTAURL = '/statistical';

/**
 * 修改教师数据
 * @param {*} teacherForm 
 * @returns 
 */

/**
 * 院系人数分布查询
 * @param {*} params 
 * @returns 
 */
export async function teaDepTotalStatisticalRequest() {
    try {
        const response = await service({
            url: GDPM_ADMIN + TEASTAURL + '/teaDepTotalStatistical',
            method: 'GET'
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
 * 职称人数统计查询
 * @param {*} params 
 * @returns 
 */
export async function teaPrtTotalStatisticalRequest() {
    try {
        const response = await service({
            url: GDPM_ADMIN + TEASTAURL + '/teaPrtTotalStatistical',
            method: 'GET'
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