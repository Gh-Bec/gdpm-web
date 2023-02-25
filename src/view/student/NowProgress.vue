<template>
    <div id="smain1" class="bodys">
        <i class="el-icon-refresh nowRefresh" v-on:click="refresh"></i>
        <div class="infonow">
            <el-descriptions class="margin-top" title="毕业设计相关信息" :column="3" :size="size" border>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-user"></i>姓名
                    </template>
                    <span v-cloak>{{infoList.name}}</span>
                </el-descriptions-item>
                <el-descriptions-item v-cloak>
                    <template slot="label">
                        <i class="el-icon-collection"></i>学号
                    </template>
                    <span v-cloak>{{infoList.sno}}</span>
                    
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-document-copy"></i>院系
                    </template>
                    <span v-cloak>{{infoList.departmentName}}</span>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-tickets"></i>专业
                    </template>
                    <span v-cloak>{{infoList.professionalName}}</span>
                </el-descriptions-item>
                <el-descriptions-item v-cloak>
                    <template slot="label">
                        <i class="el-icon-s-custom"></i>指导老师
                    </template>
                    <span v-cloak>{{infoList.teacher}}</span>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-collection"></i>课题名称
                    </template>
                    <span v-cloak>{{infoList.projectName}}</span>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-info"></i>课题简介
                    </template>
                    <span v-cloak>{{infoList.introduce}}</span>
                </el-descriptions-item>
            </el-descriptions>
        </div>
        <div class="process">
            <el-col :span="8" class="procard">
                <el-card shadow="hover">
                    <p class="title">任务书</p>
                    <div class="state">
                        <span class="column">状态：</span>
                        <span v-if="commitments.comState == 0" style="color: #8E8E8E;">未开始</span>
                        <span v-if="commitments.comState == 1" style="color: #409eff;">审批中...</span>
                        <span v-if="commitments.comState == 2" style="color: #FF0000;">完成</span>
                        <br>
                        <span class="column" v-cloak>完成时间：{{commitments.comTime}}</span>
                        <el-link :href="commitments.comUrl" :underline="false">
                            <el-button type="primary" class="btnd" :disabled="commitmentsIsDo">任务书下载<i class="el-icon-download el-icon--right"></i></el-button>
                        </el-link>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8" class="procard">
                <el-card shadow="hover">
                    <p class="title">开题报告</p>
                    <div class="state">
                        <span class="column">状态：</span>
                        <span v-if="openingReport.openState == 0" style="color: #8E8E8E;">未开始</span>
                        <span v-if="openingReport.openState == 1" style="color: #409eff;">审批中...</span>
                        <span v-if="openingReport.openState == 2" style="color: #FF0000;">完成</span>
                        <br>
                        <span class="column" v-cloak>完成时间：{{openingReport.openTime}}</span>
                        <el-link :href="openingReport.openUrl" :underline="false">
                            <el-button type="primary" class="btnd" :disabled="openingReportIsDo">开题报告下载<i class="el-icon-download el-icon--right"></i></el-button>
                        </el-link>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8" class="procard">
                <el-card shadow="hover">
                    <p class="title">中期检查</p>
                    <div class="state">
                        <span class="column">状态：</span>
                        <span v-if="intermediateInspection.midState == 0" style="color: #8E8E8E;">未开始</span>
                        <span v-if="intermediateInspection.midState == 1" style="color: #409eff;">审批中...</span>
                        <span v-if="intermediateInspection.midState == 2" style="color: #FF0000;">完成</span>
                        <br>
                        <span class="column" v-cloak>完成时间：{{intermediateInspection.midTime}}</span>
                        <el-link :href="intermediateInspection.midUrl" :underline="false">
                            <el-button type="primary" class="btnd" :disabled="intermediateInspectionIsDo">中期检查下载<i class="el-icon-download el-icon--right"></i></el-button>
                        </el-link>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8" class="procard">
                <el-card shadow="hover">
                    <p class="title">论文初稿</p>
                    <div class="state">
                        <span class="column">状态：</span>
                        <span v-if="firstDraft.firstState == 0" style="color: #8E8E8E;">未开始</span>
                        <span v-if="firstDraft.firstState == 1" style="color: #409eff;">审批中...</span>
                        <span v-if="firstDraft.firstState == 2" style="color: #FF0000;">完成</span>
                        <br>
                        <span class="column" v-cloak>完成时间：{{firstDraft.firstTime}}</span>
                        <el-link :href="firstDraft.firstUrl" :underline="false">
                            <el-button type="primary" class="btnd" :disabled="firstDraftIsDo">论文初稿下载<i class="el-icon-download el-icon--right"></i></el-button>
                        </el-link>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8" class="procard">
                <el-card shadow="hover">
                    <p class="title">论文定稿</p>
                    <div class="state">
                        <span class="column">状态：</span>
                        <span v-if="set.setState == 0" style="color: #8E8E8E;">未开始</span>
                        <span v-if="set.setState == 1" style="color: #409eff;">审批中...</span>
                        <span v-if="set.setState == 2" style="color: #FF0000;">完成</span>
                        <br>
                        <span class="column" v-cloak>完成时间：{{set.setTime}}</span>
                        <el-link :href="set.setUrl" :underline="false">
                            <el-button type="primary" class="btnd" :disabled="setIsDo">论文定稿下载<i class="el-icon-download el-icon--right"></i></el-button>
                        </el-link>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8" class="procard">
                <el-card shadow="hover">
                    <p class="title">任务终稿</p>
                    <div class="state">
                        <span class="column">状态：</span>
                        <span v-if="final.finalState == 0" style="color: #8E8E8E;">未开始</span>
                        <span v-if="final.finalState == 1" style="color: #409eff;">审批中...</span>
                        <span v-if="final.finalState == 2" style="color: #FF0000;">完成</span>
                        <br>
                        <span class="column" v-cloak>完成时间：{{final.finalTime}}</span>
                        <el-link :href="final.finalUrl" :underline="false">
                            <el-button type="primary" class="btnd" :disabled="finalIsDo">任务终稿下载<i class="el-icon-download el-icon--right"></i></el-button>
                        </el-link>
                    </div>
                </el-card>
            </el-col>
        </div>
    </div>
</template>

<script>
    import {getParaming, getRelationInfoing, getTeachering} from '../../js/student/NowProgress';
    import StudentUtil from '../../js/utils/StudentUtil';

    export default {
        data() {
            return {
                size: '',  //  el-descriptions列表的尺寸
                infoList: {
                    name: '',
                    sno: '',
                    departmentName: '',
                    professionalName: '',
                    teacher: '',
                    projectName: '',
                    introduce: '',
                    tid:''
                },
                commitments: {
                    comState: '',
                    comTime: '',
                    comUrl: ''
                },
                commitmentsIsDo: true,
                openingReport: {
                    openState: '',
                    openTime: '',
                    openUrl: ''
                },
                openingReportIsDo: true,
                intermediateInspection: {
                    midState: '',
                    midTime: '',
                    midUrl: ''
                },
                intermediateInspectionIsDo: true,
                firstDraft: {
                    firstState: '',
                    firstTime: '',
                    firstUrl: ''
                },
                firstDraftIsDo: true,
                set: {
                    setState: '',
                    setTime: '',
                    setUrl: ''
                },
                setIsDo: true,
                final: {
                    finalState: '',
                    finalTime: '',
                    finalUrl: ''
                },
                finalIsDo: true,
                userDTO: [],
            }
        },
        methods: {
            getParam() {
                var that = this;
                getParaming(that);
            },
            async getRelationInfo() {
                var that = this;
                getRelationInfoing(that);
            },
            async getTeacher() {
                var that = this;
                getTeachering(that);
            },
            refresh() {
                var that = this;
                that.commitmentsIsDo = true;
                that.openingReportIsDo = true;
                that.intermediateInspectionIsDo = true;
                that.firstDraftIsDo = true;
                that.setIsDo = true;
                that.finalIsDo = true;
                that.getRelationInfo();
            }
        },
        created() {
            var that = this;
            that.getParam();
            that.getRelationInfo();
        },
        mounted() {
            var that = this;
            StudentUtil.$on('getRelationInfo', function() {
                that.getRelationInfo();
            });
        }
    }
</script>

<style scope>
    @import '../../css/student/NowProgress.css';
</style>