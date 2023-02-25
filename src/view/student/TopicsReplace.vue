<template>
    <div id="smain12" class="bodys sdectop">
        <div class="soperation">
            <div class="title1">
                <span>课题更换</span>&nbsp;
                <span>
                    <i class="el-icon-refresh iRefresh" v-on:click="refresh"></i>
                </span>
            </div>
            <div class="btn">
                <el-button type="primary" @click="dialogFormVisible = true" :disabled="isOpen">更换<i class="el-icon-upload2 el-icon--right"></i></el-button>
            </div>
        </div>
        <div class="stable">
            <div class="tabledata">
                <el-table :data="tableData" border style="width: 100%" max-height="520" stripe>
                    <el-table-column prop="name" label="姓名" width="100" fixed></el-table-column>
                    <el-table-column prop="projectName" label="选题" width="323"></el-table-column>
                    <el-table-column prop="teaState" label="指导教师审批状态" width="90" >
                        <template slot-scope="scope">
                            <el-tag v-for="(item,index) in stateMap" v-show="scope.row.teaState == item.value" :key="index" :type="item.cssName">
                                {{item.label}}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="teaOpinion" label="指导老师审批意见" width="140">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="toTeaView(scope.$index, scope.row)">点击查看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="depState" label="系主任审批状态" width="80" >
                        <template slot-scope="scope">
                            <el-tag v-for="(item,index) in stateMap" v-show="scope.row.depState == item.value" :key="index" :type="item.cssName">
                                {{item.label}}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="depOpinion" label="系主任审批意见" width="140">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="toDepView(scope.$index, scope.row)">点击查看</el-button>
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
            <div class="text">
                <p>审批意见</p>
                <div>
                    <el-input type="textarea" v-model="opinion" readonly></el-input>
                </div>
            </div>
        </div>
        <el-dialog title="课题更换" :visible.sync="dialogFormVisible">
            <el-form :model="form" @submit.native.prevent>
                <el-form-item label="课题名称" :label-width="formLabelWidth">
                    <el-input v-model="form.projectName" autocomplete="off" placeholder="请输入课题名称"></el-input>
                </el-form-item>
                <el-form-item label="课题简介" class="tera">
                    <el-input type="textarea" v-model="form.introduce" placeholder="字数不能超过200字"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="replace">更 换</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {getState} from '../../js/global/PublicMethods';
    import {currentChangeing, replaceing, rFindPageing, initDataing} from '../../js/student/TopicsReplace'
    import {toTeaViewing, toDepViewing} from '../../js/student/StudentManagement'

    export default {
        data() {
            return {
                tableData: [],  //  表格数据
                size: 9,  //  每页条数
                current: 1,  //  当前页数
                opinion: '',  //  审批意见文本框的内容
                dialogFormVisible: false,  //  控制申报对话框的显示
                form: {  //  申报对话框的数据
                    projectName: '',
                    introduce: ''
                },
                formLabelWidth: '120px',
                stateMap: [],  //  审核状态数组
                total: 0,
                isOpen: true,
            }
        },
        methods: {
            refresh() {
                var that = this;
                that.isOpen = true;
                that.rFindPage();
                that.initData();
            },
            async initData() {
                var that = this;
                initDataing(that);
            },
            async rFindPage() {
                var that = this;
                rFindPageing(that);
            },
            async currentChange(cpage) {
                var that = this;
                currentChangeing(that, cpage);
            },
            toTeaView(index, row) {
                var that = this;
                toTeaViewing(that, index, row);
            },
            toDepView(index, row) {
                var that = this;
                toDepViewing(that, index, row);
            },
            async replace() {
                var that = this;
                replaceing(that);
            }
        },
        mounted:function() {
            var that = this;
            getState(that);
            that.initData();
            that.rFindPage();
        }
    }
</script>

<style>
    @import '../../css/student/ProcessManagementPublic.css';
    @import '../../css/student/DeclareReplace.css';
</style>