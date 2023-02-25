import { Message } from "element-ui";
import {requestGetRelationInfo, requestGetTeacher} from '../request/student/NowProgressApi'
import {renderTime} from '../global/PublicMethods'

/**
 * 获取存储在本地的用户信息
 * @param {*} that 
 */
export function getParaming(that) {
    that.userDTO = JSON.parse(window.localStorage.getItem('userDTO'));
    that.infoList.name = that.userDTO.name;
    that.infoList.sno = that.userDTO.sno;
    that.infoList.departmentName = that.userDTO.departmentName;
    that.infoList.professionalName = that.userDTO.professionalName;
}

export function getTeachering(that) {
    requestGetTeacher(that.infoList.tid).then(response => {
        that.infoList.teacher = response.data.teacher;
    })
}

/**
 * 获取页面中的各个信息值
 * @param {*} that 
 */
export function getRelationInfoing(that) {
    if(that.userDTO.id == null || that.userDTO.id.length == 0) {
        Message.error('系统异常，请稍后再试');
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("tokenStartTime");
        window.localStorage.removeItem("userDTO");
        that.$router.push({path: '/login'});
        return;
    }

    var id = that.userDTO.id;
    requestGetRelationInfo(id).then(response => {
        that.infoList.projectName = response.data.projectName;
        that.infoList.introduce = response.data.introduce;
        that.infoList.teacher = response.data.teacher;
        that.infoList.tid = response.data.tid;

        that.commitments.comState = response.data.comState;
        that.commitments.comUrl = response.data.comUrl;
        if(that.commitments.comUrl != null && that.commitments.comUrl.length != 0 && that.commitments.comState == 2) {
            that.commitmentsIsDo = false;
        }
        if(response.data.comTime == null || response.data.comTime.length == 0 || that.commitments.comState == 0 || that.commitments.comState == 1) {
            that.commitments.comTime = '未完成';
        } else {
            that.commitments.comTime = renderTime(response.data.comTime);
        }

        that.openingReport.openState = response.data.openState;
        that.openingReport.openUrl = response.data.openUrl;
        if(that.openingReport.openUrl != null && that.openingReport.openUrl.length != 0 && that.openingReport.openState == 2) {
            that.openingReportIsDo = false;
        }
        if(response.data.openTime == null || response.data.openTime.length == 0 || that.openingReport.openState == 0 || that.openingReport.openState == 1) {
            that.openingReport.openTime = '未完成';
        } else {
            that.openingReport.openTime = renderTime(response.data.openTime);
        }

        that.intermediateInspection.midState = response.data.midState;
        that.intermediateInspection.midUrl = response.data.midUrl;
        if(that.intermediateInspection.midUrl != null && that.intermediateInspection.midUrl.length != 0 && that.intermediateInspection.midState == 2) {
            that.intermediateInspectionIsDo = false;
        }
        if(response.data.midTime == null || response.data.midTime.length == 0 || that.intermediateInspection.midState == 0 || that.intermediateInspection.midState == 1) {
            that.intermediateInspection.midTime = '未完成';
        } else {
            that.intermediateInspection.midTime = renderTime(response.data.midTime);
        }

        that.firstDraft.firstState = response.data.firstState;
        that.firstDraft.firstUrl = response.data.firstUrl;
        if(that.firstDraft.firstUrl != null && that.firstDraft.firstUrl.length != 0 && that.firstDraft.firstState == 2) {
            that.firstDraftIsDo = false;
        }
        if(response.data.firstTime == null || response.data.firstTime.length == 0 || that.firstDraft.firstState == 0 || that.firstDraft.firstState == 1) {
            that.firstDraft.firstTime = '未完成';
        } else {
            that.firstDraft.firstTime = renderTime(response.data.firstTime);
        }

        that.set.setState = response.data.setState;
        that.set.setUrl = response.data.setUrl;
        if(that.set.setUrl != null && that.set.setUrl.length != 0 && that.set.setState == 2) {
            that.setIsDo = false;
        }
        if(response.data.setTime == null || response.data.setTime.length == 0 || that.set.setState == 0 || that.set.setState == 1) {
            that.set.setTime = '未完成';
        } else {
            that.set.setTime = renderTime(response.data.setTime);
        }

        that.final.finalState = response.data.finalState;
        that.final.finalUrl = response.data.finalUrl;
        if(that.final.finalUrl != null && that.final.finalUrl.length != 0 && that.final.finalState == 2) {
            that.finalIsDo = false;
        }
        if(response.data.finalTime == null || response.data.finalTime.length == 0 || that.final.finalState == 0 || that.final.finalState == 1) {
            that.final.finalTime = '未完成';
        } else {
            that.final.finalTime = renderTime(response.data.finalTime);
        }

        if(that.infoList.tid != null) {
            that.getTeacher();
        }
        
    });
}