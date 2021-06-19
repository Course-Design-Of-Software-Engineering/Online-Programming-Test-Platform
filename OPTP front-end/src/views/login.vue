<template>
	<div id="app">
		<div class="leftBlock">
			<img src="../assets/logo.png" width=300px height=300px>
		</div>
		<div class="rightBlock">
			<el-row type="flex" justify="center">
				<el-col :span="18">
					<el-container>
						<el-main style="display:flex; justify-content:center;">
							<el-card class="el-card" style="background-color: #eaecf0;">
								<h1 style="text-align: center; line-height: 80px;">欢迎登录在线编程笔试平台</h1>
								<el-divider></el-divider>
								<!-- form表单 -->
								<el-form :model="nameValidateForm" ref="nameValidateForm" label-width="95px"
									class="demo-ruleForm">
									<!-- 邮箱 -->
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

							</el-card>
						</el-main>
					</el-container>
				</el-col>
			</el-row>
		</div>
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
					var that = this
					if (valid) {
						// alert('Email:'+this.nameValidateForm.email+';Password:'+this.nameValidateForm.password);
						// console.log(this.nameValidateForm.email);
						this.$axios.post('/api/login', {
							email: this.nameValidateForm.email,
							password: this.nameValidateForm.password
						}).then(function(response) {
							if (response.data.status == '0') {
								let loginResult = response.data.result.list
								if (loginResult.length == 0) {
									that.$alert('账号或密码不正确', '登录', {
										confirmButtonText: '确定',
										callback: action => {}
									});
								} else {
									console.log(loginResult)
									console.log(that.nameValidateForm.email)
									console.log(that.nameValidateForm.password)
									// that.$store.commit('login', nameValidateForm.email);
									that.$message({
										message: `Email: ${that.nameValidateForm.email} ; Password: ${that.nameValidateForm.password}`,
										type: 'success'
									});
									// that.$router.push('/intervieweeHome')
									that.$router.push({
										path:'/intervieweeHome',
										query:{
											userId: loginResult._id,
											userName: loginResult.username,
											userEmail: that.nameValidateForm.email
										}
									})
								}
							}
						}).catch(function(error) {
							console.log(error);
						});
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
	#app {
		font-family: Helvetica, sans-serif;
	}

	#head {
		margin: 20px;
		text-align: center;
		font-family: "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
	}

	* {
		padding: 0px;
		margin: 0px;

	}

	.input {
		float: right;
		margin-top: 15px;
		margin-left: 30%;
		margin-bottom: 15px;
		width: 30px;
	}

	.leftBlock {
		display: flex;
		/*实现垂直居中*/
		align-items: center;
		/*实现水平居中*/
		justify-content: center;
		height: 100%;
		width: 50%;
		float: left;
		position: absolute;
	}

	.rightBlock {
		height: 100%;
		width: 120%;
		float: left;
		position: absolute;
		margin-left: 50px;
		margin-top: 50px;
		padding: 100px;
		box-sizing: border-box;
		text-align: center;

	}

	.el-radio-group {
		display: flex;
		margin: 20px;
		/* 边缘 */
		justify-content: center;

	}

	.el-card {
		border-radius: 30px;
		width: 380px;
		display: flex;
		justify-content: center;
		background: #eeeeee;
	}

	.el-row {
		margin-bottom: 20px;
	}

	.el-form-item {
		width: 300px;
	}
</style>
