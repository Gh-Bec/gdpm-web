/**
 * 侧边栏的收缩和盒子宽度的动态变化
 * @param {*} isCollapse 
 * @param {*} that 
 */
export function scalingAndClass(isCollapse, that) {
    that.isCollapse = isCollapse;

    if(isCollapse === true) {
        that.changeClass.left = '4%'
        that.changeClass.width = '96%'
    } else {
        that.changeClass.width = '85%'
        that.changeClass.left = '15%'
    }
}

/**
 * 监听到当前路由状态并激活当前菜单
 * @param {*} that 
 */
export function setCurrentRouteing(that) {
    that.activeIndex= that.$route.path;
}

/**
 * 局部刷新的方法
 * @param {*} that 
 */
export function reloading(that) {
    that.isRouterAlive = false;  //  先关闭
    that.$nextTick(
        function() {
            that.isRouterAlive = true;  //  再打开
        }
    )
}