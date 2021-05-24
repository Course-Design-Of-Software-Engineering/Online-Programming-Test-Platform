<template>
	<div class="homeIntro">
		<el-main>
			<div style="float: left; padding-top: 20px; padding-left: 10px;">
				<div class="singleIntro">
					<el-avatar shape="circle" :size="100"> user </el-avatar>
				</div>
				<div class="singleIntro">
					<p id="helloUser">用户xxx，您好！</p>
					<p id="email">xxxxxxx@xxx.com</p>
				</div>
			</div>
			<div class="divButton">
				<el-button type="success" icon="el-icon-connection" plain round>进入面试</el-button>
			</div>
		</el-main>
	</div>
</template>

<script>

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
