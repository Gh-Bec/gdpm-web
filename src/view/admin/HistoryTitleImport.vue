<template>
    <div id="main6" class="bodys tsh">
        <div class="operation">
            <div class="title1">
                <span>历史选题表</span>
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
                <el-button type="danger" @click="batchDelete">批量删除<i class="el-icon-minus el-icon--right"></i></el-button>
                <!-- <el-button type="primary">导出<i class="el-icon-top-right el-icon--right"></i></el-button> -->
            </div>
        </div>
        <div class="table">
            <div class="tabledata">
                <el-table :data="tableData" border style="width: 100%" max-height="534" stripe @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="40" fixed></el-table-column>
                    <el-table-column prop="id" label="选题ID" width="70"></el-table-column>
                    <el-table-column prop="departmentName" label="所属院系" width="160"></el-table-column>
                    <el-table-column prop="professionalName" label="所属专业" width="180"></el-table-column>
                    <el-table-column prop="projectName" label="选题" width="310"></el-table-column>
                    <el-table-column label="操作" width="135">
                        <template slot-scope="scope">
                            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
            <div class="upload">
                <el-upload class="upload-demo" drag multiple accept=".xls, .xlsx" :disabled="isPass" 
                    action="" :limit="3" :http-request="historyTitleImport" @on-success="uploadSuccess" @on-error="uploadError">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传 xlsx/xls 文件</div>
                </el-upload>
            </div>
            <div class="imgs">
                <p>表格示例</p>
                <viewer :images="imgUrl6">
                    <div v-for="(value,index) in imgUrl6" :key="index">
                        <img :src="value.path" alt="图片">
                    </div>
                </viewer>
            </div>
        </div>
        <div id="dialog">
            <el-dialog title="提示" :visible.sync="deleteVisible"
                width="30%">
                <span>您确定要删除吗？</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="deleteVisible = false">取 消</el-button>
                    <el-button type="primary" @click="definteDelete">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {onSubmitimg, handleDeleteing, handleSelectionChangeing, batchDeleteing, hFindPageing, historyTitleImporting, 
            selectDeping, selectProing, currentChangeing, definteDeleteing, isHisPassing} from '../../js/admin/HistoryTitleImport';
    import {uploadSuccessing, uploadErroring, getDepartmentListing, getProfessionalListing} from '../../js/global/PublicMethods'
    
    export default {
        data() {
            return {
                keywords: '',  //  搜索的关键字
                imgUrl6: [{ path: require('../../image/Admin/historyTitle_example.png') }],
                tableData: [],  //  表格数据
                multipleSelection: [],  //  复选框数据
                size: 9,  //  每页条数
                current: 1,  //  当前页数
                updateVisible: false,  //  控制更新对话框的显示
                formLabelWidth: '120px',
                departmentList: [],  //  系别信息
                professionalList: [],  //  专业信息
                options: [],  //  专业下拉框显示的数据
                total: 0,  //  数据总条数
                ids: [],
                deleteVisible: false,  //  控制删除确认框的显示
                isPass: true
            }
        },
        methods: {
            async isHisPass() {
                var that = this;
                isHisPassing(that);
            },
            async definteDelete() {
                var that = this;
                definteDeleteing(that);
                await new Promise(() => {
                    setTimeout(() => {
                        that.hFindPage();
                    }, 500);
                })
            },
            getDepartName(department) {  //  根据院系数组内容进行表格显示内容的匹配
                var that = this;
                for(var i = 0; i < that.departmentList.length; i++) {
                    if(that.departmentList[i].id == department) {
                        return that.departmentList[i].departmentName;
                    }
                }
            },
            getProName(professional) {  //  根据院系数组内容进行表格显示内容的匹配
                var that = this;
                for(var i = 0; i < that.professionalList.length; i++) {
                    if(that.professionalList[i].id == professional) {
                        return that.professionalList[i].professionalName;
                    }
                }
            },
            async getDepAndProList() {
                var that = this;
                getDepartmentListing(that);
                await new Promise(() => {
                    setTimeout(() => {
                        that.getProfessionalList();
                    }, 100);
                })
            },
            async getProfessionalList() {
                var that = this;
                getProfessionalListing(that);
                await new Promise(() => {
                    setTimeout(() => {
                        that.hFindPage();
                    }, 100);
                })
            },
            async hFindPage() {
                var that = this;
                hFindPageing(that);
            },
            async historyTitleImport(param) {
                var that = this;
                historyTitleImporting(param);
                await new Promise(() => {
                    setTimeout(() => {
                        that.hFindPage(that);
                    }, 3000);
                })
            },
            async currentChange(cpage) {
                var that = this;
                currentChangeing(that, cpage);
            },
            selectDep(val) {
                var that = this;
                selectDeping(that, val);
            },
            selectPro(val) {
                var that = this;
                selectProing(that, val);
            },
            async onSubmit() {
                var that = this;
                onSubmitimg(that);
            },
            handleDelete(index, row) {
                var that = this;
                handleDeleteing(that, index, row)
            },
            handleSelectionChange(val) {
                var that = this;
                handleSelectionChangeing(that, val);
            },
            uploadSuccess() {
                uploadSuccessing();
            },
            uploadError() {
                uploadErroring();
            },
            batchDelete() {
                var that = this;
                batchDeleteing(that);
            },
        },
        mounted() {
            var that = this;
            that.getDepAndProList();
            that.isHisPass();
        }
    }
</script>

<style>
    @import '../../css/admin/ImportPublic.css';
    @import '../../css/admin/HistoryTitleImport.css';
    @import '../../css/Eldialog.css';
</style>