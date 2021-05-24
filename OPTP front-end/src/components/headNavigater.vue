<template>
	<div class="headNavigator">
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
		<router-link to="/intervieweeHome" style="text-decoration:none; color: #2C3E50;">
			<el-menu-item index="1" style="width: 100px;">
				首页
			</el-menu-item>
		</router-link>
			<el-menu-item index="2" style="float: right; padding-right: 3%;">
				<el-avatar> user </el-avatar>
				退出登录
			</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
</script>

<style>
</style>
