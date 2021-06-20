<template>
	<div>
	<fixedParts></fixedParts>
	<div class="interviewTable">
		<h3 style="margin-top: 15px;margin-bottom: 20px;">历史题目</h3>
		<el-button @click="resetDateFilter">清除日期过滤器</el-button>
		<el-button @click="clearFilter">清除所有过滤器</el-button>
		<el-table ref="filterTable" :data="questionList" style="width: 100%">
			<el-table-column prop="title" label="题目名称" width="180" :formatter="formatter">
				<template slot-scope="scope">{{scope.row.title}}</template>
			</el-table-column>
			<el-table-column prop="type" label="类型" width="100" :formatter="formatter">
				<template slot-scope="scope">{{scope.row.type}}</template>
			</el-table-column>
			<!-- <el-table-column prop="interviewer" label="面试官" :formatter="formatter">
			</el-table-column> -->
			<el-table-column prop="judgement" label="评判" :formatter="formatter">
				<template slot-scope="scope">{{scope.row.judgement}}</template>
			</el-table-column>
			<el-table-column prop="score" label="得分" :formatter="formatter">
				<template slot-scope="scope">{{scope.row.score}}</template>
			</el-table-column>
			<el-table-column prop="interview" label="面试场次" :formatter="formatter">
				<template slot-scope="scope">{{scope.row.interview}}</template>
			</el-table-column>
<!-- 			<el-table-column prop="position" label="岗位" :formatter="formatter">
				<template slot-scope="scope">{{scope.row.position}}</template>
			</el-table-column> -->
			<el-table-column prop="date" label="时间" :formatter="formatter">
				<template slot-scope="scope">{{scope.row.date}}</template>
			</el-table-column>
		</el-table>
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
					tempList: [],
					questionList: []
					
				}
			},
			methods: {
				getHistoryQuestion() {
					// return new Promise(resolve => {
					// 	setTimeout(() => {
							let that = this;
							this.$axios.get('/api/historyQuestion', {
									params: {
										email: this.COMMON.user
									}
								})
								.then((res) => {
									if (res.data.status == '0') {
										console.log('1', res);
										console.log(res.data.result.list);
										that.tempList = res.data.result.list;
										console.log(that.tempList);
										that.loadQuestionList();
									} else {
										console.log('getInfo status Error!');
									}
				
								})
								.catch((error) => {
									console.log(error);
								});
					// 	}, 3000)
					// });
				},
				loadQuestionList() {
					// return new Promise(resolve => {
					//    setTimeout(() => {
					// console.log('2');
					// console.log(this.tempList);
					let i = 0;
					for (i = 0; i < this.tempList.length; i++) {
						// console.log(this.tempList[i]['company']);
						let temp = {
							title: this.tempList[i]['title'],
							type:this.tempList[i]['type'],
							judgement:this.tempList[i]['judgement'],
							score:this.tempList[i]['score'],
							interview:this.tempList[i]['interview'],
							// position:this.tempList[i]['position'],
							date:this.tempList[i]['date']
						}
						// console.log('temp:',temp);
						this.questionList.push(temp);
					}
					console.log(this.questionList);
					// }, 1000)
					//  });
				},
				resetDateFilter() {
					this.$refs.filterTable.clearFilter('date');
				},
				clearFilter() {
					this.$refs.filterTable.clearFilter();
				},
				formatter(row) {

					return row.address;
				},
				filterTag(value, row) {
					return row.tag === value;
				},
				filterHandler(value, row, column) {
					const property = column['property'];
					return row[property] === value;
				}
			},
			mounted(){
				this.getHistoryQuestion();
			}
		}
	</script>
	<style scoped>
		.interviewTable {
			margin-top: 15px;
			margin-left: 26%;
			margin-right: 20px;
		}
	</style>
