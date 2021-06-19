<template>
	<div class="homeIntro">
		<el-main>
			<div style="float: left; padding-top: 20px; padding-left: 10px;">
				<div class="singleIntro">
					<el-avatar shape="circle" :size="100"> user </el-avatar>
				</div>
				<div class="singleIntro">
					<p id="helloUser">{{ userName }}，您好！</p>
					<p id="email">{{ userEmail }}</p>
				</div>
			</div>
			<div class="divButton">
				<el-button type="success" icon="el-icon-connection" plain round @click="enterItv">进入面试</el-button>
			</div>
		</el-main>
	</div>
</template>

<script>
	export default {
		props: {
			userName: String,
			userEmail: String
		}
		methods: {
			enterItv() {
				this.$confirm('确定进入面试吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'success'
				}).then(() => {
					this.$router.push("/codingPage");
				}).catch(() => {
					// this.$message({
					// 	type: 'info',
					// 	message: '取消'
					// });
				});
			}
		}
	}
</script>

<style scoped>
	.el-main {
		background-color: #bae2f4;
		color: #333;
		/*text-align: center;*/
		line-height: 160px;
		padding: 20px;
		width: 100%;
	}

	.singleIntro {
		justify-content: center;
		display: inline-block;
		margin: 15px;
	} 
	
	p {
		text-align: left;
	}
	#helloUser {
		line-height: 50px;
		font-size: 27px;
		font-weight: bold;
	}
	#email {
		line-height: 15px;
		font-size: smaller;
		color: #44607c;
	}
	.divButton {
		float: right; 
		padding: 20px;
		margin-right: 150px;
	}
</style>
