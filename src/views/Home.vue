<template>
  <el-container class="home">
    <el-header>
      <div class="logo"></div>
      <div class="title">
        <h1>澎湃投票系统</h1>
      </div>
      <div class="logout">
        <a href="javascript:;" @click="logout">退出</a>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          :default-active="this.$route.path"
          class="el-menu-vertical-demo"
          unique-opened
          router
          background-color="#373e4e"
          text-color="#fff"
          active-text-color="#ffd04b"
          >
        <el-menu-item index="/copywrite">
          <template slot="title">
            <i class="el-icon-right"></i>
            <span>节目名单</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/guest">
          <i class="el-icon-menu"></i>
          <span slot="title">特邀用户</span>
        </el-menu-item>
        <el-menu-item>
          <i class="el-icon-right"></i>
          <span slot="title"><a href = 'http://www.baidu.com' class="vote_link">投票地址</a></span>
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

export default {
  data() {
    return {
    
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
      width: 180px;
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
      flex: 1;
      h1 {
        text-align: left;
        line-height: 60px;
        color: #fff;
        font-size: 24px;
        margin: 0;
        letter-spacing: 2px;
      }
    }
  }
   .el-aside {
    background-color: #373e4e;
    .el-submenu {
      width: 200px;
    }
    .el-menu {
      border:none;
    }
  }
  .el-main {
    background-color: #fff;
  }

}

</style>
