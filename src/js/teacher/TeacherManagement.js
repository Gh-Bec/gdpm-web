import {getMultipleUrl} from '../global/PublicMethods'

/**
 * 批量下载
 * @param {*} that 
 */
export function batchDownloading(that) {
    console.log(getMultipleUrl(that.multipleSelection));
}

/**
 * 点击查看公告或邮件的方法
 * @param {*} that 
 */
export function toViewing(that, index, row) {
    that.opinion = row.content;
}