import {Echarts} from '../EchartsPublic'
import {stuDepTotalStatisticalRequest, stuProTotalStatisticalRequest} from '../request/admin/StudentStatisticalApi'

export function stuProTotalStatisticaling(that) {
    stuProTotalStatisticalRequest().then(response => {
        that.stupChartData = response.data;
    })
}

export function stuDepTotalStatisticaling(that) {
    stuDepTotalStatisticalRequest().then(response => {
        that.studChartData = response.data;
    })
}

var colorList = [
    '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#9A32CD', '#BBFFFF', '#CD0000',
    '#FF1493', '#FA8072', '#E0FFFF', '#D15FEE', '#CD8500', '#9400D3', '#7FFF00', '#6E8B3D', '#4B0082', '#1C86EE', '#0000AA', '#8B7D6B'
];

/**
 * 院系人数分布图
 * @param {*} that 
 */
export function drawLineStuding(that) {
    var dFigure = document.getElementById('d-figure');
    that.studChart=that.$echarts.init(dFigure);
    that.studChart.showLoading()
    that.studChart.hideLoading()

    let pieData=that.studChartData;
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

        // legend: {  //  图例
        //     type: "scroll",
        //     orient: "vertical",
        //     right: 10,
        //     top: 20,
        //     bottom: 20,
        //     x: "right",
        //     y: "center",
        //     itemWidth: 4,
        //     itemHeight: 16,
        //     //图例文字样式
        //     textStyle: {
        //         color: "#000",
        //         fontSize: 14,
        //         fontWeight: "700"
        //     },
        // },

        series: [
            {
                name: '学生人数',
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
    option && that.studChart.setOption(option);

    var listener = () => {
        that.studChart.resize()
    };
    Echarts.on(dFigure, listener);
    that.studChart.clear();
    that.studChart.setOption(option);
}

/**
 * 制作专业人数分布图
 * @param {*} that 
 */
export function dramLineStuping(that) {
    var spFigure = document.getElementById('sp-figure')
    that.stupChart=that.$echarts.init(spFigure);
    that.stupChart.showLoading()
    that.stupChart.hideLoading()

    let ptData=that.stupChartData;

    //  遍历上述list数组，获得X坐标和Y坐标
    var professionalNames = new Array();
    var values = new Array();
    for(var i = 0; i < ptData.length; i++) {
        professionalNames[i] = ptData[i].professionalName;
        values[i] = ptData[i].value;
    }

    //  指定图表的配置项和数据
    var option = {
        animation: true, // 是否开启动画 默认为true 
        animationDuration: 3000, // 动画时长 可以接受 回调函数
        animationEasing: 'bounceOut', // 缓动动画 动画样式方法
        animationThreshold: 8, // 动画阈值 data 里面的元素多余8个停止动画

        title: {
            text: "专业人数分布图",
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
                return params.data.professionalName + '：' + params.data.value + '人';
            }
        },

        series: [
            {
                name: '学生人数',
                type: 'pie',
                label: {
                    show: true,
                    formatter: (arg) => {
                        return arg.percent + "%\n" + arg.data.professionalName + "：" + arg.data.value + '人';
                    },
                },
                // color: Echarts.setEchartColor(ptData.length),
                itemStyle: {
                    normal: {
                        color: function(params) {  //  规定颜色
                            var index=params.dataIndex%colorList.length;
                            return colorList[index]
                        }
                    }
                },
                data: ptData,
                radius: ['30%', '65%']
            },
        ]
    };
    // 绘制图表
    option && that.stupChart.setOption(option);

    var listener = () => {
        that.stupChart.resize()
    };
    Echarts.on(spFigure, listener);
    that.stupChart.clear();
    that.stupChart.setOption(option);
}