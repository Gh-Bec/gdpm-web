import { Message } from 'element-ui';
import {trim, getMultiple, isUserDtoNotNull, isUserInfoNotNull} from '../../js/global/PublicMethods'
import {requestOnSubmit, requestInvitation, requestTeacherListInitData} from '../request/student/TeacherListApi'

export function initDataing(that) {
    isUserDtoNotNull(window.localStorage.getItem('userDTO'), that);
    var sid = JSON.parse(window.localStorage.getItem('userDTO')).id;
    isUserInfoNotNull(sid, that);

    requestTeacherListInitData(sid).then(response => {
        if("null" == response.data.tid) {
            that.isOpen = false;
        }
    })
}

/**
 * 查询表格的数据
 * @param {*} that 
 */
export function dFindPageing(that) {
    var keywords = that.keywords;
    if(keywords != null && keywords.length > 0) {
        keywords = trim(keywords);
    }

    var professional = JSON.parse(window.localStorage.getItem('userDTO')).professional;
    if(professional == null || professional.length == 0) {
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

    requestOnSubmit(keywords, that.current, that.size, professional).then(response => {
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
    var keywords = that.keywords;
    if(keywords != null && keywords.length > 0) {
        keywords = trim(keywords);
    }

    var professional = JSON.parse(window.localStorage.getItem('userDTO')).professional;
    if(professional == null || professional.length == 0) {
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

    requestOnSubmit(keywords, cpage, that.size, professional).then(response => {
        that.total = response.total;
        that.tableData = response.result;
    })
}

/**
 * 搜索点击事件
 * @param {*} that 
 */
export function onSubmitimg(that) {
    var keywords = that.keywords;
    if(keywords != null && keywords.length > 0) {
        keywords = trim(keywords);
    }

    var professional = JSON.parse(window.localStorage.getItem('userDTO')).professional;
    if(professional == null || professional.length == 0) {
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

    requestOnSubmit(keywords, that.current, that.size, professional).then(response => {
        if(response.result == null) {
            return;
        }
        that.total = response.total;
        that.tableData = response.result;
        that.initData();
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
    requestInvitation(params);
    that.multipleSelection = [];
    return;
}

/**
 * 邀请按钮点击事件
 * @param {*} index 
 * @param {*} row 
 */
export function handleInvitationing(that, index, row) {
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
    requestInvitation(params);
    that.ids = [];
    return;
}