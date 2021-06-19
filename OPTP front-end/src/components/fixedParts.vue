<template>
	<div>
		<headNavigater></headNavigater>
		<homeIntro :userName="name" :userEmail="mail"></homeIntro>
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
		props: {
			username: String,
			usermail: String
		},
		data() {
			return {
				name: username,   // 不确定是否加 “ ”
				mail: usermail
			}
		}
	}
</script>

<style>

</style>
