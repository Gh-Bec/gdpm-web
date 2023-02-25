/**
 * 点击查看指导教师审批意见的方法
 * @param {*} that 
 */
export function toTeaViewing(that, index, row) {
    that.opinion = row.teaOpinion;
}

/**
 * 点击查看系主任审批意见的方法
 * @param {*} that 
 */
export function toDepViewing(that, index, row) {
    that.opinion = row.depOpinion;
}

/**
 * 点击查看公告或邮件的方法
 * @param {*} that 
 */
export function toViewing(that, index, row) {
    that.opinion = row.content;
}