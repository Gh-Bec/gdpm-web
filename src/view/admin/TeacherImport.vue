<template>
    <div id="main4" class="bodys tsh">
        <div class="operation">
            <div class="title1">
                <span>教师表</span>
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
                    <el-table-column prop="id" label="教师ID" width="80"></el-table-column>
                    <el-table-column prop="tno" label="工号" width="120"></el-table-column>
                    <el-table-column prop="name" label="名字" width="100"></el-table-column>
                    <el-table-column prop="sex" label="性别" width="50">
                        <template slot-scope="scope">
                            <span v-if="scope.row.sex=== 1">男</span>
                            <span v-if="scope.row.sex=== 2">女</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="departmentName" label="所属院系" width="160"></el-table-column>
                    <el-table-column prop="professionalName" label="负责专业" width="200"></el-table-column>
                    <el-table-column prop="rolename" label="角色" width="80"></el-table-column>
                    <el-table-column prop="educationBackground" label="学历" width="80"></el-table-column>
                    <el-table-column prop="professionalTitle" label="职称" width="80"></el-table-column>
                    <el-table-column prop="number" label="指导人数" width="80"></el-table-column>
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
                        :current-page.sync="current" :page-size.sync="size" :page-sizes="[5,10,50,100]" @current-change="currentChange"></el-pagination>
                    </div>
                </div>
            </div>
            <div class="upload">
                <el-upload class="upload-demo" drag multiple accept=".xls, .xlsx" :disabled="isPass" 
                    action="" :http-request="teacherImport" @on-success="uploadSuccess" @on-error="uploadError">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传 xlsx/xls 文件</div>
                </el-upload>
            </div>
            <div class="imgs">
                <p>表格示例</p>
                <viewer :images="imgUrl4">
                    <div v-for="(value,index) in imgUrl4" :key="index">
                        <img :src="value.path" alt="图片">
                    </div>
                </viewer>
            </div>
        </div>
        <div id="dialog" class="margin-top: 0px !important;">
            <el-dialog title="教师信息" :visible.sync="updateVisible">
                <el-form :model="teacherForm" @submit.native.prevent>
                    <el-form-item label="工号" :label-width="formLabelWidth" class="label2">
                        <el-input v-model="teacherForm.tno" autocomplete="off" placeholder="请输入工号" :disabled="tnoIsEdit"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" :label-width="formLabelWidth" class="label2">
                        <el-input v-model="teacherForm.name" autocomplete="off" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" :label-width="formLabelWidth" class="label2">
                        <el-select v-model="teacherForm.sex" placeholder="请选择性别" @change="selectSex" class="elselect">
                            <el-option v-for="item in sexList" :label="item.label" :value="item.id" :key="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属院系" :label-width="formLabelWidth">
                        <el-select v-model="teacherForm.department" placeholder="请选择所属院系" @change="selectDep" class="elselect">
                            <el-option v-for="item in departmentList" :label="item.departmentName" :value="item.id" :key="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="负责专业" :label-width="formLabelWidth">
                        <el-select v-model="teacherForm.professional" placeholder="请选择专业" @change="selectPro" class="elselect">
                            <el-option v-for="item in options" :label="item.professionalName" :value="item.id" :key="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学历" :label-width="formLabelWidth" class="label2">
                        <el-input v-model="teacherForm.educationBackground" autocomplete="off" placeholder="请输入学历"></el-input>
                    </el-form-item>
                    <el-form-item label="职称" :label-width="formLabelWidth" class="label2">
                        <el-input v-model="teacherForm.professionalTitle" autocomplete="off" placeholder="请输入职称"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" :label-width="formLabelWidth" class="label2">
                        <el-input v-model="teacherForm.email" autocomplete="off" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="指导人数" :label-width="formLabelWidth">
                        <el-input v-model="teacherForm.number" autocomplete="off" placeholder="请输入指导人数 默认为10"></el-input>
                    </el-form-item>
                    <el-form-item label="角色" :label-width="formLabelWidth" class="label2">
                        <el-select v-model="teacherForm.role" placeholder="请选择角色" class="elselect">
                            <el-option v-for="item in roleList" :label="item.roleName" :value="item.role" :key="item.role"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="updateVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updateTeacher">确 定</el-button>
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
            updateTeachering, selectDeping, selectProing, selectSexing, currentChangeing, tFindPageing, isTeaPassing, 
            teacherImporting, definteDeleteing} from '../../js/admin/TeacherImport';
    import {uploadSuccessing, uploadErroring, getDepartmentListing, getProfessionalListing} from '../../js/global/PublicMethods';
    import AdminUtil from '../../js/utils/AdminUtil';
    
    export default {
        data() {
            return {
                keywords: '',  //  搜索的关键字
                imgUrl4: [{ path: require('../../image/Admin/teacher_example.png') }],
                tableData: [ ], //  表格数据
                multipleSelection: [],  //  复选框数据
                size: 9,  //  每页条数
                current: 1,  //  当前页数
                updateVisible: false,  //  控制更新对话框的显示
                formLabelWidth: '120px',
                teacherForm: {  //  教师更新对话框数据
                    id: '',
                    department: '',
                    professional: '',
                    name: '',
                    sex: '',
                    educationBackground: '',
                    professionalTitle: '',
                    number: '',
                    email: '',
                    tno: '',
                    role: ''
                },
                sexList: [  //  性别下拉框内容
                    {id: 1, label: '男'},
                    {id: 2, label: '女'}
                ],
                departmentList: [], //  系别信息
                professionalList: [],  //  专业信息
                options: [],  //  专业下拉框显示的数据
                total: 0,  //  数据总条数
                ids: [],
                tnoIsEdit: true,
                roleList: [
                    {role: 2, roleName: '教师'},
                    {role: 4, roleName: '系主任'}
                ],
                deleteVisible: false,  //  控制删除确认框的显示
                isPass: true
            }
        },
        methods: {
            async isTeaPass() {
                var that = this;
                isTeaPassing(that);
            },
            async definteDelete() {
                var that = this;
                definteDeleteing(that);
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
                        that.tFindPage();
                    }, 100);
                })
            },
            async tFindPage() {
                var that = this;
                tFindPageing(that);
            },
            async teacherImport(param) {
                var that = this;
                teacherImporting(param);
                await new Promise(() => {
                    setTimeout(() => {
                        that.tFindPage(that);
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
            selectSex(val) {
                var that = this;
                selectSexing(that, val);
            },
            async updateTeacher() {
                var that = this;
                updateTeachering(that);
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
            that.isTeaPass();
        }
    }
</script>

<style>
    @import '../../css/admin/ImportPublic.css';
    @import '../../css/admin/TeacherImport.css';
    @import '../../css/Eldialog.css';
</style>