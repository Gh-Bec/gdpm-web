<template>
    <div id="smain5" class="bodys scomopen">
        <div class="soperation">
            <div class="title1">
                <span>开题报告提交</span>&nbsp;
                <span>
                    <i class="el-icon-refresh iRefresh" v-on:click="refresh"></i>
                </span>
            </div>
        </div>
        <div class="stable">
            <div class="tabledata">
                <el-table :data="tableData" border style="width: 100%" max-height="520" stripe>
                    <el-table-column prop="name" label="姓名" width="100" fixed></el-table-column>
                    <el-table-column prop="projectName" label="选题" width="280"></el-table-column>
                    <el-table-column prop="teaState" label="审批状态" width="100" >
                        <template slot-scope="scope">
                            <el-tag v-for="(item,index) in stateMap" v-show="scope.row.teaState == item.value" :key="index" :type="item.cssName">
                                {{item.label}}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="teaOpinion" label="指导教师审批意见" width="140">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="toTeaView(scope.$index, scope.row)">点击查看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="178">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="preview(scope.$index, scope.row)">预览</el-button>
                            <el-link :href="scope.row.url" :underline="false">
                                <el-button size="mini" type="danger">下载</el-button>
                            </el-link>
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
            <div class="upload">
                <el-upload class="upload-demo" drag multiple accept=".doc,.docx" :disabled="isPass"
                    action="" :http-request="fileUpload" @on-success="uploadSuccess" @on-error="uploadError">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传 doc,.docx 文件</div>
                </el-upload>
            </div>
            <div class="text">
                <p>审批意见</p>
                <div>
                    <el-input type="textarea" v-model="opinion" readonly></el-input>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { MessageBox } from 'element-ui'
    import {uploadSuccessing, uploadErroring, getState, previewing} from '../../js/global/PublicMethods'
    import {currentChangeing, fileUploading, insertOpening, openFindPageing, isOpenPassing} from '../../js/student/OpeningReportSubmit'
    import {toTeaViewing} from '../../js/student/StudentManagement'

    export default {
        data() {
            return {
                tableData: [],  //  表格数据
                size: 8,  //  每页条数
                current: 1,  //  当前页数
                opinion: '',  //  审批意见文本框的内容
                stateMap: [],  //  审核状态数组
                total: 0,
                isPass: true
            }
        },
        methods: {
            refresh() {
                var that = this;
                that.isPass = true;
                that.isOpenPass();
                that.openFindPage();
            },
            async isOpenPass() {
                var that = this;
                isOpenPassing(that);
            },
            async openFindPage() {
                var that = this;
                openFindPageing(that);
            },
            async insertOpen() {
                var that = this;
                insertOpening(that).then(response => {
                    if(response.msg == 'success' && response.msg == 'success') {
                        if(response.data.state >= 1) {
                            that.openFindPage(that);
                        }
                    } else {
                        MessageBox({
                            title: '提示',
                            message: '系统异常，请重新上传文件',
                            type: 'error'
                        })
                    }
                });
            },
            async fileUpload(param) {
                var that = this;
                fileUploading(param).then(response => {
                    if(response.msg == 'success') {
                        MessageBox({
                            title: '提示',
                            message: '开题报告提交成功',
                            type: 'success'
                        });
                        that.tableData.url = response.data.url;
                        that.insertOpen(that);
                    } else {
                        MessageBox({
                            title: '提示',
                            message: '文件上传失败，请稍后再试',
                            type: 'error'
                        })
                    }
                })
            },
            currentChange(cpage) {
                var that = this;
                currentChangeing(that, cpage);
            },
            uploadSuccess() {
                uploadSuccessing();
            },
            uploadError() {
                uploadErroring();
            },
            preview(index, row) {
                previewing(index, row)
            },
            toTeaView(index, row) {
                var that = this;
                toTeaViewing(that, index, row);
            },
        },
        mounted:function() {
            var that = this;
            getState(that);
            that.openFindPage();
            that.isOpenPass();
        }
    }
</script>

<style>
    @import '../../css/student/Sumbit.css';
    @import '../../css/student/ProcessManagementPublic.css';
</style>