<template>
	<div>
		<div class="first-navigator">
			<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
				<el-menu-item index="1" style="width: 100px;">
					首页
				</el-menu-item>

				<el-menu-item index="2" style="float: right; padding-right: 3%;">
					<el-avatar> user </el-avatar>
					退出登录
				</el-menu-item>
			</el-menu>
		</div>
		<home-intro></home-intro>
		<left-navigator></left-navigator>
		<div class="accSetting">
			<h3  style="margin-bottom: 25px;">账号设置</h3>
			<div class="accEditDiv" style=" margin-top: 10px;">
			<!--邮箱-->
			<div class="singleInfo">
			<el-row >
				<el-col :span="2"><div class="infoTitle">绑定邮箱：</div></el-col>
				<el-col :span="4"><div>
						<el-input
							v-model="email"
							:disabled="true">
						</el-input>
				</div></el-col>
			</el-row>
			</div>
			<!--密码-->
			<div class="singleInfo">
			<el-row>
				<el-col :span="2"><div class="infoTitle">密码：</div></el-col>
				<el-col :span="4"><div>
						<el-input
							v-model="password"
							:disabled="true">
						</el-input>
				</div></el-col>
			</el-row>
			</div>
			<el-button type="danger" style="margin-left: 0%;">注销账号</el-button>
			<el-button type="primary" icon="el-icon-edit" >改变账号设置</el-button>
		</div>
		</div>
	</div>
</template>

<script>
	import leftNavigator from '../components/leftNavigater.vue'
	import homeIntro from '../components/homeInro.vue'
	export default{
		components:{
			leftNavigator,
			homeIntro
			
		}
	}
</script>

<style>
	
	.el-row{
		height: 25px;
	}
	.infoTitle {
		text-align: center;
	}
	.accSetting{
		margin-left: 26%;
		padding-top: 11%;
	}

	.singleInfo{
		margin-bottom: 10px;
	}
</style>
