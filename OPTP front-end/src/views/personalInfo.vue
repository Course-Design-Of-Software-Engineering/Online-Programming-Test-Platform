<template>
	<div>
		<fixedParts :usrname="userName" :usermail="userEmail"></fixedParts>
		<div class="personalInfo">
			<h3 style="margin-top: 15px;margin-bottom: 20px;">个人资料</h3>
			<div style="width: 100%;">
				<el-button type="primary" icon="el-icon-edit" @click="changeInfo()">编辑个人资料</el-button>
			</div>
			<div>
				<el-container>
					<el-header>基本信息</el-header>
					<el-divider></el-divider>
					<el-main>
						<!-- form表单 -->
						<el-form :model="newInfo" ref="newInfo" label-width="95px" class="demo-ruleForm"
							:disabled="flag">
							<!--用户名-->
							<el-form-item label="用户名" prop="user" :rules="[{ required: true, message: '用户名不能为空'},]">
								<el-input type="text" v-model="newInfo.user" autocomplete="off">
								</el-input>
							</el-form-item>
							<!--性别-->
							<el-form-item label="性别">
								<el-select v-model="newInfo.gender">
									<el-option label="男" value="男"></el-option>
									<el-option label="女" value="女"></el-option>
								</el-select>
							</el-form-item>
							<!-- 出生日期 -->
							<el-form-item label="出生日期">
								<el-date-picker type="date" v-model="newInfo.birthday" style="width: 100%;">
								</el-date-picker>
							</el-form-item>
							<!--手机号码-->
							<el-form-item label="手机号码" prop="phone">
								<el-input type="text" v-model="newInfo.phone" autocomplete="off">
								</el-input>
							</el-form-item>
						</el-form>
					</el-main>
				</el-container>
			</div>
			<div>
				<el-container>
					<el-header>工作信息</el-header>
					<el-divider></el-divider>
					<el-main>
						<!-- form表单 -->
						<el-form :model="newInfo" ref="newInfo" label-width="95px" class="demo-ruleForm"
							:disabled="flag">
							<!--现工作-->
							<el-form-item label="目前/意向岗位" prop="currPosition">
								<el-input type="text" v-model="newInfo.currPosition" autocomplete="off">
								</el-input>
							</el-form-item>
							<!--现职称-->
							<el-form-item label="目前职称" prop="currTitle">
								<el-input type="text" v-model="newInfo.currTitle" autocomplete="off">
								</el-input>
							</el-form-item>
							<!--意向工作-->
							<!-- <el-form-item label="意向岗位" prop="goal">
								<el-input type="text" v-model="newInfo.goal" autocomplete="off">
								</el-input>
							</el-form-item> -->
						</el-form>
					</el-main>
				</el-container>
			</div>
			<div>
				<el-container>
					<el-header>教育信息</el-header>
					<el-divider></el-divider>
					<el-main>
						<!-- form表单 -->
						<el-form :model="newInfo" ref="newInfo" label-width="95px" class="demo-ruleForm"
							:disabled="flag">
							<!--学校-->
							<el-form-item label="学校" prop="school">
								<el-input type="text" v-model="newInfo.school" autocomplete="off">
								</el-input>
							</el-form-item>
							<!--专业-->
							<el-form-item label="专业" prop="major">
								<el-input type="text" v-model="newInfo.major" autocomplete="off">
								</el-input>
							</el-form-item>
							<!--入学年份-->
							<el-form-item label="入学年份">
								<el-date-picker type="date" v-model="newInfo.entranceYear" style="width: 100%;">
								</el-date-picker>
							</el-form-item>
							<el-form-item label="学历">
								<el-select v-model="newInfo.eduDegree">
									<el-option label="初中" value="初中"></el-option>
									<el-option label="高中" value="高中"></el-option>
									<el-option label="本科" value="本科"></el-option>
									<el-option label="硕士" value="硕士"></el-option>
									<el-option label="博士" value="博士"></el-option>
								</el-select>
							</el-form-item>
						</el-form>
					</el-main>
				</el-container>
			</div>
			<div class="buttGroup">
				<el-button type="primary" @click="submitForm('newInfo')">提交修改</el-button>
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
			return {
				flag: true,
				userName: "",
				userEmail: this.COMMON.user,
				newInfo: {
					user: '',
					phone: '',
					gender: '',
					birthday: '',
					currPosition: '',
					currTitle: '',
					school: '',
					major: '',
					eduDegree: '',
					entranceYear: ''
				}
			};
		},
		mounted() {
			this.showInfo();
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
			showInfo() {
				this.flag = true;
				var that = this;
				this.$axios.get('/api/user_center', {
					params: {
						email: this.COMMON.user
					}
				}).then(function(response) {
					if (response.data.status == '0') {
						let detailResult = response.data.result.list;
						if (detailResult.length == 0) {
							that.$alert('找不到当前用户信息！', '提示', {
								confirmButtonText: '确定',
								callback: action => {}
							});
						} else {
							console.log('userid:', that.COMMON.user)
							console.log(detailResult)
							that.newInfo.user = detailResult[0].username;
							that.newInfo.phone = detailResult[0].phone;
							that.newInfo.gender = detailResult[0].gender;
							that.newInfo.birthday = detailResult[0].birthday;
							that.newInfo.currPosition = detailResult[0].intenden_position;
							// 数据库json格式为 cur_info:[{company:String, title:String}] 不确定下面索引的写法
							that.newInfo.currTitle = detailResult[0].cur_info[0].title;
							that.newInfo.school = detailResult[0].edu_info[0].school;
							that.newInfo.major = detailResult[0].edu_info[0].major;
							that.newInfo.eduDegree = detailResult[0].edu_info[0].education;
							that.newInfo.entranceYear = detailResult[0].edu_info[0].start;
						}
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			changeInfo() {
				this.flag = false;
			},
			cancelChg() {
				//提示取消将会丢失修改的内容
				this.$confirm('取消修改将会丢失当前修改的内容，确定放弃吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'success'
				}).then(() => {
					this.flag = true;
				}).catch(() => {
					// this.$message({
					// 	type: 'info',
					// 	message: '取消'
					// });
				});
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					var that = this
					if (valid) {
						this.$axios.post('/api/user_center/edit', {
							email: this.userEmail,
							formContent: this.newInfo,
						}).then(function(response) {
							if (response.data.status == '0') {
								let infoResult = response.docs
								console.log(infoResult)
								console.log(that.userEmail)
								console.log(that.newInfo.user)
								that.$message({
									message: `资料编辑成功！`,
									type: 'success'
								});
								that.showInfo();
								//that.flag = true;
							} else {
								that.$alert('找不到编辑用户信息！', '提示', {
									confirmButtonText: '确定',
									callback: action => {}
								});
							}
						}).catch(function(error) {
							console.log(error);
						});
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			}
		}
	}
</script>
<style scoped>
	.personalInfo {
		margin-left: 26%;
	}

	.el-container {
		position: relative;
	}

	.el-header {
		position: absolute;
		height: 30px;
		text-align: left;
		flex-grow: 0;
	}

	.el-main {
		padding-top: 10px;
	}

	.buttGroup {
		float: inherit;
		margin-bottom: 50px;
	}
</style>
