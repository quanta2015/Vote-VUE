<template>
  <div id="app">
    <!-- <vote></vote> -->

    <router-view class="view" ></router-view>

    <Notification v-bind:show="showNotifications" v-bind:msg="msg" ></Notification>
  </div>
</template>

<script>
import Vote from './components/Vote'
import Notification from './components/Notification'

export default {
  data () {
    return {
      msg: '',
      showNotifications: false
    }
  },
  components: {
    Vote,
    Notification
  },
  methods: {
    showMsg (msg) {
      this.msg = msg
      this.showNotifications = true
    }
  }
}
</script>

<style>
#app {
  /*background: #888;*/
}
</style>
