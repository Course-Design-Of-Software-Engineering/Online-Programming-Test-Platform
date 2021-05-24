<template>
	<div class="codingPage">
		<el-row :gutter="10">
			<el-col :span="5">
				<left></left>
			</el-col>
			<el-col :span="1">
				<el-divider direction="vertical"></el-divider>
			</el-col>
			<el-col :span="10">
				<mid></mid>
			</el-col>
			<el-col :span="1">
				<el-divider direction="vertical"></el-divider>
			</el-col>
			<el-col :span="7">
				<right></right>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import left from './components/left.vue'
	import mid from './components/mid.vue'
	import right from './components/right.vue'
	export default {
		components: {
			left,
			mid,
			right
		},
	}
</script>

<style scoped="true">
	.codingPage{
		margin: 20px;
	}
	.el-divider--vertical {
		display: inline-block;
		width: 2px;
		height: 55em;

	}
</style>
