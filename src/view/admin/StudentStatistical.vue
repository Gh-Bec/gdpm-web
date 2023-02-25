<template>
    <div id="main8" class="bodys">
        <div class="stud">
            <div id="d-figure"></div>
        </div>
        <div class="stup">
            <div id="sp-figure"></div>
        </div>
    </div>
</template>

<script>
    import {drawLineStuding, dramLineStuping, stuDepTotalStatisticaling, stuProTotalStatisticaling} from '../../js/admin/StudentStatistical'

    export default {
        data() {
            return {
                studChart: {},  //  院系人数分布图
                studChartData: [],    //  院系人数分布图数据
                stupChart: {},  //  专业人数分布图
                stupChartData: []  //  专业人数分布图数据
            }
        },
        methods: {
            async stuDepTotalStatistical() {
                var that = this;
                stuDepTotalStatisticaling(that);
                await new Promise(() => {
                    setTimeout(() => {
                        that.drawLineStud();
                    }, 300);
                })
            }, 
            async stuProTotalStatistical() {
                var that = this;
                stuProTotalStatisticaling(that);
                await new Promise(() => {
                    setTimeout(() => {
                        that.dramLineStup();
                    }, 100);
                })
            },
            drawLineStud() {
                var that = this;
                drawLineStuding(that);
            },
            dramLineStup() {
                var that = this;
                dramLineStuping(that);
            }
        },
        mounted() {
            var that = this;
            that.stuDepTotalStatistical();
            that.stuProTotalStatistical();
            // window.onresize = function() {
            //     that.teaChart.resize();
            //     that.pChart.resize();
            // }
        }
    }
</script>

<style>
    @import '../../css/admin/StudentStatistical.css';
</style>

