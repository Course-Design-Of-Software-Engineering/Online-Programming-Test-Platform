<template>
	<div class="register">
		<h1 style="text-align: center;margin-bottom: 30px;">用户注册</h1>
		<el-tabs type="border-card">
			<el-tab-pane label="面试者注册">
				<el-container>
					<el-main>
						<el-row>
							<!--左边-->
							<el-col span="12">
								<!-- form表单 -->
								<el-form :model="intervieweeInfo" ref="intervieweeInfo" label-width="95px"
									class="demo-ruleForm">
									<!-- 用户名 -->
									<el-form-item label="用户名" prop="user"
										:rules="[{ required: true, message: '用户名不能为空'},]">
										<el-input placeholder="请输入用户名" v-model="intervieweeInfo.user">
										</el-input>
									</el-form-item>
									<!--邮箱 -->
									<el-form-item label="邮箱" prop="email"
										:rules="[{ required: true, message: '邮箱不能为空'},]">
										<el-input placeholder="请输入邮箱" type="text" v-model="intervieweeInfo.email"
											autocomplete="off">
										</el-input>
									</el-form-item>
									<!-- 密码 -->
									<el-form-item label="密码" prop="password"
										:rules="[{ required: true, message: '密码不能为空'},]">
										<el-input placeholder="请输入密码" v-model="intervieweeInfo.password" show-password>
										</el-input>
									</el-form-item>
									<!-- 确认密码 -->
									<el-form-item label="确认密码" prop="checkPassword"
										:rules="[{ required: true, message: '确认密码必须输入'},]">
										<el-input placeholder="请再次输入确认密码" v-model="intervieweeInfo.checkPassword" show-password>
										</el-input>
									</el-form-item>
								</el-form>
							</el-col>
							<el-col span="12">
								<!-- 右边 -->
								<!-- form表单 -->
								<el-form :model="intervieweeInfo" ref="intervieweeInfo" label-width="95px"
									class="demo-ruleForm">
									<!--意向 -->
									<el-form-item label="意向岗位" prop="goal">
										<el-input placeholder="请输入你的就职意向" type="text" v-model="intervieweeInfo.goal"
											autocomplete="off">
										</el-input>
									</el-form-item>
									<!--手机号 -->
									<el-form-item label="手机号码" prop="phone">
										<el-input placeholder="请输入你的手机号码" type="text" v-model="intervieweeInfo.phone"
											autocomplete="off">
										</el-input>
									</el-form-item>
									<!--目前岗位-->
									<el-form-item label="目前岗位" prop="currPosition">
										<el-input placeholder="请输入你的目前岗位" type="text"
											v-model="interviewerInfo.currPosition" autocomplete="off">
										</el-input>
									</el-form-item>
								</el-form>
							</el-col>
						</el-row>
					</el-main>
					<el-footer>
						<div class="buttGroup">
							<el-button type="primary" @click="submitForm('intervieweeInfo')">注册</el-button>
							<el-button @click="back()">返回</el-button>
						</div>
					</el-footer>
				</el-container>
			</el-tab-pane>
			<el-tab-pane label="面试官注册">
				<el-container>
					<el-main>
						<el-row>
							<!--左边-->
							<el-col span="12">
								<!-- form表单 -->
								<el-form :model="interviewerInfo" ref="interviewerInfo" label-width="95px"
									class="demo-ruleForm">
									<!-- 用户名 -->
									<el-form-item label="用户名" prop="user"
										:rules="[{ required: true, message: '用户名不能为空'},]">
										<el-input placeholder="请输入用户名" v-model="interviewerInfo.user">
										</el-input>
									</el-form-item>
									<!--邮箱 -->
									<el-form-item label="邮箱" prop="email"
										:rules="[{ required: true, message: '邮箱不能为空'},]">
										<el-input placeholder="请输入邮箱" type="text" v-model="interviewerInfo.email"
											autocomplete="off">
										</el-input>
									</el-form-item>
									<!-- 密码 -->
									<el-form-item label="密码" prop="password"
										:rules="[{ required: true, message: '密码不能为空'},]">
										<el-input placeholder="请输入密码" v-model="interviewerInfo.password" show-password>
										</el-input>
									</el-form-item>
									<!-- 确认密码 -->
									<el-form-item label="确认密码" prop="checkPassword"
										:rules="[{ required: true, message: '确认密码必须输入'},]">
										<el-input placeholder="请再次输入确认密码" v-model="intervieweeInfo.checkPassword" show-password>
										</el-input>
									</el-form-item>
								</el-form>
							</el-col>
							<el-col span="12">
								<!-- 右边 -->
								<!-- form表单 -->
								<el-form :model="interviewerInfo" ref="interviewerInfo" label-width="95px"
									class="demo-ruleForm">
									<!-- 激活码-->
									<el-form-item label="激活码" prop="key"
										:rules="[{ required: true, message: '激活码不能为空'},]">
										<el-input placeholder="请输入激活码" v-model="interviewerInfo.key">
										</el-input>
									</el-form-item>
									<!--手机号 -->
									<el-form-item label="手机号码" prop="phone">
										<el-input placeholder="请输入你的手机号码" type="text" v-model="interviewerInfo.phone"
											autocomplete="off">
										</el-input>
									</el-form-item>
									<!--目前岗位-->
									<el-form-item label="目前岗位" prop="currPosition">
										<el-input placeholder="请输入你的目前岗位" type="text"
											v-model="interviewerInfo.currPosition" autocomplete="off">
										</el-input>
									</el-form-item>
								</el-form>
							</el-col>
						</el-row>
					</el-main>
					<el-footer>
						<div class="buttGroup">
							<el-button type="primary" @click="submitForm('interviewerInfo')">注册</el-button>
							<el-button @click="back()">返回</el-button>
						</div>
					</el-footer>
				</el-container>
			</el-tab-pane>

		</el-tabs>

	</div>
</template>

<script>
	export default {
		name: 'register',
		data() {
			return {
				intervieweeInfo: {
					user: '',
					email: '',
					password: '',
					phone: '',
					currPosition: '',
					goal: '',
					checkPassword: ''
				},
				interviewerInfo: {
					user: '',
					email: '',
					password: '',
					phone: '',
					currPosition: '',
					key: '',
					checkPassword: ''
				}
			};
		},
		methods: {
			submitForm(formData) {
				this.$refs[formData].validate((valid) => {
					if (valid) {
						// alert('Email:'+this.ValidateForm.email+';Password:'+this.ValidateForm.password);
						// console.log(this.ValidateForm.email);
						this.$message({
							message: `Email: ${this.intervieweeInfo.email} ; Password: ${this.intervieweeInfo.password}`,
							type: 'success'
						});
						this.$router.push("/intervieweeHome")
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			back() {
				this.$router.push("/")
			}
		}
	}
	
</script>

<style scoped>
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
</style>
