<template>
<div class="g-vote">
    <div class="g-hd">
        前端社团学年项目总结
    </div>
    <div class="g-info">
      <div class="u-title">
        学期培养目标<span class="term"> {{infos.term}} </span>：<span class="aim">{{infos.aim}}</span>
      </div>

      <div class="u-list">
        <div class="u-title">知识要点：</div>
        <div class="u-item" v-for="(knowledge,index) in infos.knowledge">
          <li><span>{{index+1}}. {{knowledge.main}}</span><span class="sub" v-if="knowledge.sub!==''">{{knowledge.sub}}</span><span class="desc">{{knowledge.desc}}</span></li>
        </div>
        </div>


    </div>
    <div class="g-bd">
        <div class="u-title">项目工程</div>
        <div class="u-box" v-for="(project,index) in infos.project">
            <div class="u-box-hd">{{index+1}}. {{project.name}}</div>
            <div class="u-box-bd">
                <div class="u-row" v-for="(item,itemindex) in project.list">
                    <div class="u-item u-tl"><a href="" target="_blank" v-bind:href="item.ip">{{item.nickname}}</a></div>
                    <div class="u-item u-ct" >
                      <li v-for="user in item.userlist"><span class="title">用户名: </span><span class="code">{{user.usr}}</span> <span class="title">密码:</span><span class="code">{{user.pwd}}</span></li>
                        </div>
                    <div class="u-item u-gr">
                        <input type="radio" value="90" v-model="item.mark" v-bind:name="'v'+index+itemindex">优秀
                        <input type="radio" value="80" v-model="item.mark" v-bind:name="'v'+index+itemindex">良好
                        <input type="radio" value="70" v-model="item.mark" v-bind:name="'v'+index+itemindex">中等
                        <input type="radio" value="60" v-model="item.mark" v-bind:name="'v'+index+itemindex">较差
                    </div>
                </div>
            </div>
        </div>

    </div>

    <div class="g-ft">
        <span class="voter">投票人</span>
        <input type="text" placeholder="请填写您的姓名"v-model="user">
        <span class="sep"></span>
        <a href="javascript:void(0);" @click="vote()">投 票</a>
      </div>
    
</div>
</template>

<script>
import api from '../api'

export default {
  data () {
    return {
      infos: {},
      votes: [],
      user: null
    }
  },
  mounted () {
    var root = this
    api.getVoteInfo(this, resp => {
      root.infos = resp.body
      for (var i = 0; i < root.infos.project.length; i++) {
        for (var j = 0; j < root.infos.project[i].list.length; j++) {
          root.infos.project[i].list[j].mark = 0
        }
      }
    }, respErr => {
      this.$parent.showMsg('加载数据失败！')
    })
  },
  methods: {
    vote (e) {
      if ((this.user === null) || (this.user === '')) {
        this.$parent.showMsg('请输入姓名！')
        return
      }

      this.votes = []
      for (var i = 0; i < this.infos.project.length; i++) {
        this.votes.push([])
        for (var j = 0; j < this.infos.project[i].list.length; j++) {
          this.votes[i].push(this.infos.project[i].list[j].mark)
        }
      }

      var ret = {}
      ret.user = this.user
      ret.votes = this.votes
      api.postVote(this, ret, resp => {
        this.$parent.showMsg(resp.body.msg)
      }, respErr => {
        this.$parent.showMsg('投票失败！')
      })
    }
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
