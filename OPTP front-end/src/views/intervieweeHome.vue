<template>
	<div>
		<fixedParts :usrname="userName" :usermail="userEmail"></fixedParts>
		<div>
			<el-main>
				<h3>欢迎进入TrickyCat在线编程笔试平台！</h3>
				<!-- <h3>{{ this.$route.query.userName }}，您好！</h3> -->
				<!-- <h3>邮箱：{{ this.$route.query.userEmail }}</h3> -->
			</el-main>
		</div>
	</div>
</template>

<script>
	import fixedParts from '../components/fixedParts.vue'
	export default {
		components: {
			fixedParts   //子组件
		},
		data() {   //要将这些父组件的值传递给子组件
			return {
				userName: "",
				userEmail: this.COMMON.user
			}
		},
		mounted() {
			this.showName()
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
			}
		}
	}
</script>

<style scoped>
	.el-main {
		color: #333;
		text-align: center;
		line-height: 200px;
		height: inherit;
	}
</style>
