<template>
<div class="g-vote">
    <div class="g-hd">
        xxxxxx
    </div>
   
</div>
</template>

<script>
import api from '../api'

export default {
  data () {
    return {
      result: {}
    }
  },
  mounted () {
    var root = this
    api.getVoteResult(this, resp => {
      root.result = resp.body
    }, respErr => {
      this.$parent.showMsg('加载数据失败！')
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

li {
  list-style: none;
  margin:5px 0;
}

a {
    text-decoration: none;
    color: #ff6600;
}

.g-info {
  display: flex;
  flex-direction: column;
/*  margin-top: 30px;*/
}

.u-title {
  display: flex;
  flex-direction: row;
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-top: 40px;
  margin-bottom: 10px;
}

.u-title .term {
    padding: 0 5px;
    margin: 0 5px;
    background-color: #999;
    border-radius: 3px;
    color: #fff;
}

.u-title .aim {
    font-weight: bold;
    color: #ff6633;
}

.u-list {
  display: flex;
  flex-direction: column;
  /*margin-top: 30px;*/
}

.u-list .desc {
  color: #ff0000;
  font-size: 14px;
  font-weight: 600;
  margin-left: 10px;
}

.u-list .sub {
  color: #00aa00;
}

.u-list .sub:before {
  content: "（"
}

.u-list .sub:after {
  content: "）"
}

.g-vote {
  /*background: #e8e8e8;*/
   font-family:"microsoft yahei";
   padding: 10px 20px;
}

.g-hd {
  /*background: #e8e8e8;*/
  display: fixed;
  top:0;
  left: 0;
  text-align: center;
  font: 18px/1.5 "microsoft yahei";
  padding: 5px;
  font-size: 32px;
  font-weight: 600;
  color: #333;
}

.g-bd {
  display: flex;
  flex-direction: column;

}

.u-box {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  background: #f8f8f8;
  min-width: 960px;
  border-left:1px solid #eee;
  border-right:1px solid #eee;
}

.u-box-hd {
  padding: 10px;
  background: #666;
  color: #fff;
  font-size: 20px;
}

.u-box-bd {
  display: flex;
  flex-direction: column;
}

.u-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 10px 5px;
  border-bottom: 1px solid #e8e8e8;
  min-width: 960px;
}

.u-item {
  text-align: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.u-tl {
  width: 100px;
  text-align: center;
}

.u-ct {
  flex: 1;
  text-align: left;
  min-width: 560px;
}

.code {
  background: #666;
  padding: 2px 5px;
  border-radius: 3px;
  color: #fff;
  margin: 5px 0;
}

.title {
  padding: 2px 5px;
  margin:2px 5px;

}

.u-gr {
    min-width: 250px;
}

.g-ft {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #333;
  height: 120px;
  min-width: 960px;
  margin-top: 20px;
  margin-bottom: 80px;
}

.g-ft input {
  height: 30px;
  background: transparent;
  border:none;
  border-bottom: 2px solid #fff;
  width: 250px;
  font-size: 24px;
  font-family: "microsoft yahei";
  padding: 5px;
  text-align: center;
  color: #fff;
  outline: none;

}

.g-ft .voter {
  font-size: 28px;
  color: #fff;
  width: 120px;
  text-align: right;
  padding-left: 20px;
  padding-right: 20px;
}


.g-ft a {
    display: inline-block;
    background: #41B883;
    padding: 10px 60px;
    color: #fff;
    font-weight: 600;
    font: 24px/1 "microsoft yahei";
    text-decoration: none;
    margin-right: 20px;
}

.g-ft .sep {
  flex: 1;
}

.g-ft a:hover {
  background: #41C883;
  color: #fff;
}

</style>
