<template>
	<div>
		<el-row style="text-align: left;margin-bottom: 0px;">
			<el-button type="info" size="medium" icon="el-icon-s-grid" @click="openBank">从题库中选择</el-button>
			<el-button type="primary" plain size="medium" icon="el-icon-plus">新建题目</el-button>
			<el-button type="primary" size="medium" icon="el-icon-edit">编辑题目</el-button>
		</el-row>
		<div class="questionPart">
			<h4>题目要求</h4>
			<el-divider></el-divider>
			<p>时间：O(n)   空间：nlogn </p>
			<p>代码语言：<el-tag size="small">C++</el-tag>
			</p>
			<!-- <p>类型：<el-tag type="success" size="small">算法</el-tag> -->
			<p>类型：<el-tag type="success" size="small">{{ questionType }}</el-tag>
			</p>
		</div>
		<div class="questionPart">
			<h4>题目叙述</h4>
			<el-divider></el-divider>
			<p>{{ questionDescription }}</p>
		</div>
		<div class="questionPart">
			<h4>示例</h4>
			<el-divider></el-divider>
			<p>输入</p>
			<el-input v-model="inputExample" :disabled="true" :placeholder="sample_in">
			</el-input>
			<p>输出</p>
			<el-input v-model="outputExample" :disabled="true" :placeholder="sample_out">
			</el-input>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['qid'],
		data() {
			return {
				questionId: "",
				questionTitle: "",   // 题目名称在父组件CodingPage中显示
				questionType: "",
				//questionLink: ""   // 题目链接？
				questionDescription: "",
				sample_in: "",
				sample_out: ""
			}
		},
		mounted() {
			this.showQus()
		},
		methods: {
			openBank() {
				this.$router.push("/questionBank");
			},
			showQus() {
				this.questionId = qid;
				var that = this;
				this.$axios.get('/api/codingPage', {
					params: {
						query: this.questionId
					}
				}).then(function(response) {
					if (response.data.status == '0') {
						let detailResult = response.data.result.List;
						if (detailResult.length == 0) {
							that.$alert('找不到该题目！', '提示', {
								confirmButtonText: '确定',
								callback: action => {}
							});
						} else {
							console.log(that.questionId)
							console.log(detailResult)
							that.questionTitle = detailResult[0].title;
							that.questionType = detailResult[0].type;
							that.questionDescription = detailResult[0].description;
							// 数据库json格式为 sample:[{in:String, out:String}] 不确定下面索引的写法
							that.sample_in = detailResult[0].sample[0].in;
							that.sample_out = detailResult[0].sample[0].out;
						}
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
		}
	}
</script>

<style>
	.questionPart {
		line-height: 30px;
		text-align: left;
		padding: 20px;
	}

	.el-divider {
		margin:5px;
		display: block;
		background-color: red;
	}
	
</style>
