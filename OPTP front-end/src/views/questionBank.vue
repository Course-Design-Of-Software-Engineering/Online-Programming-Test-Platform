<template>
	<div>
		<el-row class="headNavigator" type="flex">
			<el-col :span="23" style="margin-left: 15px; text-align: left; line-height: 40px;">
				<i class="el-icon-arrow-left"></i>
				<el-button type="text" @click="backItv" style="color: aliceblue;">
					<h3>返回面试页面</h3>
				</el-button>
			</el-col>
			<el-col :span="1">
				<el-avatar style="margin-right: 10px; margin-top: 1px;"> user </el-avatar>
			</el-col>
		</el-row>
		<div class="questionType">
			<div class="buttDiv">
				<el-button class="butt" type="info" @click='type1' plain>算法</el-button>
			</div>
			<div class="buttDiv">
				<el-button class="butt" type="info" @click='type2' plain>SQL</el-button>
			</div>
			<div class="buttDiv">
				<el-button class="butt" type="info" @click='type3' plain>前端</el-button>
			</div>
		</div>
		<div class="questionTable">
			<el-table ref="filterTable" :data="questionList" style="width: 100%">
				<el-table-column prop="id" label="题目ID" width="180" :formatter="formatter">
					<!-- <template slot-scope="scope">{{scope.row.id}}</template> -->
					<template slot-scope="scope"><el-link v-on:click="chooseQuestion(scope.row.id)">{{scope.row.id}}</el-link></template>
				</el-table-column>
				<el-table-column prop="title" label="题目名称" width="100" :formatter="formatter">
					<template slot-scope="scope"><el-link v-on:click="chooseQuestion(scope.row.id)">{{scope.row.title}}</el-link></template>
				</el-table-column>
				<!-- <el-table-column prop="interviewer" label="面试官" :formatter="formatter">
									</el-table-column> -->
				<el-table-column prop="date" label="类型" :formatter="formatter">
					<template slot-scope="scope">{{scope.row.type}}</template>
				</el-table-column>
				<el-table-column prop="setter" label="出题者" :formatter="formatter">
					<template slot-scope="scope">{{scope.row.setter}}</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				type: '',
				questionList: []
			}
		},
		mounted() {
			this.type1();
			this.type2();
			this.type3()
		},
		methods: {
			//按钮传递类型
			type1() {
				console.log('entring type click');
				if (this.type == '算法')
					return;
				this.type = '算法';
				this.getQuestionBank();
			},
			type2() {
				if (this.type == 'SQL')
					return;
				this.type = 'SQL';
				this.questionList = [];
				this.getQuestionBank();
			},
			type3() {
				if (this.type == '前端')
					return;
				this.type = '前端';
				this.questionList = [];
				this.getQuestionBank();
			},
			getQuestionBank() {
				let that = this;
				this.$axios.get('/api/questionBank', {
						params: {
							type: that.type
						}
					})
					.then((res) => {
						if (res.data.status == '0') {
							console.log('1', res);
							console.log(res.data.result.List);
							that.tempList = res.data.result.List;
							console.log(that.tempList);
							that.loadQuestionList();
						} else {
							console.log('getInfo status Error!');
						}
					})
			},
			loadQuestionList() {
				let i = 0;
				for (i = 0; i < this.tempList.length; i++) {
					// console.log(this.tempList[i]['company']);
					let temp = {
						id: this.tempList[i]['id'],
						title: this.tempList[i]['title'],
						setter: this.tempList[i]['setter'],
						type: this.tempList[i]['type'],
					}
					// console.log('temp:',temp);
					this.questionList.push(temp);
				}
				console.log(this.questionList);
				// }, 1000)
				//  });

			},
			backItv() {
				this.$router.push({
					path: '/codingPage',
					query: {
						qusId: "0001"
					}
				})
			},
			//formatter(row, column) {
			formatter(row) {
				return row.address;
			},
			filterTag(value, row) {
				return row.tag === value;
			},
			filterHandler(value, row, column) {
				const property = column['property'];
				return row[property] === value;
			},
			// 当某个题目的id或名称被点击时调用的函数
			chooseQuestion(questionId) {
				this.$router.push({
					path: '/questionDetail',
					query: {
						qusId: questionId
					}
				})
			}
		}
	}
</script>

<style scoped>
	.headNavigator {
		background-color: #333333;
		color: aliceblue;
		padding: 10px;
	}

	.butt {
		padding: 80px 40px;
		height: 80px;
	}

	.questionType {
		margin: 20px;
		float: left;
	}

	.questionTable {
		width: 70%;
		float: right;
		margin-right: 10%;
		margin-top: 10px;
	}
</style>
