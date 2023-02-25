<template>
    <div>
        <slot name="header">
            <div class="header-left">
                <svg class="icon" aria-hidden="true" @click="scalingClick">
                    <use xlink:href="#icon-caidan-shousuo"></use>
                </svg>
            </div>
            <div class="header-middle">
                <ul>
                    <li>
                        <span v-cloak v-if="personalForm.sex == 1">男</span>
                        <span v-cloak v-if="personalForm.sex == 2">女</span>
                    </li>
                    <li>
                        <span v-cloak v-if="personalForm.role == 1">学生</span>
                        <span v-cloak v-if="personalForm.role == 2">教师</span>
                        <span v-cloak v-if="personalForm.role == 3">管理员</span>
                        <span v-cloak v-if="personalForm.role == 4">系主任</span>
                    </li>
                    <li><span v-cloak>{{personalForm.name}}</span></li>
                    <li><span v-cloak v-if="personalForm.role == 1">{{studentPersonalForm.professionalName}}</span></li>
                    <li><span v-cloak v-if="personalForm.role == 1">{{studentPersonalForm.departmentName}}</span></li>
                    <li><span v-cloak v-if="personalForm.role == 1">{{studentPersonalForm.grade}}班</span></li>
                    <li><span v-cloak v-if="personalForm.role == 1">{{studentPersonalForm.year}}级</span></li>
                    <li><span v-cloak v-if="personalForm.role == 2 || personalForm.role == 4">{{teacherPersonalForm.professionalTitle}}</span></li>
                    <li><span v-cloak v-if="personalForm.role == 2 || personalForm.role == 4">{{teacherPersonalForm.educationBackground}}</span></li>
                    <li><span v-cloak v-if="personalForm.role == 2 || personalForm.role == 4">{{teacherPersonalForm.professionalName}}</span></li>
                    <li><span v-cloak v-if="personalForm.role == 2 || personalForm.role == 4">{{teacherPersonalForm.departmentName}}</span></li>
                </ul>
            </div>
            <div class="header-right">
                <div class="avatar">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            <el-avatar :size="38" :src="url" :key="url"></el-avatar>
                        </span>
                        <el-dropdown-menu slot="dropdown" class="menu">
                            <el-dropdown-item @click.native="showUpdateForm" class="item">修改个人信息</el-dropdown-item>
                            <el-dropdown-item @click.native="showUpdatePasswordForm" class="item">修改密码</el-dropdown-item>
                            <el-dropdown-item @click.native="exit" class="item">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
            <div class="update">
                <el-dialog title="个人信息" :visible.sync="updateFormVisible">
                    <el-form :model="updateForm" @submit.native.prevent>
                        <el-form-item label="头像" :label-width="formLabelWidth">
                            <el-upload class="avatar-uploader" action="" :show-file-list="false" :http-request="imageUpload"
                                accept=".png, .jpg">
                                <span class="el-dropdown-link">
                                    <el-avatar :size="45" :src="updateForm.headUrl" :key="updateForm.headUrl"></el-avatar>
                                </span>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="姓名" :label-width="formLabelWidth">
                            <el-input v-model="updateForm.name" autocomplete="off" placeholder="姓名" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="性别" :label-width="formLabelWidth">
                            <el-select v-model="updateForm.sex" placeholder="请选择性别" @change="selectSex" class="elselect">
                                <el-option v-for="item in sexList" :label="item.label" :value="item.id" :key="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="邮箱" :label-width="formLabelWidth">
                            <el-input v-model="updateForm.email" autocomplete="off" clearable placeholder="邮箱"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="updateFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="updatePerson">确 定</el-button>
                    </div>
                </el-dialog>
                <el-dialog title="修改密码" :visible.sync="updatePasswordVisible" class="passw">
                    <el-form :model="passwordForm" @submit.native.prevent>
                        <el-form-item label="旧密码" :label-width="formLabelWidth" class="passLabel">
                            <el-input v-model="passwordForm.password" autocomplete="off" placeholder="请输入旧密码" show-password clearable></el-input>
                        </el-form-item>
                        <el-form-item label="新密码" :label-width="formLabelWidth" class="passLabel">
                            <el-input v-model="passwordForm.newPassword" autocomplete="off" placeholder="请输入新密码" show-password clearable></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱验证码" :label-width="formLabelWidth">
                            <el-input v-model="passwordForm.emailCode" autocomplete="off" placeholder="请输入邮箱验证码" clearable></el-input>
                            <el-button type="primary" class="passSend"  @click="sendCode">点击发送</el-button>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="updatePasswordVisible = false">取 消</el-button>
                        <el-button type="primary" @click="updatePass">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </slot>
    </div>
</template>

<script>
    import {scaling, updatePersoning, sendCodeing, updatePassing, setPersonInfoing, selectSexing, 
            showUpdateForming, exiting, imageUploading} from '../../js/components/ManagementHeader';
    import {uploadSuccessing, uploadErroring} from '../../js/global/PublicMethods';
    import { MessageBox } from 'element-ui';

    export default {
        data() {
            return {
                isCollapse: true,  //  控制侧边栏的伸缩
                url: require('../../image/image_fallback.png'),  //  没有图片时的默认显示
                updateFormVisible: false,  //  控制修改个人信息对话框是否显示
                personalForm: {  //  公共个人信息
                    id: '',
                    role: '',
                    name: '',
                    sex: '',
                    email: '',
                    headUrl: '',
                },
                adminPersonalForm: {  //  管理员个人信息
                    ano: '',
                },
                studentPersonalForm: {  //  学生个人信息
                    sno: '',
                    year: '', 
                    departmentName: '', 
                    professionalName: '', 
                    grade: '',
                },
                teacherPersonalForm: {  //  教师个人信息
                    tno: '',
                    departmentName: '', 
                    professionalName: '', 
                    professionalTitle: '', 
                    educationBackground: '',
                },
                formLabelWidth: '120px',
                updatePasswordVisible: false,  //  控制修改密码对话框是否显示
                passwordForm: {  //  修改密码对话框的表单值
                    password: '',
                    newPassword: '',
                    emailCode: ''
                },
                sexList: [  //  性别下拉框内容
                    {id: 1, label: '男'},
                    {id: 2, label: '女'}
                ],
                updateForm: {
                    name: '',
                    sex: '',
                    email: '',
                    headUrl: ''
                },
                userDTO: [],
            }
        },
        methods: {
            async imageUpload(param) {
                var that = this;
                imageUploading(param).then(response => {
                    if(response.msg == 'success') {
                        MessageBox({
                            title: '提示',
                            message: '图片上传成功',
                            type: 'success'
                        });
                        that.updateForm.headUrl = '';
                        that.updateForm.headUrl = response.data.url;
                        // that.url = response.data.url;
                    } else {
                        MessageBox({
                            title: '提示',
                            message: '图片上传失败，请稍后再试',
                            type: 'error'
                        })
                    }
                })
            },
            scalingClick() {
                var that = this;
                scaling(that);
            },
            showUpdateForm() {  //  显示修改个人信息对话框
                var that = this;
                showUpdateForming(that);
            },
            showUpdatePasswordForm() {
                var that = this;
                that.updatePasswordVisible = true;
            },
            async updatePerson() {
                var that = this;
                updatePersoning(that);
            },
            async sendCode() {
                var that = this;
                sendCodeing(that);
            },
            async updatePass() {
                var that = this;
                updatePassing(that);
            },
            setPersonInfo() {
                var that = this;
                setPersonInfoing(that);
            },
            selectSex(val) {
                var that = this;
                selectSexing(that, val);
            },
            async exit() {
                var that = this;
                exiting(that);
            },
            getParam() {
                var that = this;
                that.userDTO = JSON.parse(window.localStorage.getItem('userDTO'));
            },
            uploadSuccess() {
                uploadSuccessing();
            },
            uploadError() {
                uploadErroring();
            },
        },
        mounted:function() {
            var that = this;
            that.setPersonInfo();
        },
        created() {
            var that = this;
            that.getParam();
        }
    }
</script>

<style>
    @import '../../css/components/ManagementHeader.css';
</style>