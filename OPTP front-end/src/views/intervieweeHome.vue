<template>
	<div>
		<div class="first-navigator">
			<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
				<el-menu-item index="1" style="width: 100px;">
					首页
				</el-menu-item>

				<el-menu-item index="2" style="float: right; padding-right: 3%;">
					<el-avatar> user </el-avatar>
					退出登录
				</el-menu-item>
			</el-menu>
		</div>
		<div class="intro">
			<div class="singleIntro">
				<el-avatar shape="circle" :size="100"> user </el-avatar>
			</div>
			<div class="singleIntro" style="margin-left: 25px;">
				<p>昵称：</p>
				<p>邮箱：</p>
			</div>
			<div class="singleIntro" style="float: right; padding: 20px;margin-top: 20px;margin-right: 30px;">
				<el-button type="success" plain>进入面试</el-button>
			</div>
		</div>
		<div class="second-navigator" style="width: 50%;">
			<el-col :span="12">
				<el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
					<el-submenu index="1">
						<template slot="title">
							<i class="el-icon-date"></i>
							<span>历史</span>
						</template>
						<el-menu-item-group>
							<router-link to="/historyInterview" style="text-decoration:none; color: #2C3E50;"><el-menu-item index="1-1">历史面试</el-menu-item></router-link>
							<el-menu-item index="1-2">历史题目</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<router-link to="/personalInfo" style="text-decoration:none;">
						<el-menu-item index="2">
							<i class="el-icon-user"></i>
							<span slot="title">个人资料</span>
						</el-menu-item>
					</router-link>
					<router-link to="/accountSetting" style="text-decoration:none; color: #2C3E50;">
						<el-menu-item index="3">
							<i class="el-icon-setting"></i>
							<span slot="title">账号设置</span>
						</el-menu-item>
					</router-link>
				</el-menu>
			</el-col>
		</div>
	</div>
</template>

<script>
</script>

<style>
	.singleIntro {
		display: inline-block;
		margin-top: 10px;
	}
</style>
