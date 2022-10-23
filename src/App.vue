<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <!-- 在首页和搜索时显示，登录注册不显示 -->
    <Footer v-show="$route.meta.isFooterShow"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 通知vuex发起请求，获取数据，存储于仓库当中.
    // 于App.vue发请求好处，App.vue的mounted只会执行一次，故也只会执行一次发请求得到数据放仓库，而其他组件要用时直接去仓库拿不用再发请求
    this.$store.dispatch("categoryList");
  },
};
</script>

<style>
</style>
