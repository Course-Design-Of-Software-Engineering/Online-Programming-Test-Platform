<template>
	<div>
		<fixedParts></fixedParts>
		<div class="personalInfo">
			<h3 style="margin-top: 15px;margin-bottom: 20px;">个人资料</h3>
			<div style=" width: 100%;">
				<el-button type="primary" icon="el-icon-edit">编辑个人资料</el-button>
			</div>
			<div>
				<el-container>
					<el-header>基本信息</el-header>
					<el-divider></el-divider>
					<el-main>
						<!-- form表单 -->
						<el-form :model="newInfo" ref="newInfo" label-width="95px" class="demo-ruleForm">
							<!--用户名-->
							<el-form-item label="用户名" prop="user" :rules="[{ required: true, message: '邮箱不能为空'},]">
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
						<el-form :model="newInfo" ref="newInfo" label-width="95px" class="demo-ruleForm">
							<!--现工作-->
							<el-form-item label="目前岗位" prop="currPosition">
								<el-input type="text" v-model="newInfo.currPosition" autocomplete="off">
								</el-input>
							</el-form-item>
							<!--现职称-->
							<el-form-item label="目前职称" prop="currTitle">
								<el-input type="text" v-model="newInfo.currTitle" autocomplete="off">
								</el-input>
							</el-form-item>
							<!--意向工作-->
							<el-form-item label="意向岗位" prop="goal">
								<el-input type="text" v-model="newInfo.goal" autocomplete="off">
								</el-input>
							</el-form-item>
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
						<el-form :model="newInfo" ref="newInfo" label-width="95px" class="demo-ruleForm">
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
							<el-form-item label="出生日期">
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
			};
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
