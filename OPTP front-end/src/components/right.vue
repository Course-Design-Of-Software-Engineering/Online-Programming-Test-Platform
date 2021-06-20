<template>
	<!-- <h4>聊天板块</h4> -->
  <!-- 这里有一堆引用的函数 去跑一下抄的哪个代码就可以大概知道是干什么用的 先选找人聊天还是建群聊天
        我猜测不能输出聊天内容可能是因为没有指定 -->
  <div class="web-im dis-flex">
		<div class="left">
			<div class="aside content">
        <div class="body user-list">
          <div v-if="item.uid!=uid" class="user" @click="triggerPersonal(item)" :class="{offline: !item.status}" v-for="item in currentUserList">
            {{item.nickname}}
            <span class="tips-num" v-if="item.unread">{{item.unread}}</span>
          </div>
        </div>
			</div>
		</div>

		<div class="right content">
			<div class="header im-title">{{title}}</div>
        <div class="body im-record" id="im-record">
          <div class="ul">
              <div class="li" :class="{user: item.uid == uid}" v-for="item in currentMessage">
                <!-- item.type： {{item.type}}  -->
                <!-- item.type===1 输出msg：xxx加入聊天室 默认名字暂时是undefined -->
                <!-- 但是明明应该不等于1的时候就输出用户发送的信息 就是不肯发送 同时打开浏览器和后端的控制台可以看到输出
                      in socket.js/case default/obj: { type: 100,}
                      in broadcast: obj: {type: 2,}
                 -->
                 <!-- 和群聊相关的代码都删掉了 如果需要的话去群里的github连接找 -->
                  <template v-if="item.type===1">
                    <p class="join-tips">{{item.msg}}</p>
                  </template>
                  <template v-else>
                    <p class="message-date">
                    <span class="m-nickname">{{item.nickname}}</span> {{item.date}}</p>
                    <p class="message-box">{{item.msg}}</p>
                  </template>
              </div>
          </div>
        </div>
			<div class="footer im-input dis-flex">
			<input type="text" v-model="msg" placeholder="请输入内容">
			<button @click="send">发送</button>
			</div>
		</div>
	</div>
	
</template>

<script>
import Vue from 'vue'
import moment from 'moment'

export default {
  name: 'App',
  data(){
    return {
      title: '请选择群或者人员进行聊天',
      uid: '',
      nickname: '',
      socket: '',
      msg: '',
      messageList: [],
      users: [],
      groups: [],
      groupId: '',
      bridge: [],
    }
  },
  mounted() {
    let vm = this;
    let user = localStorage.getItem('WEB_IM_USER');
    user = user && JSON.parse(user) || {};
    vm.uid = user.uid;
    vm.nickname = user.nickname;

	  vm.conWebSocket();

    document.onkeydown = function (event) {
        var e = event || window.event;
        if (e && e.keyCode == 13) { //回车键的键值为13
            vm.send()
        }
    }
    window.onbeforeunload = function (e) {
      vm.socket.send(JSON.stringify({
        uid: vm.uid,
        type: 2,
        nickname: vm.nickname,
        bridge: []
      }));
    }
  },
  computed: {
    currentMessage() {
      console.log("in currentMessage")
      let vm = this;
      let data = vm.messageList.filter(item=>{
        console.log("in currentMessage：item：",item)
        if(item.type === 1) {
          return item;
        // } else if(this.groupId) {
        //   return item.groupId === this.groupId
        } else if(item.bridge.length){
          return item.bridge.sort().join(',') == vm.bridge.sort().join(',')
        }
      })
      data.map(item=>{
        item.status = 0
        return item;
      })
      console.log("in currentMessage：data：",data)
      return data;
    },
    usersUnRead(){
      return this.messageList.some(item=>{
        return item.bridge.length && item.status === 1
      })
    },
    currentUserList() {
      let vm = this;
      vm.users.map(user=>{
        user.unread = this.messageList.filter(item=>{
          return item.bridge.length && item.uid === user.uid && item.status === 1
        }).length
        return user;
      })
      return vm.users;
    }
  },
  methods: {
    send(){
      this.msg = this.msg.trim(); // 文本框输入的内容
      if(!this.msg){
        return
      }
      this.sendMessage(100, this.msg)
    },
    sendMessage(type, msg){
      console.log("in sendMessage()")
      this.socket.send(JSON.stringify({
        uid: this.uid,
        type: type,
        nickname: this.nickname,
        msg: msg,
        bridge: this.bridge,
        groupId: this.groupId
      }));
      this.msg = '';
    },
    // 监听服务器连接状态
    conWebSocket(){
      console.log("in conWebSocket()")
      let vm = this;
      if(window.WebSocket){
        vm.socket = new WebSocket('ws://localhost:8001');
        let socket = vm.socket;

        socket.onopen = function(e){
          console.log("连接服务器成功");
          vm.$message({type: 'success', message: '连接服务器成功'})
          if(!vm.uid){
            vm.uid = 'web_im_' + moment().valueOf();
            localStorage.setItem('WEB_IM_USER', JSON.stringify({
              uid: vm.uid,
              nickname: vm.nickname
            }))
          }
          vm.sendMessage(1)
        }
        socket.onclose = function(e){
          console.log("服务器关闭");
        }
        socket.onerror = function(){
          console.log("连接出错");
        }
        // 接收服务器的消息
        socket.onmessage = function(e){
          let message = JSON.parse(e.data);
          vm.messageList.push(message);
          if(message.users) {
            vm.users = message.users;
          }
          if (message.groups){
            vm.groups = message.groups;
          }
          
          vm.$nextTick(function(){
            var div = document.getElementById('im-record');
            div.scrollTop = div.scrollHeight;
          })
        }
      }
    },
    triggerPersonal(item) {
      if(this.uid === item.uid){
        return;
      }
      this.groupId = '';
      this.bridge = [this.uid, item.uid];
      this.title = `和${item.nickname}聊天`;
    },
    login(){
      this.nickname = this.nickname.trim();
      if(!this.nickname){
        this.$message({type: 'error', message: '请输入您的昵称'})
        return;
      }
      this.$refs.loginDialog.hide()
      this.conWebSocket();
    }
  }
}
</script>

<style>
</style>
