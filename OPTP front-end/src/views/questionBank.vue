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
				<el-button class="butt" type="info" plain>算法</el-button>
			</div>
			<div class="buttDiv">
				<el-button class="butt" type="info" plain>SQL</el-button>
			</div>
			<div class="buttDiv">
				<el-button class="butt" type="info" plain>前端</el-button>
			</div>
		</div>
		<div class="questionTable">
			<el-button icon="el-icon-s-promotion" circle @click="toTemp"></el-button>
			<el-button @click="resetDateFilter">清除日期过滤器</el-button>
			<el-button @click="clearFilter">清除所有过滤器</el-button>
			<el-table ref="filterTable" :data="tableData" style="width: 100%">
				<el-table-column prop="title" label="题目名称" width="180" column-key="date">
				</el-table-column>
				<el-table-column prop="type" label="类型" width="100"
					:filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]" :filter-method="filterTag"
					filter-placement="bottom-end">
					<template slot-scope="scope">
						<el-tag :type="scope.row.tag === '家' ? 'primary' : 'success'" disable-transitions>
							{{scope.row.tag}}
						</el-tag>
					</template>
				</el-table-column>
				<!-- 无法实现点击表内文字内容进行跳转 -->
				<router-link to="/historyQuestion">
					<el-table-column prop="judgement" label="评判" :formatter="formatter">
					</el-table-column>
				</router-link>
				<el-table-column prop="interview" label="面试场次" :formatter="formatter">
				</el-table-column>
				<el-table-column prop="position" label="岗位" width="100"
					:filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]" :filter-method="filterTag"
					filter-placement="bottom-end">
					<template slot-scope="scope">
						<el-tag :type="scope.row.tag === '家' ? 'primary' : 'success'" disable-transitions>
							{{scope.row.tag}}
						</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="" label="时间" sortable="true" :formatter="formatter">
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
					tag: '家'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄',
					tag: '公司'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄',
					tag: '家'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄',
					tag: '公司'
				}]
			}
		},
		methods: {
			toTemp() {
				this.$router.push("/questionDetail");
			},
			backItv() {
				this.$router.push("/codingPage");
			},
			resetDateFilter() {
				this.$refs.filterTable.clearFilter('date');
			},
			clearFilter() {
				this.$refs.filterTable.clearFilter();
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
			// 当某个题目（其名称或所在的那一行）被点击时调用的函数
			chooseQuestion(questionId) {
				this.$router.push({
					path:'/questionDetail',
					query:{
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
