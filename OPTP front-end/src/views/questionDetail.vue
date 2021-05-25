<template>
	<div>
		<el-row class="headNavigator" type="flex">
			<el-col :span="23" style="margin-left: 15px; text-align: left; line-height: 40px;">
				<i class="el-icon-arrow-left"></i>
				<el-button type="text" @click="backbnk" style="color: aliceblue;">
					<h3>返回题库页面</h3>
				</el-button>
			</el-col>
			<el-col :span="1">
				<el-avatar style="margin-right: 10px; margin-top: 1px;"> user </el-avatar>
			</el-col>
		</el-row>
		<div class="detailBlock">
			<div class="infoBlock">
				<div class="infoRow">
					<div class="infoInline">
						<div class="info">
							<h4 class="title">类型</h4>
						</div>
						<el-tag class="info">算法</el-tag>
					</div>
				</div>
				<div class="infoInline">
					<div class="info">
						<h4 class="title">题目名称 </h4>
					</div>
					<p class="info">反转数组</p>
				</div>
			</div>
			<div class="infoBlock">
				<h4 class="title">题目要求 </h4>
				<div class="infoRow">
					<div class="infoInline">
						<div class="info">
							<h6 class="title">时间复杂度： </h6>
						</div>
						<p class="info">O(n)</p>
					</div>
					<div class="infoInline">
						<div class="info">
							<h6 class="title">空间复杂度： </h6>
						</div>
						<p class="info">ljlk</p>
					</div>
				</div>
			</div>
			<div class="infoBlock">
				<h4 class="title">题目叙述 </h4>
				<el-input class="text" v-model="statement" :disabled="true">
				</el-input>
			</div>
			<div class="infoBlock">
				<h4 class="title">示例 </h4>
				<p>输入</p>
				<el-input class="text" v-model="inputExample" :disabled="true">
				</el-input>
				<p>输出</p>
				<el-input class="text" v-model="outputExample" :disabled="true">
				</el-input>
			</div>
			<div class="infoBlock">
				<h4 class="title">说明 </h4>
				<el-input class="text" v-model="statement" :disabled="true">
				</el-input>
			</div>
			<div class="infoBlock" style="margin-top: 35px;text-align: center;">
				<el-button type="primary">确认选题</el-button>
				<el-button>返回面试界面</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			backbnk() {
				this.$router.push("/questionBank");
			},
		}
	}
</script>

<style scoped>
	.headNavigator {
		background-color: #333333;
		color: aliceblue;
		padding: 10px;
	}
	.info {
		display: inline-block;
		margin-right: 15px;
	}

	.infoInline {
		margin-right: 50px;
		display: inline-block;
	}

	.title {
		display: inline-block;
	}

	.detailBlock {
		padding: 25px;
	}

	.text {
		margin-right: 300px;
	}
</style>
