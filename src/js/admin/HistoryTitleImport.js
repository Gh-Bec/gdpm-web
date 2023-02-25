import {getMultiple, trim} from '../global/PublicMethods'
import { Message } from 'element-ui';
import Global from "../global/Global";
import {requestHistoryTitleImport, requestOnSubmit, requestHandleDelete, requestIsHisPass} from '../request/admin/HistoryTitleImportApi'

export function isHisPassing(that) {
    requestIsHisPass().then(response => {
        if(response.data.state == null) {
            return;
        }
        if(response.data.state > 0) {
            that.isPass = false;
        }
    })
}

/**
 * 查询表格的数据
 * @param {*} that
 */
export function hFindPageing(that) {
    var keywords = that.keywords;
    if(keywords != null && keywords.length != 0) {
        keywords = trim(keywords);
    }
    requestOnSubmit(that.current, that.size, keywords).then(response => {
        if(response.result == null) {
            return;
        }
        that.total = response.total;
        that.tableData = response.result;
    })
}

/**
 * 教师表格上传
 * @param {*} param
 */
export function historyTitleImporting(param) {
    const formData = new FormData();
    formData.append('file', param.file);
    formData.append('flag', Global.importFlag.history);
    requestHistoryTitleImport(formData);
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
    if(keywords != null && keywords.length != 0) {
        keywords = trim(keywords);
    }
    requestOnSubmit(cpage, that.size, keywords).then(response => {
        if(response.result == null) {
            return;
        }
        that.total = response.total;
        that.tableData = response.result;
    })
}

/**
 * 获取系别下拉框选中的值
 * @param {*} that 
 * @param {*} val 
 */
export function selectDeping(that, val) {
    let pros = [];
    for(var obj of that.professionalList) {
        if(val === obj.forDepartment) {
            pros.push({professionalName: obj.professionalName, id: obj.id})
        }
        that.options = pros;
    }
    that.histForm.department = val;
}

/**
 * 搜索点击事件
 * @param {*} that 
 */
export function onSubmitimg(that) {
    var keywords = that.keywords;
    if(keywords != null && keywords.length != 0) {
        keywords = trim(keywords);
    }
    requestOnSubmit(that.current, that.size, keywords).then(response => {
        if(response.result == null) {
            return;
        }
        that.total = response.total;
        that.tableData = response.result;
        that.isHisPass();
    })
}

/**
 * 确定删除
 * @param {*} that 
 * @returns 
 */
export function definteDeleteing(that) {
    const params = new URLSearchParams();
    if(that.ids.length != 0) {
        params.append('ids', that.ids);
        requestHandleDelete(params).then(response => {
            if(response.data.state == null) {
                return;
            }
            if(response.data.state >= 1) {
                that.hFindPage();
            } else {
                Message.error("删除失败，清稍后再试");
            }
        });
        that.ids = [];
        that.deleteVisible = false;
        return;
    }
    if(getMultiple(that.multipleSelection).length != 0) {
        params.append('ids', getMultiple(that.multipleSelection));
        requestHandleDelete(params).then(response => {
            if(response.data.state == null) {
                return;
            }
            if(response.data.state >= 1) {
                that.hFindPage();
            } else {
                Message.error("删除失败，清稍后再试");
            }
        });
        that.multipleSelection = [];
        that.deleteVisible = false;
        return;
    }
}

/**
 * 删除按钮点击事件
 * @param {*} index 
 * @param {*} row 
 */
export function handleDeleteing(that, index, row) {
    that.ids.push(row.id);
    that.deleteVisible = true;
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
 * 获取专业下拉框选中的值
 * @param {*} that 
 * @param {*} val 
 */
export function selectProing(that, val) {
    that.histForm.professional = val;
}

/**
 * 批量删除点击事件
 * @param {*} that 
 */
export function batchDeleteing(that) {
    if(getMultiple(that.multipleSelection).length == 0) {
        Message({
            message: '未选择数据',
            type: 'warning'
        })
        return;
    }
    that.deleteVisible = true;
}