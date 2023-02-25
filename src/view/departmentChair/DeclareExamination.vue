<template>
    <div id="dmain3" class="bodys decrep">
        <div class="dopertion">
            <div class="title1">
                <span>申报审批</span>&nbsp;
                <span>
                    <i class="el-icon-refresh iRefresh" v-on:click="refresh"></i>
                </span>
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
                <el-button type="primary" @click="batchAgree">批量同意<i class="el-icon-circle-check el-icon--right"></i></el-button>
                <el-button type="danger" @click="handleBatchRefused">批量驳回<i class="el-icon-circle-close el-icon--right"></i></el-button>
            </div>
        </div>
        <div class="dtable">
            <div class="tabledata">
                <el-table :data="tableData" border style="width: 100%" max-height="520" stripe @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="40" fixed></el-table-column>
                    <el-table-column prop="sno" label="学号" width="120"></el-table-column>
                    <el-table-column prop="name" label="姓名" width="100"></el-table-column>
                    <el-table-column prop="projectName" label="选题" width="318"></el-table-column>
                    <el-table-column prop="introduce" label="课题简介" width="120">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="toIntroduceView(scope.$index, scope.row)">点击查看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="175" fixed="right">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="agree(scope.$index, scope.row)">同意</el-button>
                            <el-button size="mini" type="danger" @click="handleRefused(scope.$index, scope.row)">驳回</el-button>
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
            <div class="text">
                <p>课题简介</p>
                <div>
                    <el-input type="textarea" v-model="introduce" readonly></el-input>
                </div>
            </div>
        </div>
        <div id="bh">
            <el-dialog title="审批意见" :visible.sync="dialogFormVisible" @submit.native.prevent>
                <el-form :model="form" @submit.native.prevent>
                    <el-form-item label="审批意见" class="tera">
                        <el-input type="textarea" v-model="form.depOpinion" placeholder="请输入审批意见"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="refused">驳 回</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {getState} from '../../js/global/PublicMethods';
    import {declarationFindPageing, currentChangeing, agreeing, handleRefuseding, batchAgreeing, handleSelectionChangeing, 
            toIntroduceViewing, refuseding, handleBatchRefuseding, onSubmitimg, } from '../../js/departmentChair/DeclareExamination'

    export default {
        data() {
            return {
                keywords: '',  //  搜索的关键字
                tableData: [],  //  表格数据
                size: 9,  //  每页条数
                current: 1,  //  当前页数
                stateMap: [],  //  审核状态数组
                multipleSelection: [],  //  复选框数据
                introduce: '',  //  课题简介文本框数据
                dialogFormVisible: false,  //  控制申报对话框的显示
                form: {  //  驳回对话框的数据
                    depOpinion: '',
                    ids: ''
                },
                total: 0,
                agreeIds: [],
                disAgreeIds: []
            }
        },
        methods: {
            refresh() {
                var that = this;
                that.declarationFindPage();
            },
            async declarationFindPage() {
                var that = this;
                declarationFindPageing(that);
            },
            onSubmit() {
                var that = this;
                onSubmitimg(that);
            },
            async currentChange(cpage) {
                var that = this;
                currentChangeing(that, cpage);
            },
            async agree(index, row) {
                var that = this;
                agreeing(that, index, row);
            },
            handleRefused(index, row) {
                var that = this;
                handleRefuseding(that, index, row);
            },
            async refused() {
                var that = this;
                refuseding(that);
            },
            handleBatchRefused() {
                var that = this;
                handleBatchRefuseding(that);
            },
            handleSelectionChange(val) {
                var that = this;
                handleSelectionChangeing(that, val);
            },
            async batchAgree() {
                var that = this;
                batchAgreeing(that);
            },
            toIntroduceView(index, row) {
                var that = this;
                toIntroduceViewing(that, index, row);
            },
        },
        mounted:function() {
            var that = this;
            getState(that);
            that.declarationFindPage();
        }
    }
</script>

<style>
    @import '../../css/departmentChair/DepartmentPublc.css';
    @import '../../css/departmentChair/DExamination.css';
</style>