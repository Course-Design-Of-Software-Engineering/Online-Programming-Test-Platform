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
			<div class="divButton">
				<el-button type="success" icon="el-icon-connection" plain round @click="enterItv">{{buttTip}}
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
				inviteEmail: ''
			}
		},
		methods: {
			enterItv() {
				//身份是候选人的时候
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

							//跳转进coding页面
							this.$router.push({
								path: '/codingPage',
								query: {
									qusId: "0001"
								}
							});
							this.sendInvitation();
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
			}
		},
		mounted() {
			if (this.COMMON.identity != '候选人') {
				this.buttTip = '创建面试';
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
