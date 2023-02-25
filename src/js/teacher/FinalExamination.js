import { Message, MessageBox } from 'element-ui';
import {getMultiple, isUserInfoNotNull, isUserDtoNotNull} from '../../js/global/PublicMethods'
import {requestFinalFindPage, requestFinalAgree, requestFinalRefused} 
        from '../request/teacher/ExaminationApi';

export function finalFindPageing(that) {
    isUserDtoNotNull(window.localStorage.getItem('userDTO'), that);
    var tid = JSON.parse(window.localStorage.getItem('userDTO')).id;
    isUserInfoNotNull(tid, that);
    requestFinalFindPage(that.current, that.size, tid).then(response => {
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
    requestFinalFindPage(cpage, that.size, tid).then(response => {
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
 * 同意
 * @param {*} index 
 * @param {*} row 
 */
export function agreeing(that, index, row) {
    that.agreeIds.push(row.id);
    if(that.agreeIds.length == 0) {
        Message.warning('数据异常，请刷新页面后再试');
    }

    const params = new URLSearchParams();
    params.append('ids', that.agreeIds);
    requestFinalAgree(params).then(response => {
        if(response.data.state >= 1) {
            Message.success('审批成功');
            that.finalFindPage();
        } else {
            Message.error('审批失败');
        }
        that.agreeIds = [];
    })
}

/**
 * 批量同意点击事件
 * @param {*} that 
 */
export function batchAgreeing(that) {
    if(getMultiple(that.multipleSelection).length == 0) {
        Message.warning('未选择数据');
        return;
    }

    const params = new URLSearchParams();
    params.append('ids', getMultiple(that.multipleSelection));
    requestFinalAgree(params).then(response => {
        if(response.data.state >= 1) {
            Message.success('审批成功');
            that.finalFindPage();
        } else {
            Message.error('审批失败');
        }
        that.multipleSelection = [];
    })
}

/**
 * 驳回点击事件
 * @param {*} index 
 * @param {*} row 
 */
export function handleRefuseding(that, index, row) {
    that.disAgreeIds.push(row.id);
    that.form.ids = that.disAgreeIds;
    that.dialogFormVisible = true;
}

/**
 * 驳回
 * @param {*} that 
 */
export function refuseding(that) {
    if(that.form.ids.length == 0) {
        Message.warning('未选择数据');
        return;
    }

    const params = new URLSearchParams();
    params.append('ids', that.form.ids);
    params.append('teaOpinion', that.form.teaOpinion);

    requestFinalRefused(params).then(response => {
        if(response.data.state >= 1) {
            Message.success('审批成功');
            that.finalFindPage();
        } else {
            Message.error('审批失败');
        }
        that.disAgreeIds = [];
        that.multipleSelection = [];
    })
    that.dialogFormVisible = false;
}

/**
 * 批量驳回点击事件
 * @param {*} that 
 */
export function handleBatchRefuseding(that) {
    that.form.ids = getMultiple(that.multipleSelection);
    that.dialogFormVisible = true;
}

/**
 * 批量驳回
 * @param {*} that 
 */
export function batchRefuseding(that) {
    that.dialogFormVisible = false;
    console.log(that.form);
}