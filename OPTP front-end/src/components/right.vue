<template>
	
	<div style="width: 100%; float: right">
		<button id="msgbtn" @click="sendFunc">发送</button>
		<p>发送</p>
		 <textarea v-model="send" name="" id="" cols="30" rows="10">{{send}}</textarea>
		 <p>接收</p>
		  <textarea v-model="receive" name="" id="" cols="30" rows="10">{{receive}}</textarea>
		</div>
	</div>

</template>


<!--   -----------------  socketio test   ---------------------------   -->
<!--
<script src="/socket.io/socket.io.js" > </script>

<script>
    $(function () {
        var socket = io.connect();
    });
</script>
-->


<script>
	// var socket = io.connect('http://localhost:3000');
	// var socket = io.connect();
	// let btn = document.getElementById('msgbtn');
	// let msginput = document.getElementById('msginput');
	// let showbox = document.getElementById('showbox');
	// btn.addEventListener('click', (event) => {
	// 	console.log('发送信息');
	//     let msg = msginput.value;
	//     let data = {msg: msg};
	//     socket.emit('sendMessage', data);
	// });
	// socket.on('receiveMessage', (data) => {
	//     console.log('收到');
	//     console.log(data);

	//     let message = document.createElement('div');
	//     message.innerHTML = `收到的新消息是: ${data.msg}`;
	//     showbox.appendChild(message);
	// })
	export default {
		
		data() {
			return {
				send:'',
				receive:''
	
			}
		},
		methods: {
			sendFunc(){
				console.log(this.send);
			}
		},
	
		mounted() {
	
		}
	}
</script>

<!--   -----------------  socketio test   ---------------------------   -->


<style>
</style>
