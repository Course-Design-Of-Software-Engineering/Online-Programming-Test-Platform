<template>
	<div>
		<el-row>
			<el-button type="primary" size="medium" icon="el-icon-edit">编辑题目</el-button>
			<el-button type="info" size="medium" icon="el-icon-s-grid" @click="openBank">从题库中选择</el-button>
		</el-row>
		<div class="questionPart">
			<h4>题目要求</h4>
			<el-divider></el-divider>
			<p>时间：O(n)) 空间：jlj </p>
			<p>代码语言：<el-tag>C++</el-tag>
			</p>
			<p>类型：<el-tag type="success">算法</el-tag>
			</p>
		</div>
		<div class="questionPart">
			<h4>题目叙述</h4>
			<el-divider></el-divider>
			<p>sjlkjjjjjjjjjj</p>
		</div>
		<div class="questionPart">
			<h4>示例</h4>
			<el-divider></el-divider>
			<p>输入</p>
			<el-input v-model="inputExample" :disabled="true">
			</el-input>
			<p>输出</p>
			<el-input v-model="outputExample" :disabled="true">
			</el-input>
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			openBank() {
				this.$router.push("/questionBank");
			}
		}
	}
</script>

<style>
	.questionPart {
		line-height: 30px;
		text-align: left;
		padding: 20px;
	}
</style>
