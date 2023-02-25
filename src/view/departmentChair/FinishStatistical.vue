<template>
    <div id="dmain11" class="bodys">
        <div class="pTitle">
            <div id="p-figure"></div>
        </div>
    </div>
</template>

<script>
    import {dramLinePting, finishStatisticaling} from '../../js/departmentChair/FinishStatistical'

    export default {
        data() {
            return {
                ptChart: {},  //  完成情况统计图
                tipData: ['未开始', '审批中', '已完成'],
                columnData: ['任务书', '开题报告', '中期检查表', '论文初稿', '论文定稿', '论文终稿'],
                incompleteData: [73, 31, 60, 89, 51, 41],
                approvalData: [60, 89, 51, 73, 41, 51],
                completedData: [41, 51, 89, 60, 31, 73],
            }
        },
        methods: {
            async finishStatistical() {
                var that = this;
                finishStatisticaling(that);
            }, 
            dramLinePt() {
                var that = this;
                dramLinePting(that);
            }
        },
        mounted() {
            var that = this;
            that.finishStatistical();
        },
    }
</script>

<style>
    @import '../../css/departmentChair/FinishStatistical.css';
</style>

