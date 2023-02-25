import { MessageBox } from "element-ui";

/**
 * 检测课题简介的长度是否超过200
 * @param {*} that 
 */
export function verifyIntroLength(that) {
    if(that.form.introduce.length > 200) {
        MessageBox({
            title: '提示',
            message: '课题简介字数限制为200',
            type: 'warning '
        })
    }
}