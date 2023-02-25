/**
 * pageSize 改变时会触发
 * 回调参数：每页条数
 * @param {*} that 
 * @param {*} psize 
 */
export function sizeChangeing(that, psize) {
    that.$data.pageSize = psize;
    console.log(psize)
}

/**
 * 点击下一页或跳转到某一页时会触发
 * 回调参数：当前页
 * @param {*} that 
 * @param {*} cpage 
 */
export function currentChangeing(that, cpage) {
    that.$data.currentPage = cpage;
    console.log(cpage)
}