import { Message } from 'element-ui';
import {trim, isUserInfoNotNull, isUserDtoNotNull} from '../global/PublicMethods'
import {validationEmail} from '../Validation'
import {requestupdateAdmin, requestInsertAdmin, 
requestHandleDelete, requestOnSubmit} from '../request/admin/AdminImportApi'

/**
 * 获取性别下拉框选中的值
 * @param {*} that 
 * @param {*} val 
 */
export function selectSexing(that, val) {
    that.adminForm.sex = val;
}

/**
 * 查询表格的数据
 * @param {*} that 
 */
export function findPageing(that) {
    isUserDtoNotNull(window.localStorage.getItem('userDTO'), that);
    var aid = JSON.parse(window.localStorage.getItem('userDTO')).id;
    isUserInfoNotNull(aid, that);
    requestOnSubmit(that.current, that.size, aid).then(response => {
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
    var aid = JSON.parse(window.localStorage.getItem('userDTO')).id;
    isUserInfoNotNull(aid, that);
    requestOnSubmit(that.current, that.size, aid).then(response => {
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
    that.adminForm.id = row.id;
    that.adminForm.ano = row.ano;
    that.adminForm.name = row.name;
    that.adminForm.sex = row.sex;
    that.adminForm.email = row.email;
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
                that.findPage();
            } else {
                Message.error("删除失败，清稍后再试");
            }
        });
        that.ids = [];
        that.deleteVisible = false;
        return;
    }
}

/**
 * 新增按钮点击事件
 * @param {*} that 
 */
export function insertVisibleing(that) {
    that.adminForm.id = null;
    that.adminForm.ano = null;
    that.adminForm.name = null;
    that.adminForm.sex = null;
    that.adminForm.email = null;
    that.anoIsEdit = false;
    that.updateVisible = true;
}

/**
 * 更新方法
    修改：id不为空
    添加：id为空
 * @param {*} that 
 */
export function updateAdmining(that) {
    if(that.adminForm.ano == null || that.adminForm.ano.length == 0) {
        Message({
            message: '账号不能为空',
            type: 'warning'
        })
        return;
    }
    if(that.adminForm.ano.length > 15) {
        Message({
            message: '账号长度不能超过15',
            type: 'warning'
        })
        return;
    }
    if(that.adminForm.name == null || that.adminForm.name.length == 0) {
        Message({
            message: '名字不能为空',
            type: 'warning'
        })
        return;
    }
    if(that.adminForm.sex == null || that.adminForm.sex.length == 0) {
        Message({
            message: '未选择性别',
            type: 'warning'
        })
        return;
    }
    if(!validationEmail(that.adminForm.email)) {
        return;
    }
    that.adminForm.name = trim(that.adminForm.name);
    if(that.adminForm.id == null) {
        requestInsertAdmin(that.adminForm).then(response => {
            if(response.data.state == null) {
                return;
            }
            if(response.data.state >= 1) {
                Message.success("添加成功");
                that.findPage();
            } else {
                Message.error("添加失败，清稍后再试");
            }
        });
    } else {
        requestupdateAdmin(that.adminForm).then(response => {
            if(response.data.state == null) {
                return;
            }
            if(response.data.state >= 1) {
                Message.success("修改成功");
                that.findPage();
            } else {
                Message.error("修改失败，清稍后再试");
            }
        });
    }
    that.updateVisible = false;
}