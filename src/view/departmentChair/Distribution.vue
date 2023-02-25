<template>
    <div id="dmain2" class="bodys distr">
        <div class="dopertion">
            <div class="title1">
                <span>分配名单</span>&nbsp;
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
        </div>
        <div class="dtable">
            <div class="tabledata">
                <el-table :data="tableData" border style="width: 100%" max-height="535" stripe>
                    <el-table-column prop="tno" label="教师工号" width="120"></el-table-column>
                    <el-table-column prop="tname" label="教师名字" width="100"></el-table-column>
                    <el-table-column prop="professionalTitle" label="职称" width="100"></el-table-column>
                    <el-table-column prop="professionalName" label="负责专业" width="220"></el-table-column>
                    <el-table-column prop="sno" label="学号" width="140"></el-table-column>
                    <el-table-column prop="sname" label="学生姓名" width="100"></el-table-column>
                    <el-table-column prop="grade" label="所在班级" width="100"></el-table-column>
                    <el-table-column label="操作" width="139">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" :disabled="scope.row.comState != 0" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
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
        <div id="dialog">
            <el-dialog title="选择关系" :visible.sync="updateVisible">
                <el-form :model="selectForm" @submit.native.prevent>
                    <el-form-item label="学生名字" :label-width="formLabelWidth">
                        <el-input v-model="selectForm.sname" autocomplete="off" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="教师名单" :label-width="formLabelWidth">
                        <el-select v-model="selectForm.tid" placeholder="请选择教师" class="elselect">
                            <el-option v-for="item in teachertList" :label="item.name" :value="item.id" :key="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="updateVisible = false">取 消</el-button>
                    <el-button type="primary" @click="defineUpdate">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {distributionFindPageing, onSubmitimg, currentChangeing, defineUpdateing, 
            handleEditing} from '../../js/departmentChair/Distribution'

    export default {
        data() {
            return {
                formLabelWidth: '120px',
                keywords: '',  //  搜索的关键字
                tableData: [],  //  表格数据
                size: 9,  //  每页条数
                current: 1,  //  当前页数
                total: 0,
                updateVisible: false,
                selectForm: {
                    sname: '',
                    sid: '',
                    tid: ''
                },
                teachertList:[],
            }
        },
        methods: {
            async defineUpdate() {
                var that = this;
                defineUpdateing(that)
            },
            handleEdit(index, row) {
                var that = this;
                handleEditing(that, index, row);
            },
            refresh() {
                var that = this;
                that.distributionFindPage();
            },
            async distributionFindPage() {
                var that = this;
                distributionFindPageing(that);
            },
            async currentChange(cpage) {
                var that = this;
                currentChangeing(that, cpage);
            },
            async onSubmit() {
                var that = this;
                onSubmitimg(that);
            }
        },
        mounted:function() {
            var that = this;
            that.distributionFindPage();
        }
    }
</script>

<style>
    @import '../../css/departmentChair/DepartmentPublc.css';
    @import '../../css/departmentChair/DExamination.css';
    @import '../../css/Eldialog.css';
</style>