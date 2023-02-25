<template>
    <div id="main3" class="bodys">
        <div class="operation">
            <div class="title1">
                <span>专业表</span>
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
                    <el-table-column type="selection" width="45" fixed></el-table-column>
                    <el-table-column prop="id" label="专业ID" width="100"></el-table-column>
                    <el-table-column prop="departmentName" label="所属院系" width="200"></el-table-column>
                    <el-table-column prop="professionalName" label="专业名称" width="200"></el-table-column>
                    <el-table-column label="操作" width="250">
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
                <el-upload class="upload-demo" drag multiple accept=".xls, .xlsx" :disabled="isPass"
                    action="" :http-request="professionalImport" @on-success="uploadSuccess" @on-error="uploadError">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传 xlsx/xls 文件</div>
                </el-upload>
            </div>
            <div class="imgs">
                <p>表格示例</p>
                <viewer :images="imgUrl3">
                    <div v-for="(value,index) in imgUrl3" :key="index">
                        <img :src="value.path" alt="图片">
                    </div>
                </viewer>
            </div>
        </div>
        <div id="dialog">
            <el-dialog title="专业信息" :visible.sync="updateVisible">
                <el-form :model="professionalForm" @submit.native.prevent>
                    <el-form-item label="专业名称" :label-width="formLabelWidth">
                        <el-input v-model="professionalForm.professionalName" autocomplete="off" placeholder="请输入专业名称"></el-input>
                    </el-form-item>
                    <el-form-item label="所属院系" :label-width="formLabelWidth">
                        <el-select v-model="professionalForm.forDepartment" placeholder="请选择所属院系" @change="selectChange" class="elselect">
                            <el-option v-for="item in departmentList" :label="item.departmentName" :value="item.id" :key="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="updateVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updateProfess">确 定</el-button>
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
    import {onSubmitimg, handleEditing, handleDeleteing, handleSelectionChangeing, batchDeleteing, insertVisibleing, 
            isProPassing, updateProfessing, selectChangeing, currentChangeing, professionalImporting, pFindPageing, 
            definteDeleteing} from '../../js/admin/ProfessionalImport';
    import {uploadSuccessing, uploadErroring, getDepartmentListing} from '../../js/global/PublicMethods'
    
    export default {
        data() {
            return {
                keywords: '',  //  搜索的关键字
                imgUrl3: [{ path: require('../../image/Admin/professional_example.png') }],
                tableData: [], //  表格数据（下拉框value的数据类型要和这里的id数据类型一致）
                multipleSelection: [],  //  复选框数据
                size: 9,  //  每页条数
                current: 1,  //  当前页数
                formLabelWidth: '120px',
                updateVisible: false,  //  控制更新对话框显示
                professionalForm: {  //  更新对话框的内容
                    id: '',
                    forDepartment: '',
                    professionalName: ''
                },
                departmentList:[ ], //  系别信息
                total: 0,  //  数据总条数
                ids: [],
                deleteVisible: false,  //  控制删除确认框的显示
                isPass: true
            }
        },
        methods: {
            async isProPass() {
                var that = this;
                isProPassing(that);
            },
            async definteDelete() {
                var that = this;
                definteDeleteing(that);
            },
            async getDepartmentList() {
                var that = this;
                getDepartmentListing(that);
                await new Promise(() => {
                    setTimeout(() => {
                        that.pFindPage();
                    }, 100);
                })
            },
            async pFindPage() {
                var that = this;
                pFindPageing(that);
            },
            async professionalImport(param) {
                var that = this;
                professionalImporting(param);
                await new Promise(() => {
                    setTimeout(() => {
                        that.pFindPage(that);
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
            async updateProfess() {
                var that = this;
                updateProfessing(that);
            },
            selectChange(val) {
                var that = this;
                selectChangeing(that, val);
            }
        },
        mounted() {
            var that = this;
            that.getDepartmentList();
            that.isProPass();
        }
    }
</script>

<style>
    @import '../../css/admin/ImportPublic.css';
    @import '../../css/admin/ProfessionalImport.css';
    @import '../../css/Eldialog.css';
</style>