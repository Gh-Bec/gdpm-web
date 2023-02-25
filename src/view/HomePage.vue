<template>
    <div id="main">
        <div class="image">
            <img :src="imgUrl" alt="logo">
        </div>
        <div class="info">
            <div class="name">
                Graduation Design Process Management
            </div>
            <p class="introduce">面向微服务架构的毕业设计流程管理系统</p>
            <p class="author">版本 V1.0 &nbsp;&nbsp;&nbsp; 发布时间 2022年2月21日 &nbsp;&nbsp;&nbsp; 设计者 林涛</p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                imgUrl: require('../image/logo.png'),  //  logo的所在地址
            }
        }
    }
</script>

<style scoped>
    @import '../css/HomePage.css';
</style>>