<template>
<div>
	<homeIntro></homeIntro>
	<leftNavigator></leftNavigator>
	<div style="float: right;padding-right: 12%;"><el-button type="primary" icon="el-icon-edit">编辑个人资料</el-button></div>
	<div>
		<h3>基本信息</h3>
		<div class="singleInfo">
			<div class="infoTitle">昵称</div>
			<div class="showinfo"><el-input class="showinfo" v-model="nickname"
				:disabled="true"></el-input>
			</div>
		</div>
		<div class="singleInfo">
			<div class="infoTitle">性别</div>
			<div class="showinfo"><el-input class="showinfo" v-model="gender"
				:disabled="true"></el-input>
			</div>
		</div>
		<div class="singleInfo">
			<div class="infoTitle">出生日期</div>
			<div class="showinfo"><el-input class="showinfo" v-model="birthday"
				:disabled="true"></el-input>
			</div>
		</div>
		<div class="singleInfo">
			<div class="infoTitle">邮箱</div>
			<div class="showinfo"><el-input class="showinfo" v-model="email"
				:disabled="true"></el-input>
			</div>
		</div>
		<div class="singleInfo">
			<div class="infoTitle">手机号码</div>
			<div class="showinfo"><el-input class="showinfo" v-model="phone"
				:disabled="true"></el-input>
			</div>
		</div>
	</div>
	<div>
		<h3>工作信息</h3>
		<div class="singleInfo">
			<div class="infoTitle">目前岗位</div>
			<div class="showinfo"><el-input class="showinfo" v-model="currPosition"
				:disabled="true"></el-input>
			</div>
		</div>
		<div class="singleInfo">
			<div class="infoTitle">意向岗位</div>
			<div class="showinfo"><el-input class="showinfo" v-model="idealPosition"
				:disabled="true"></el-input>
			</div>
		</div>
	</div>
	<div>
		<h3>教育信息</h3>
		<div class="singleInfo">
			<div class="infoTitle">学校</div>
			<div class="showinfo"><el-input class="showinfo" v-model="school"
				:disabled="true"></el-input>
			</div>
		</div>
		<div class="singleInfo">
			<div class="infoTitle">专业</div>
			<div class="showinfo"><el-input class="showinfo" v-model="major"
				:disabled="true"></el-input>
			</div>
		</div>
		<div class="singleInfo">
			<div class="infoTitle">入学时间</div>
			<div class="showinfo"><el-input class="showinfo" v-model="entranceTime"
				:disabled="true"></el-input>
			</div>
		</div>
		<div class="singleInfo">
			<div class="infoTitle">学历</div>
			<div class="showinfo"><el-input class="showinfo" v-model="eduBackground"
				:disabled="true"></el-input>
			</div>
		</div>
	</div>
</div>
</template>

<script>
	import leftNavigator from '../components/leftNavigater.vue'
	import homeIntro from '../components/homeInro.vue'
	export default {
		components:{
		leftNavigator,
		homeIntro
		},
	}
</script>
<style>
	.singleInfo{
		margin-bottom: 20px;
	}
	.infoTitle{
		display: inline-block;
		width: 80px;
		text-align: center;
	}
	.showinfo{
		display: inline-block;
		margin-right: 20px;
	}
</style>