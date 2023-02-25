<template>
    <div id="smain3" class="bodys">
        <el-tabs type="border-card" class="cards">
            <el-tab-pane label="已邀请">
                <div class="hasInvited card">
                    <div class="sopertion">
                        <div class="title1">
                            <span class="sp">已邀请名单</span>
                            <span>
                                <i class="el-icon-refresh iRefresh" v-on:click="refresh1"></i>
                            </span>
                        </div>
                    </div>
                    <div class="table">
                        <div class="tabledata">
                            <el-table :data="hasInvitedTableData" border style="width: 100%" max-height="480" stripe>
                                <el-table-column prop="id" label="编号" width="100" fixed></el-table-column>
                                <el-table-column prop="name" label="名字" width="180"></el-table-column>
                                <el-table-column prop="educationBackground" label="学历" width="180"></el-table-column>
                                <el-table-column prop="professionalTitle" label="职称" width="180"></el-table-column>
                            </el-table>
                        </div>
                        <div class="elpage">
                            <div class="page">
                                <el-pagination background layout="prev, pager, next" :total="hasInvitedTotal" 
                                :current-page.sync="hasInvitedCurrent" :page-size.sync="hasInvitedSize" :page-sizes="[5,10,50,100]"
                                @current-change="hasInvitedCurrentChange"></el-pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="已接受邀请">
                <div class="acceptInvit card">
                    <div class="sopertion">
                        <div class="title1">
                            <span class="sp">已接受名单</span>
                            <span>
                            <i class="el-icon-refresh iRefresh" v-on:click="refresh2"></i>
                        </span>
                        </div>
                        <div class="btn">
                            <el-button type="danger" @click="batchRefused">批量拒绝<i class="el-icon-error el-icon--right"></i></el-button>
                        </div>
                    </div>
                    <div class="table">
                        <div class="tabledata accepttable">
                            <el-table :data="acceptInvitTableData" border style="width: 100%" max-height="480" stripe
                            @selection-change="handleSelectionChange">
                                <el-table-column type="selection" width="45" fixed></el-table-column>
                                <el-table-column prop="id" label="编号" width="100"></el-table-column>
                                <el-table-column prop="name" label="名字" width="180"></el-table-column>
                                <el-table-column prop="educationBackground" label="学历" width="180"></el-table-column>
                                <el-table-column prop="professionalTitle" label="职称" width="180"></el-table-column>
                                <el-table-column label="操作" width="180" fixed="right">
                                    <template slot-scope="scope">
                                        <el-button size="mini" type="primary" @click="accept(scope.$index, scope.row)">接受</el-button>
                                        <el-button size="mini" type="danger" @click="refused(scope.$index, scope.row)">拒绝</el-button>
                                    </template>
                                </el-table-column>
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
                <div class="hasRefused card">
                    <div class="sopertion">
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
                                <el-table-column prop="id" label="编号" width="100" fixed></el-table-column>
                                <el-table-column prop="name" label="名字" width="180"></el-table-column>
                                <el-table-column prop="educationBackground" label="学历" width="180"></el-table-column>
                                <el-table-column prop="professionalTitle" label="职称" width="180"></el-table-column>
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
    import {hasInvitedCurrentChangeing, batchRefuseding, hasInvitedFindPageing, acceptInvitFindPageing, hasRefusedFindPageing, 
    acceptInvitCurrentChangeing, handleSelectionChangeing, accepting, refuseding,
    hasRefusedCurrentChangeing} from '../../js/student/SelectSituation';
    import StudentUtil from '../../js/utils/StudentUtil';
    import TeacherUtil from '../../js/utils/TeacherUtil';

    export default {
        data() {
            return {
                hasInvitedTableData: [  //  已邀请表格数据
                    {
                        id: '',
                        name: '',
                        educationBackground: '',
                        professionalTitle: '',
                    }
                ],
                hasInvitedSize: 9,  //  已邀请每页条数
                hasInvitedCurrent: 1,  //  已邀请当前页数
                hasInvitedTotal: 0,

                acceptInvitTableData: [  //  已接受邀请表格数据
                    {
                        id: '',
                        name: '',
                        educationBackground: '',
                        professionalTitle: '',
                    }
                ],
                acceptInvitSize: 8,  //  已接受邀请每页条数
                acceptInvitCurrent: 1,  //  已接受邀请当前页数
                multipleSelection: [],  //  已接受邀请复选框数据
                acceptInvitTotal: 0,
                ids: [],

                hasRefusedTableData: [  //  已拒绝邀请表格数据
                    {
                        id: '',
                        name: '',
                        educationBackground: '',
                        professionalTitle: '',
                    }
                ],
                hasRefusedSize: 9,  //  已拒绝邀请每页条数
                hasRefusedCurrent: 1,  //  已拒绝邀请当前页数
                hasRefusedTotal: 0,
            }
        },
        methods: {
            refresh1() {
                var that = this;
                that.hasInvitedFindPage();
            },
            async hasInvitedFindPage() {
                var that = this;
                hasInvitedFindPageing(that);
            },
            async hasInvitedCurrentChange(cpage) {
                var that = this;
                hasInvitedCurrentChangeing(that, cpage)
            },
            async handleSelectionChange(val) {
                var that = this;
                handleSelectionChangeing(that, val);
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
            async accept(index, row) {
                var that = this;
                accepting(that, index, row);
                await new Promise(() => {
                    setTimeout(() => {
                        StudentUtil.$emit('getRelationInfo');
                        StudentUtil.$emit('dFindPage');  //  更新导师名单的信息
                        TeacherUtil.$emit('teacher_hasDetermineFindPage');
                    }, 500);
                })
            },
            async refused(index, row) {
                var that = this;that.acceptInvitFindPage();
                refuseding(index, row, that);
                await new Promise(() => {
                    setTimeout(() => {
                        that.acceptInvitFindPage();
                        that.hasRefusedFindPage();
                        TeacherUtil.$emit('teacher_hasRefusedFindPage');
                    }, 500);
                })
            },
            refresh3() {
                var that = this;
                that.hasRefusedFindPage();
            },
            async hasRefusedFindPage() {
                var that = this;
                hasRefusedFindPageing(that);
            },
            async hasRefusedCurrentChange(cpage) {
                var that = this;
                hasRefusedCurrentChangeing(that, cpage)
            },
            async batchRefused() {
                var that = this;
                batchRefuseding(that);
                await new Promise(() => {
                    setTimeout(() => {
                        that.hasRefusedFindPage();
                        TeacherUtil.$emit('teacher_hasRefusedFindPage');
                    }, 500);
                })
            },
        },
        mounted:function() {
            var that = this;
            that.hasInvitedFindPage();
            that.acceptInvitFindPage();
            that.hasRefusedFindPage();

            StudentUtil.$on('hasInvitedFindPage', function() {
                that.hasInvitedFindPage();
            })
            TeacherUtil.$on('student_hasRefusedFindPage', function() {
                that.hasRefusedFindPage();
            })
            TeacherUtil.$on('student_acceptInvitFindPage', function() {
                that.acceptInvitFindPage();
            })
        }
    }
</script>

<style>
    @import '../../css/student/SelectSituation.css';
    @import '../../css/student/TeaTopSelPublic.css';
</style>