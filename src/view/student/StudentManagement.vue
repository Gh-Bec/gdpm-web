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
                <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" 
                    router :unique-opened="true" :default-active="activeIndex">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-date"></i>
                            <span slot="title">流程进度</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/StudentManagement/NowProgress">
                                <span class="span4">当前进度</span>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-s-management"></i>
                            <span slot="title">导师选择</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/StudentManagement/TeacherList">
                                <span class="span4">导师名单</span>
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <el-menu-item index="/StudentManagement/SelectSituation">
                                <span class="span4">选择情况</span>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-star-on"></i>
                            <span slot="title">选题管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/StudentManagement/HistoricalTopic">
                                <span class="span4">历史选题</span>
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <el-menu-item index="/StudentManagement/TopicsDeclaration">
                                <span class="span4">课题申报</span>
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <el-menu-item index="/StudentManagement/TopicsReplace">
                                <span class="span4">课题更换</span>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-s-order"></i>
                            <span slot="title">流程管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/StudentManagement/CommitmentsSubmit">
                                <span class="span3">任务书</span>
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <el-menu-item index="/StudentManagement/OpeningReportSubmit">
                                <span class="span4">开题报告</span>
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <el-menu-item index="/StudentManagement/IntermediateInspectionSubmit">
                                <span class="span4">中期检查</span>
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <el-menu-item index="/StudentManagement/FirstDraftSubmit">
                                <span class="span4">论文初稿</span>
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <el-menu-item index="/StudentManagement/FinalizedSubmit">
                                <span class="span4">论文定稿</span>
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <el-menu-item index="/StudentManagement/FinalSubmit">
                                <span class="span4">论文终稿</span>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-info"></i>
                            <span slot="title">信息管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/StudentManagement/AnnouncementInfo">
                                <span class="span4">公告信息</span>
                            </el-menu-item>
                        </el-menu-item-group>
                        <!-- <el-menu-item-group>
                            <el-menu-item index="/StudentManagement/EmailInfo">
                                <span class="span4">邮件信息</span>
                            </el-menu-item>
                        </el-menu-item-group> -->
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
    import {scalingAndClass, setCurrentRouteing} from '../../js/Management';
    import managementHeader from '../compoments/ManagementHeader.vue';

    export default {
        side: '.side',
        data() {
            return {
                isRouterAlive: true,  //  控制视图是否显示的变量
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
    }
</script>

<style>
    @import '../../css/Management.css';
</style>