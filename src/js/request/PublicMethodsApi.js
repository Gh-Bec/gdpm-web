import Global from "../global/Global";
import { MessageBox } from "element-ui";
import service from "./Request";

var GDPM_FILE = Global.GDPM_FILE;
var POST_HEADER_DATA = Global.POST_HEADER_DATA;
var POST_HEADER_URLENCODED = Global.POST_HEADER_URLENCODED;

export async function requestZipDownload(param) {
    try {
        const response = await service({
            url: GDPM_FILE + '/upload/zipDownload',
            method: 'POST',
            data: param,
            responseType: 'blob',
            withCredentials: true
        })
        // console.log(response.size);
        // console.log(response.data.size);
        let blob = new Blob([response.data], {type: "application/zip"});
        let objectUrl = URL.createObjectURL(blob);
        window.location.href = objectUrl;
    } catch (error) { 
        MessageBox({
            title: '提示',
            message: '文件下载失败，请稍后再试',
            type: 'error'
        })
    }
}

/**
 * 文件上传
 * @param {*} orderArray 
 */
export async function requestUpload(formData) {
    return service({
        url: GDPM_FILE + '/upload/file',
        method: 'POST',
        data: formData,
        headers: {'Content-type': POST_HEADER_DATA}
    }).then(response => {
        if(response.msg == 'success') {
            MessageBox({
                title: '提示',
                message: '上传成功',
                type: 'success'
            })
            return response;
        } else {
            MessageBox({
                title: '提示',
                message: '文件上传失败，请稍后再试',
                type: 'error'
            })
        }
    }).catch(error => {
        // console.log(error);
    })
}

export async function requestDownLoading(url) {
    return service({
        url: GDPM_FILE + '/upload/downloadFile',
        method: 'GET',
        headers: {'Content-type': POST_HEADER_URLENCODED},
        params: {
            "file": url
        }
    }).then(response => {
        if(response.msg == 'success') {
            return response;
        } else {
            MessageBox({
                title: '提示',
                message: '文件下载失败，请稍后再试',
                type: 'error'
            })
        }
    }).catch(error => {
        // console.log(error);
    })
}