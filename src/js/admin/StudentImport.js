import {getMultiple, trim} from '../global/PublicMethods'
import { Message } from 'element-ui';
import Global from "../global/Global";
import {validationEmail, isAllNumber} from '../Validation'
import {requestStudentImport, requestOnSubmit, requestHandleDelete, requestIsStuPass, 
    requestInsertStudent, requestUpdateStudent} from '../request/admin/StudentImportApi'

export function isStuPassing(that) {
    requestIsStuPass().then(response => {
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
export function sFindPageing(that) {
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
export function studentImporting(param) {
    const formData = new FormData();
    formData.append('file', param.file);
    formData.append('flag', Global.importFlag.student);
    requestStudentImport(formData);
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
    that.studentForm.department = val;
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
        that.isStuPass();
    })
}

/**
 * 编辑按钮点击事件
 * @param {*} that 
 * @param {*} index 
 * @param {*} row 
 */
export function handleEditing(that, index, row) {
    that.studentForm.sno = row.sno;
    that.studentForm.id = row.id;
    that.studentForm.name = row.name;
    that.studentForm.sex = row.sex;
    that.studentForm.grade = row.grade;
    that.studentForm.email = row.email;
    that.studentForm.year = row.year;
    that.studentForm.department = row.department;
    that.studentForm.professional = row.professional;
    that.selectDep(that.studentForm.department);
    that.updateVisible = true;
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
    that.studentForm.sex = val;
}

/**
 * 获取专业下拉框选中的值
 * @param {*} that 
 * @param {*} val 
 */
export function selectProing(that, val) {
    that.studentForm.professional = val;
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
                Message.success("删除成功")
                that.sFindPage();
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
                that.sFindPage();
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
 * 新增按钮点击事件
 * @param {*} that 
 */
export function insertVisibleing(that) {
    that.options = [];
    that.studentForm.sno = null;
    that.studentForm.department = null;
    that.studentForm.professional = null;
    that.studentForm.id = null;
    that.studentForm.name = null;
    that.studentForm.sex = null;
    that.studentForm.year = null;
    that.studentForm.email = null;
    that.studentForm.grade = null;
    that.snoIsEdit = false;
    that.updateVisible = true;
}

/**
 * 更新方法
    修改：id不为空
    添加：id为空
 * @param {*} that 
 */
export function updateStudenting(that) {
    if(that.studentForm.sno == null || that.studentForm.sno.length == 0) {
        Message({
            message: '学号不能为空',
            type: 'warning'
        })
        return;
    }
    if(!isAllNumber(that.studentForm.sno)) {
        Message({
            message: '学号不能包含除数字外的其他字符',
            type: 'error'
        })
        return;
    }
    if(that.studentForm.sno.length > 15) {
        Message({
            message: '学号长度不能超过15',
            type: 'warning'
        })
        return;
    }
    if(that.studentForm.name == null || that.studentForm.name.length == 0) {
        Message({
            message: '姓名不能为空',
            type: 'warning'
        })
        return;
    }
    if(that.studentForm.sex == null || that.studentForm.sex.length == 0) {
        Message({
            message: '未选择性别',
            type: 'warning'
        })
        return;
    }
    if(that.studentForm.department == null || that.studentForm.department.length == 0) {
        Message({
            message: '未选择院系',
            type: 'warning'
        })
        return;
    }
    if(that.studentForm.professional == null || that.studentForm.professional.length == 0) {
        Message({
            message: '未选择专业',
            type: 'warning'
        })
        return;
    }
    if(that.studentForm.year == null || that.studentForm.year.length == 0) {
        Message({
            message: '年级不能为空',
            type: 'warning'
        })
        return;
    }
    if(!isAllNumber(that.studentForm.year)) {
        Message({
            message: '年级不能包含除数字外的其他字符',
            type: 'error'
        })
        return;
    }
    if(that.studentForm.grade == null || that.studentForm.grade.length == 0) {
        Message({
            message: '班级不能为空',
            type: 'warning'
        })
        return;
    }
    if(!isAllNumber(that.studentForm.grade)) {
        Message({
            message: '班级不能包含除数字外的其他字符',
            type: 'error'
        })
        return;
    }

    that.studentForm.sno = trim(that.studentForm.sno);
    that.studentForm.year = trim(that.studentForm.year);
    that.studentForm.name = trim(that.studentForm.name);

    if(that.studentForm.email != null && that.studentForm.email.length > 0) {
        that.studentForm.email = trim(that.studentForm.email);
        var regEmail = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
        if(!regEmail.test(that.studentForm.email)) {
            Message({
                type: 'error',
                message: '邮箱格式不正确'
            });
            return;
        }
    }

    if(that.studentForm.id == null) {
        requestInsertStudent(that.studentForm).then(response => {
            if(response.data.state == null) {
                return;
            }
            if(response.data.state >= 1) {
                Message.success("添加成功");
                that.sFindPage();
            } else {
                Message.error("添加失败，清稍后再试");
            }
        });
    } else {
        requestUpdateStudent(that.studentForm).then(response => {
            if(response.data.state == null) {
                return;
            }
            if(response.data.state >= 1) {
                Message.success("修改成功");
                that.sFindPage();
            } else {
                Message.error("修改失败，清稍后再试");
            }
        });
    }

    that.updateVisible = false;
    that.tnoIsEdit = true;

    console.log(that.studentForm);
}