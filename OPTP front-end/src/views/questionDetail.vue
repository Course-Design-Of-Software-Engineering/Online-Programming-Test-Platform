<template>

<div>
	<div class="first-navigator">
	<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
	<el-menu-item index="1" style="width: 100px;" >
		<img src="./assets/logo-whilt.png" width="70%" height="70%" style="padding-left: 0px;">
		首页</el-menu-item>
	<el-menu-item index="2"  >
			返回题库页面
	</el-menu-item>
	<el-menu-item index="3" style="float: right; padding-right: 3%;" >
			<el-avatar> user </el-avatar>
	</el-menu-item>
	</el-menu>
	</div>
	<div class="detailBlock">
	<div class="infoBlock">
	<div class="infoRow">
			<div class="infoInline">
			<div class="info"><h4 class="title">类型</h4></div>
			<el-tag class="info">算法</el-tag>
			</div>
	</div>
		<div class="infoInline">
			<div class="info"><h4 class="title" >题目名称 </h4></div>
			<p class="info" >反转数组</p>
		</div>
		</div>
	<div class="infoBlock">
		<h4 class="title" >题目要求 </h4>
			<div class="infoRow">
			<div class="infoInline">
					<div class="info"><h6 class="title" >时间复杂度： </h6></div>
					<p class="info">O(n)</p>
				</div>
				<div class="infoInline">
					<div class="info"><h6 class="title" >空间复杂度： </h6></div>
					<p class="info" >ljlk</p>
				</div>
			</div>
	</div>
	<div class="infoBlock">
		<h4 class="title" >题目叙述 </h4>
		<el-input class="text"
			v-model="statement"
			:disabled="true">
		</el-input>
	</div>
	<div class="infoBlock">
		<h4 class="title" >示例 </h4>
		<p>输入</p>
		<el-input
			class="text"
			v-model="inputExample"
			:disabled="true">
		</el-input>
		<p>输出</p>
		<el-input class="text" v-model="outputExample" :disabled="true">
		</el-input>
	</div>
	<div class="infoBlock">
		<h4 class="title" >说明 </h4>
		<el-input class="text"
			v-model="statement"
			:disabled="true">
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
</script>

<style scoped>
	.info{
		display: inline-block;
		margin-right: 15px;
	}
	.infoInline{
		margin-right: 50px;
		display: inline-block;
	}
	.title{
		display: inline-block;
	}
	.detailBlock{
		padding: 25px;
	}
	.text{
		margin-right: 300px;
	}
</style>
