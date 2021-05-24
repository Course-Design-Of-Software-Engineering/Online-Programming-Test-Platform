<template>
	<div>
		<fixedParts></fixedParts>
		<div>
			<el-main>
				<h3>欢迎进入TrickyCat在线编程笔试平台！</h3>
			</el-main>
		</div>
	</div>
</template>

<script>
	import fixedParts from '../components/fixedParts.vue'
	export default{
		components:{
			fixedParts
		}
	}
</script>

<style scoped>
  .el-main {
    color: #333;
    text-align: center;
    line-height: 200px;
	height: inherit;
  }
</style>
