import { Message } from 'element-ui';
import {getMultiple, trim, isUserInfoNotNull, isUserDtoNotNull, renderTime} from '../global/PublicMethods'
import {requestOnSubmit, requestHandleDelete, requestInsert, requestUpdate} from '../request/departmentChair/DAnnouncementInfoApi'

export function onSubmitimg(that) {
    isUserDtoNotNull(window.localStorage.getItem('userDTO'), that);
    var tid = JSON.parse(window.localStorage.getItem('userDTO')).id;
    isUserInfoNotNull(tid, that);
    var keywords = that.keywords;
    if(keywords != null && keywords.length != 0) {
        keywords = trim(keywords);
    }
    requestOnSubmit(that.current, that.size, keywords, tid).then(response => {
        if(response.result == null) {
            return;
        }
        that.total = response.total;
        for(var i = 0; i < response.result.length; i++) {
            response.result[i].time = renderTime(response.result[i].time);
        }
        that.tableData = response.result;
    })
}

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

export function handleSelectionChangeing(that, val) {
    that.multipleSelection = val;
}

export function definteDeleteing(that) {
    const params = new URLSearchParams();
    if(that.ids.length != 0) {
        params.append('ids', that.ids);
        requestHandleDelete(params).then(response => {
            if(response.data.state == null) {
                Message.error("删除失败，清稍后再试");
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
    if(getMultiple(that.multipleSelection).length != 0) {
        params.append('ids', getMultiple(that.multipleSelection));
        requestHandleDelete(params).then(response => {
            if(response.data.state == null) {
                Message.error("删除失败，清稍后再试");
                return;
            }
            if(response.data.state >= 1) {
                Message.success("删除成功");
                that.findPage();
            } else {
                Message.error("删除失败，清稍后再试");
            }
        });
        that.multipleSelection = [];
        that.deleteVisible = false;
        return;
    }
}

export function handleDeleteing(that, index, row) {
    that.ids.push(row.id);
    that.deleteVisible = true;
}

export function handleEditing(that, index, row) {
    that.form.id = row.id;
    that.form.content = row.content;
    that.dialogFormVisible = true;
}

/**
 * 点击下一页或跳转到某一页时会触发
 * 回调参数：当前页
 * @param {*} that 
 * @param {*} cpage 
 */
export function currentChangeing(that, cpage) {
    that.$data.currentPage = cpage;
    isUserDtoNotNull(window.localStorage.getItem('userDTO'));
    var tid = JSON.parse(window.localStorage.getItem('userDTO')).id;
    isUserInfoNotNull(tid);
    var keywords = that.keywords;
    if(keywords != null && keywords.length != 0) {
        keywords = trim(keywords);
    }
    requestOnSubmit(cpage, that.size, keywords, tid).then(response => {
        if(response.result == null) {
            return;
        }
        that.total = response.total;
        for(var i = 0; i < response.result.length; i++) {
            response.result[i].time = renderTime(response.result[i].time);
        }
        that.tableData = response.result;
    })
}


/**
 * 发布公告对话框点击事件
 * @param {*} that 
 */
export function handlePublishing(that) {
    that.form.id = '';
    that.form.content = '';
    that.dialogFormVisible = true;
}

/**
 * 发布公告
 * @param {*} that 
 */
export function publishing(that) {
    if(that.form.content.length == 0) {
        Message({
            message: '公告内容不能为空',
            type: 'warning'
        })
        return;
    }
    const params = new URLSearchParams();
    var content = trim(that.form.content);
    params.append('content', content);

    if(that.form.id == null || that.form.id.length == 0) {
        isUserDtoNotNull(window.localStorage.getItem('userDTO'), that);
        var tid = JSON.parse(window.localStorage.getItem('userDTO')).id;
        isUserInfoNotNull(tid, that);
        params.append('tid', tid);
        requestInsert(params).then(response => {
            if(response.data.state == null) {
                return;
            }
            if(response.data.state >= 1) {
                Message.success("发布成功");
                that.findPage();
            } else {
                Message.error("添加失败，清稍后再试");
            }
        });
    } else {
        params.append('id', that.form.id);
        requestUpdate(params).then(response => {
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
    that.dialogFormVisible = false;
}