import { Message, MessageBox } from 'element-ui';
import {trim, isUserInfoNotNull, isUserDtoNotNull} from '../../js/global/PublicMethods'
import {requestDistributionFindPage, requestGetTeacherList, requestDefineUpdate} from '../request/departmentChair/StatisticsApi'

export function defineUpdateing(that) {
    const params = new URLSearchParams();
    params.append('sid', that.selectForm.sid);
    params.append('tid', that.selectForm.tid);
    requestDefineUpdate(params).then(response => {
        if(response.data.state >= 1) {
            Message.success('修改成功');
            that.distributionFindPage();
        } else {
            Message.error('修改失败，请稍后再试');
        }
    })
    that.selectForm.sid = '';
    that.selectForm.sname = '';
    that.selectForm.tid = '';
    that.teachertList = [];
    that.updateVisible = false;
}

export function handleEditing(that, index, row) {
    requestGetTeacherList(row.sid).then(response => {
        if(response.data == null || response.data.length == 0) {
            Message.error("系统异常，请刷新后再试");
        }
        that.teachertList = response.data;
    })
    that.selectForm.sid = row.sid;
    that.selectForm.sname = row.sname;
    that.selectForm.tid = row.tid;
    that.updateVisible = true;
}

export function distributionFindPageing(that) {
    isUserDtoNotNull(window.localStorage.getItem('userDTO'), that);
    var tid = JSON.parse(window.localStorage.getItem('userDTO')).id;
    isUserInfoNotNull(tid, that);
    var keywords = that.keywords;
    if(keywords != null || keywords.length != 0) {
        keywords = trim(keywords);
    }
    requestDistributionFindPage(that.current, that.size, tid, keywords).then(response => {
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
    requestDistributionFindPage(cpage, that.size, tid, keywords).then(response => {
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
    requestDistributionFindPage(that.current, that.size, tid, keywords).then(response => {
        if(response.result == null) {
            return;
        }
        that.total = response.total;
        that.tableData = response.result;
    })
}