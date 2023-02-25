<template>
    <div id="main1">
        <div class="steps">
            <el-steps :active="4" align-center class="elsteps">
                <el-step title="导入院系表" description="学校的院系(必需)"></el-step>
                <el-step title="导入专业表" description="院系下的专业(必需)"></el-step>
                <el-step title="导入教师表" description="负责毕业设计的教师名单(必需)"></el-step>
                <el-step title="导入学生表" description="应届学生名单(必需)"></el-step>
                <el-step title="导入历史记录表" description="往年论文题目(非必需)"></el-step>
            </el-steps>
        </div>
        <div class="images">
            <ul>
                <viewer :images="imgUrlList">
                    <li v-for="(value,index) in imgUrlList" :key="index">
                        <div class="image">
                            <img :src="value.path" alt="图片">
                        </div>
                        <span v-cloak>{{value.title}}</span>
                    </li>
                </viewer>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                imgUrlList: [
                    {
                        path: require('../../image/Admin/department_example.png'),
                        title: '院系表格示例'
                    },
                    {
                        path: require('../../image/Admin/professional_example.png'),
                        title: '专业表格示例'
                    },
                    {
                        path: require('../../image/Admin/teacher_example.png'),
                        title: '教师名单表格示例'
                    },
                    {
                        path: require('../../image/Admin/student_example.png'),
                        title: '学生名单表格示例'
                    },
                    {
                        path: require('../../image/Admin/historyTitle_example.png'),
                        title: '往年论文表格示例'
                    }
                ],
            }
        },
    }
</script>

<style>
    @import '../../css/admin/AdminTutorial.css';
</style>