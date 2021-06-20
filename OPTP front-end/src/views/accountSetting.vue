<template>
	<div>
		<fixedParts :usrname="userName" :usermail="userEmail"></fixedParts>
		<div class="accSetting">
			<h3 style="margin-top: 15px;margin-bottom: 20px;">账号设置</h3>
				<!-- form表单 -->
				<el-form :model="newSetting" ref="newSetting" label-width="95px" class="demo-ruleForm">
					<!--邮箱-->
					<el-form-item label="邮箱" prop="email">
						<el-input  v-model="userEmail" :disabled="true">
						</el-input>
					</el-form-item>
					<!-- 密码 -->
					<el-form-item label="密码" prop="password" :rules="[{ required: true, message: '密码不能为空'},]">
						<el-input placeholder="请输入新密码" v-model="newSetting.password" show-password>
						</el-input>
					</el-form-item>
					<!-- 确认密码 -->
					<el-form-item label="确认密码" prop="checkPassword" :rules="[{ required: true, message: '确认密码必须输入'},]">
						<el-input placeholder="请再次输入确认新密码" v-model="newSetting.checkPassword" show-password>
						</el-input>
					</el-form-item>
				</el-form>
			<div class="buttGroup">
				<el-button type="primary" @click="cancelChg()">提交修改</el-button>
				<el-button @click="cancelChg()">取消</el-button>
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
				userName: "",
				userEmail: this.COMMON.user,
				newSetting:{
					password: '',
					checkPassword: ''
				}
			}
		},
		mounted() {
			this.showName()
		},
		methods: {
			showName() {
				var that = this;
				this.$axios.get('/api/user_center', {
					params: {
						email: this.COMMON.user
					}
				}).then(function(response) {
					if (response.data.status == '0') {
						let detailResult = response.data.result.list;
						if (detailResult.length == 0) {
							that.$alert('找不到当前用户！', '提示', {
								confirmButtonText: '确定',
								callback: action => {}
							});
						} else {
							console.log('userid:', that.COMMON.user)
							console.log(detailResult)
							that.userName = detailResult[0].username;
						}
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			subChg() {
				this.$confirm('确认修改吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'success'
				}).then(() => {
					this.newSetting.password = "";
					this.newSetting.checkPassword = ""
				}).catch(() => {
					// this.$message({
					// 	type: 'info',
					// 	message: '取消'
					// });
				});
			},
			cancelChg() {
				this.newSetting.password = "";
				this.newSetting.checkPassword = ""
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
.accSetting{
	margin-left: 26%;
}
.el-form-item{
	height: 40px;
}
</style>
