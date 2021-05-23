
<template>
  <div id="app">
	<div class="leftBlock">
    <img src="./assets/logo-test.png" width="70%" height="70%">
	</div>
	<div class="rightBlock" >
		<div loginblock>
		<p>欢迎登录</p>
		<el-input class="input"
		    placeholder="请输入用户名"
		    prefix-icon="el-icon-user"
		    v-model="user">
		</el-input>
		<el-input class="input"
		    placeholder="请输入密码"
		    prefix-icon="el-icon-lock"
		    v-model="password">
		</el-input>
		<el-button class="loginButt" type="primary" @click="login">登录</el-button>
		<el-button class="registerButt" type="infor" @click="register()">注册</el-button>
		</div>
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
	    duration: 5000,
	  })
	   this.$router.push({path:'./register.vue'})
	}
  }
}

</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
}

#head {
	margin: 20px;
	text-align: center;
	font-family: "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
*{
	padding: 0px;
	margin: 0px;
	
}
.input{
	float: right;
	margin-top: 15px;
	margin-left: 30%;
	margin-bottom: 15px;
	width: 30px;
}
.leftBlock{
	display: flex;
	    /*实现垂直居中*/
	    align-items: center;
	    /*实现水平居中*/
	    justify-content: center;
	height: 100%;
	width: 50%;
	float: left;
	position: absolute;
}

.rightBlock{
	height: 100%;
	width: 50%;
	float:left;
	position: absolute;
	margin-left: 50%;
	padding: 150px;
	box-sizing: border-box;
	text-align: center;

}


</style>
