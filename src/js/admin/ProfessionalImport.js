import {getMultiple, trim} from '../../js/global/PublicMethods'
import { Message } from 'element-ui';
import Global from "../global/Global";
import {requestProfessionalImport, requestOnSubmit, requestHandleDelete, requestIsProPass, 
    requestInsertProfess, requestUpdateProfess} from '../request/admin/ProfessionalImportApi'

export function isProPassing(that) {
    requestIsProPass().then(response => {
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
export function pFindPageing(that) {
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
 * 专业表格上传
 * @param {*} param 
 */
export function professionalImporting(param) {
    const formData = new FormData();
    formData.append('file', param.file);
    formData.append('flag', Global.importFlag.professional);
    requestProfessionalImport(formData);
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
        that.isProPass();
    })
}

/**
 * 编辑按钮点击事件
 * @param {*} that 
 * @param {*} index 
 * @param {*} row 
 */
export function handleEditing(that, index, row) {
    that.professionalForm.id = row.id;
    that.professionalForm.forDepartment = row.forDepartment;
    that.professionalForm.professionalName = row.professionalName;
    that.updateVisible = true;
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
                that.pFindPage();
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
                that.pFindPage();
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
    that.professionalForm.professionalName = null;
    that.professionalForm.id = null;
    that.professionalForm.forDepartment = null;
    that.updateVisible = true;
}

/**
 * 更新方法
    修改：id不为空
    添加：id为空
 * @param {*} that 
 */
export function updateProfessing(that) {
    if(that.professionalForm.professionalName == null || that.professionalForm.professionalName.length == 0) {
        Message({
            message: '专业名称不能为空',
            type: 'warning'
        })
        return;
    }
    if(that.professionalForm.forDepartment == null || that.professionalForm.forDepartment.length == 0) {
        Message({
            message: '未选择院系',
            type: 'warning'
        })
        return;
    }
    that.professionalForm.professionalName = trim(that.professionalForm.professionalName);
    if(that.professionalForm.id == null) {
        requestInsertProfess(that.professionalForm).then(response => {
            if(response.data.state == null) {
                return;
            }
            if(response.data.state >= 1) {
                Message.success("添加成功");
                that.pFindPage();
            } else {
                Message.error("添加失败，清稍后再试");
            }
        });
    } else {
        requestUpdateProfess(that.professionalForm).then(response => {
            if(response.data.state == null) {
                return;
            }
            if(response.data.state >= 1) {
                Message.success("修改成功");
                that.pFindPage();
            } else {
                Message.error("修改失败，清稍后再试");
            }
        });
    }
    that.updateVisible = false;
}

/**
 * 获取下拉框选中的值
 * @param {*} that 
 */
export function selectChangeing(that, val) {
    that.professionalForm.forDepartment = val;
}