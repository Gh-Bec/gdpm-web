import { Message } from 'element-ui';
import {getMultiple, trim} from '../../js/global/PublicMethods'
import Global from "../global/Global";
import {requestDepartmentsImport, requestUpdateDepart, requestInsertDepart, 
    requestHandleDelete, requestOnSubmit} from '../request/admin/DepartmentsImportApi'

/**
 * 查询表格的数据
 * @param {*} that 
 */
export function dFindPageing(that) {
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
 * 院系表格上传
 * @param {*} param 
 */
export function departmentsImporting(param) {
    const formData = new FormData();
    formData.append('file', param.file);
    formData.append('flag', Global.importFlag.department);
    requestDepartmentsImport(formData);
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
    })
}

/**
 * 编辑按钮点击事件
 * @param {*} that 
 * @param {*} index 
 * @param {*} row 
 */
export function handleEditing(that, index, row) {
    that.updateVisible = true;
    that.departmentForm.id = row.id;
    that.departmentForm.departmentName = row.departmentName;
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
                Message.success("删除成功");
                that.dFindPage();
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
                Message.success("删除成功");
                that.dFindPage();
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
 * 获取被选中复选框的行的ID值
 * @param {*} that 
 * @param {*} val 
 */
export function handleSelectionChangeing(that, val) {
    that.multipleSelection = val;
}

/**
 * 新增按钮点击事件
 * @param {*} that 
 */
export function insertVisibleing(that) {
    that.departmentForm.id = null;
    that.departmentForm.departmentName = '';
    that.updateVisible = true;
}

/**
 * 更新方法
    修改：id不为空
    添加：id为空
 * @param {*} that 
 */
export function updateDeparting(that) {
    if(that.departmentForm.departmentName == null || that.departmentForm.departmentName.length == 0) {
        Message({
            message: '院系名称不能为空',
            type: 'warning'
        })
        return;
    }
    that.departmentForm.departmentName = trim(that.departmentForm.departmentName);
    if(that.departmentForm.id == null) {
        requestInsertDepart(that.departmentForm).then(response => {
            if(response.data.state == null) {
                return;
            }
            if(response.data.state >= 1) {
                Message.success("添加成功");
                that.dFindPage();
            } else {
                Message.error("添加失败，清稍后再试");
            }
        });
    } else {
        requestUpdateDepart(that.departmentForm).then(response => {
            if(response.data.state == null) {
                return;
            }
            if(response.data.state >= 1) {
                Message.success("修改成功");
                that.dFindPage();
            } else {
                Message.error("修改失败，清稍后再试");
            }
        });
    }
    that.updateVisible = false;
}