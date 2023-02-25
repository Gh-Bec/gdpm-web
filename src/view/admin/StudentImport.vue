<template>
    <div id="main5" class="bodys tsh">
        <div class="operation">
            <div class="title1">
                <span>学生表</span>
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
                <el-table :data="tableData" border style="width: 100%" max-height="535" stripe @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="45" fixed></el-table-column>
                    <el-table-column prop="id" label="学生ID" width="80"></el-table-column>
                    <el-table-column prop="year" label="年级" width="100"></el-table-column>
                    <el-table-column prop="sno" label="学号" width="120"></el-table-column>
                    <el-table-column prop="name" label="名字" width="100"></el-table-column>
                    <el-table-column prop="sex" label="性别" width="50">
                        <template slot-scope="scope">
                            <span v-if="scope.row.sex=== 1">男</span>
                            <span v-if="scope.row.sex=== 2">女</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="departmentName" label="所属院系" width="160"></el-table-column>
                    <el-table-column prop="professionalName" label="专业" width="200"></el-table-column>
                    <el-table-column prop="grade" label="班级" width="80"></el-table-column>
                    <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
                    <el-table-column label="操作" width="200" fixed="right">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="elpage">
                    <div class="page">
                        <el-pagination background layout="prev, pager, next" :total="total" 
                        :current-page.sync="current" :page-size.sync="size" :page-sizes="[5,10,50,100,150,200]"
                        @current-change="currentChange"></el-pagination>
                    </div>
                </div>
            </div>
            <div class="upload">
                <el-upload class="upload-demo" drag multiple accept=".xls, .xlsx" :disabled="isPass" 
                    action="" :http-request="studentImport" @on-success="uploadSuccess" @on-error="uploadError">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传 xlsx/xls 文件</div>
                </el-upload>
            </div>
            <div class="imgs">
                <p>表格示例</p>
                <viewer :images="imgUrl5">
                    <div v-for="(value,index) in imgUrl5" :key="index">
                        <img :src="value.path" alt="图片">
                    </div>
                </viewer>
            </div>
        </div>
        <div id="dialog">
            <el-dialog title="学生信息" :visible.sync="updateVisible">
                <el-form :model="studentForm" @submit.native.prevent>
                    <el-form-item label="学号" :label-width="formLabelWidth" class="label2">
                        <el-input v-model="studentForm.sno" autocomplete="off" placeholder="请输入学号" :disabled="snoIsEdit"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" :label-width="formLabelWidth" class="label2">
                        <el-input v-model="studentForm.name" autocomplete="off" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" :label-width="formLabelWidth" class="label2">
                        <el-select v-model="studentForm.sex" placeholder="请选择性别" @change="selectSex" class="elselect">
                            <el-option v-for="item in sexList" :label="item.label" :value="item.id" :key="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属院系" :label-width="formLabelWidth">
                        <el-select v-model="studentForm.department" placeholder="请选择所属院系" @change="selectDep" class="elselect">
                            <el-option v-for="item in departmentList" :label="item.departmentName" :value="item.id" :key="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="专业" :label-width="formLabelWidth" class="label2">
                        <el-select v-model="studentForm.professional" placeholder="请选择所属专业" @change="selectPro" class="elselect">
                            <el-option v-for="item in options" :label="item.professionalName" :value="item.id" :key="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="年级" :label-width="formLabelWidth" class="label2">
                        <el-input v-model="studentForm.year" autocomplete="off" placeholder="请输入年级"></el-input>
                    </el-form-item>
                    <el-form-item label="班级" :label-width="formLabelWidth" class="label2">
                        <el-input v-model="studentForm.grade" autocomplete="off" placeholder="请输入班级"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" :label-width="formLabelWidth" class="label2">
                        <el-input v-model="studentForm.email" autocomplete="off" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="updateVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updateStudent">确 定</el-button>
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
            updateStudenting, selectDeping, selectProing, selectSexing, currentChangeing, sFindPageing, isStuPassing, 
            studentImporting, definteDeleteing} from '../../js/admin/StudentImport';
    import {uploadSuccessing, uploadErroring, getDepartmentListing, getProfessionalListing} from '../../js/global/PublicMethods'
    
    export default {
        data() {
            return {
                keywords: '',  //  搜索的关键字
                imgUrl5: [{ path: require('../../image/Admin/student_example.png') }],
                tableData: [],  //  表格数据
                multipleSelection: [],  //  复选框数据
                size: 9,  //  每页条数
                current: 1,  //  当前页数
                updateVisible: false,  //  控制更新对话框的显示
                formLabelWidth: '120px',
                studentForm: {
                    id: '',
                    year: '',
                    department: '',
                    professional: '',
                    grade: '',
                    name: '',
                    sex: '',
                    email: '',
                    sno: ''
                },
                sexList: [  //  性别下拉框内容
                    {id: 1, label: '男'},
                    {id: 2, label: '女'}
                ],
                departmentList: [],  //  系别信息
                professionalList: [],  //  专业信息
                options: [],  //  专业下拉框显示的数据
                total: 0,  //  数据总条数
                ids: [],
                snoIsEdit: true,
                deleteVisible: false,  //  控制删除确认框的显示
                isPass: true
            }
        },
        methods: {
            async isStuPass() {
                var that = this;
                isStuPassing(that);
            },
            async definteDelete() {
                var that = this;
                definteDeleteing(that);
            },
            async studentImport(param) {
                var that = this;
                studentImporting(param);
                await new Promise(() => {
                    setTimeout(() => {
                        that.sFindPage();
                    }, 3000);
                })
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
                        that.sFindPage();
                    }, 100);
                })
            },
            async sFindPage() {
                var that = this;
                sFindPageing(that);
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
            selectSex(val) {
                var that = this;
                selectSexing(that, val);
            },
            async updateStudent() {
                var that = this;
                updateStudenting(that);
            },
            insertVisible() {
                var that = this;
                insertVisibleing(that);
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
            that.isStuPass();
        }
    }
</script>

<style>
    @import '../../css/admin/ImportPublic.css';
    @import '../../css/admin/StudentImport.css';
    @import '../../css/Eldialog.css';
</style>