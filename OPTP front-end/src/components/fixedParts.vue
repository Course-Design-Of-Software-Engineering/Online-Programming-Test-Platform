<template>
	<div>
		<headNavigater></headNavigater>
		<homeIntro :userName="usrname" :userEmail="usermail"></homeIntro>
		<leftNavigator></leftNavigator>
	</div>
</template>

<script>
	import leftNavigator from '../components/leftNavigater.vue'
	import homeIntro from '../components/homeInro.vue'
	import headNavigater from '../components/headNavigater.vue'
	export default{
		components:{
			leftNavigator,
			homeIntro,
			headNavigater
		},
		props: ['usrname', 'usermail'],
		// data() {
		// 	return {
		// 		name: 'username',   // 不确定是否加 “ ”
		// 		mail: "usermail"
		// 	}
		// }
	}
</script>

<style>

</style>
