import {getMultiple, trim, isUserInfoNotNull, isUserDtoNotNull} from '../global/PublicMethods'
import {requestTeaStuFindPage, requestAccept, requestRefused, requestInitData} from '../request/teacher/TeacherSelectApi'

export function initDating(that) {
    isUserDtoNotNull(window.localStorage.getItem('userDTO'), that);
    var tid = JSON.parse(window.localStorage.getItem('userDTO')).id;
    isUserInfoNotNull(tid, that);
    requestInitData(tid).then(response => {
        if(response.data.state == null) {
            return;
        }
        if(response.data.state == 0 || response.data.state == "0") {
            that.isOpen = true;
        }
    })
}

export function teaStuFindPageing(that) {
    isUserDtoNotNull(window.localStorage.getItem('userDTO'), that);
    var tid = JSON.parse(window.localStorage.getItem('userDTO')).id;
    isUserInfoNotNull(tid, that);
    requestTeaStuFindPage(tid, trim(that.keywords), that.current, that.size).then(response => {
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
    requestTeaStuFindPage(tid, trim(that.keywords), cpage, that.size).then(response => {
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
    requestTeaStuFindPage(tid, trim(that.keywords), that.current, that.size).then(response => {
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

/**
 * 批量邀请点击事件
 * @param {*} that 
 */
export function batchInviteing(that) {
    isUserDtoNotNull(window.localStorage.getItem('userDTO'), that);
    var tid = JSON.parse(window.localStorage.getItem('userDTO')).id;
    isUserInfoNotNull(tid, that);
    const params = new URLSearchParams();
    params.append('ids', getMultiple(that.multipleSelection));
    params.append('tid', tid);
    return requestAccept(params);
}

/**
 * 邀请按钮点击事件
 * @param {*} index 
 * @param {*} row 
 */
export function handAccepting(that, index, row) {
    isUserDtoNotNull(window.localStorage.getItem('userDTO'), that);
    var tid = JSON.parse(window.localStorage.getItem('userDTO')).id;
    isUserInfoNotNull(tid, that);
    that.acceptIds.push(row.id);
    const params = new URLSearchParams();
    params.append('ids', that.acceptIds);
    params.append('tid', tid);
    return requestAccept(params);
}

/**
 * 批量拒绝点击事件
 * @param {*} that 
 */
export function batchRefuseding(that) {
    isUserDtoNotNull(window.localStorage.getItem('userDTO'), that);
    var tid = JSON.parse(window.localStorage.getItem('userDTO')).id;
    isUserInfoNotNull(tid, that);
    const params = new URLSearchParams();
    params.append('ids', getMultiple(that.multipleSelection));
    params.append('tid', tid);
    return requestRefused(params);
}

/**
 * 邀请拒绝点击事件
 * @param {*} index 
 * @param {*} row 
 */
export function handRefuseding(that, index, row) {
    isUserDtoNotNull(window.localStorage.getItem('userDTO'), that);
    var tid = JSON.parse(window.localStorage.getItem('userDTO')).id;
    isUserInfoNotNull(tid, that);
    that.refusedIds.push(row.id);
    const params = new URLSearchParams();
    params.append('ids', that.refusedIds);
    params.append('tid', tid);
    return requestRefused(params);
}