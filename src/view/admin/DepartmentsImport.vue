<template>
    <div id="main2" class="bodys">
        <div class="operation">
            <div class="title1">
                <span>院系表</span>
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
                <el-button type="primary" @click="insertVisible">新增<i class="el-icon-plus el-icon--right"></i></el-button>
                <!-- <el-button type="primary">导出<i class="el-icon-top-right el-icon--right"></i></el-button> -->
            </div>
        </div>
        <div class="table">
            <div class="tabledata">
                <el-table :data="tableData" border style="width: 100%" max-height="520" stripe @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55" fixed></el-table-column>
                    <el-table-column prop="id" label="院系ID" width="100"></el-table-column>
                    <el-table-column prop="departmentName" label="院系名" width="280"></el-table-column>
                    <el-table-column label="操作" width="280">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
                <el-upload class="upload-demo" drag multiple accept=".xls, .xlsx"
                    :http-request="departmentsImport" action="" @on-success="uploadSuccess" @on-error="uploadError">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传 xlsx/xls 文件</div>
                </el-upload>
            </div>
            <div class="imgs">
                <p>表格示例</p>
                <viewer :images="imgUrl2">
                    <div v-for="(value,index) in imgUrl2" :key="index">
                        <img :src="value.path" alt="图片">
                    </div>
                </viewer>
            </div>
        </div>
        <div id="dialog">
            <el-dialog title="院系信息" :visible.sync="updateVisible">
                <el-form :model="departmentForm" @submit.native.prevent>
                    <el-form-item label="院系名称" :label-width="formLabelWidth">
                        <el-input v-model="departmentForm.departmentName" autocomplete="off" placeholder="请输入院系名称"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="updateVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updateDepart">确 定</el-button>
                </div>
            </el-dialog>
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
    import {uploadSuccessing, uploadErroring} from '../../js/global/PublicMethods'
    import {onSubmitimg, handleEditing, handleDeleteing, handleSelectionChangeing, batchDeleteing, insertVisibleing, 
            updateDeparting, currentChangeing, departmentsImporting, dFindPageing, definteDeleteing
    } from '../../js/admin/DepartmentsImport'
    
    export default {
        data() {
            return {
                keywords: '',  //  搜索的关键字
                imgUrl2: [{ path: require('../../image/Admin/department_example.png') }],
                tableData: [],  //  表格数据
                multipleSelection: [],  //  复选框数据
                size: 9,  //  每页条数
                current: 1,  //  当前页数
                updateVisible: false,  //  控制更新对话框的显示
                formLabelWidth: '120px',
                departmentForm: {  //  更新对话框中的内容
                    id: '',
                    departmentName: '', 
                }, 
                total: 0,  //  数据总条数
                ids: [],
                deleteVisible: false,  //  控制删除确认框的显示
            }
        },
        methods: {
            async definteDelete() {
                var that = this;
                definteDeleteing(that);
            },
            async dFindPage() {
                var that = this;
                dFindPageing(that);
            },
            async departmentsImport(param) {
                var that = this;
                departmentsImporting(param);
                await new Promise(() => {
                    setTimeout(() => {
                        that.dFindPage();
                    }, 500);
                })
            },
            async currentChange(cpage) {
                var that = this;
                currentChangeing(that, cpage);
            },
            async onSubmit() {
                var that = this;
                onSubmitimg(that);
            },
            handleEdit(index, row) {
                var that = this;
                handleEditing(that, index, row);
            },
            handleDelete(index, row) {
                var that = this;
                handleDeleteing(that, index, row);
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
            insertVisible() {
                var that = this;
                insertVisibleing(that);
            },
            async updateDepart() {
                var that = this;
                updateDeparting(that);
            }
        },
        mounted:function() {
            var that = this;
            that.dFindPage();
        }
    }
</script>

<style>
    @import '../../css/admin/ImportPublic.css';
    @import '../../css/admin/DepartmentsImport.css';
    @import '../../css/Eldialog.css';
</style>