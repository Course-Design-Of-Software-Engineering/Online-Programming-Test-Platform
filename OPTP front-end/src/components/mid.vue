<template>
	<div>
		<!-- 编程板块 -->
		<div>
			<div style="text-align: left;">
			<el-select placeholder="请选择编程语言" >
				<el-option label="C++" value="C++"></el-option>
				<el-option label="Python" value="Python"></el-option>
				<el-option label="Java" value="Java"></el-option>
			</el-select>
			</div>
			<!-- 代码模块 -->
			<div>
				<codingBlock></codingBlock>
			</div>
			<el-divider></el-divider>
			<!-- 控制台模块 -->
			<div>
				<h4>控制台输出</h4>
				<div>

				</div>
			</div>
			<el-divider></el-divider>
			<!-- 按钮模块 -->
			<div>
				<el-button type="primary" icon="el-icon-video-play">自测运行</el-button>
				<el-button type="success">成功按钮</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import codingBlock from './codingBlock.vue'
	export default {
		
		components: {
			codingBlock
		}
	}
</script>

<style>
</style>
