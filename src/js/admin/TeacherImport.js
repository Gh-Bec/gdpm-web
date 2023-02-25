import {getMultiple, trim} from '../global/PublicMethods'
import { Message } from 'element-ui';
import Global from "../global/Global";
import {validationEmail, isAllNumber} from '../Validation'
import {requestTeacherImport, requestOnSubmit, requestHandleDelete, requestInsertTeacher, 
        requestUpdateTeacher, requestIsTeaPass} from '../request/admin/TeacherImportApi'

export function isTeaPassing(that) {
    requestIsTeaPass().then(response => {
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
export function tFindPageing(that) {
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
export function teacherImporting(param) {
    const formData = new FormData();
    formData.append('file', param.file);
    formData.append('flag', Global.importFlag.teacher);
    requestTeacherImport(formData);
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
    that.teacherForm.department = val;
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
        that.isTeaPass();
    })
}

/**
 * 编辑按钮点击事件
 * @param {*} that
 * @param {*} index
 * @param {*} row
 */
export function handleEditing(that, index, row) {
    that.teacherForm.id = row.id;
    that.teacherForm.tno = row.tno;
    that.teacherForm.name = row.name;
    that.teacherForm.sex = row.sex;
    that.teacherForm.educationBackground = row.educationBackground;
    that.teacherForm.professionalTitle = row.professionalTitle;
    that.teacherForm.number = row.number;
    that.teacherForm.email = row.email;
    that.teacherForm.department = row.department;
    that.teacherForm.professional = row.professional;
    that.teacherForm.role = row.role;
    that.selectDep(that.teacherForm.department);
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
                that.tFindPage();
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
                that.tFindPage();
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
 * 获取性别下拉框选中的值
 * @param {*} that
 * @param {*} val
 */
export function selectSexing(that, val) {
    that.teacherForm.sex = val;
}

/**
 * 获取专业下拉框选中的值
 * @param {*} that
 * @param {*} val
 */
export function selectProing(that, val) {
    that.teacherForm.professional = val;
}

/**
 * 新增按钮点击事件
 * @param {*} that
 */
export function insertVisibleing(that) {
    that.teacherForm.id = null;
    that.teacherForm.department = null;
    that.teacherForm.professional = null;
    that.teacherForm.name = null;
    that.teacherForm.sex = null;
    that.teacherForm.educationBackground = null;
    that.teacherForm.professionalTitle = null;
    that.teacherForm.number = null;
    that.teacherForm.email = null;
    that.teacherForm.tno = null;
    that.teacherForm.role = null;
    that.tnoIsEdit = false;
    that.updateVisible = true;
}

/**
 * 更新方法
    修改：id不为空
    添加：id为空
 * @param {*} that
 */
export function updateTeachering(that) {
    if(that.teacherForm.tno == null || that.teacherForm.tno.length == 0) {
        Message({
            message: '工号不能为空',
            type: 'warning'
        })
        return;
    }
    if(!isAllNumber(that.teacherForm.tno)) {
        Message({
            message: '工号不能包含除数字外的其他字符',
            type: 'error'
        })
        return;
    }
    if(that.teacherForm.tno.length > 15) {
        Message({
            message: '工号长度不能超过15',
            type: 'error'
        })
        return;
    }
    if(that.teacherForm.name == null || that.teacherForm.name.length == 0) {
        Message({
            message: '姓名不能为空',
            type: 'warning'
        })
        return;
    }
    if(that.teacherForm.sex == null || that.teacherForm.sex.length == 0) {
        Message({
            message: '未选择性别',
            type: 'warning'
        })
        return;
    }
    if(that.teacherForm.department == null || that.teacherForm.department.length == 0) {
        Message({
            message: '未选择院系',
            type: 'warning'
        })
        return;
    }
    if(that.teacherForm.professional == null || that.teacherForm.professional.length == 0) {
        Message({
            message: '未选择专业',
            type: 'warning'
        })
        return;
    }
    if(!validationEmail(that.teacherForm.email)) {
        return;
    }
    if(that.teacherForm.role == null || that.teacherForm.role.length == 0) {
        Message({
            message: '未选择角色',
            type: 'warning'
        })
        return;
    }
    that.teacherForm.name = trim(that.teacherForm.name);

    if(that.teacherForm.educationBackground != null) {
        that.teacherForm.educationBackground = trim(that.teacherForm.educationBackground);
    }

    if(that.teacherForm.professionalTitle != null) {
        that.teacherForm.professionalTitle = trim(that.teacherForm.professionalTitle);
    }

    that.teacherForm.email = trim(that.teacherForm.email);
    that.teacherForm.tno = trim(that.teacherForm.tno);
    
    if(that.teacherForm.id == null) {
        requestInsertTeacher(that.teacherForm).then(response => {
            if(response.data.state == null) {
                return;
            }
            if(response.data.state >= 1) {
                Message.success("添加成功");
                that.tFindPage();
            } else {
                Message.error("添加失败，清稍后再试");
            }
        });
    } else {
        requestUpdateTeacher(that.teacherForm).then(response => {
            if(response.data.state == null) {
                return;
            }
            if(response.data.state >= 1) {
                Message.success("修改成功");
                that.tFindPage();
            } else {
                Message.error("修改失败，清稍后再试");
            }
        });
    }
    that.tnoIsEdit = true;
    that.updateVisible = false;
}
