<template>
  <el-container class="home">
    <el-header>
      <div class="logo"></div>
      <div class="title">
        <h1>澎湃投票系统</h1>
        <div class="iconBox">
            <i :class="{ 'el-icon-s-fold':isFold===true, 'el-icon-s-unfold':isFold===false}" @click="asideShow()"></i>
        </div>
      </div>
      <div class="logout">
        <a href="javascript:;" @click="logout">退出</a>
      </div>
    </el-header>
    <el-container>
      <el-aside :width="changeWidth">
        <el-menu
          :default-active="this.$route.path"
          class="el-menu-vertical-demo"
          unique-opened
          router
          background-color="#373e4e"
          text-color="#fff"
          active-text-color="#ffd04b"
          >
        <el-menu-item index="/program">
          <template slot="title">
            <i class="el-icon-right"></i>
            <span>节目名单</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/guest">
          <i class="el-icon-menu"></i>
          <span slot="title">特邀用户</span>
        </el-menu-item>
        <el-menu-item index="/showVotes">
          <i class="el-icon-menu"></i>
          <span slot="title">查看票数</span>
        </el-menu-item>
        <el-menu-item index="/systemconfig">
          <i class="el-icon-menu"></i>
          <span slot="title">系统参数管理</span>
        </el-menu-item>
        <el-menu-item>
          <i class="el-icon-right"></i>
          <span slot="title"><a :href = 'voteLink' class="vote_link">投票地址</a></span>
        </el-menu-item>
      </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { voteLink } from './config.js'
export default {
  data() {
    return {
      voteLink: '',
      isFold: true
    }
  },
  created() {
    this.voteLink = voteLink
  },
  computed: {
    changeWidth() {
      if(this.isFold === true) {
        return '200px'
      }else {
        return '0px'
      }
    }
  },
  methods: {
    async logout() {
      try {
        // 弹出一个确认框
        await this.$confirm('您确定要退出本系统吗？', '温馨提示', {
          type: 'warning'
        })
        this.$router.push('/')
        this.$message.success('退出系统成功')
      } catch (e) {
        this.$message.info('退出失败')
      }
    },
    asideShow() {
      this.isFold = !this.isFold
    }
  },
}
</script>

<style lang="scss" scoped>
.vote_link{
  color:rgb(255, 255, 255);
  text-decoration: none;
}
.home {
  height: 100%;
  .el-header {
    background-color: #373e4e;
    display: flex;
    border-bottom: 2px solid #accaf5;
    .logout {
      width: 80px;
      font-weight: 700;
      text-align: right;
      line-height: 60px;
      a {
        color: #fff;
        text-decoration: none;
        border: 1px solid;
        border-radius: 2px;
        padding: 3px 5px;
      }
    }

    .title {
      display: flex;
      flex: 1;
      align-items: center;
      h1 {
        text-align: left;
        line-height: 60px;
        color: #fff;
        font-size: 24px;
        margin: 0;
        letter-spacing: 2px;
        margin-right: 10px;
      }
      .iconBox {
        width: 25px;
        height: 25px;
        background-color: white;
        font-size: 25px;
      }
    }
  }
   .el-aside {
    transition: all 0.5s;
    background-color: #373e4e;
    .el-menu {
      border:none;
    }
  }
  .el-main {
    background-color: #fff;
  }

}

</style>
<style>
.el-message-box {
  width: 90%!important;
}
</style>