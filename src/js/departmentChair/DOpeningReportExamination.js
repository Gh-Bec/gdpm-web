import { Message, MessageBox } from 'element-ui';
import {trim, getMultiple, isUserInfoNotNull, isUserDtoNotNull} from '../../js/global/PublicMethods'
import {requestOpenFindPage} from '../request/departmentChair/DProcessExaminationApi';

export function openFindPageing(that) {
    isUserDtoNotNull(window.localStorage.getItem('userDTO'), that);
    var tid = JSON.parse(window.localStorage.getItem('userDTO')).id;
    isUserInfoNotNull(tid, that);
    var keywords = that.keywords;
    if(keywords != null || keywords.length != 0) {
        keywords = trim(keywords);
    }
    requestOpenFindPage(that.current, that.size, tid, keywords).then(response => {
        if(response.result == null) {
            return;
        }
        that.total = response.total;
        that.tableData = response.result;
    })
}

/**
 * 搜索点击事件
 * @param {*} that 
 */
export function onSubmitimg(that) {
    isUserDtoNotNull(window.localStorage.getItem('userDTO'), that);
    var tid = JSON.parse(window.localStorage.getItem('userDTO')).id;
    isUserInfoNotNull(tid, that);
    var keywords = that.keywords;
    if(keywords != null || keywords.length != 0) {
        keywords = trim(keywords);
    }
    requestOpenFindPage(that.current, that.size, tid, keywords).then(response => {
        if(response.result == null) {
            return;
        }
        that.total = response.total;
        that.tableData = response.result;
    })
}

/**
 * 点击下一页或跳转到某一页时会触发
 * 回调参数：当前页
 * @param {*} that 
 * @param {*} cpage 
 */
export function currentChangeing(that, cpage) {
    that.$data.currentPage = cpage;
    isUserDtoNotNull(window.localStorage.getItem('userDTO'), that);
    var tid = JSON.parse(window.localStorage.getItem('userDTO')).id;
    isUserInfoNotNull(tid, that);
    var keywords = that.keywords;
    if(keywords != null || keywords.length != 0) {
        keywords = trim(keywords);
    }
    requestOpenFindPage(cpage, that.size, tid, keywords).then(response => {
        if(response.result == null) {
            return;
        }
        that.total = response.total;
        that.tableData = response.result;
    })
}

/**
 * 获取被选中复选框的行的ID值
 * @param {*} that 
 * @param {*} val 
 */
export function handleSelectionChangeing(that, val) {
    that.multipleSelection = val;
}

