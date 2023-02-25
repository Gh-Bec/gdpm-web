<template>
    <div id="tmain8" class="bodys exa">
        <div class="toperation">
            <div class="title1">
                <span>中期检查审批</span>&nbsp;
                <span>
                    <i class="el-icon-refresh iRefresh" v-on:click="refresh"></i>
                </span>
            </div>
            <div class="btn">
                <!-- <el-button type="success" @click="batchDownload">批量下载<i class="el-icon-download el-icon--right"></i></el-button> -->
                <el-button type="primary" @click="batchAgree">批量同意<i class="el-icon-circle-check el-icon--right"></i></el-button>
                <el-button type="danger" @click="handleBatchRefused">批量驳回<i class="el-icon-circle-close el-icon--right"></i></el-button>
            </div>
        </div>
        <div class="ttable">
            <div class="tabledata">
                <el-table :data="tableData" border style="width: 100%" max-height="520" stripe @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="40" fixed></el-table-column>
                    <el-table-column prop="sno" label="学号" width="125"></el-table-column>
                    <el-table-column prop="name" label="姓名" width="105"></el-table-column>
                    <el-table-column prop="projectName" label="选题" width="330"></el-table-column>
                    <el-table-column label="操作" width="400">
                        <template slot-scope="scope">
                            <el-button size="mini" type="info" @click="preview(scope.$index, scope.row)">预览</el-button>
                            <el-link :href="scope.row.url" :underline="false">
                                <el-button size="mini" type="success">下载</el-button>
                            </el-link>
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
        </div>
        <div id="bh">
            <el-dialog title="审批意见" :visible.sync="dialogFormVisible">
                <el-form :model="form" @submit.native.prevent>
                    <el-form-item label="审批意见" class="tera">
                        <el-input type="textarea" v-model="form.teaOpinion" placeholder="请输入审批意见"></el-input>
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
    import {previewing} from '../../js/global/PublicMethods';
    import {batchDownloading} from '../../js/teacher/TeacherManagement';
    import {midFindPageing, currentChangeing, agreeing, handleRefuseding, batchAgreeing, handleSelectionChangeing, refuseding, 
            handleBatchRefuseding} from '../../js/teacher/IntermediateInspectionExamination'

    export default {
        data() {
            return {
                tableData: [],  //  表格数据
                size: 9,  //  每页条数
                current: 1,  //  当前页数
                multipleSelection: [],  //  复选框数据
                dialogFormVisible: false,  //  控制对话框的显示
                form: {  //  驳回对话框的数据
                    teaOpinion: '',
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
                that.midFindPage();
            },
            async midFindPage() {
                var that = this;
                midFindPageing(that);
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
            that.midFindPage();
        }
    }
</script>

<style>
    @import '../../css/teacher/Examination.css';
    @import '../../css/teacher/ExaminationPublic.css';
</style>