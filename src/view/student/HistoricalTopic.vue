<template>
    <div id="smain10" class="bodys hist">
        <div class="sopertion">
            <div class="title1">
                <span>历史选题</span>
            </div>
            <div class="search">
                <el-form :inline="true" class="demo-form-inline fm" @submit.native.prevent>
                    <el-form-item>
                        <el-input v-model="keywords" placeholder="关键字"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="table">
            <div class="tabledata">
                <el-table :data="tableData" border style="width: 100%" max-height="535" stripe>
                    <el-table-column prop="id" label="编号" width="100" fixed></el-table-column>
                    <el-table-column prop="departmentName" label="所属院系" width="160"></el-table-column>
                    <el-table-column prop="professionalName" label="专业名称" width="200"></el-table-column>
                    <el-table-column prop="projectName" label="选题名称" width="523"></el-table-column>
                </el-table>
            </div>
            <div class="elpage">
                <div class="page">
                    <el-pagination background layout="prev, pager, next" :total="total" 
                    :current-page.sync="current" :page-size.sync="size" :page-sizes="[5,10,50,100]"
                    @current-change="currentChange"></el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {onSubmitimg, currentChangeing, hFindPageing} from '../../js/student/HistoricalTopic'

    export default {
        data() {
            return {
                keywords: '',  //  搜索的关键字
                tableData: [],  //  表格数据
                size: 10,  //  每页条数
                current: 1,  //  当前页数
                total: 0,
            }
        },
        methods: {
            async hFindPage() {
                var that = this;
                hFindPageing(that);
            },
            async currentChange(cpage) {
                var that = this;
                currentChangeing(that, cpage);
            },
            async onSubmit() {
                var that = this;
                onSubmitimg(that);
            },
        },
        mounted() {
            var that = this;
            that.hFindPage();
        }
    }
</script>

<style>
    @import '../../css/student/Sumbit.css';
    @import '../../css/student/TeaTopSelPublic.css';
</style>