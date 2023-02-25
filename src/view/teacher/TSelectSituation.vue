<template>
    <div id="tmain3" class="bodys">
        <el-tabs type="border-card" class="cards">
            <el-tab-pane label="已确认">
                <div class="hasDetermine card">
                    <div class="toperation">
                        <div class="title1">
                            <span class="sp">已确认名单</span>&nbsp;
                            <span>
                                <i class="el-icon-refresh iRefresh" v-on:click="refresh1"></i>
                            </span>
                        </div>
                    </div>
                    <div class="table">
                        <div class="tabledata">
                            <el-table :data="hasDetermineTableData" border style="width: 100%" max-height="480" stripe>
                                <el-table-column prop="sno" label="学号" width="140" fixed></el-table-column>
                                <el-table-column prop="name" label="名字" width="100"></el-table-column>
                                <el-table-column prop="year" label="年级" width="100"></el-table-column>
                                <el-table-column prop="professionalName" label="专业" width="220"></el-table-column>
                                <el-table-column prop="grade" label="班级" width="100"></el-table-column>
                            </el-table>
                        </div>
                        <div class="elpage">
                            <div class="page">
                                <el-pagination background layout="prev, pager, next" :total="hasDetermineTotal" 
                                :current-page.sync="hasDetermineCurrent" :page-size.sync="hasDetermineSize" :page-sizes="[5,10,50,100]"
                                @current-change="hasDetermineCurrentChange"></el-pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="已接受邀请">
                <div class="card">
                    <div class="toperation">
                        <div class="title1">
                            <span class="sp">已接受名单</span>
                            <span>
                                <i class="el-icon-refresh iRefresh" v-on:click="refresh2"></i>
                            </span>
                        </div>
                    </div>
                    <div class="table">
                        <div class="tabledata">
                            <el-table :data="acceptInvitTableData" border style="width: 100%" max-height="480" stripe>
                                <el-table-column prop="sno" label="学号" width="140" fixed></el-table-column>
                                <el-table-column prop="name" label="名字" width="100"></el-table-column>
                                <el-table-column prop="year" label="年级" width="100"></el-table-column>
                                <el-table-column prop="professionalName" label="专业" width="220"></el-table-column>
                                <el-table-column prop="grade" label="班级" width="100"></el-table-column>
                            </el-table>
                        </div>
                        <div class="elpage">
                            <div class="page">
                                <el-pagination background layout="prev, pager, next" :total="acceptInvitTotal" 
                                :current-page.sync="acceptInvitCurrent" :page-size.sync="acceptInvitSize" :page-sizes="[5,10,50,100]"
                                @current-change="acceptInvitCurrentChange"></el-pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="已拒绝">
                <div class="card">
                    <div class="toperation">
                        <div class="title1">
                            <span class="sp">已拒绝名单</span>
                            <span>
                                <i class="el-icon-refresh iRefresh" v-on:click="refresh3"></i>
                            </span>
                        </div>
                    </div>
                    <div class="table">
                        <div class="tabledata">
                            <el-table :data="hasRefusedTableData" border style="width: 100%" max-height="480" stripe>
                                <el-table-column prop="sno" label="学号" width="140" fixed></el-table-column>
                                <el-table-column prop="name" label="名字" width="100"></el-table-column>
                                <el-table-column prop="year" label="年级" width="100"></el-table-column>
                                <el-table-column prop="professionalName" label="专业" width="220"></el-table-column>
                                <el-table-column prop="grade" label="班级" width="100"></el-table-column>
                            </el-table>
                        </div>
                        <div class="elpage">
                            <div class="page">
                                <el-pagination background layout="prev, pager, next" :total="hasRefusedTotal" 
                                :current-page.sync="hasRefusedCurrent" :page-size.sync="hasRefusedSize" :page-sizes="[5,10,50,100]"
                                @current-change="hasRefusedCurrentChange"></el-pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import {hasDetermineCurrentChangeing, acceptInvitCurrentChangeing, hasRefusedCurrentChangeing, hasDetermineFindPageing, 
            acceptInvitFindPageing, hasRefusedFindPageing} from '../../js/teacher/TSelectSituation';
    import TeacherUtil from '../../js/utils/TeacherUtil';

    export default {
        data() {
            return {
                hasDetermineTableData: [],  //  已邀请表格数据
                hasDetermineSize: 9,  //  已邀请每页条数
                hasDetermineCurrent: 1,  //  已邀请当前页数
                hasDetermineTotal: 0,

                acceptInvitTableData: [],  //  已接受邀请表格数据
                acceptInvitSize: 9,  //  已接受邀请每页条数
                acceptInvitCurrent: 1,  //  已接受邀请当前页数
                acceptInvitTotal: 0,

                hasRefusedTableData: [],  //  已拒绝邀请表格数据
                hasRefusedSize: 9,  //  已拒绝邀请每页条数
                hasRefusedCurrent: 1,  //  已拒绝邀请当前页数
                hasRefusedTotal: 0,
            }
        },
        methods: {
            refresh1() {
                var that = this;
                that.hasDetermineFindPage();
            },
            async hasDetermineFindPage() {
                var that = this;
                hasDetermineFindPageing(that);
            },
            async hasDetermineCurrentChange(cpage) {
                var that = this;
                hasDetermineCurrentChangeing(that, cpage)
            },
            refresh2() {
                var that = this;
                that.acceptInvitFindPage();
            },
            async acceptInvitFindPage() {
                var that = this;
                acceptInvitFindPageing(that);
            },
            async acceptInvitCurrentChange(cpage) {
                var that = this;
                acceptInvitCurrentChangeing(that, cpage)
            },
            async hasRefusedCurrentChange(cpage) {
                var that = this;
                hasRefusedCurrentChangeing(that, cpage)
            },
            refresh3() {
                var that = this;
                that.hasRefusedFindPage();
            },
            async hasRefusedFindPage() {
                var that = this;
                hasRefusedFindPageing(that);
            },
        },
        mounted:function() {
            var that = this;
            that.hasDetermineFindPage();
            that.acceptInvitFindPage();
            that.hasRefusedFindPage();

            TeacherUtil.$on('teacher_hasDetermineFindPage', function() {
                that.hasDetermineFindPage();
            })
            TeacherUtil.$on('teacher_acceptInvitFindPage', function() {
                that.acceptInvitFindPage();
            })
            TeacherUtil.$on('teacher_hasRefusedFindPage', function() {
                that.hasRefusedFindPage();
            })
        }
    }
</script>

<style>
    @import '../../css/teacher/TSelectSituation.css';
    @import '../../css/teacher/StuInvitedPublic.css';
</style>