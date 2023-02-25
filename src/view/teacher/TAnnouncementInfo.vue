<template>
    <div id="tmain12" class="bodys eainfo">
        <div class="toperation">
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
            </div>
        </div>
        <div class="ttable">
            <div class="tabledata">
                <el-table :data="tableData" border style="width: 100%" max-height="535" stripe>
                    <el-table-column prop="role" label="类型" width="100">
                        <template slot-scope="scope">
                            <el-tag v-for="(item,index) in announcementMap" v-show="scope.row.role == item.value" :key="index" :type="item.cssName">
                                {{item.label}}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sendName" label="发送人" width="100"></el-table-column>
                    <el-table-column prop="time" label="时间" width="200"></el-table-column>
                    <el-table-column prop="content" label="内容" width="549"></el-table-column>
                    <el-table-column label="操作" width="160" fixed="right">
                        <template slot-scope="scope">
                            <el-button size="mini" v-if="scope.row.role == 2" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="mini" v-if="scope.row.role == 2" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            <el-tag v-if="scope.row.role == 4" type="info">无操作权限</el-tag>
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
    import {currentChangeing, publishing, handlePublishing, onSubmitimg, handleEditing, 
            handleDeleteing, definteDeleteing} from '../../js/teacher/TAnnouncementInfo'
    import {getAnnouncementMap} from '../../js/global/PublicMethods'

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
                announcementMap: [],
            }
        },
        methods: {
            async findPage() {
                var that = this;
                onSubmitimg(that);
            },
            async definteDelete() {
                var that = this;
                definteDeleteing(that);
            },
            handleDelete(index, row) {
                var that = this;
                handleDeleteing(that, index, row)
            },
            handleEdit(index, row) {
                var that = this;
                handleEditing(that, index, row);
            },
            async onSubmit() {
                var that = this;
                onSubmitimg(that);
            },
            async currentChange(cpage) {
                var that = this;
                currentChangeing(that, cpage);
            },
            async publish() {
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
            getAnnouncementMap(that);
            that.findPage();
        }
    }
</script>

<style>
    @import '../../css/teacher/ExaminationPublic.css';
    @import '../../css/teacher/Examination.css';
</style>