<template>
    <div id="main">
        <div class="header">
            <management-header class="header-slot" @scalingClick="scalingClick">
                <template v-slot:header></template>
            </management-header>
        </div>
        <div class="left">
            <div class="title">
                <span>
                    毕业设计流程管理
                </span>
                <img :src="imgUrl" alt="logo">
            </div>
            <div class="side">
                <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" router :unique-opened="true" :default-active="activeIndex">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">首页管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/TeacherManagement/TeacherHomePage">
                                <span class="span2">首页</span>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-s-management"></i>
                            <span slot="title">学生邀请</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/TeacherManagement/StudentList">
                                <span class="span4">邀请名单</span>
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <el-menu-item index="/TeacherManagement/TSelectSituation">
                                <span class="span4">选择情况</span>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-star-on"></i>
                            <span slot="title">选题审批</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/TeacherManagement/DeclarationExamination">
                                <span class="span4">申报审批</span>
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <el-menu-item index="/TeacherManagement/ReplaceExamination">
                                <span class="span4">更换审批</span>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-s-check"></i>
                            <span slot="title">流程审批</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/TeacherManagement/CommitmentsExamination">
                                <span class="span5">任务书审批</span>
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <el-menu-item index="/TeacherManagement/OpeningReportExamination">
                                <span class="span6">开题报告审批</span>
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <el-menu-item index="/TeacherManagement/IntermediateInspectionExamination">
                                <span class="span6">中期检查审批</span>
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <el-menu-item index="/TeacherManagement/FirstDraftExamination">
                                <span class="span6">论文初稿审批</span>
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <el-menu-item index="/TeacherManagement/FinalizedExamination">
                                <span class="span6">论文定稿审批</span>
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <el-menu-item index="/TeacherManagement/FinalExamination">
                                <span class="span6">论文终稿审批</span>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-info"></i>
                            <span slot="title">信息管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/TeacherManagement/TAnnouncementInfo">
                                <span class="span4">公告管理</span>
                            </el-menu-item>
                        </el-menu-item-group>
                        <!-- <el-menu-item-group>
                            <el-menu-item index="/TeacherManagement/TEmailInfo">
                                <span class="span4">邮件信息</span>
                            </el-menu-item>
                        </el-menu-item-group> -->
                    </el-submenu>
                </el-menu>
            </div>
        </div>
        <div class="content" :style="changeClass">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    import {scalingAndClass, setCurrentRouteing} from '../../js/Management';
    import managementHeader from '../compoments/ManagementHeader.vue';

    export default {
        side: '.side',
        data() {
            return {
                isCollapse: true,  //  控制侧边栏的伸缩
                imgUrl: require('../../image/logo.png'),  //  logo的所在地址
                activeIndex: '',
                changeClass: {  //  控制主题内容的宽度和举例左边的间距
                    width: '96%',
                    left: '4%'
                },
            }
        },
        methods: {
            scalingClick: function(isCollapse) {
                var that = this;
                scalingAndClass(isCollapse, that);
            },
            setCurrentRoute() {
                var that = this;
                setCurrentRouteing(that);
            }
        },
        components: {
            managementHeader
        },
        watch: {
            $route() {  //  检测路由变化
                var that = this;
                that.setCurrentRoute();
            }
        },
        created() {
            var that = this;
            that.setCurrentRoute();
        }
    }
</script>

<style>
    @import '../../css/Management.css';
</style>