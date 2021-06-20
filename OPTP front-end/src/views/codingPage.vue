<template>
	<div>
		<el-row class="headNavigator" type="flex">
			<el-col :span="14" style="margin-left: 15px; text-align: left; line-height: 40px;">
				<h3 class="headTitle">线上面试编程题</h3>
				<i class="el-icon-arrow-right"></i>
				<p class="headTitle">{{ questionTitle }}</p>
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
					<!-- <left :qid="questionId"></left> -->
					<div>
						<el-row style="text-align: left;margin-bottom: 0px;">
							<el-button type="info" size="medium" icon="el-icon-s-grid" @click="openBank">从题库选择
							</el-button>
							<el-button type="primary" size="medium" icon="el-icon-edit">编辑题目</el-button>
							<el-button type="primary" plain size="medium" icon="el-icon-plus">新建</el-button>
						</el-row>
						<div class="questionPart">
							<h4 class="leftH">题目要求</h4>
							<el-divider></el-divider>
							<p class="leftQp">时间：O(n) 空间：nlogn </p>
							<p class="leftQp">代码语言：<el-tag size="small">C++</el-tag></p>
							<!-- <p>类型：<el-tag type="success" size="small">算法</el-tag> -->
							<p class="leftQp">类型：<el-tag type="success" size="small">{{ questionType }}</el-tag></p>
						</div>
						<div class="questionPart">
							<h4 class="leftH">题目叙述</h4>
							<el-divider></el-divider>
							<p class="info_qusDescription">{{ questionDescription }}</p>
						</div>
						<div class="questionPart">
							<h4 class="leftH">示例</h4>
							<el-divider></el-divider>
							<p class="leftQp">输入</p>
							<el-input v-model="sample_in" :disabled="true">
							</el-input>
							<p class="leftQp">输出</p>
							<el-input v-model="sample_out" :disabled="true">
							</el-input>
						</div>
					</div>
				</el-col>
				<el-col :span="1">
					<el-divider direction="vertical"></el-divider>
				</el-col>
				<el-col :span="10">
					
						<!-- 编程板块 -->
						<div>
							<div style="text-align: left;">
							<el-select v-model="mode" @change="changeMode" placeholder="请选择编程语言(默认JavaScript)" >
								<el-option label="C++" value="C++"></el-option>
								<el-option label="Python" value="Python"></el-option>
								<el-option label="JavaScript" value="JavaScript"></el-option>
								<el-option label="Shell" value="Shell"></el-option>
							</el-select>
							</div>
							<!-- 代码模块 -->
							<div>
								<button @click="test">change</button>
								<codemirror ref="mycode" v-model="curCode" :options="cmOptions" class="codeMirror">
								</codemirror>
								<button @click="printCode">print</button>
							</div>
							<el-divider></el-divider>
							
							<!-- 按钮模块 -->
							<div>
								<el-button type="success" @click='submit'>提交代码</el-button>
							</div>
						</div>
					
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
	//import left from '../components/left.vue'
	// import mid from '../components/mid.vue'
	import right from '../components/right.vue'
	import { codemirror } from 'vue-codemirror'
	import "codemirror/theme/ambiance.css"; // 这里引入的是主题样式，根据设置的theme的主题引入，一定要引入！！
	require("codemirror/mode/javascript/javascript.js"); // 这里引入的模式的js，根据设置的mode引入，一定要引入！！
	require("codemirror/mode/python/python.js");
	require("codemirror/mode/clike/clike.js");
	require("codemirror/mode/shell/shell.js");
	export default {
		data() {
			return {
				questionId: this.$route.query.qusId, //是否像用户id那样用全局变量保存起来？
				timevalue: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
				questionTitle: "",
				questionType: "",
				//questionLink: ""   // 题目链接？
				questionDescription: "",
				sample_in: "",
				sample_out: "",
				//编程模块
				curCode: '',
				mode:'',
				cmOptions: {
					value: '',
					mode: "text/javascript",
					theme: "ambiance",
					styleActiveLine: true, // 高亮选中行
					lineNumbers: true, // 显示行号
					styleSelectedText: true,
					line: true,
					foldGutter: true,
					
				}
			}
			},
		components: {
			//left,
			codemirror,
			right
		},
		mounted() {
			this.showQus()
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
			},
			openBank() {
				this.$router.push("/questionBank");
			},
			showQus() {
				var that = this;
				console.log("id out")
				console.log(that.questionId)
				this.$axios.get('/api/questionDetail', {
					params: {
						id: this.questionId
					}
				}).then(function(response) {
					console.log("id res")
					console.log(that.questionId)
					if (response.data.status == '0') {
						console.log("status==0")
						console.log(that.questionId)
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
					} else {
						console.log("status!=0")
						console.log(that.questionId)
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			test(){
				this.cmOptions.mode='text/javascript';
				
			},
			printCode(){
				console.log(this.curCode);
				let test=this.curCode;
				this.curCode=test;
			},
			changeMode(){
				if(this.mode=='C++'){
					this.cmOptions.mode='text/x-c++src'
				}
				if(this.mode=='Python'){
					this.cmOptions.mode='text/python'
				}
				if(this.mode=='JavaScript'){
					this.cmOptions.mode='text/javascript'
				}
				if(this.mode=='Shell'){
					this.cmOptions.mode='text/shell'
				}
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
		margin: 3px;
	}
	
	.leftH {
		margin-top: 30px;
	}
	
	.leftQp {
		line-height: 30px;
	}
	
	.info_qusDescription {
		text-align: left;
		margin-top: 5px;
		margin-bottom: 5px;
	}
	.codeMirror{
	  font-size : 13px;
	  line-height : 150%;
	  text-align: left;
	  margin-top: 10px;
	}
</style>
