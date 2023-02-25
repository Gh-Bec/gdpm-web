import {trim, isUserInfoNotNull, isUserDtoNotNull, renderTime} from '../global/PublicMethods'
import {requestOnSubmit} from '../request/student/AnnouncementInfoApi'

export function onSubmitimg(that) {
    isUserDtoNotNull(window.localStorage.getItem('userDTO'), that);
    var sid = JSON.parse(window.localStorage.getItem('userDTO')).id;
    isUserInfoNotNull(sid, that);
    var keywords = that.keywords;
    if(keywords != null && keywords.length != 0) {
        keywords = trim(keywords);
    }
    requestOnSubmit(that.current, that.size, keywords, sid).then(response => {
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
 * 点击下一页或跳转到某一页时会触发
 * 回调参数：当前页
 * @param {*} that 
 * @param {*} cpage 
 */
export function currentChangeing(that, cpage) {
    that.$data.currentPage = cpage;
    requestOnSubmit(cpage, that.size, keywords, sid).then(response => {
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