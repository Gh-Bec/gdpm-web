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
                <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" router :unique-opened="true" 
                    :default-active="activeIndex" @select="handleselect">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">首页管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/DepartmentChairManagement/DepartmentChairHomePage">
                                <span class="span2">首页</span>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-s-management"></i>
                            <span slot="title">学生分配情况</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/DepartmentChairManagement/Distribution">
                                <span class="span4">分配名单</span>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-star-on"></i>
                            <span slot="title">选题审批</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/DepartmentChairManagement/DeclareExamination">
                                <span class="span4">申报审批</span>
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <el-menu-item index="/DepartmentChairManagement/DReplaceExamination">
                                <span class="span4">更换审批</span>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-s-order"></i>
                            <span slot="title">流程审批</span>
                        </template>
                        <!-- <el-menu-item-group>
                            <el-menu-item index="/DepartmentChairManagement/DCommitmentsExamination">
                                <span class="span5">任务书查看</span>
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <el-menu-item index="/DepartmentChairManagement/DOpeningReportExamination">
                                <span class="span6">开题报告查看</span>
                            </el-menu-item>
                        </el-menu-item-group> -->
                        <el-menu-item-group>
                            <el-menu-item index="/DepartmentChairManagement/DIntermediateInspectionExamination">
                                <span class="span6">中期检查审批</span>
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <el-menu-item index="/DepartmentChairManagement/DFirstDraftExamination">
                                <span class="span6">论文初稿审批</span>
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <el-menu-item index="/DepartmentChairManagement/DFinalizedExamination">
                                <span class="span6">论文定稿审批</span>
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <el-menu-item index="/DepartmentChairManagement/DFinalExamination">
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
                            <el-menu-item index="/DepartmentChairManagement/DAnnouncementInfo">
                                <span class="span4">公告管理</span>
                            </el-menu-item>
                        </el-menu-item-group>
                        <!-- <el-menu-item-group>
                            <el-menu-item index="/DepartmentChairManagement/DEmailInfo">
                                <span class="span4">邮件信息</span>
                            </el-menu-item>
                        </el-menu-item-group> -->
                    </el-submenu>
                    <el-submenu index="6">
                        <template slot="title">
                            <i class="el-icon-s-data"></i>
                            <span slot="title">数据统计</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/DepartmentChairManagement/FinishStatistical">
                                <span class="span4">完成情况</span>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </div>
        </div>
        <div class="content" :style="changeClass">
            <keep-alive>
                <router-view v-if="isRouterAlive"></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    import {scalingAndClass} from '../../js/Management';
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
                isRouterAlive: true,
            }
        },
        methods: {
            scalingClick: function(isCollapse) {
                var that = this;
                scalingAndClass(isCollapse, that);
            },
            handleselect: function(a, b) {
                
            }
        },
        components: {
            managementHeader
        },
    }
</script>

<style>
    @import '../../css/Management.css';
</style>