<template>
	<div class="in-coder-panel">
		<codemirror ref="mycode" :value="curCode" :options="cmOptions" class="codeMirror">
		</codemirror>
	</div>
</template>

<script type="text/ecmascript-6">
	import {
		codemirror
	} from 'vue-codemirror'
	import "codemirror/theme/ambiance.css"; // 这里引入的是主题样式，根据设置的theme的主题引入，一定要引入！！
	require("codemirror/mode/javascript/javascript"); // 这里引入的模式的js，根据设置的mode引入，一定要引入！！

	export default {
		components: {
			codemirror
		},
		data() {
			return {
				curCode: '',
				cmOptions: {
					value: '',
					mode: "javascript",
					theme: "ambiance",
					styleActiveLine: true, // 高亮选中行
					lineNumbers: true, // 显示行号
					styleSelectedText: true,
					line: true,
					foldGutter: true,

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
