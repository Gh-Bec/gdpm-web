<template>
    <div id="smain2" class="bodys tealist">
        <div class="sopertion">
            <div class="title1">
                <span>导师名单</span>&nbsp;
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
                <el-button type="primary" @click="batchInvite" :disabled="isOpen">批量邀请<i class="el-icon-s-promotion el-icon--right"></i></el-button>
            </div>
        </div>
        <div class="table">
            <div class="tabledata">
                <el-table :data="tableData" border style="width: 100%" max-height="535" stripe @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="45" fixed></el-table-column>
                    <el-table-column prop="name" label="名字" width="100"></el-table-column>
                    <el-table-column prop="departmentName" label="所属院系" width="180"></el-table-column>
                    <el-table-column prop="professionalName" label="负责专业" width="240"></el-table-column>
                    <el-table-column prop="educationBackground" label="学历" width="100"></el-table-column>
                    <el-table-column prop="professionalTitle" label="职称" width="100"></el-table-column>
                    <el-table-column prop="number" label="剩余人数" width="80"></el-table-column>
                    <el-table-column label="操作" width="139">
                        <template slot-scope="scope">
                            <el-button size="mini" v-if="scope.row.number != 0" type="primary" :disabled="isOpen" @click="handleInvitation(scope.$index, scope.row)">邀请</el-button>
                            <el-button size="mini" v-if="scope.row.number == 0" type="primary" :disabled="true" @click="handleInvitation(scope.$index, scope.row)">邀请</el-button>
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
    import {onSubmitimg, batchInviteing, handleSelectionChangeing, handleInvitationing, currentChangeing, 
            dFindPageing, initDataing} from '../../js/student/TeacherList';
    import StudentUtil from '../../js/utils/StudentUtil';

    export default {
        data() {
            return {
                keywords: '',  //  搜索的关键字
                tableData: [  //  表格数据
                    {
                        id: '',
                        departmentName: '',
                        professionalName: '',
                        name: '',
                        educationBackground: '',
                        professionalTitle: '',
                        number: ''
                    }
                ],
                multipleSelection: [],  //  复选框数据
                size: 9,  //  每页条数
                current: 1,  //  当前页数
                total: 0,  //  数据总条数
                ids: [],
                isOpen: true,
            }
        },
        methods: {
            refresh() {
                var that = this;
                that.isOpen = true;
                that.dFindPage();
                that.initData();
            },
            async dFindPage() {
                var that = this;
                dFindPageing(that);
            },
            async currentChange(cpage) {
                var that = this;
                currentChangeing(that, cpage);
            },
            async onSubmit() {
                var that = this;
                onSubmitimg(that);
            },
            handleSelectionChange(val) {
                var that = this;
                handleSelectionChangeing(that, val);
            },
            async handleInvitation(index, row) {
                var that = this;
                handleInvitationing(that, index, row);
                await new Promise(() => {
                    setTimeout(() => {
                        StudentUtil.$emit('hasInvitedFindPage');
                    }, 500);
                })
            },
            async batchInvite() {
                var that = this;
                batchInviteing(that);
                await new Promise(() => {
                    setTimeout(() => {
                        StudentUtil.$emit('hasInvitedFindPage');
                    }, 500);
                })
            },
            async initData() {
                var that = this;
                initDataing(that);
            },
        },
        mounted:function() {
            var that = this;
            that.dFindPage();
            that.initData();

            StudentUtil.$on('dFindPage', function() {
                that.dFindPage();
            })
        }
    }
</script>

<style>
    @import '../../css/student/Sumbit.css';
    @import '../../css/student/TeaTopSelPublic.css';
</style>