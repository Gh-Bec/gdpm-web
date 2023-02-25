<template>
    <div id="dmain13" class="bodys eainfo">
        <div class="dopertion">
            <div class="title1">
                <span>邮件信息</span>
            </div>
        </div>
        <div class="dtable">
            <div class="tabledata">
                <el-table :data="tableData" border style="width: 100%" max-height="520" stripe>
                    <el-table-column prop="id" label="编号" width="100" fixed></el-table-column>
                    <el-table-column prop="sendName" label="发送人" width="100"></el-table-column>
                    <el-table-column prop="time" label="时间" width="200"></el-table-column>
                    <el-table-column prop="content" label="内容" width="136">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="toView(scope.$index, scope.row)">点击查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="elpage">
                    <div class="page">
                        <el-pagination background layout="prev, pager, next" :total="tableData.length" 
                        :current-page.sync="current" :page-size.sync="size" :page-sizes="[5,10,50,100]"
                        @size-change="sizeChange" @current-change="currentChange"></el-pagination>
                    </div>
                </div>
            </div>
            <div class="text">
                <p>邮件内容</p>
                <div>
                    <el-input type="textarea" v-model="opinion" readonly></el-input>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {sizeChangeing, currentChangeing} from '../../js/departmentChair/DEmailInfo'
    import {toViewing} from '../../js/departmentChair/DepartmentChairManagement'

    export default {
        data() {
            return {
                tableData: [  //  表格数据
                    {
                        id: '1234',
                        sendName: '设计实现',
                        time: '2020-12-12 12:12:12',
                        content: '1基于微信小程序的少儿创客机构人员薪酬及排课管理系统的设计与实现基于微信小程序的少儿创客机构人员薪酬及排课管理系统的设计与实现基于微信小程序的少儿创客机构人员薪酬及排课管理系统的设计与实现基于微信小程序的少儿创客机构人员薪酬及排课管理系统的设计与实现',
                    }
                ],
                size: 9,  //  每页条数
                current: 1,  //  当前页数
                opinion: '',  //  公告文本框的内容
            }
        },
        methods: {
            sizeChange(psize) {
                var that = this;
                sizeChangeing(that, psize);
            },
            currentChange(cpage) {
                var that = this;
                currentChangeing(that, cpage);
            },
            toView(index, row) {
                var that = this;
                toViewing(that, index, row);
            },
        }
    }
</script>

<style>
    @import '../../css/departmentChair/DepartmentPublc.css';
    @import '../../css/departmentChair/DExamination.css';
</style>