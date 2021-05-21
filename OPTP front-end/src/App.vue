<template>
  <div id="app">
	<el-row>
	  <el-col :span="24"><div class="grid-content bg-purple"></div></el-col>
	</el-row>
    <img src="./assets/logo-test.png">
	<center id="head">欢迎进入TrickyCat在线编程笔试平台</center>
    <div>
      <el-button type="primary" @click="login">登录</el-button>
	  <el-button type="primary" plain @click="register">注册</el-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    login () {
      this.$notify({
        title: '登录进入',
        type: 'success',
        message: '请输入您的账号和密码！',
        duration: 5000
      })
    },
	register () {
	  this.$notify({
	    title: '注册账号',
	    type: 'success',
	    message: '请设置您的账号和密码！',
	    duration: 5000
	  })
	}
  }
}
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}

#head {
	margin: 20px;
	text-align: center;
	font-family: "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.el-row {
	margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
}
.el-col {
    border-radius: 4px;
}
.bg-purple {
    background: #d3dce6;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
</style>
