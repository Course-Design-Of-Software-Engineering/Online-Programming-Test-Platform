<template>
  <div class="home">
    <img alt="Logo" src="../assets/logo.png">
    <HelloWorld msg="欢迎进入TrickyCat在线编程笔试平台"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
