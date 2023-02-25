import {Echarts} from '../EchartsPublic'
import {teaDepTotalStatisticalRequest, teaPrtTotalStatisticalRequest} from '../request/admin/TeacherStatisticalApi'

export function teaPrtTotalStatisticaling(that) {
    teaPrtTotalStatisticalRequest().then(response => {
        that.ptChartData = response.data;
    });
}

export function teaDepTotalStatisticaling(that) {
    teaDepTotalStatisticalRequest().then(response => {
        that.teaChartData = response.data;
    });
}

var colorList = [
    '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#9A32CD', '#BBFFFF', '#CD0000',
    '#FF1493', '#FA8072', '#E0FFFF', '#D15FEE', '#CD8500', '#9400D3', '#7FFF00', '#6E8B3D', '#4B0082', '#1C86EE', '#0000AA', '#8B7D6B'
];

/**
 * 制作院系人数分布图
 * @param {*} that 
 */
export function drawLineTeaing(that) {
    var tFigure;

    if (tFigure != null && tFigure != "" && tFigure != undefined) {
        tFigure.dispose();  //  销毁
    }

    tFigure = document.getElementById('t-figure');

    that.teaChart=that.$echarts.init(tFigure);
    that.teaChart.showLoading()
    that.teaChart.hideLoading()

    let pieData=that.teaChartData;
    let option = {
        animation: true, // 是否开启动画 默认为true 
        animationDuration: 4000, // 动画时长 可以接受 回调函数
        animationEasing: 'bounceOut', // 缓动动画 动画样式方法
        animationThreshold: 8, // 动画阈值 data 里面的元素多余8个停止动画

        title: {
            text: "院系人数分布图",
            // subtext: "截至时间",  //  副标题
            subtextStyle: {
                left: "center",
                top: "center" //主副标题的垂直位置
            },
            x: "left",
            top: 10,
            left: 10,
            textStyle: {
                fontSize: 16,
                color: "rgba(51,51,51,1)"
            }
        },

        tooltip: {
            trigger: "item",
            formatter: function(params) {
                return params.data.departmentName + '：' + params.data.value + '人';
            }
        },

        series: [
            {
                name: '教师人数',
                type: 'pie',
                label: {
                    show: true,
                    formatter: (arg) => {
                        return arg.percent + "%\n" + arg.data.departmentName + "：" + arg.data.value + '人';
                    },
                },
                itemStyle: {
                    normal: {
                        color: function(params) {  //  规定颜色
                            var index=params.dataIndex%colorList.length;
                            return colorList[index]
                        }
                    }
                },
                data: pieData,
                roseType: 'radius',
                selectedMode: 'single',
                selectedOffset: 30, //偏离距离
            },
        ]
    };
    // 绘制图表
    option && that.teaChart.setOption(option);

    var listener = () => {
        that.teaChart.resize()
    };
    Echarts.on(tFigure, listener);
    that.teaChart.clear();
    that.teaChart.setOption(option);
}

/**
 * 制作职称人数统计图
 * @param {*} that 
 */
export function dramLinePting(that) {
    var pFigure;

    if (pFigure != null && pFigure != "" && pFigure != undefined) {
        pFigure.dispose();  //  销毁
    }

    pFigure = document.getElementById('p-figure');

    that.ptChart=that.$echarts.init(pFigure);
    that.ptChart.showLoading()
    that.ptChart.hideLoading()

    let ptData=that.ptChartData;

    //  遍历上述list数组，获得X坐标和Y坐标
    var professionalTitles = new Array();
    var values = new Array();
    for(var i = 0; i < ptData.length; i++) {
        professionalTitles[i] = ptData[i].professionalTitle;
        values[i] = ptData[i].value;
    }

    //  指定图表的配置项和数据
    var option = {
        animation: true, // 是否开启动画 默认为true 
        animationDuration: 4000, // 动画时长 可以接受 回调函数
        animationEasing: 'bounceOut', // 缓动动画 动画样式方法
        animationThreshold: 8, // 动画阈值 data 里面的元素多余8个停止动画

        title: {
            text: "职称人数统计图",
            subtextStyle: {
                left: "center",
                top: "center" //主副标题的垂直位置
            },
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
            formatter: "{b} : {c} 人"
        },

        textStyle: {
            fontSize: 15,
            color: "#56C0FE"
        },

        xAxis: [
            {
                type: 'category',
                data: professionalTitles,  //  横坐标内容填充
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

        series: [{
            name: '教师人数',
            type: 'bar',
            data: values,
            barWidth: "30%",
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
                    color: function(params) {
                        var index=params.dataIndex%colorList.length;
                        return colorList[index]
                    }
                }
            }
        }]
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