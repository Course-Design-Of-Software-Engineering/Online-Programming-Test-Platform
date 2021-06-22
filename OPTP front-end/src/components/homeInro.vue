<template>
	<div class="homeIntro">
		<el-main>
			<div style="float: left; padding-top: 20px; padding-left: 10px;">
				<div class="singleIntro">
					<el-avatar shape="circle" :size="100"> user </el-avatar>
				</div>
				<div class="singleIntro">
					<p id="helloUser">{{ userName }}，您好！</p>
					<p id="email">{{ userEmail }}</p>
				</div>
			</div>
<!-- 			<p>{{condition}}</p> -->
			<div class="divButton">
				<el-button type="success" icon="el-icon-connection" :style="[{display:initDisplay}]" plain round
					@click="enterItv">{{buttTip}}
				</el-button>
			</div>
		</el-main>
	</div>
</template>

<script>
	export default {
		// props: {
		// 	userName: String,
		// 	userEmail: String
		// },
		props: ['userName', 'userEmail'],
		data() {
			return {
				buttTip: '进入面试',
				inviteEmail: '',
				//面试官邮箱
				interviewerEmail: '',
				socket: '',
				initDisplay:'default',
				receivedData:'',
				condition:''
			}
		},
		methods: {
			enterItv() {
				//身份是候选人的时候
				console.log(this.COMMON.identity)
				if (this.COMMON.identity == '候选人') {
					this.$confirm('确定进入面试吗？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'success'
					}).then(() => {
						this.$router.push({
							path: '/codingPage',
							query: {
								qusId: "0001"
							}
						});
					}).catch(() => {
						// this.$message({
						// 	type: 'info',
						// 	message: '取消'
						// });
					});
				}
				//身份是面试官的情况下
				else {
					this.$confirm('确定创建一个新面试吗？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'success'
					}).then(() => {
						this.$prompt('请输入邮箱', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
							inputErrorMessage: '邮箱格式不正确'
						}).then(({
							value
						}) => {
							this.inviteEmail = value;
							//已获取提示框邮箱
							//弹窗提示
							this.$message({
								type: 'success',
								message: '你的邮箱是: ' + value
							});

							// //跳转进coding页面
							// this.$router.push({
							// 	path: '/codingPage',
							// 	query: {
							// 		qusId: "0001"
							// 	}
							// });
							this.sendInvitation();//传邮箱给后端
							// this.sendMessageInterviewer();//向对应的面试者发送邀请
							
						}).catch(() => {
							// this.$message({
							// 	type: 'info',
							// 	message: '取消'
							// });
						});
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '取消输入'
						});
					});

				}
			},
			sendInvitation() {
				let that = this;
				this.$message('正在发送邀请');
				this.$axios.post('/api/codingPage', {
						interviewer: that.COMMON.user,
						interviewee: that.inviteEmail
					})
					.then((res) => {
						if (res.data.status == '0') {
							console.log('1', res);
							this.sendMessageInterviewer();
							this.$message({
								type: 'success',
								message: '您的邀请已发送成功'
							});
							// console.log(res.data.result.list);
							// that.tempList = res.data.result.list;
							// console.log(that.tempList);
							// that.loadInterviewList();
						} else {
							this.$message.error('您的邀请发送出现了错误 T_T');
							console.log('getInfo status Error!');
						}

					})
					.catch((error) => {
						console.log(error);
					});
			},
			// 监听服务器连接状态
			conWebSocket() {
				console.log("in conWebSocket()")
				let vm = this;
				//初始化页面的socket
				if (window.WebSocket) {
					vm.socket = new WebSocket('ws://localhost:8001');
					let socket = vm.socket;

					socket.onopen = function(e) {
						console.log("连接服务器成功");
						vm.$message({
							type: 'success',
							message: '连接服务器成功'
						});
						let identity='';
						if(vm.COMMON.identity=='候选人'){
							identity='interviewee';
						}
						else{
							identity='interviewer';
						}
						vm.socket.send(JSON.stringify({
							user: vm.COMMON.user,
							condition: 'initial',
							bridge: [],
							sender: identity,
							func: 'invite'
						}))

					}
					socket.onclose = function(e) {
						console.log("服务器关闭");
					}
					socket.onerror = function() {
						console.log("连接出错");
					}
					// 一旦接收到接收服务器的消息
					socket.onmessage = function(e) {
						console.log('received:', e.data);
						console.log(typeof(e.data));
						vm.receivedData=JSON.parse(e.data);
						vm.condition=vm.receivedData.condition;
					}
				}},
				//创建面试后，面试官发送的消息
				sendMessageInterviewer(msg) {
					console.log("in sendMessage")
					let vm=this;
					this.socket.send(JSON.stringify({
						user: vm.COMMON.user,
						condition: 'invite',
						bridge: [vm.COMMON.user, vm.inviteEmail],
						sender: 'interviewer',
						func: 'invite'
					}));
				}

			},
			mounted() {
				if (this.COMMON.identity != '候选人') {
					this.buttTip = '创建面试';
					this.initDisplay = 'default';
				}
				this.conWebSocket();
				},
				watch: {
					condition(val,oldVal){
						console.log('watching');
					let vm=this;
					//若是面试官发来消息（面试者接收视角）
					if (vm.receivedData.sender == 'interviewer') {
						
						vm.interviewerEmail=vm.receivedData.user;//获取面试官的邮箱
						vm.$confirm('确认加入面试?', '提示', {
							confirmButtonText: '同意',
							cancelButtonText: '拒绝',
							type: 'warning'
						}).then(() => {
							console.log('我提前了');
							//同意加入面试
							vm.socket.send(JSON.stringify({
								user:vm.COMMON.user,
								condition: 'agree',
								bridge: [vm.COMMON.user, vm.interviewerEmail],
								sender: 'interviewee',
								func: 'invite'
							}))
							console.log('中间');
							vm.$message({
								type: 'success',
								message: '加入面试成功!请点击进入面试按钮尽快开始面试',
							});
							//显示进入面试的按钮
							vm.initDisplay = 'default';
						}).catch(() => {
							//拒绝加入面试
							vm.socket.send(JSON.stringify({
								user: vm.COMMON.user,
								condition: 'refuse',
								bridge: [vm.COMMON.user, vm.interviewerEmail],
								sender: 'interviewee',
								func: 'invite'
							}))
							vm.$message({
								type: 'info',
								message: '已拒绝面试邀请'
							});
						});
					}
					//若是面试者发来消息（面试官接收视角）
					else {
						//若面试者拒绝邀请
						if (vm.receivedData.condition =='refuse') {
							vm.$alert('很抱歉，对方已拒绝面试，请再和对方交流！', '邀请面试结果', {
								confirmButtonText: '知道了'
							});
						}
						//若面试者同意邀请
						else {
							vm.$alert('对方已同意面试！现在准备和对方共同进入面试。', '邀请面试结果', {
								confirmButtonText: '进入面试',
								callback: action => {
									//跳转进coding页面
									vm.$router.push({
										path: '/codingPage',
										query: {
											qusId: "0001"
										}
									});
								}
							});
						}
					}
				}
				}
				
			}
		
</script>

<style scoped>
	.el-main {
		background-color: #bae2f4;
		color: #333;
		/*text-align: center;*/
		line-height: 160px;
		padding: 20px;
		width: 100%;
	}

	.singleIntro {
		justify-content: center;
		display: inline-block;
		margin: 15px;
	}

	p {
		text-align: left;
	}

	#helloUser {
		line-height: 50px;
		font-size: 27px;
		font-weight: bold;
	}

	#email {
		line-height: 15px;
		font-size: smaller;
		color: #44607c;
	}

	.divButton {
		float: right;
		padding: 20px;
		margin-right: 150px;
	}
</style>
