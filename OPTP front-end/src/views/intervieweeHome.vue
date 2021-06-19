<template>
	<div>
		<fixedParts :username="userName" :usermail="userEmail"></fixedParts>
		<div>
			<el-main>
				<h3>欢迎进入TrickyCat在线编程笔试平台！</h3>
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
				userId: this.$route.query.userId,
				userName: this.$route.query.userName,
				userEmail: this.$route.query.userEmail
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
