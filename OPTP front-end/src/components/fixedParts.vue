<template>
	<div>
		<headNavigater></headNavigater>
		<homeIntro></homeIntro>
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
		}
	}
</script>

<style>

</style>
