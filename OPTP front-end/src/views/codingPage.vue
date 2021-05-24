<template>
	<div>
		<el-row class="headNavigator" type="flex">
			<el-col :span="14" style="margin-left: 15px; text-align: left; line-height: 40px;">
				<h3 class="headTitle">xx公司xx岗位面试</h3>
				<i class="el-icon-arrow-right"></i>
				<p class="headTitle">编程标题</p>
			</el-col>
			<el-col :span="7">
				<el-time-picker class="testTime" is-range v-model="timevalue" range-separator="至"
					start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围">
				</el-time-picker>
			</el-col>
			<el-col :span="1">
				<el-avatar style="margin-right: 10px; margin-top: 1px;"> user </el-avatar>
			</el-col>
			<el-col :span="1">
				<el-button type="danger" plain @click="backHome" style="margin-top: 2px;">退出</el-button>
			</el-col>
		</el-row>
		<div class="codingPage">
			<el-row :gutter="5">
				<el-col :span="7">
					<left></left>
				</el-col>
				<el-col :span="1">
					<el-divider direction="vertical"></el-divider>
				</el-col>
				<el-col :span="10">
					<mid></mid>
				</el-col>
				<el-col :span="1">
					<el-divider direction="vertical"></el-divider>
				</el-col>
				<el-col :span="5">
					<right></right>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import left from '../components/left.vue'
	import mid from '../components/mid.vue'
	import right from '../components/right.vue'
	export default {
		data() {
			return {
				timevalue: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)]
			};
		},
		components: {
			left,
			mid,
			right
		},
		methods: {
			backHome() {
				this.$confirm('您当前的面试还没有结束, 确定退出?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '已退出面试!'
					});
					this.$router.push("/intervieweeHome");
				}).catch(() => {
					// this.$message({
					// 	type: 'info',
					// 	message: '取消退出'
					// });
				});
			}
		}
	}
</script>

<style scoped="true">
	.headNavigator {
		background-color: #333333;
		color: aliceblue;
		padding: 10px;
	}
	.headTitle {
		display: inline-block;
	}
	.testTime {
		margin-top: 2px;
		align-items: center;
	}
	.codingPage {
		margin: 20px;
	}

	.el-divider--vertical {
		display: inline-block;
		width: 2px;
		height: 55em;
	}
</style>
