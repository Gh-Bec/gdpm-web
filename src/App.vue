<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  },
  created() {
    var that = this;
    window.addEventListener('beforeunload',()=>{
      sessionStorage.setItem('userDTO', JSON.stringify(that.$store.state));
      sessionStorage.setItem('token', JSON.stringify(that.$store.token));
      sessionStorage.setItem('tokenStartTime', JSON.stringify(that.$store.tokenStartTime));
    })
    
    try{
      sessionStorage.getItem('userDTO') && that.$store.replaceState(Object.assign({},that.$store.state,JSON.parse(sessionStorage.getItem('userDTO'))));
      sessionStorage.getItem('token')
      sessionStorage.getItem('tokenStartTime')
    } catch(err) {
        console.log(err);
    }

    sessionStorage.removeItem("userDTO");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("tokenStartTime");
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
