<template>
	<div>
		<fixedParts></fixedParts>
		<div class="accSetting">
			<h3 style="margin-bottom: 25px;">账号设置</h3>
			<div class="personalInfo">
				<div style="" >
					<el-button type="danger" icon="el-icon-edit">更改账号资料</el-button>
				</div>
				
				<!-- form表单 -->
				<el-form :model="newSetting" ref="newSetting" label-width="95px" class="demo-ruleForm">
					<!--邮箱-->
					<el-form-item  style="height: 40px;" label="邮箱" prop="email" :rules="[{ required: true, message: '邮箱不能为空'},]">
						<el-input  v-model="newSetting.email">
						</el-input>
					</el-form-item>
					<!-- 密码 -->
					<el-form-item label="密码" prop="password" :rules="[{ required: true, message: '密码不能为空'},]">
						<el-input placeholder="请输入新密码" v-model="newSetting.password" show-password>
						</el-input>
					</el-form-item>
					<!-- 确认密码 -->
					<el-form-item label="确认密码" prop="checkPassword" :rules="[{ required: true, message: '确认密码必须输入'},]">
						<el-input placeholder="请再次输入确认新密码" show-password>
						</el-input>
					</el-form-item>
				</el-form>
			<div class="buttGroup">
			<el-button>返回首页</el-button>
			<el-button type="primary">提交修改</el-button>
			</div>
			</div>
		</div>
	</div>
</template>

<script>
	import fixedParts from '../components/fixedParts.vue'
	export default {
		components: {
			fixedParts
		},
		data() {
			return{
				newSetting:{
					email:'',
					password:''
				}
			}
		}
	}
</script>

<style scoped>

.buttGroup{
		width: 100%;
	}
.el-form{
	margin-top: 10px;
}
	
</style>
