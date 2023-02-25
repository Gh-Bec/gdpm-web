<template>
    <div id="main">
        <div class="header">
            <management-header class="header-slot" @scalingClick="scalingClick" v-bind:userDTO="userDTO">
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
                            <el-menu-item index="/AdminManagement/AdminHomePage">
                                <span class="span2">首页</span>
                            </el-menu-item>
                            <el-menu-item index="/AdminManagement/AdminTutorial">
                                <span class="span4">使用教程</span>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-folder-add"></i>
                            <span slot="title">数据导入</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/AdminManagement/AdminImport">
                                <span class="span5">管理员管理</span>
                            </el-menu-item>
                            <el-menu-item index="/AdminManagement/DepartmentsImport">
                                <span class="span4">院系导入</span>
                            </el-menu-item>
                            <el-menu-item index="/AdminManagement/ProfessionalImport">
                                <span class="span4">专业导入</span>
                            </el-menu-item>
                            <el-menu-item index="/AdminManagement/TeacherImport">
                                <span class="span4">教师导入</span>
                            </el-menu-item>
                            <el-menu-item index="/AdminManagement/StudentImport">
                                <span class="span4">学生导入</span>
                            </el-menu-item>
                            <el-menu-item index="/AdminManagement/HistoryTitleImport">
                                <span class="span6">历史选题导入</span>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-s-data"></i>
                            <span slot="title">数据统计</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/AdminManagement/TeacherStatistical">
                                <span class="span4">教师统计</span>
                            </el-menu-item>
                            <el-menu-item index="/AdminManagement/StudentStatistical">
                                <span class="span4">学生统计</span>
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
                isRouterAlive: true,  //  控制视图是否显示的变量
                isCollapse: true,  //  控制侧边栏的伸缩
                imgUrl: require('../../image/logo.png'),  //  logo的所在地址
                activeIndex: '',
                changeClass: {  //  控制主题内容的宽度和举例左边的间距
                    width: '96%',
                    left: '4%'
                },
                userDTO: [],
            }
        },
        methods: {
            scalingClick: function(isCollapse) {
                var that = this;
                scalingAndClass(isCollapse, that);
            },
        },
        components: {
            managementHeader
        },
    }
</script>

<style>
    @import '../../css/Management.css';
</style>