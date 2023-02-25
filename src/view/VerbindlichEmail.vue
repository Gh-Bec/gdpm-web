<template>
    <div id="emain">
        <el-card class="box-card ecard">
            <div class="title">
                <div class="text">
                    <h1>&nbsp;&nbsp;&nbsp;请绑定邮箱</h1>
                </div>
            </div>
            <div class="emailinfo">
                <el-form :model="emails" label-width="80px" :inline="true" class="demo-form-inline ef" @submit.native.prevent>
                    <el-form-item label="邮箱" class="lab">
                        <el-input v-model="emails.email" placeholder="邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码">
                        <el-input v-model="emails.emailCode" placeholder="邮箱验证码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <span class="send" @click="sendCode">点击发送邮箱验证码</span>
                    </el-form-item>
                    <el-form-item class="btn">
                        <el-button type="primary" @click="onSubmit">绑定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
    import { Message } from 'element-ui';
    import {onSubmiting, sendCodeing} from '../js/VerbindlichEmail'

    export default {
        data() {
            return {
                emails: {
                    id: '',
                    email: '',
                    emailCode: '',
                },
                userDTO: [],
                state: 0,
            }
        },
        methods: {
            async onSubmit() {
                var that = this;
                onSubmiting(that);
            },
            async sendCode() {
                var that = this;
                sendCodeing(that);
            },
            getParam() {
                var that = this;
                that.userDTO = JSON.parse(window.localStorage.getItem('userDTO'));
                that.emails.id = that.userDTO.id;
            }
        },
        created() {
            var that = this;
            that.getParam();
        },
    }
</script>

<style scoped>
    @import '../css/VerbindlichEmail.css';
</style>