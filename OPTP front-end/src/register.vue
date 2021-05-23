<template>
	<div class="register">
	<h1 style="text-align: center;margin-bottom: 30px;">用户注册</h1>
	<el-tabs type="border-card">
	  <el-tab-pane label="面试者注册">
		  <div class="leftBlock">
			  邮箱：<el-input v-model="input" placeholder="请输入邮箱"></el-input>
			  昵称：<el-input v-model="input" placeholder="请输入昵称"></el-input>
			  密码：<el-input v-model="input" placeholder="请输入密码"></el-input>
			  确认密码：<el-input v-model="input" placeholder="请再次输入密码以确认"></el-input>
		  </div>
		  <div class="rightBlock">
		  				  意向：<el-input v-model="input" placeholder="请输入你的意向"></el-input>
		  			  手机号：<el-input v-model="input" placeholder="请输入手机号"></el-input>
		  			  密码：<el-input v-model="input" placeholder="请输入密码"></el-input>
		  			  确认密码：<el-input v-model="input" placeholder="请再次输入密码以确认"></el-input>
		  </div>
	  </el-tab-pane>
	  <el-tab-pane label="面试官注册">
	  <div class="leftBlock">
	  			  邮箱：<el-input v-model="input" placeholder="请输入邮箱"></el-input>
	  			  昵称：<el-input v-model="input" placeholder="请输入昵称"></el-input>
	  			  密码：<el-input v-model="input" placeholder="请输入密码"></el-input>
	  			  确认密码：<el-input v-model="input" placeholder="请再次输入密码以确认"></el-input>
	  </div>
	  <div class="rightBlock">
	  			意向：<el-input v-model="input" placeholder="请输入你的意向"></el-input>
	  			  手机号：<el-input v-model="input" placeholder="请输入手机号"></el-input>
	  			  密码：<el-input v-model="input" placeholder="请输入密码"></el-input>
	  			  确认密码：<el-input v-model="input" placeholder="请再次输入密码以确认"></el-input>
	  </div>
	  </el-tab-pane>
	  <div class="buttGroup">
	  <el-button type="primary">确认注册</el-button>
	  <el-button>返回登陆页面</el-button>
	  </div>
	</el-tabs>
	</div>
</template>

<script>
</script>

<style>
.register{
	margin: 5% 10%;
}
.leftBlock{
	width:50%;
	box-sizing: border-box;
	padding: 30px;
	float: left;
}
.rightBlock{
	margin-left: 50%;
	box-sizing: border-box;
	padding: 30px;
}
.buttGroup{
	margin-left: 33%;
}
</style>