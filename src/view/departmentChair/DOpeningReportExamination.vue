<template>
    <div id="dmain6" class="bodys dcomopen">
        <div class="dopertion">
            <div class="title1">
                <span>开题报告查看</span>
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
            <div class="btn">
                <el-button type="success" @click="batchDownload">批量下载<i class="el-icon-download el-icon--right"></i></el-button>
            </div>
        </div>
        <div class="dtable">
            <div class="tabledata">
                <el-table :data="tableData" border style="width: 100%" max-height="520" stripe @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="40" fixed></el-table-column>
                    <el-table-column prop="sno" label="学号" width="125"></el-table-column>
                    <el-table-column prop="name" label="学生姓名" width="105"></el-table-column>
                    <el-table-column prop="professionalName" label="所属专业" width="220"></el-table-column>
                    <el-table-column prop="projectName" label="选题" width="330"></el-table-column>
                    <el-table-column prop="teaState" label="审批状态" width="100" >
                        <template slot-scope="scope">
                            <el-tag v-for="(item,index) in stateMap" v-show="scope.row.teaState == item.value" :key="index" :type="item.cssName">
                                {{item.label}}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="175">
                        <template slot-scope="scope">
                            <el-button size="mini" type="info" @click="preview(scope.$index, scope.row)">预览</el-button>
                            <el-link :href="scope.row.url" :underline="false">
                                <el-button size="mini" type="success">下载</el-button>
                            </el-link>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="elpage">
                    <div class="page">
                        <el-pagination background layout="prev, pager, next" :total="total" 
                        :current-page.sync="current" :page-size.sync="size" :page-sizes="[5,10,50,100]"
                        @current-change="currentChange"></el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {previewing, getState,} from '../../js/global/PublicMethods';
    import {batchDownloading} from '../../js/departmentChair/DepartmentChairManagement';
    import {openFindPageing, currentChangeing, handleSelectionChangeing, onSubmitimg} from '../../js/departmentChair/DOpeningReportExamination'

    export default {
        data() {
            return {
                keywords: '',  //  搜索的关键字
                tableData: [],  //  表格数据
                size: 9,  //  每页条数
                current: 1,  //  当前页数
                multipleSelection: [],  //  复选框数据
                stateMap: [],  //  审核状态数组
                total: 0,
            }
        },
        methods: {
            async openFindPage() {
                var that = this;
                openFindPageing(that);
            },
            async onSubmit() {
                var that = this;
                onSubmitimg(that);
            },
            async currentChange(cpage) {
                var that = this;
                currentChangeing(that, cpage);
            },
            handleSelectionChange(val) {
                var that = this;
                handleSelectionChangeing(that, val);
            },
            preview(index, row) {
                previewing(index, row);
            },
            batchDownload() {
                var that = this;
                batchDownloading(that);
            }
        },
        mounted:function() {
            var that = this;
            getState(that);
            that.openFindPage();
        }
    }
</script>

<style>
    @import '../../css/departmentChair/DepartmentPublc.css';
    @import '../../css/departmentChair/DExamination.css';
</style>