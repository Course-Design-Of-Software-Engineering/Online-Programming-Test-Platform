<template>
	<div id="app">
		<!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      </div> -->
		<el-row style="margin-bottom: 5px" class="row-header" type="flex" justify="float">
			<img src="./assets/logo-T.png" width=110px height=30px style="margin-left: 8px">
		</el-row>
		<router-view></router-view>
	</div>
</template>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}
/*
	#nav {
		padding: 30px;
	}

	#nav a {
		font-weight: bold;
		color: #2c3e50;
	}

	#nav a.router-link-exact-active {
		color: #4394b9;
	}*/
</style>
