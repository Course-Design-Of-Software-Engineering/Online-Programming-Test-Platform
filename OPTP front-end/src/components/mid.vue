<template>
	<div>
		<!-- 编程板块 -->
		<div>
			<div style="text-align: left;">
			<el-select v-model="mode" @change="changeMode" placeholder="请选择编程语言(默认JavaScript)" >
				<el-option label="C++" value="C++"></el-option>
				<el-option label="Python" value="Python"></el-option>
				<el-option label="JavaScript" value="JavaScript"></el-option>
				<el-option label="Shell" value="Shell"></el-option>
			</el-select>
			</div>
			<!-- 代码模块 -->
			<div>
				<button @click="test">change</button>
				<codemirror ref="mycode" v-model="curCode" :options="cmOptions" class="codeMirror">
				</codemirror>
				<button @click="printCode">print</button>
			</div>
			<el-divider></el-divider>
			
			<!-- 按钮模块 -->
			<div>
				<el-button type="success" @click='submit'>提交代码</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import { codemirror } from 'vue-codemirror'
	import "codemirror/theme/ambiance.css"; // 这里引入的是主题样式，根据设置的theme的主题引入，一定要引入！！
	require("codemirror/mode/javascript/javascript.js"); // 这里引入的模式的js，根据设置的mode引入，一定要引入！！
	require("codemirror/mode/python/python.js");
	require("codemirror/mode/clike/clike.js");
	require("codemirror/mode/shell/shell.js");
	export default {
		components: {
			codemirror
		},
		data() {
			return {
				curCode: '',
				mode:'',
				cmOptions: {
					value: '',
					mode: "text/javascript",
					theme: "ambiance",
					styleActiveLine: true, // 高亮选中行
					lineNumbers: true, // 显示行号
					styleSelectedText: true,
					line: true,
					foldGutter: true,
	
				},
		
			}
	
		},
		methods:{
			test(){
				this.cmOptions.mode='text/javascript';
				
			},
			printCode(){
				console.log(this.curCode);
				let test=this.curCode;
				this.curCode=test;
			},
			changeMode(){
				if(this.mode=='C++'){
					this.cmOptions.mode='text/x-c++src'
				}
				if(this.mode=='Python'){
					this.cmOptions.mode='text/python'
				}
				if(this.mode=='JavaScript'){
					this.cmOptions.mode='text/javascript'
				}
				if(this.mode=='Shell'){
					this.cmOptions.mode='text/shell'
				}
			}
		}
		}
</script>


<style scoped="true">
.codeMirror{
  font-size : 13px;
  line-height : 150%;
  text-align: left;
  margin-top: 10px;
}
</style>

