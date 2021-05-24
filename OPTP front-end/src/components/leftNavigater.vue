<template>
	<div class="leftNavigator" style="width: 25%;box-sizing: border-box;">
		<el-col :span="12" style="width: 100%;">
			<el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
				<el-submenu index="1">
					<template slot="title">
						<i class="el-icon-date"></i>
						<span>历史</span>
					</template>
					<el-menu-item-group>
						<router-link to="/historyInterview" style="text-decoration:none; color: #2C3E50;"><el-menu-item index="1-1">历史面试</el-menu-item></router-link>
						<router-link to="/historyQuestion" style="text-decoration:none; color: #2C3E50;"><el-menu-item index="1-2">历史题目</el-menu-item></router-link>
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
</template>

<script>
</script>

<style>
	.leftNavigator{
		float: left;
	}
</style>
