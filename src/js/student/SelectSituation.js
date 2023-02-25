import { Message } from 'element-ui';
import {getMultiple} from '../../js/global/PublicMethods'
import {requestHasInvitedFindPage, requestAcceptInvitFindPage, requestHasRefusedFindPage, 
        requestAccept, requestRefused} from '../../js/request/student/SelectSituationApi'

/**
 * 查询已邀请表格的数据
 * @param {*} that 
 */
export function hasInvitedFindPageing(that) {
    var sid = JSON.parse(window.localStorage.getItem('userDTO')).id;
    if(sid == null || sid.length == 0) {
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

    requestHasInvitedFindPage(that.hasInvitedCurrent, that.hasInvitedSize, sid).then(response => {
        if(response.result == null) {
            return;
        }
        that.hasInvitedTotal = response.total;
        that.hasInvitedTableData = response.result;
    })
}

/**
 * 查询已接收邀请表格的数据
 * @param {*} that 
 */
export function acceptInvitFindPageing(that) {
    var sid = JSON.parse(window.localStorage.getItem('userDTO')).id;
    if(sid == null || sid.length == 0) {
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

    requestAcceptInvitFindPage(that.acceptInvitCurrent, that.acceptInvitSize, sid).then(response => {
        if(response.result == null) {
            return;
        }
        that.acceptInvitTotal = response.total;
        that.acceptInvitTableData = response.result;
    })
}

/**
 * 查询已拒绝邀请表格的数据
 * @param {*} that 
 */
export function hasRefusedFindPageing(that) {
    var sid = JSON.parse(window.localStorage.getItem('userDTO')).id;
    if(sid == null || sid.length == 0) {
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

    requestHasRefusedFindPage(that.hasRefusedCurrent, that.hasRefusedSize, sid).then(response => {
        if(response.result == null) {
            return;
        }
        that.hasRefusedTotal = response.total;
        that.hasRefusedTableData = response.result;
    })
}

/**
 * 已邀请
 * 点击下一页或跳转到某一页时会触发
 * 回调参数：当前页
 * @param {*} that 
 * @param {*} cpage 
 */
export function hasInvitedCurrentChangeing(that, cpage) {
    that.$data.hasInvitedCurrent = cpage;

    const params = new URLSearchParams();
    params.append("current", cpage);
    params.append("size", that.hasInvitedSize);

    var sid = JSON.parse(window.localStorage.getItem('userDTO')).id;
    if(sid == null || sid.length == 0) {
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

    params.append("sid", sid);
    requestHasInvitedFindPage(params).then(response => {
        if(response.result == null) {
            return;
        }
        that.hasInvitedTotal = response.total;
        that.hasInvitedTableData = response.result;
    })
}

/**
 * 已接受邀请
 * 获取被选中复选框的行的ID值
 * @param {*} that 
 * @param {*} val 
 */
export function handleSelectionChangeing(that, val) {
    that.multipleSelection = val;
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
    var sid = JSON.parse(window.localStorage.getItem('userDTO')).id;
    if(sid == null || sid.length == 0) {
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

    requestAcceptInvitFindPage(cpage, that.acceptInvitSize, sid).then(response => {
        if(response.result == null) {
            return;
        }
        that.acceptInvitTotal = response.total;
        that.acceptInvitTableData = response.result;
    })
}

/**
 * 已接受邀请
 * 接收
 * @param {*} index 
 * @param {*} row 
 */
export function accepting(that, index, row) {
    const params = new URLSearchParams();
    params.append("tid", row.id);

    var sid = JSON.parse(window.localStorage.getItem('userDTO')).id;
    if(sid == null || sid.length == 0) {
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

    params.append("sid", sid);
    requestAccept(params).then(response => {
        if(response.data.state >= 1) {
            Message.success("已接受老师邀请");
            that.$router.push({
                path: '/StudentManagement/NowProgress'
            });
        } else {
            Message.error("接受邀请失败");
        }
    });
}

/**
 * 已接受邀请
 * 拒绝
 * @param {*} index 
 * @param {*} row 
 */
export function refuseding(index, row, that) {
    that.ids.push(row.id);
    var sid = JSON.parse(window.localStorage.getItem('userDTO')).id;
    if(sid == null || sid.length == 0) {
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

    const params = new URLSearchParams();
    params.append('ids', that.ids);
    params.append('sid', sid);
    requestRefused(params);
    that.ids = [];
    return;
}

/**
 * 批量拒绝方法
 * @param {*} that 
 */
export function batchRefuseding(that) {
    if(getMultiple(that.multipleSelection).length == 0) {
        Message.warning('未选择数据');
        return;
    }
    
    var sid = JSON.parse(window.localStorage.getItem('userDTO')).id;
    if(sid == null || sid.length == 0) {
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

    const params = new URLSearchParams();
    params.append('ids', getMultiple(that.multipleSelection));
    params.append('sid', sid);
    requestRefused(params);
    that.multipleSelection = [];
    return;
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
    var sid = JSON.parse(window.localStorage.getItem('userDTO')).id;
    if(sid == null || sid.length == 0) {
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

    requestHasRefusedFindPage(cpage, that.hasRefusedSize, sid).then(response => {
        if(response.result == null) {
            return;
        }
        that.hasRefusedTotal = response.total;
        that.hasRefusedTableData = response.result;
    })
}