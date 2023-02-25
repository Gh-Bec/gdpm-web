<template>
    <div id="main9" class="bodys">
        <div class="operation">
            <div class="title1">
                <span>管理员管理</span>
                <span>
                    <i class="el-icon-refresh iRefresh" v-on:click="refresh"></i>
                </span>
            </div>
            <div class="btn">
                <el-button type="primary" @click="insertVisible">新增<i class="el-icon-plus el-icon--right"></i></el-button>
            </div>
        </div>
        <div class="table">
            <div class="tabledata">
                <el-table :data="tableData" border style="width: 100%" max-height="520" stripe>
                    <el-table-column prop="id" label="ID" width="100"></el-table-column>
                    <el-table-column prop="ano" label="账号" width="180"></el-table-column>
                    <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                    <el-table-column prop="sex" label="性别" width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.sex=== 1">男</span>
                            <span v-if="scope.row.sex=== 2">女</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
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
        </div>
        <div id="dialog">
            <el-dialog title="管理员信息" :visible.sync="updateVisible">
                <el-form :model="adminForm" @submit.native.prevent>
                    <el-form-item label="账号" :label-width="formLabelWidth" class="label2">
                        <el-input v-model="adminForm.ano" autocomplete="off" placeholder="请输入账号" :disabled="anoIsEdit"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" :label-width="formLabelWidth" class="label2">
                        <el-input v-model="adminForm.name" autocomplete="off" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" :label-width="formLabelWidth" class="label2">
                        <el-select v-model="adminForm.sex" placeholder="请选择性别" @change="selectSex" class="elselect">
                            <el-option v-for="item in sexList" :label="item.label" :value="item.id" :key="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="邮箱" :label-width="formLabelWidth" class="label2">
                        <el-input v-model="adminForm.email" autocomplete="off" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="updateVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updateAdmin">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="提示" :visible.sync="deleteVisible" width="30%">
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
    import {handleEditing, handleDeleteing, insertVisibleing, selectSexing, 
            updateAdmining, currentChangeing, findPageing, definteDeleteing
    } from '../../js/admin/AdminImport'
    
    export default {
        data() {
            return {
                tableData: [],  //  表格数据
                size: 9,  //  每页条数
                current: 1,  //  当前页数
                updateVisible: false,  //  控制更新对话框的显示
                formLabelWidth: '120px',
                adminForm: {  //  更新对话框中的内容
                    id: '',
                    ano: '',
                    name: '', 
                    sex: '',
                    email: ''
                }, 
                total: 0,  //  数据总条数
                ids: [],
                deleteVisible: false,  //  控制删除确认框的显示
                anoIsEdit: true,
                sexList: [  //  性别下拉框内容
                    {id: 1, label: '男'},
                    {id: 2, label: '女'}
                ],
            }
        },
        methods: {
            refresh() {
                var that = this;
                that.findPage();
            },
            selectSex(val) {
                var that = this;
                selectSexing(that, val);
            },
            async definteDelete() {
                var that = this;
                definteDeleteing(that);
            },
            async findPage() {
                var that = this;
                findPageing(that);
            },
            async currentChange(cpage) {
                var that = this;
                currentChangeing(that, cpage);
            },
            handleEdit(index, row) {
                var that = this;
                handleEditing(that, index, row);
            },
            handleDelete(index, row) {
                var that = this;
                handleDeleteing(that, index, row);
            },
            insertVisible() {
                var that = this;
                insertVisibleing(that);
            },
            async updateAdmin() {
                var that = this;
                updateAdmining(that);
            }
        },
        mounted:function() {
            var that = this;
            that.findPage();
        }
    }
</script>

<style>
    @import '../../css/admin/ImportPublic.css';
    @import '../../css/admin/AdminImport.css';
    @import '../../css/Eldialog.css';
</style>