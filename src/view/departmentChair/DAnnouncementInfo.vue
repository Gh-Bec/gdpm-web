<template>
    <div id="dmain12" class="bodys eainfo">
        <div class="dopertion">
            <div class="title1">
                <span>公告管理</span>
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
                <el-button type="primary" @click="handlePublish">发布公告<i class="el-icon-edit-outline el-icon--right"></i></el-button>
                <el-button type="danger" @click="batchDelete">批量删除<i class="el-icon-minus el-icon--right"></i></el-button>
            </div>
        </div>
        <div class="dtable">
            <div class="tabledata">
                <el-table :data="tableData" border style="width: 100%" max-height="535" stripe @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="45" fixed></el-table-column>
                    <el-table-column prop="id" label="编号" width="100"></el-table-column>
                    <el-table-column prop="sendName" label="发送人" width="100"></el-table-column>
                    <el-table-column prop="time" label="时间" width="200"></el-table-column>
                    <el-table-column prop="content" label="内容" width="470"></el-table-column>
                    <el-table-column label="操作" width="193" fixed="right">
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
        <div id="bh">
            <el-dialog title="公告内容" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="公告内容" class="tera">
                        <el-input type="textarea" v-model="form.content" placeholder="请输入公告内容"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="publish">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <div id="dialog">
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
    import {currentChangeing, publishing, handlePublishing, handleEditing, batchDeleteing, 
            handleDeleteing, definteDeleteing, handleSelectionChangeing, onSubmitimg} from '../../js/departmentChair/DAnnouncementInfo'

    export default {
        data() {
            return {
                tableData: [],  //  表格数据
                size: 9,  //  每页条数
                current: 1,  //  当前页数
                dialogFormVisible: false,  //  控制对话框的显示
                form: {  //  公告对话框内容
                    id: '',
                    content: ''
                },
                deleteVisible: false,  //  控制删除确认框的显示
                ids: [],
                multipleSelection: [],  //  复选框数据
                keywords: '',  //  搜索的关键字
                total: 0,
            }
        },
        methods: {
            async findPage() {
                var that = this;
                onSubmitimg(that);
            },
            async onSubmit() {
                var that = this;
                onSubmitimg(that);
            },
            batchDelete() {
                var that = this;
                batchDeleteing(that);
            },
            handleSelectionChange(val) {
                var that = this;
                handleSelectionChangeing(that, val);
            },
            async definteDelete() {
                var that = this;
                definteDeleteing(that);
            },
            handleEdit(index, row) {
                var that = this;
                handleEditing(that, index, row);
            },
            handleDelete(index, row) {
                var that = this;
                handleDeleteing(that, index, row)
            },
            async currentChange(cpage) {
                var that = this;
                currentChangeing(that, cpage);
            },
            publish() {
                var that = this;
                publishing(that);
            },
            handlePublish() {
                var that = this;
                handlePublishing(that);
            }
        },
        mounted:function() {
            var that = this;
            that.findPage();
        }
    }
</script>

<style>
    @import '../../css/departmentChair/DepartmentPublc.css';
    @import '../../css/departmentChair/DExamination.css';
    @import '../../css/Eldialog.css';
</style>