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
						<el-row style="text-align: left;margin-bottom: 20px;">
							<el-button type="info" size="medium" icon="el-icon-s-grid" @click="openBank()"
								:style="[{display:buttDisplay}]">从题库选择
							</el-button>
							<el-button type="primary" size="medium" icon="el-icon-edit" @click="editQus()()"
								:style="[{display:buttDisplay}]">编辑题目
							</el-button>
							<el-button type="primary" plain size="medium" icon="el-icon-plus" @click="createQus()"
								:style="[{display:buttDisplay}]">新建
							</el-button>
						</el-row>
						<div>
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
									<el-form-item label="题目类型" :rules="[{ required: true, message: '题目类型不能为空'},]">
										<!-- <el-input v-model="questionCnt.questionType"
											:rules="[{ required: true, message: '题目类型不能为空'},]"></el-input> -->
										<el-select v-model="questionCnt.questionType">
										      <el-option label="算法" value="算法"></el-option>
										      <el-option label="SQL" value="SQL"></el-option>
											  <el-option label="前端" value="前端"></el-option>
										</el-select>
									</el-form-item><!-- 代码语言 -->
									<el-form-item label="代码语言">
										<!-- <el-input v-model="codeLng"></el-input> -->
										<el-select v-model="codeLng">
										      <el-option label="C++" value="C++"></el-option>
										      <el-option label="Python" value="Python"></el-option>
											  <el-option label="JavaScript" value="JavaScript"></el-option>
											  <el-option label="Shell" value="Shell"></el-option>
										</el-select>
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
											v-model="questionCnt.questionDescription" style="margin-left: 15%;">
										</el-input>
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
									<el-form-item label="输入示例" :rules="[{ required: true, message: '输入示例不能为空'},]">
										<el-input type="textarea" :autosize="{ minRows: 1, maxRows: 3}"
											v-model="questionCnt.sample_in"></el-input>
									</el-form-item>
									<!-- 输出示例 -->
									<el-form-item label="输出示例" :rules="[{ required: true, message: '输出示例不能为空'},]">
										<el-input type="textarea" :autosize="{ minRows: 1, maxRows: 3}"
											v-model="questionCnt.sample_out"></el-input>
									</el-form-item>
								</el-form>
							</div>
							<div class="buttGroup">
								<el-button type="primary" @click="submitForm('questionCnt')"
									:style="[{display:buttDisplay}]">提交编辑</el-button>
								<el-button @click="cancelEdt()" :style="[{display:buttDisplay}]">取消 </el-button>
							</div>
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
					<!-- <right></right> -->
					<div class="rightContent">
						<div class="headerIM">与{{this.otherName}}在线聊天</div>
						<div class="bodyIM" id="IMrecord">
							<div class="ulIM">
								<div class="liIM" :class="{user: item.uid == uid}" v-for="item in currentMessage">
									<template v-if="item.type===1">
										<p class="joinTips">{{item.msg}}</p>
									</template>
									<template v-else>
										<p class="messageDate">
											<span class="mNickname">{{item.nickname}}</span> {{item.date}}
										</p>
										<p class="messageBox">{{item.msg}}</p>
									</template>
								</div>
							</div>
						</div>
						<div class="footerIM">
							<el-row>
								<el-input type="text" v-model="msg" placeholder="请输入内容" style="width: 71%;"></el-input>
								<el-button type="primary" @click="send">发送</el-button>
							</el-row>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	// import left from '../components/left.vue'
	// import mid from '../components/mid.vue'
	// import right from '../components/right.vue'
	import global from '../global.vue'
	import moment from 'moment' //用于在线聊天

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
				timevalue: [new Date(2021, 9, 10, 8, 40), new Date(2021, 9, 10, 9, 40)],
				flag: true,
				timeDemand: "O(n)",
				spaceDemand: "nlogn",
				//左块的按钮显示属性
				buttDisplay: 'default',
				//中部的按钮显示属性
				buttDisplay2: 'default',
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
					readOnly: false
				},
				//聊天模块
				uid: this.COMMON.user,
				otherID: this.COMMON.other,
				nickname: '',
				otherName: '',
				socket: '',
				users: [],
				groups: [],
				groupId: '',
				groupName: '',
				msg: '',
				messageList: [],
				bridge: [this.COMMON.user, this.COMMON.other] //严格一对一聊天
			}
		},
		components: {
			//left,
			codemirror
			//right
		},
		mounted() {
			this.showQus(); //左边显示面试题
			console.log('bridge', this.bridge);
			console.log('currid', this.otherID);
			this.getNames(); //从数据库读取面试官和面试者的用户名（可能存在同步异步问题）
			let vm = this;
			this.conWebSocket(); //连接socket服务器
			//设置不同身份的功能限制
			if (this.COMMON.identity == '候选人') {
				this.buttDisplay = 'none';
			}
			//为面试官的时候，不能更改代码编辑框内容，并且失去光标
			else {
				this.cmOptions.readOnly = 'nocursor';
				this.buttDisplay2 = 'none';
			}
			// 用回车键发送消息
			document.onkeydown = function(event) {
				var e = event || window.event;
				if (e && e.keyCode == 13) { //回车键的键值为13
					vm.send()
				}
			}
			// 向socket服务器发送当前用户的信息
			window.onbeforeunload = function(e) {
				vm.socket.send(JSON.stringify({
					uid: vm.uid,
					type: 2,
					nickname: vm.nickname,
					bridge: vm.bridge //是否仅先向服务器发送[]？
				}));
			}
		},
		computed: { //computed相当于带响应式依赖与缓存的method
			currentMessage() {
				let vm = this;
				let data = vm.messageList.filter(item => {
					if (item.type === 1) {
						return item;
					} else if (item.bridge.length) {
						console.log("item.bridge")
						console.log(item)
						console.log(item.bridge)
						console.log(item.bridge.length)
						console.log(item.bridge.sort().join(','))
						console.log(vm.bridge.sort().join(','))
						return item.bridge.sort().join(',') == vm.bridge.sort().join(',')
					}
				})
				data.map(item => {
					item.status = 0
					return item;
				})
				return data;
			},
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
			},
			getNames() {
				var that = this;
				//获取当前用户名字
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
							that.nickname = detailResult[0].username;
							console.log(that.nickname)
						}
					}
				}).catch(function(error) {
					console.log(error);
				});
				//获取聊天的另一个用户的名字
				this.$axios.get('/api/user_center', {
					params: {
						email: this.COMMON.other
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
							console.log('otherid:', that.otherID)
							console.log(detailResult)
							that.otherName = detailResult[0].username;
							console.log(that.otherName)
						}
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			//触发发送消息事件
			send() {
				this.msg = this.msg.trim(); //检查输入框是否为空
				if (!this.msg) {
					return
				}
				if (!this.bridge.length) {
					this.$message({
						type: 'error',
						message: '未与对方建立联系'
					})
					return;
				}
				this.sendMessage(100, this.msg) //将消息发送至服务器，类型码为100
			},
			//将消息发送至服务器
			sendMessage(type, msg) {
				this.socket.send(JSON.stringify({
					uid: this.uid,
					type: type,
					nickname: this.nickname,
					msg: msg,
					bridge: this.bridge,
					func: 'chat'
				}));
				console.log("sendMessage")
				console.log(msg)
				this.msg = '';
			},
			//连接socket服务器
			conWebSocket() {
				let vm = this;
				if (window.WebSocket) {
					vm.socket = new WebSocket('ws://localhost:8001');
					let socket = vm.socket;
					//连接建立时触发的WebSocket事件
					socket.onopen = function(e) {
						console.log("连接服务器成功啦");
						vm.$message({
							type: 'success',
							message: '连接服务器成功啦'
						})
						if (!vm.uid) {
							vm.uid = 'web_im_' + moment().valueOf();
							localStorage.setItem('WEB_IM_USER', JSON.stringify({
								uid: vm.uid,
								nickname: vm.nickname
							}))
						}
						vm.sendMessage(1)
					}
					//连接关闭时触发的WebSocket事件
					socket.onclose = function(e) {
						console.log("服务器关闭啦");
					}
					//通信发生错误时触发的WebSocket事件
					socket.onerror = function() {
						console.log("连接出错啦");
					}
					//客户端接收服务端数据时触发的WebSocket事件（接收服务器的消息）
					socket.onmessage = function(e) {
						console.log('CPreceived:', e.data);
						let message = JSON.parse(e.data);
						console.log('message.func:', message.func);
						if (message.func == 'chat') {
							vm.messageList.push(message);
							console.log("接收服务器的消息");
							console.log(message);
							console.log(vm.messageList);
							console.log("push(message)");
							vm.$nextTick(function() {
								var div = document.getElementById('im-record');
								div.scrollTop = div.scrollHeight; //App.vue里注释掉貌似也没问题
							})
						} else if (message.func == 'code') {
							vm.curCode = message.code;
						}
					}
				}
			}

		},
		watch: {
			//监听到页面代码变动，就执行send通信
			curCode(val, oldVal) {
				let vm = this;
				if(vm.COMMON.identity=='候选人'){
					vm.socket.send(JSON.stringify({
						user: vm.COMMON.user,
						code: vm.curCode,
						bridge: [vm.otherID, vm.COMMON.user],
						func: 'code'
					}));
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
	
	.questionPart {
		margin: 10px, 0px;
	}
	
	.leftH {
		margin-top: 5px;
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

	.headerIM {
		font-weight: bold;
		font-size: 20px;
		color: #44607C;
	}

	.bodyIM {
		padding: 10px 10px;
		width: auto;
		height: 520px;
	}

	.joinTips {
		position: relative !important;
		display: block;
		color: #cccccc;
		font-size: 10px;
		text-align: center;
		width: 100%;
		left: 0 !important;
		transform: none !important;
	}

	.liIM {
		margin-bottom: 15px;
		position: relative;
		text-align: left;
		color: #46b0ff;
	}

	.mNickname {
		font-size: 16px;
		color: #333333;
		font-weight: 500;
	}

	.messageDate {
		font-size: 14px;
		color: #b9b8b8;
	}

	.messageBox {
		line-height: 30px;
		font-size: 20px;
	}

	.footerIM {
		position: fixed;
	}
</style>
