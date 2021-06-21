<template>
	<div>
		<el-row class="headNavigator" type="flex">
			<el-col :span="14" style="margin-left: 15px; text-align: left; line-height: 40px;">
				<h3 class="headTitle">线上面试编程题</h3>
				<i class="el-icon-arrow-right"></i>
				<p class="headTitle">{{ questionCnt.questionTitle }}</p>
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
							<el-button type="info" size="medium" icon="el-icon-s-grid" @click="openBank()" :style="[{display:buttDisplay}]">从题库选择
							</el-button>
							<el-button type="primary" size="medium" icon="el-icon-edit" @click="editQus()()" :style="[{display:buttDisplay}]">编辑题目
							</el-button>
							<el-button type="primary" plain size="medium" icon="el-icon-plus" @click="createQus()" :style="[{display:buttDisplay}]">新建
							</el-button>
						</el-row>
						<div class="questionPart">
							<h4 class="leftH">题目信息</h4>
							<el-divider></el-divider>
							<!-- form表单 -->
							<el-form :model="questionCnt" ref="questionCnt" label-width="95px" class="demo-ruleForm"
								:disabled="flag">
								<!-- 题目标题 -->
								<el-form-item label="题目标题" :rules="[{ required: true, message: '题目标题不能为空'},]">
									<el-input type="text" v-model="questionCnt.questionTitle"></el-input>
								</el-form-item>
								<!-- 题目类型 -->
								<el-form-item label="题目类型">
									<el-input v-model="questionCnt.questionType"
										:rules="[{ required: true, message: '题目类型不能为空'},]"></el-input>
								</el-form-item><!-- 代码语言 -->
								<el-form-item label="代码语言">
									<el-input v-model="codeLng"></el-input>
								</el-form-item>
								<!-- 时间复杂度 -->
								<el-form-item label="时间复杂度">
									<el-input v-model="timeDemand"></el-input>
								</el-form-item>
								<!-- 空间复杂度 -->
								<el-form-item label="空间复杂度">
									<el-input v-model="spaceDemand"></el-input>
								</el-form-item>
							</el-form>
						</div>
						<div class="questionPart">
							<h4 class="leftH">题目叙述</h4>
							<el-divider></el-divider>
							<p class="info_qusDescription">{{ questionDescription }}</p>
							<!-- form表单 -->
							<el-form :model="questionCnt" ref="questionCnt" class="demo-ruleForm" :disabled="flag">
								<!-- 题目叙述 -->
								<el-form-item label="" :rules="[{ required: true, message: '题目叙述不能为空'},]">
									<el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}"
										v-model="questionCnt.questionDescription" style="margin-left: 15%;"></el-input>
								</el-form-item>
							</el-form>
						</div>
						<div class="questionPart">
							<h4 class="leftH">示例</h4>
							<el-divider></el-divider>
							<!-- form表单 -->
							<el-form :model="questionCnt" ref="questionCnt" label-width="95px" class="demo-ruleForm"
								:disabled="flag">
								<!-- 输入示例 -->
								<el-form-item label="输入示例">
									<el-input type="textarea" :autosize="{ minRows: 1, maxRows: 3}"
										v-model="questionCnt.sample_in"
										:rules="[{ required: true, message: '输入示例不能为空'},]"></el-input>
								</el-form-item>
								<!-- 输出示例 -->
								<el-form-item label="输出示例">
									<el-input type="textarea" :autosize="{ minRows: 1, maxRows: 3}"
										v-model="questionCnt.sample_out"
										:rules="[{ required: true, message: '输出示例不能为空'},]"></el-input>
								</el-form-item>
							</el-form>
						</div>
						<div class="buttGroup">
							<el-button type="primary" @click="submitForm('questionCnt')" :style="[{display:buttDisplay}]">提交编辑</el-button>
							<el-button @click="cancelEdt()" :style="[{display:buttDisplay}]">取消 </el-button>
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
							<el-select v-model="mode" @change="changeMode" placeholder="请选择编程语言 (已默认js)">
								<el-option label="C++" value="C++"></el-option>
								<el-option label="Python" value="Python"></el-option>
								<el-option label="JavaScript" value="JavaScript"></el-option>
								<el-option label="Shell" value="Shell"></el-option>
							</el-select>
						</div>
						<!-- 代码模块 -->
						<div>
							
							<codemirror ref="mycode" v-model="curCode" :options="cmOptions" class="codeMirror">
							</codemirror>
							<button @click="printCode">print</button>
						</div>
						<el-divider></el-divider>

						<!-- 按钮模块 -->
						<div>
							<el-button type="success" @click='submit' :style="[{display:buttDisplay2}]">提交代码</el-button>
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
	//codeMirror的引入
	import {
		codemirror
	} from 'vue-codemirror'
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
				flag: true,
				timeDemand: "O(n)",
				spaceDemand: "nlogn",
				//左块的按钮显示属性
				buttDisplay:'default',
				//中部的按钮显示属性
				buttDisplay2:'default',
				codeLng: "C++",
				// 题目表单
				questionCnt: {
					questionTitle: '',
					questionType: '',
					//questionLink: ""   // 题目链接？
					questionDescription: '',
					sample_in: '',
					sample_out: ''
				},
				//编程模块
				curCode: '',
				mode: '',
				cmOptions: {
					value: '',
					mode: "text/javascript",
					theme: "ambiance",
					styleActiveLine: true, // 高亮选中行
					lineNumbers: true, // 显示行号
					styleSelectedText: true,
					line: true,
					foldGutter: true,
					readOnly:false
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
			//设置不同身份的功能限制
			if(this.COMMON.identity=='候选人')
			{
				this.buttDisplay='none';
			}
			//为面试官的时候，不能更改代码编辑框内容，并且失去光标
			else{
				this.cmOptions.readOnly='nocursor';
				this.buttDisplay2='none';
			}
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
				this.flag = true;
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
							that.questionCnt.questionTitle = detailResult[0].title;
							that.questionCnt.questionType = detailResult[0].type;
							that.questionCnt.questionDescription = detailResult[0].description;
							that.questionCnt.sample_in = detailResult[0].sample[0].in;
							that.questionCnt.sample_out = detailResult[0].sample[0].out;
						}
					} else {
						console.log("status!=0")
						console.log(that.questionId)
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			editQus() {
				this.flag = false;
			},
			createQus() {
				this.flag = false;
				this.questionCnt.questionTitle = "";
				this.questionCnt.questionType = "";
				this.questionCnt.questionDescription = "";
				this.questionCnt.sample_in = "";
				this.questionCnt.sample_out = "";
				this.codeLng = "";
				this.timeDemand = "";
				this.spaceDemand = "";
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					console.log("out")
					var that = this
					console.log(that.questionCnt)
					if (valid) {
						this.$axios.post('/api/codingPage/createP', {
							formContent: this.questionCnt
						}).then(function(response) {
							console.log("res")
							console.log(that.questionCnt.questionTitle)
							if (response.data.status == '0') {
								console.log("status==0")
								let infoResult = response.data.result.List
								console.log(infoResult)
								console.log(infoResult.id)
								that.$message({
									message: `题目提交成功！`,
									type: 'success'
								});
								that.questionId = infoResult.id;
								that.showQus();
								//that.flag = true;
							} else {
								that.$alert('题目提交失败！', '提示', {
									confirmButtonText: '确定',
									callback: action => {}
								});
							}
						}).catch(function(error) {
							console.log(error);
						});
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			cancelEdt() {
				//提示取消将会丢失编辑的内容
				this.$confirm('取消将会丢失当前编辑的内容，确定放弃吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'success'
				}).then(() => {
					this.flag = true;
				}).catch(() => {
					// this.$message({
					// 	type: 'info',
					// 	message: '取消'
					// });
				});
			},
			test() {
				this.cmOptions.mode = 'text/javascript';

			},
			printCode() {
				console.log(this.curCode);
				let test = this.curCode;
				this.curCode = test;
			},
			changeMode() {
				if (this.mode == 'C++') {
					this.cmOptions.mode = 'text/x-c++src'
				}
				if (this.mode == 'Python') {
					this.cmOptions.mode = 'text/python'
				}
				if (this.mode == 'JavaScript') {
					this.cmOptions.mode = 'text/javascript'
				}
				if (this.mode == 'Shell') {
					this.cmOptions.mode = 'text/shell'
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

	.codeMirror {
		font-size: 13px;
		line-height: 150%;
		text-align: left;
		margin-top: 10px;
	}

	.buttGroup {
		float: inherit;
		margin-bottom: 50px;
	}
</style>
