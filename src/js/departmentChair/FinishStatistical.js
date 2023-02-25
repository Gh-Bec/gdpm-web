import {Echarts} from '../EchartsPublic'
import {finishStatisticalRequest} from '../request/departmentChair/StatisticsApi'
import {isUserInfoNotNull, isUserDtoNotNull} from '../global/PublicMethods';

export function finishStatisticaling(that) {
    isUserDtoNotNull(window.localStorage.getItem('userDTO'), that);
    var tid = JSON.parse(window.localStorage.getItem('userDTO')).id;
    isUserInfoNotNull(tid, that);
    finishStatisticalRequest(tid).then(response => {
        that.incompleteData[0] = response.data.comIncomplete;
        that.incompleteData[1] = response.data.openIncomplete;
        that.incompleteData[2] = response.data.midIncomplete;
        that.incompleteData[3] = response.data.firstIncomplete;
        that.incompleteData[4] = response.data.finalizedIncomplete;
        that.incompleteData[5] = response.data.finalIncomplete;
        
        that.approvalData[0] = response.data.comApproval;
        that.approvalData[1] = response.data.openApproval;
        that.approvalData[2] = response.data.midApproval;
        that.approvalData[3] = response.data.firstApproval;
        that.approvalData[4] = response.data.finalizedApproval;
        that.approvalData[5] = response.data.finalApproval;

        that.completedData[0] = response.data.comCompleted;
        that.completedData[1] = response.data.openCompleted;
        that.completedData[2] = response.data.midCompleted;
        that.completedData[3] = response.data.firstCompleted;
        that.completedData[4] = response.data.finalizedCompleted;
        that.completedData[5] = response.data.finalCompleted;

        that.dramLinePt();
    });
}

/**
 * 制作完成情况统计图
 * @param {*} that 
 */
export function dramLinePting(that) {
    var pFigure = document.getElementById('p-figure')
    that.ptChart=that.$echarts.init(pFigure);
    that.ptChart.showLoading();
    that.ptChart.hideLoading();
    
    //  指定图表的配置项和数据
    var option = {
        animation: true, // 是否开启动画 默认为true 
        animationDuration: 4000, // 动画时长 可以接受 回调函数
        animationEasing: 'bounceOut', // 缓动动画 动画样式方法
        animationThreshold: 8, // 动画阈值 data 里面的元素多余8个停止动画

        title: {
            text: "完成情况统计图",
            x: "left",
            top: 10,
            left: 10,
            textStyle: {
                fontSize: 16,
                color: "rgba(51,51,51,1)"
            }
        },

        tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            },
        },

        color: ['#e8ab50', '#439fff', '#6fc545'],
        legend: {  //  图例
            containLabel: true,
            data: that.tipData,
        },

        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },

        textStyle: {
            fontSize: 15,
            color: "#56C0FE"
        },

        xAxis: [
            {
                type: 'category',
                data: that.columnData,  //  横坐标内容填充
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: 'black',  //改变字体颜色
                        fontSize: 14  //改变字体大小
                    }
                }
            }
        ],

        yAxis: [
            {
                type: "value",
                splitLine: {
                    lineStyle: {
                        color: ["#0b234e"]  // 使用深浅的间隔色
                    }
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: 'black',  //改变字体颜色
                        fontSize: 14  //改变字体大小
                    }
                }
            }
        ],

        series: [
            {
                name: '未开始',
                type: 'bar',
                data: that.incompleteData,
                // barWidth: "30%",
                itemStyle: {
                    normal: {
                        label: {
                            show: true, //开启显示
                            position: 'top', //在上方显示
                            textStyle: { //数值样式
                                color: 'black',
                                fontSize: 16
                            }
                        },
                    }
                }
            },
            {
                name: '审批中',
                type: 'bar',
                data: that.approvalData,
                // barWidth: "30%",
                itemStyle: {
                    normal: {
                        label: {
                            show: true, //开启显示
                            position: 'top', //在上方显示
                            textStyle: { //数值样式
                                color: 'black',
                                fontSize: 16
                            }
                        },
                    }
                }
            },
            {
                name: '已完成',
                type: 'bar',
                data: that.completedData,
                // barWidth: "30%",
                itemStyle: {
                    normal: {
                        label: {
                            show: true, //开启显示
                            position: 'top', //在上方显示
                            textStyle: { //数值样式
                                color: 'black',
                                fontSize: 16
                            }
                        },
                    }
                }
            }
    ]
    };
    // 绘制图表
    option && that.ptChart.setOption(option);

    var listener = () => {
        that.ptChart.resize()
    };
    Echarts.on(pFigure, listener);
    that.ptChart.clear();
    that.ptChart.setOption(option);
}