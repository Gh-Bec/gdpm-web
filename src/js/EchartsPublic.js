var Echarts = {
    _handleResize: function (e) {
        var ele = e.target || e.srcElement
        var trigger = ele.__resizeTrigger__
        if (trigger) {
            var handlers = trigger.__z_resizeListeners
            if (handlers) {
                var size = handlers.length
                for (var i = 0; i < size; i++) {
                    var h = handlers[i]
                    var handler = h.handler
                    var context = h.context
                    handler.apply(context, [e])
                }
            }
        }
    },
    _removeHandler: function (ele, handler, context) {
        var handlers = ele.__z_resizeListeners
        if (handlers) {
            var size = handlers.length
            for (var i = 0; i < size; i++) {
                var h = handlers[i]
                if (h.handler === handler && h.context === context) {
                    handlers.splice(i, 1)
                    return;
                }
            }
        }
    },
    _createResizeTrigger: function (ele) {
        var obj = document.createElement('object')
        obj.setAttribute('style',
        'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden;opacity: 0; pointer-events: none; z-index: -1;')
        obj.onload = Echarts._handleObjectLoad
        obj.type = 'text/html'
        ele.appendChild(obj)
        obj.data = 'about:blank'
        return obj
    },
    _handleObjectLoad: function (evt) {
        this.contentDocument.defaultView.__resizeTrigger__ = this.__resizeElement__
        this.contentDocument.defaultView.addEventListener('resize', Echarts._handleResize)
    },
    handleColors() {  //  随机生成颜色
        let color = '';
        let r = Math.floor(Math.random()*256);
        let g = Math.floor(Math.random()*256);
        let b = Math.floor(Math.random()*256);
        color = `rgb(${r},${g},${b})`;
        return color;  //  所有方法的拼接都可以用ES6新特性`其他字符串{$变量名}`替换
    },
    colorHex(string) {  //  rgb颜色转十六进制
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        if (/^(rgb|RGB)/.test(string)) {
            var aColor = string.replace(/(?:\(|\)|rgb|RGB)*/g,"").split(",");
            var strHex = "#";
            for(var i = 0; i < aColor.length; i++) {
                var hex = Number(aColor[i]).toString(16);
                if(hex === "0") {
                    hex += hex; 
                }
                strHex += hex;
            }
                if(strHex.length !== 7) {
                    strHex = string;  
                }
                return strHex;
        } else if(reg.test(string)) {
                var aNum = string.replace(/#/,"").split("");
                if(aNum.length === 6) {
                    return string;    
                } else if(aNum.length === 3) {
                    var numHex = "#";
                    for(var i = 0; i < aNum.length; i += 1) {
                        numHex += (aNum[i] + aNum[i]);
                    }
                    return numHex;
                }
        } else {
            return string;    
        }
    },
    setEchartColor(dataLength) {  //  根据种类数量生成颜色列表
        var colors = new Array();
        for (let i = 0; i < dataLength; i++) {
            let color = Echarts.colorHex(Echarts.handleColors());
            colors.push(color);
        }
        return colors;
    },
}

if (document.attachEvent) { // ie9-10
    Echarts.on = function (ele, handler, context) {
        var handlers = ele.__z_resizeListeners
        if (!handlers) {
            handlers = []
            ele.__z_resizeListeners = handlers
            ele.__resizeTrigger__ = ele
            ele.attachEvent('onresize', Echarts._handleResize)
        }
        handlers.push({
            handler: handler,
            context: context
        })
    }
    Echarts.off = function (ele, handler, context) {
        var handlers = ele.__z_resizeListeners
        if (handlers) {
            Echarts._removeHandler(ele, handler, context)
            if (handlers.length === 0) {
                ele.detachEvent('onresize', Echarts._handleResize)
                delete ele.__z_resizeListeners
            }
        }
    }
} else {
    Echarts.on = function (ele, handler, context) {
        var handlers = ele.__z_resizeListeners
        if (!handlers) {
            handlers = []
            ele.__z_resizeListeners = handlers
            if (getComputedStyle(ele, null).position === 'static') {
                ele.style.position = 'relative'
            }
            var obj = Echarts._createResizeTrigger(ele)
            ele.__resizeTrigger__ = obj
            obj.__resizeElement__ = ele
        }
        handlers.push({
            handler: handler,
            context: context
        })
    }
    Echarts.off = function (ele, handler, context) {
        var handlers = ele.__z_resizeListeners
        if (handlers) {
            Echarts._removeHandler(ele, handler, context)
            if (handlers.length === 0) {
                var trigger = ele.__resizeTrigger__
                if (trigger) {
                trigger.contentDocument.defaultView.removeEventListener('resize', Echarts._handleResize)
                ele.removeChild(trigger)
                delete ele.__resizeTrigger__
                }
                delete ele.__z_resizeListeners
            }
        }
    }
}

export {Echarts}