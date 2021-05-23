<template>
	<div>
		<div class="first-navigator">
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
		  <el-menu-item index="1" style="width: 100px;" >
			  <img src="./assets/logo-test.png" width="70%" height="70%" style="padding-left: 0px;">
			  首页</el-menu-item>
		  
		  <el-menu-item index="2" style="float: right; padding-right: 3%;" >
			  <el-avatar> user </el-avatar>
			退出登录
		  </el-menu-item>
		</el-menu>
		</div>
	<div style="float: right;padding-right: 12%;"><el-button type="primary" icon="el-icon-edit">改变账号设置</el-button></div>
	<div>
		<h3>账号设置</h3>
		<div class="singleInfo">
			<div class="infoTitle">邮箱</div>
			<div class="showinfo"><el-input class="showinfo" v-model="email"
				:disabled="true"></el-input>
			</div>
		</div>
		<div class="singleInfo">
			<div class="infoTitle">密码</div>
			<div class="showinfo"><el-input class="showinfo" v-model="password"
				:disabled="true"></el-input>
			</div>
		</div>
		<el-button type="danger" style="margin-left: 50%;">注销账号</el-button>
	</div>
	</div>
</template>

<script>
</script>

<style>
	.singleInfo{
		margin-bottom: 20px;
	}
	.infoTitle{
		display: inline-block;
		width: 80px;
		text-align: center;
	}
	.showinfo{
		display: inline-block;
		margin-right: 20px;
	}
</style>
