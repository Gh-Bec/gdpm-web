<template>
    <div id="smain13" class="bodys eainfo">
        <div class="soperation">
            <div class="title1">
                <span>公告信息</span>
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
        <div class="stable">
            <div class="tabledata">
                <el-table :data="tableData" border style="width: 100%" max-height="535" stripe>
                    <el-table-column prop="role" label="类型" width="100">
                        <template slot-scope="scope">
                            <el-tag v-for="(item,index) in announcementMap" v-show="scope.row.role == item.value" :key="index" :type="item.cssName">
                                {{item.label}}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sendName" label="发送人" width="100"></el-table-column>
                    <el-table-column prop="time" label="时间" width="200"></el-table-column>
                    <el-table-column prop="content" label="内容" width="675"></el-table-column>
                </el-table>
                <div class="elpage">
                    <div class="page">
                        <el-pagination background layout="prev, pager, next" :total="total" 
                        :current-page.sync="current" :page-size.sync="size" :page-sizes="[5,10,50,100]"
                        @current-change="currentChange"></el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {currentChangeing, onSubmitimg} from '../../js/student/AnnouncementInfo'
    import {getAnnouncementMap} from '../../js/global/PublicMethods'

    export default {
        data() {
            return {
                tableData: [  //  表格数据
                    {
                        id: '1234',
                        role: 2,
                        sendName: '设计实现',
                        time: '2020-12-12 12:12:12',
                        content: '1基于微信小程序的少儿创客机构人员薪酬及排课管理系统的设计与实现基于微信小程序的少儿创客机构人员薪酬及排课管理系统的设计与实现基于微信小程序的少儿创客机构人员薪酬及排课管理系统的设计与实现基于微信小程序的少儿创客机构人员薪酬及排课管理系统的设计与实现',
                    }
                ],
                size: 9,  //  每页条数
                current: 1,  //  当前页数
                keywords: '',  //  搜索的关键字
                total: 0,
                announcementMap: [],
                keywords: '',  //  搜索的关键字
            }
        },
        methods: {
            async findPage() {
                var that = this;
                onSubmitimg(that);
            },
            async onSubmit() {
                var that = this;
                onSubmitimg(that);
            },
            async currentChange(cpage) {
                var that = this;
                currentChangeing(that, cpage);
            }
        },
        mounted:function() {
            var that = this;
            getAnnouncementMap(that);
            that.findPage();
        }
    }
</script>

<style>
    @import '../../css/student/ProcessManagementPublic.css';
    @import '../../css/student/Sumbit.css';
</style>