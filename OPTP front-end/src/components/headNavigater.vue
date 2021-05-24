<template>
	<div>
		<el-header class="headNavigator">
			<el-menu :default-active="this.$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect">
				<router-link to="/intervieweeHome" class="headLink"
					style="text-decoration:none; color: #2C3E50;">
					<el-menu-item index="1" style="float: left; width: 100px;">首页</el-menu-item>
				</router-link>
				<el-menu-item index="2" style="float: right; padding-right: 10px;">
					<el-avatar style="margin-right: 10px;"> user </el-avatar>
					<el-button type="text" @click="exit" style="color: #c73030;">退出登录</el-button>
				</el-menu-item>
			</el-menu>
		</el-header>
	</div>
</template>

<script>
	export default {
		methods: {
			exit() {

				this.$confirm('退出后将返回登录页面, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '已退出!'
					});
					this.$router.push("/login");
				}).catch(() => {
					// this.$message({
					// 	type: 'info',
					// 	message: '取消退出'
					// });
				});
			}
		}
	}
</script>

<style>

</style>
