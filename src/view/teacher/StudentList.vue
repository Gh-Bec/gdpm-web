<template>
    <div id="tmain2" class="bodys stulist">
        <div class="toperation">
            <div class="title1">
                <span>邀请名单</span>&nbsp;
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
                <el-button type="primary" :disabled="isOpen" @click="batchInvite">批量接受<i class="el-icon-s-promotion el-icon--right"></i></el-button>
                <el-button type="danger" :disabled="isOpen" @click="batchRefused">批量拒绝<i class="el-icon-circle-close el-icon--right"></i></el-button>
            </div>
        </div>
        <div class="table">
            <div class="tabledata">
                <el-table :data="tableData" border style="width: 100%" max-height="535" stripe
                    @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="45" fixed></el-table-column>
                    <el-table-column prop="sno" label="学号" width="138"></el-table-column>
                    <el-table-column prop="name" label="名字" width="100"></el-table-column>
                    <el-table-column prop="year" label="年级" width="100"></el-table-column>
                    <el-table-column prop="grade" label="班级" width="80"></el-table-column>
                    <el-table-column prop="sex" label="性别" width="80">
                        <template slot-scope="scope">
                            <span v-if="scope.row.sex=== 1">男</span>
                            <span v-if="scope.row.sex=== 2">女</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="professionalName" label="专业" width="260"></el-table-column>
                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" :disabled="isOpen" @click="handAccept(scope.$index, scope.row)">接受</el-button>
                            <el-button size="mini" type="danger" :disabled="isOpen" @click="handRefused(scope.$index, scope.row)">拒绝</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="elpage">
                <div class="page">
                    <el-pagination background layout="prev, pager, next" :total="total" 
                    :current-page.sync="current" :page-size.sync="size" :page-sizes="[5,10,50,100]"
                    @current-change="currentChange"></el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Message } from 'element-ui';
    import {onSubmitimg, batchInviteing, handleSelectionChangeing, handAccepting, currentChangeing, handRefuseding, 
            batchRefuseding, teaStuFindPageing, initDating} from '../../js/teacher/StudentList';
    import TeacherUtil from '../../js/utils/TeacherUtil';

    export default {
        data() {
            return {
                keywords: '',  //  搜索的关键字
                tableData: [],  //  表格数据
                multipleSelection: [],  //  复选框数据
                size: 9,  //  每页条数
                current: 1,  //  当前页数
                total: 0,
                acceptIds: [],
                refusedIds: [], 
                isOpen: false,
            }
        },
        methods: {
            async initData() {
                var that = this;
                initDating(that);
            },
            async refresh() {
                var that = this;
                that.initData();
                that.teaStuFindPage();
            },
            async teaStuFindPage() {
                var that = this;
                teaStuFindPageing(that);
            },
            async currentChange(cpage) {
                var that = this;
                currentChangeing(that, cpage);
            },
            async onSubmit() {
                var that = this;
                onSubmitimg(that);
            },
            async handleSelectionChange(val) {
                var that = this;
                handleSelectionChangeing(that, val);
            },
            async handAccept(index, row) {
                var that = this;
                handAccepting(that, index, row).then(response => {
                    if(response.data.state >= 1) {
                        Message.success("接受邀请成功");
                        that.teaStuFindPage();
                        TeacherUtil.$emit('teacher_acceptInvitFindPage');
                        TeacherUtil.$emit('student_acceptInvitFindPage');
                    } else {
                        Message.error("接受邀请失败，请稍后再试");
                    }
                    that.acceptIds = [];
                })
            },
            async batchInvite() {
                var that = this;
                batchInviteing(that).then(response => {
                    if(response.data.state >= 1) {
                        Message.success("接受邀请成功");
                        that.teaStuFindPage();
                        TeacherUtil.$emit('teacher_acceptInvitFindPage');
                        TeacherUtil.$emit('student_acceptInvitFindPage');
                    } else {
                        Message.error("接受邀请失败，请稍后再试");
                    }
                    that.multipleSelection = [];
                })
            },
            async handRefused(index, row) {
                var that = this;
                handRefuseding(that, index, row).then(response => {
                    if(response.data.state >= 1) {
                        Message.success("拒绝邀请成功");
                        that.teaStuFindPage();
                        TeacherUtil.$emit('teacher_hasRefusedFindPage');
                        TeacherUtil.$emit('student_hasRefusedFindPage');
                    } else {
                        Message.error("拒绝邀请失败，请稍后再试");
                    }
                    that.refusedIds = [];
                })
            },
            async batchRefused() {
                var that = this;
                batchRefuseding(that).then(response => {
                    if(response.data.state >= 1) {
                        Message.success("拒绝邀请成功");
                        that.teaStuFindPage();
                        TeacherUtil.$emit('teacher_hasRefusedFindPage');
                        TeacherUtil.$emit('student_hasRefusedFindPage');
                    } else {
                        Message.error("拒绝邀请失败，请稍后再试");
                    }
                    that.multipleSelection = [];
                })
            }
        },
        mounted:function() {
            var that = this;
            that.teaStuFindPage();
            that.initData();
        }
    }
</script>

<style>
    @import '../../css/teacher/Examination.css';
    @import '../../css/teacher/StuInvitedPublic.css';
</style>