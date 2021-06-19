<template>
	<div style="background-color: lightgrey">
		<el-row class="headNavigator" type="flex">
			<el-col :span="23" style="margin-left: 15px; text-align: left; line-height: 40px;">
				<i class="el-icon-arrow-left"></i>
				<el-button type="text" @click="backbnk" style="color: aliceblue;">
					<h3>返回题库页面</h3>
				</el-button>
			</el-col>
			<el-col :span="1">
				<el-avatar style="margin-right: 10px; margin-top: 1px;"> user </el-avatar>
			</el-col>
		</el-row>
		<div class="detailBlock">
			<div class="infoBlock">
				<div class="infoRow">
					<div class="infoInline">
						<div class="info">
							<h4 class="title">类型</h4>
						</div>
						<!-- <el-tag class="info">算法</el-tag> -->
						<el-tag class="info">{{ questionType }}</el-tag>
					</div>
				</div>
				<div class="infoInline">
					<div class="info">
						<h4 class="title">题目名称 </h4>
					</div>
					<!-- <p class="info">反转数组</p> -->
					<p class="info">{{ questionTitle }}</p>
				</div>
			</div>
			<div class="infoBlock">
				<h4 class="title">题目要求 </h4>
				<div class="infoRow">
					<div class="infoInline">
						<div class="info">
							<h6 class="title">时间复杂度： </h6>
						</div>
						<p class="info">O(n)</p>
					</div>
					<div class="infoInline">
						<div class="info">
							<h6 class="title">空间复杂度： </h6>
						</div>
						<p class="info">nlogn</p>
					</div>
				</div>
			</div>
			<div class="infoBlock">
				<h4 class="title">题目叙述 </h4>
				<el-input class="text" v-model="statement" :disabled="true" :placeholder="questionDescription">
				</el-input>
			</div>
			<div class="infoBlock">
				<h4 class="title">示例 </h4>
				<div class="exampleBlock">
					<h6>输入</h6>
					<el-input class="text" v-model="inputExample" :disabled="true" :placeholder="sample_in">
					</el-input>
				</div>
				<div class="exampleBlock">
					<h6>输出</h6>
					<el-input class="text" v-model="outputExample" :disabled="true" :placeholder="sample_out">
					</el-input>
				</div>
			</div>
			<div class="infoBlock">
				<h4 class="title">说明 </h4>
				<el-input class="text" v-model="statement" :disabled="true">
				</el-input>
			</div>
			<div class="infoBlock" style="margin-top: 35px;text-align: center;">
				<el-button type="primary">确认选题</el-button>
				<el-button>返回面试界面</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				questionId: this.$route.query.qusId,   //是否能这样直接调用赋值？
				questionTitle: "",
				questionSetter: "",
				questionType: "",
				//questionLink: ""   // 题目链接？
				questionDescription: "",
				sample_in: "",
				sample_out: ""
			}
		},
		mounted() {
		  this.showDetails()
		},
		methods: {
			backbnk() {
				this.$router.push("/questionBank");
			},
			showDetails() {
				var that = this;
				this.$axios.get('/api/questionDetail', {
					params: {
						query: this.questionId
						//query: this.$route.query.qusId
					}
				}).then(function(response) {
					if (response.data.status == '0') {
						let detailResult = response.data.result.List;
						if (detailResult.length == 0) {
							that.$alert('找不到该题目！', '？', {
								confirmButtonText: '确定',
								callback: action => {}
							});
						} else {
							console.log(that.questionId)
							console.log(detailResult)
							that.questionTitle = detailResult[0].title;
							that.questionSetter = detailResult[0].setter;
							that.questionType = detailResult[0].type;
							that.questionLink = detailResult[0].link;
							that.questionDescription = detailResult[0].description;
							// 数据库json格式为 sample:[{in:String, out:String}] 不确定下面索引的写法
							that.sample_in = detailResult[0].sample[0].in;
							that.sample_out = detailResult[0].sample[0].out;
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
	.headNavigator {
		background-color: #333333;
		color: aliceblue;
		padding: 10px;
		margin: 0;
	}

	.info {
		display: inline-block;
		margin-right: 15px;
	}

	.infoInline {
		margin-right: 50px;
		display: inline-block;
	}

	.title {
		display: inline-block;
	}

	.exampleBlock {
		padding: 7px;
	}

	.infoInline,
	.infoBlock {
		padding:  10px 150px;
		
	
	}

	.text {
		margin-right: 300px;
	}

	.detailBlock {
		padding: 0;
		width: 70%;
		background-color: #f0f0f0;
		border: #000000;
		margin: 0 auto;
		
		
	}

	h4 {
		margin-bottom: 9px;
	}
	h6{
		margin-bottom: 5px;
	}
</style>
