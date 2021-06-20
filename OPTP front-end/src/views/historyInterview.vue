<template>
	<div>
		<fixedParts :usrname="userName" :usermail="userEmail"></fixedParts>
		<div class="interviewTable">
			<h3 style="margin-top: 15px;margin-bottom: 20px;">历史面试</h3>
			<el-button @click="resetDateFilter">清除日期过滤器</el-button>
			<el-button @click="clearFilter">清除所有过滤器</el-button>
			<el-table ref="filterTable" :data="interviewList" style="width: 100%">
				<el-table-column prop="company" label="公司" width="180" :formatter="formatter">
					<template slot-scope="scope">{{scope.row.company}}</template>
				</el-table-column>
				<el-table-column prop="title" label="名称" width="100" :formatter="formatter">
					<template slot-scope="scope">{{scope.row.title}}</template>
				</el-table-column>
				<!-- <el-table-column prop="interviewer" label="面试官" :formatter="formatter">
				</el-table-column> -->
				<el-table-column prop="problemCount" label="题目数量" :formatter="formatter">
					<template slot-scope="scope">{{scope.row.problemCount}}</template>
				</el-table-column>
				<el-table-column prop="finalResult" label="结果" :formatter="formatter">
					<template slot-scope="scope">{{scope.row.finalResult}}</template>
				</el-table-column>
				<el-table-column prop="chatCount" label="留言数量" :formatter="formatter">
					<template slot-scope="scope">{{scope.row.chatCount}}</template>
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
				interviewList: [],
				userName: "",
				userEmail: this.COMMON.user
			}
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
			getHistoryInterview() {
				return new Promise(resolve => {
					setTimeout(() => {
						let that = this;
						this.$axios.get('/api/historyInterview', {
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
									that.loadInterviewList();
								} else {
									console.log('getInfo status Error!');
								}

							})
							.catch((error) => {
								console.log(error);
							});
					}, 3000)
				});
			},
			loadInterviewList() {
				// return new Promise(resolve => {
				//    setTimeout(() => {
				// console.log('2');
				// console.log(this.tempList);
				let i = 0;
				for (i = 0; i < this.tempList.length; i++) {
					// console.log(this.tempList[i]['company']);
					let temp = {
						company: this.tempList[i]['company'],
						title: this.tempList[i]['title'],

						problemCount: this.tempList[i]['problem'].length,
						finalResult: this.tempList[i]['finalRuselt'],
						chatCount: this.tempList[i]['chat'].length
					}
					// console.log('temp:',temp);
					this.interviewList.push(temp);
				}
				console.log(this.interviewList);
				// }, 1000)
				//  });
			},
			async init() {
				await this.getHistoryInterview();
				console.log(this.tempList);
				this.loadInterviewList();
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

		mounted() {
			this.getHistoryInterview();
			this.showName()
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
