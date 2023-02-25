import { Message } from 'element-ui';
import {getMultipleUrl} from '../global/PublicMethods';
import {requestZipDownload} from '../request/PublicMethodsApi';

/**
 * 批量下载
 * @param {*} that 
 */
export function batchDownloading(that) {
    if(getMultipleUrl(that.multipleSelection).length == 0) {
        Message.warning("未选择数据");
        return;
    }
    const params = new URLSearchParams();
    params.append("filePathList", getMultipleUrl(that.multipleSelection));
    requestZipDownload(params);
}

/**
 * 点击查看公告或邮件的方法
 * @param {*} that 
 */
export function toViewing(that, index, row) {
    that.opinion = row.content;
}