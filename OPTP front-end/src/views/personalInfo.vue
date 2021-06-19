<template>
	<div>
		<fixedParts :username="curInfo.user" :usermail="userEmail"></fixedParts>
		<div class="personalInfo">
			<h3 style="margin-top: 15px;margin-bottom: 20px;">个人资料</h3>
			<div style="width: 100%;">
				<el-button type="primary" icon="el-icon-edit">编辑个人资料</el-button>
			</div>
			<div>
				<el-container>
					<el-header>基本信息</el-header>
					<el-divider></el-divider>
					<el-main>
						<!-- form表单 -->
						<el-form :model="newInfo" ref="newInfo" label-width="95px" class="demo-ruleForm" :disabled="flag">
							<!--用户名-->
							<el-form-item label="用户名" prop="user" :rules="[{ required: true, message: '邮箱不能为空'},]">
								<el-input type="text" v-model="newInfo.user" autocomplete="off" :placeholder="curInfo.user">
								</el-input>
							</el-form-item>
							<!--性别-->
							<el-form-item label="性别">
								<el-select v-model="newInfo.gender" :placeholder="curInfo.gender">
									<el-option label="男" value="男"></el-option>
									<el-option label="女" value="女"></el-option>
								</el-select>
							</el-form-item>
							<!-- 出生日期 -->
							<el-form-item label="出生日期">
								<el-date-picker type="date" v-model="newInfo.birthday" style="width: 100%;" :placeholder="curInfo.birthday">
								</el-date-picker>
							</el-form-item>
							<!--手机号码-->
							<el-form-item label="手机号码" prop="phone">
								<el-input type="text" v-model="newInfo.phone" autocomplete="off" :placeholder="curInfo.phone">
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
						<el-form :model="newInfo" ref="newInfo" label-width="95px" class="demo-ruleForm" :disabled="flag">
							<!--现工作-->
							<el-form-item label="目前/意向岗位" prop="currPosition">
								<el-input type="text" v-model="newInfo.currPosition" autocomplete="off" :placeholder="curInfo.currPosition">
								</el-input>
							</el-form-item>
							<!--现职称-->
							<el-form-item label="目前职称" prop="currTitle">
								<el-input type="text" v-model="newInfo.currTitle" autocomplete="off" :placeholder="curInfo.currTitle">
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
						<el-form :model="newInfo" ref="newInfo" label-width="95px" class="demo-ruleForm" :disabled="flag">
							<!--学校-->
							<el-form-item label="学校" prop="school">
								<el-input type="text" v-model="newInfo.school" autocomplete="off" :placeholder="curInfo.school">
								</el-input>
							</el-form-item>
							<!--专业-->
							<el-form-item label="专业" prop="major">
								<el-input type="text" v-model="newInfo.major" autocomplete="off" :placeholder="curInfo.major">
								</el-input>
							</el-form-item>
							<!--入学年份-->
							<el-form-item label="入学年份">
								<el-date-picker type="date" v-model="newInfo.entranceYear" style="width: 100%;" :placeholder="curInfo.entranceYear">
								</el-date-picker>
							</el-form-item>
							<el-form-item label="学历">
								<el-select v-model="newInfo.eduDegree" :placeholder="curInfo.eduDegree">
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
			<el-button>返回首页</el-button>
			<el-button type="primary">提交修改</el-button>
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
				},
				curInfo: {
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
			this.showInfo()
		},
		methods: {
			showInfo() {
				var that = this;
				this.$axios.get('/api/user_center', {
					params: {
						email: this.COMMON.user
					}
				}).then(function(response) {
					if (response.data.status == '0') {
						let detailResult = response.data.result.list;
						if (detailResult.length == 0) {
							that.$alert('找不到当前用户信息！', '？', {
								confirmButtonText: '确定',
								callback: action => {}
							});
						} else {
							console.log('userid:',that.COMMON.user)
							console.log(detailResult)
							that.curInfo.user = detailResult[0].username;
							that.curInfo.phone = detailResult[0].phone;
							that.curInfo.gender = detailResult[0].gender;
							that.curInfo.birthday = detailResult[0].birthday;
							that.curInfo.currPosition = detailResult[0].intenden_position;
							// 数据库json格式为 cur_info:[{company:String, title:String}] 不确定下面索引的写法
							that.curInfo.currTitle = detailResult[0].cur_info[0].title;
							that.curInfo.school = detailResult[0].edu_info[0].school;
							that.curInfo.major = detailResult[0].edu_info[0].major;
							that.curInfo.eduDegree = detailResult[0].edu_info[0].education;
							that.curInfo.entranceYear = detailResult[0].edu_info[0].start;
						}
					}
				}).catch(function(error) {
					console.log(error);
				});
			}
		}
	}
</script>
<style scoped>
	.personalInfo {
		margin-left: 26%;
	}
	.el-container{
		position: relative;
	}
	.el-header {
		position: absolute;
		height: 30px;
		text-align: left;
		flex-grow:0;
	}
	.el-main{
		padding-top: 10px;
	}

	.buttGroup{
		float: left;
	}
</style>
