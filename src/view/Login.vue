<template>
    <div id="main" :style="styleChange">
        <div class="logo">
            <img :src="imgUrl" alt="logo">
        </div>
        <el-form>
            <div class="login">
                <div class="context">
                    <div class="text">
                        <h1>&nbsp;&nbsp;&nbsp;请登录</h1>
                    </div>
                    <div class="name">
                        <div class="title">
                            <span>账&nbsp;号</span>
                        </div>
                        <el-input v-model="username" placeholder="账 号" name="username" clearable></el-input>
                    </div>
                    <div class="passw">
                        <div class="title">
                            <span>密&nbsp;码</span>
                        </div>
                        <el-input v-model="password" placeholder="密 码" name="password" clearable show-password></el-input>
                    </div>
                    <div class="verificationcode">
                        <div class="title">
                            <span>验证码</span>
                        </div>
                        <el-input v-model="verificationcode" placeholder="验 证 码" name="verificationcode" clearable></el-input>
                        <div class="imagecode">
                            <img :src="base64Captcha" @click="handleCaptchaGenerate" height="38px"/>
                        </div>
                    </div>
                    <div class="flag">
                        <el-form-item>
                            <el-radio-group v-model="loginFlag">
                                <el-radio :label="3">管理员登录</el-radio>
                                <el-radio :label="4">系主任登录</el-radio>
                                <el-radio :label="2">教师登录</el-radio>
                                <el-radio :label="1">学生登录</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                </div>
                <div class="btn">
                    <div class="reg-for">
                        <ul>
                            <li>
                                <span @click="showForgetPassword">&nbsp;&nbsp;忘记密码</span>
                            </li>
                        </ul>
                    </div>
                    <div class="login-btn">
                        <el-button type="primary" @click="login">登录</el-button>
                    </div>
                </div>
            </div>
        </el-form>
        <div class="backgroud" :style="styleChange">
            <swiper :options="swiperOption" ref="swiperLogin" class="swiper" :style="styleChange">
                <swiper-slide v-for="(item,index) in carouselList" :key="index" class="slide">
                    <img :src="item.path" alt=""/>
                </swiper-slide>
            </swiper>
        </div>
        <div class="forgetPassWord">
            <el-dialog title="个人信息" :visible.sync="forgetPassWordShow" class="width: 50%">
                <el-form :model="forgetPassWordForm" class="fop demo-form-inline" :inline="true">
                    <el-form-item label="账号" :label-width="formLabelWidth" class="lab">
                        <el-input v-model="forgetPassWordForm.no" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="角色" class="lab role">
                        <el-select v-model="forgetPassWordForm.role" placeholder="请选择角色" class="ro">
                        <el-option label="学生" value="1"></el-option>
                        <el-option label="教师" value="2"></el-option>
                        <el-option label="管理员" value="3"></el-option>
                        <el-option label="系主任" value="4"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="验证码" :label-width="formLabelWidth">
                        <el-input v-model="forgetPassWordForm.code" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item class="sp">
                        <span class="send" @click="sentCode">点击发送邮箱验证码</span>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="forgetPassWordShow = false">取 消</el-button>
                    <el-button type="primary" @click="beginVerify">重置密码</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import { MessageBox } from 'element-ui'
    import {logining, beginVerifying, sentCodeing} from '../js/Login.js'
    import {getCaptcha} from '../js/request/UserApi'

    export default {
        data() {
            return {
                imgUrl: require('../image/logo.png'),  //  logo的所在地址
                carouselList: [  //  轮播图图片地址
                    {path: require('../image/Login/background1.png')},
                    {path: require('../image/Login/background2.png')},
                    {path: require('../image/Login/background3.png')}
                ],
                swiperOption: {  //  swiper 轮播设置
                    initialSlide: 0,
                    loop: true,
                    speed: 400,
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false
                    },
                    setWrapperSize: true,
                    autoHeight: true,
                    uniqueNavElements: true,
                    preventInteractionOnTransition: false,
                    allowSilderPrev: true,
                    allowSilderNext: true,
                    mousewheelControl: true,
                    observer: true,
                    observeParents: true,
                    debugger: true,
                },
                styleChange: {  //  页面加载时获取的宽高
                    height: window.innerHeight,
                    width: window.innerWidth
                },
                username: '',  //  账号
                password: '',  //  密码
                verificationcode: undefined,  //  验证码
                loginFlag: '',
                uuid: undefined,  //  验证码的唯一标识
                base64Captcha: undefined,  //  验证码地址
                forgetPassWordShow: false,  //  控制忘记密码对话框显示与隐藏的变量
                formLabelWidth: '80px',  //  注册对话框里表单表格的宽度
                forgetPassWordForm: {  //  忘记密码对话框的内容
                    no: '',
                    code: '',
                    role: ''
                }
            }
        },
        methods: {
            async login() {
                var that = this;
                logining(that).then(response => {
                    var userDTO = response.data.userDTO
                    window.localStorage.setItem('userDTO', JSON.stringify(userDTO));
                    if(response.data.userDTO.email == null || response.data.userDTO.email.length == 0) {
                        that.$router.push({
                            path: '/VerbindlichEmail'
                        });
                    } else {
                        if(response.data.userDTO.role == 1) {
                            that.$router.push({
                                path: '/StudentManagement'
                            });
                        } else if(response.data.userDTO.role == 3) {
                            that.$router.push({
                                path: '/AdminManagement'
                            });
                        } else if(response.data.userDTO.role == 2) {
                            that.$router.push({
                                path: '/TeacherManagement'
                            });
                        } else if(response.data.userDTO.role == 4) {
                            that.$router.push({
                                path: '/DepartmentChairManagement'
                            });
                        } 
                        else {
                            MessageBox({
                                title: '提示',
                                message: '登录失败，请稍后再试',
                                type: 'error'
                            })
                        }
                    }
                });
            },
            showForgetPassword:function() {  //  控制忘记密码对话框显示和隐藏的方法
                this.forgetPassWordShow = true;
            },
            async beginVerify() {
                var that = this;
                beginVerifying(that)
            },
            async handleCaptchaGenerate(){  //  生成图片验证码
                var that = this;
                getCaptcha().then(response => {
                    const {img, uuid} = response.data
                    that.base64Captcha = "data:image/gif;base64," + img
                    that.uuid = uuid;
                })
            },
            async sentCode() {
                var that = this;
                sentCodeing(that);
            }
        },
        computed: {
            swiper() {
                return this.$refs.swiperLogin.swiper
            }
        },
        mounted() {
            let that = this;
            that.styleChange.height = window.innerHeight - 5 + "px";  // 屏幕高度 
            that.styleChange.width = window.innerWidth+'px';  // 屏幕宽度 
        },
        created() { // 进入页面时，自动触发下面的方法
            var that = this;
            // that.handleCaptchaGenerate();
        }
    }
</script>

<style scoped>
    @import '../css/Login.css';
</style>

<style>
    .forgetPassWord .el-dialog__wrapper .el-dialog {
        width: 37% !important;
        margin-top: 20vh;
    }

    .forgetPassWord .el-dialog__body {
        padding: 30px 20px 10px 20px;
    }

    .lab .el-form-item__label {
        position: relative;
        right: 2.5%;
    }
</style>
