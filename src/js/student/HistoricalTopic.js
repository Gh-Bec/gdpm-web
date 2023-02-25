import { trim } from "../global/PublicMethods";
import {requestOnSubmit} from '../request/student/TopicsDeclarationApi'

/**
 * 点击下一页或跳转到某一页时会触发
 * 回调参数：当前页
 * @param {*} that 
 * @param {*} cpage 
 */
export function currentChangeing(that, cpage) {
    var department = JSON.parse(window.localStorage.getItem('userDTO')).department;
    if(department == null || department.length == 0) {
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

    that.$data.currentPage = cpage;
    requestOnSubmit(cpage, that.size, department, professional, that.keywords).then(response => {
        that.total = response.total;
        that.tableData = response.result;
    })
}

/**
 * 搜索点击事件
 * @param {*} that 
 */
export function onSubmitimg(that) {
    var department = JSON.parse(window.localStorage.getItem('userDTO')).department;
    if(department == null || department.length == 0) {
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

    requestOnSubmit(that.current, that.size, department, professional, that.keywords).then(response => {
        that.total = response.total;
        that.tableData = response.result;
    })
}

/**
 * 查询表格的数据
 * @param {*} that
 */
export function hFindPageing(that) {
    var department = JSON.parse(window.localStorage.getItem('userDTO')).department;
    if(department == null || department.length == 0) {
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

    requestOnSubmit(that.current, that.size, department, professional, that.keywords).then(response => {
        if(response.result == null) {
            return;
        }
        that.total = response.total;
        that.tableData = response.result;
    })
}