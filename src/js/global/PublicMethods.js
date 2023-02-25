import { Message, MessageBox } from "element-ui";
import { requestUpload , requestDownLoading } from "../request/PublicMethodsApi";
import Global from "./Global";
import {requestDepartmentList} from '../request/admin/DepartmentsImportApi'
import {requestProfessionalList} from '../request/admin/ProfessionalImportApi'

export function isUserDtoNotNull(param, that) {
    if(param == null) {
        Message({
            message: '请求参数错误',
            type: 'error'
        })
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("tokenStartTime");
        window.localStorage.removeItem("userDTO");
        that.$router.push({path: '/login'});
        return;
    }
}

export function isUserInfoNotNull(param, that) {
    if(param == null || param.length == 0) {
        Message({
            message: '请求参数错误',
            type: 'error'
        })
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("tokenStartTime");
        window.localStorage.removeItem("userDTO");
        that.$router.push({path: '/login'});
        return;
    }
}

/**
 * 获取院系数据
 * @param {*} that 
 */
export function getDepartmentListing(that) {
    requestDepartmentList().then(response => {
        that.departmentList = response.data;
    });
}

/**
 * 获取专业数据
 * @param {*} that 
 */
export function getProfessionalListing(that) {
    requestProfessionalList().then(response => {
        that.professionalList = response.data;
    });
}

/**
 * 去除空格
 */
export function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 判断字符串是否全为数字组成
 * @param {*} str 
 * @returns 
 */
export function isAllNumber(str) {
    return /^\d+$/.test(str);
}

const token = Global.token

/**
 * 设置 token
 * @param {*} token 
 */
export const setToken = (newToken) => {
    window.localStorage.setItem(token, JSON.stringify(newToken))
}

/**
 * 获取 token
 * @returns 
 */
export const getToken = () => {
    return JSON.parse(window.localStorage.getItem(token))
}

/**
 * 移除 token
 */
export const remToken = () => {
    window.localStorage.removeItem(token)
}

/**
 * 获取状态的方法
 * @param {*} that 
 */
export function getState(that) {
    that.stateMap = Global.stateMap;
}

export function getAnnouncementMap(that) {
    that.announcementMap = Global.announcementMap;
}

/**
 * 获取表格前多选框数据ID的数组
 * @param {*} that 
 */
export function getMultiple(orderArray) {
    var array = [];
    for(var i = 0; i < orderArray.length; i++) {
        array[i] = orderArray[i].id;
    }
    return array;
}

/**
 * 获取表格前多选框数据url的数组
 * @param {*} that 
 */
export function getMultipleUrl(orderArray) {
    var array = [];
    for(var i = 0; i < orderArray.length; i++) {
        array[i] = orderArray[i].url;
    }
    return array;
}

/**
 * 文件上传成功事件
 */
export function uploadSuccessing() {
    MessageBox({
        title: '提示',
        message: '文件上传成功',
        type: 'success'
    })
}

/**
 * 文件上传失败事件
 */
export function uploadErroring() {
    MessageBox({
        title: '提示',
        message: '文件上传失败，请稍后再试',
        type: 'error'
    })
}

/**
 * 超出文件限制后的执行方法
 * @param {*} that 
 */
export function handleExceeding(that, files, fileList) {
    that.$message.warning(`提示：一次只能选择 3 个文件；请刷新后再试`);
}

/**
 * 文件上传方法
 * @param {*} param 
 */
export function uploading(param) {
    const formData = new FormData();
    formData.append('file', param.file);
    console.log(requestUpload(formData));
}

/**
 * 预览
 * @param {*} index 
 * @param {*} row 
 */
export function previewing(index, row) {
    if(row.url == null || row.url.length == 0) {
        Message.warning('该文件链接为空，请刷新后再试');
    }
    let Base64 = require('js-base64').Base64
    window.open('http://127.0.0.1:8012/onlinePreview?url=' + Base64.encode(row.url));
}

/**
 * 下载
 * @param {*} index 
 * @param {*} row 
 */
export function downloading(index, row) {
    console.log(row.url);
    requestDownLoading(row.url).then(response => {
        let data = response.data;
        var blob = new Blob([data]);
        var a = document.createElement('a');  //  创建下载的链接
        a.style.display = 'none';
        var href = window.URL.createObjectURL(blob);
        a.href = href;
        let filename = response.headers['content-disposition'].split('=')[1];
        a.download = decodeURI(filename);  //  对文件名有中文的进行中文解码
        document.appendChild(a);  //  利用a标签做下载
        a.click();  //  点击开始下载
        document.body.removeChild(a);  //  下载后移除元素
        window.URL.revokeObjectURL(href);  //  释放blob对象
    }).catch(function (error) {
        MessageBox({
            title: '提示',
            message: '文件下载失败，请稍后再试',
            type: 'error'
        });
        console.log(error.message);
    });
}

/**
 * 返回值处理方法
 * @param {*} response 
 */
export function dealResponse(response) {
    if(response.msg == 'success') {
        return response;
    } else {
        MessageBox({
            title: '提示',
            message: response.msg,
            type: 'error'
        })
    }
    console.log(response);
}

/**
 * 处理时间
 * @param {*} date 
 * @returns 
 */
export function renderTime(date) {
    var dates = new Date(date).toJSON();
    return new Date(+new Date(dates) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
}