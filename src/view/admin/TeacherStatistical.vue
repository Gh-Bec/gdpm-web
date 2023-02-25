<template>
    <div id="main7" class="bodys">
        <div class="tea">
            <div id="t-figure" v-if="teaChartData.length>0"></div>
        </div>
        <div class="pTitle">
            <div id="p-figure"></div>
        </div>
    </div>
</template>

<script>
    import {drawLineTeaing, dramLinePting, teaDepTotalStatisticaling, teaPrtTotalStatisticaling} from '../../js/admin/TeacherStatistical';
    import AdminUtil from '../../js/utils/AdminUtil';

    export default {
        data() {
            return {
                teaChart: {},  //  教师人数院系分布图
                teaChartData: [],  //  教师人数院系分布图数据
                ptChart: {},  //  职称人数统计图
                ptChartData: []  //  职称人数统计图数据
            }
        },
        methods: {
            async teaDepTotalStatistical() {
                var that = this;
                teaDepTotalStatisticaling(that);
                await new Promise(() => {
                    setTimeout(() => {
                        that.drawLineTea();
                    }, 1000);
                })
            }, 
            async teaPrtTotalStatistical() {
                var that = this;
                teaPrtTotalStatisticaling(that);
                await new Promise(() => {
                    setTimeout(() => {
                        that.dramLinePt();
                    }, 1000);
                })
            }, 
            drawLineTea() {
                var that = this;
                drawLineTeaing(that);
            },
            dramLinePt() {
                var that = this;
                dramLinePting(that);
            },
        },
        mounted() {
            var that = this;
            that.teaDepTotalStatistical();
            that.teaPrtTotalStatistical();
        },
    }
</script>

<style>
    @import '../../css/admin/TeacherStatistical.css';
</style>

