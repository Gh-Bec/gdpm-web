import {isUserInfoNotNull, isUserDtoNotNull} from '../global/PublicMethods'
import {requestHasRefused, requestAcceptInvit, requestHasDetermine} from '../request/teacher/TeacherSelectApi'

/**
 * 已确定
 * 点击下一页或跳转到某一页时会触发
 * 回调参数：当前页
 * @param {*} that 
 * @param {*} cpage 
 */
export function hasDetermineCurrentChangeing(that, cpage) {
    that.$data.currentPage = cpage;
    isUserDtoNotNull(window.localStorage.getItem('userDTO'), that);
    var tid = JSON.parse(window.localStorage.getItem('userDTO')).id;
    isUserInfoNotNull(tid, that);
    requestHasDetermine(tid, cpage, that.hasDetermineSize).then(response => {
        if(response.result == null) {
            return;
        }
        that.hasDetermineTotal = response.total;
        that.hasDetermineTableData = response.result;
    })
}

export function hasDetermineFindPageing(that) {
    isUserDtoNotNull(window.localStorage.getItem('userDTO'), that);
    var tid = JSON.parse(window.localStorage.getItem('userDTO')).id;
    isUserInfoNotNull(tid, that);
    requestHasDetermine(tid, that.hasDetermineCurrent, that.hasDetermineSize).then(response => {
        if(response.result == null) {
            return;
        }
        that.hasDetermineTotal = response.total;
        that.hasDetermineTableData = response.result;
    })
}

/**
 * 已接受邀请
 * 点击下一页或跳转到某一页时会触发
 * 回调参数：当前页
 * @param {*} that 
 * @param {*} cpage 
 */
export function acceptInvitCurrentChangeing(that, cpage) {
    that.$data.currentPage = cpage;
    isUserDtoNotNull(window.localStorage.getItem('userDTO'), that);
    var tid = JSON.parse(window.localStorage.getItem('userDTO')).id;
    isUserInfoNotNull(tid, that);
    requestAcceptInvit(tid, cpage, that.acceptInvitSize).then(response => {
        if(response.result == null) {
            return;
        }
        that.acceptInvitTotal = response.total;
        that.acceptInvitTableData = response.result;
    })
}

export function acceptInvitFindPageing(that) {
    isUserDtoNotNull(window.localStorage.getItem('userDTO'), that);
    var tid = JSON.parse(window.localStorage.getItem('userDTO')).id;
    isUserInfoNotNull(tid, that);
    requestAcceptInvit(tid, that.acceptInvitCurrent, that.acceptInvitSize).then(response => {
        if(response.result == null) {
            return;
        }
        that.acceptInvitTotal = response.total;
        that.acceptInvitTableData = response.result;
    })
}


/**
 * 已拒绝邀请
 * 点击下一页或跳转到某一页时会触发
 * 回调参数：当前页
 * @param {*} that 
 * @param {*} cpage 
 */
export function hasRefusedCurrentChangeing(that, cpage) {
    that.$data.currentPage = cpage;
    isUserDtoNotNull(window.localStorage.getItem('userDTO'), that);
    var tid = JSON.parse(window.localStorage.getItem('userDTO')).id;
    isUserInfoNotNull(tid, that);
    requestHasRefused(tid, cpage, that.hasRefusedSize).then(response => {
        if(response.result == null) {
            return;
        }
        that.hasRefusedTotal = response.total;
        that.hasRefusedTableData = response.result;
    })
}

export function hasRefusedFindPageing(that) {
    isUserDtoNotNull(window.localStorage.getItem('userDTO'), that);
    var tid = JSON.parse(window.localStorage.getItem('userDTO')).id;
    isUserInfoNotNull(tid, that);
    requestHasRefused(tid, that.hasRefusedCurrent, that.hasRefusedSize).then(response => {
        if(response.result == null) {
            return;
        }
        that.hasRefusedTotal = response.total;
        that.hasRefusedTableData = response.result;
    })
}