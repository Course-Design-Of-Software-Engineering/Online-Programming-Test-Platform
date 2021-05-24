  
<template>
	<div class="register">
		<h1 style="text-align: center;margin-bottom: 30px;">用户注册</h1>
		<el-tabs type="border-card">
			<el-tab-pane label="面试者注册">
				<!-- form表单 -->
				<el-form :model="nameValidateForm" ref="nameValidateForm" label-width="95px"
					class="demo-ruleForm">
					<!-- 用户名 -->
					<el-form-item label="邮箱" prop="email"
						:rules="[{ required: true, message: '邮箱不能为空'},]">
						<el-input placeholder="请输入邮箱" type="text" v-model="nameValidateForm.email"
							autocomplete="off"></el-input>
					</el-form-item>
				
					<!-- 密码 -->
					<el-form-item label="密码" prop="password"
						:rules="[{ required: true, message: '密码不能为空'},]">
						<el-input placeholder="请输入密码" v-model="nameValidateForm.password" show-password>
						</el-input>
					</el-form-item>
					<!-- 按钮 -->
					<el-form-item>
						<el-button class="loginButt" type="primary"
							@click="submitForm('nameValidateForm')">登录</el-button>
						<el-button class="registerButt" type="infor" @click="register()">注册</el-button>
					</el-form-item>
				</el-form>
			</el-tab-pane>
			<el-tab-pane label="面试官注册">
				44444
			</el-tab-pane>
			<div class="buttGroup">
				<el-button type="primary">确认注册</el-button>
				<el-button>返回登陆页面</el-button>
			</div>
		</el-tabs>
	</div>
</template>

<script>
	export default {
		name: 'login',
		data() {
			return {
				nameValidateForm: {
					email: '',
					password: '',
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						// alert('Email:'+this.nameValidateForm.email+';Password:'+this.nameValidateForm.password);
						// console.log(this.nameValidateForm.email);
						this.$message({
							message: `Email: ${this.nameValidateForm.email} ; Password: ${this.nameValidateForm.password}`,
							type: 'success'
						});
						this.$router.push("/intervieweeHome")
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			register() {
				this.$notify({
					title: '注册账号',
					type: 'warning',
					message: '请设置您的账号和密码！',
					duration: 5000,
				})
				this.$router.push("/register")
			}
		}
	}
</script>

<style>
	.register {
		margin: 5% 10%;
	}
	.leftBlock {
		width: 50%;
		box-sizing: border-box;
		padding: 30px;
		float: left;
	}
	.rightBlock {
		margin-left: 50%;
		box-sizing: border-box;
		padding: 30px;
	}
	.buttGroup {
		margin-left: 33%;
	}
</style>