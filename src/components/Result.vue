<template>
<div class="g-result">
    <div class="g-hd">
        投票结果
    </div>
    <div class="g-bd">
      <li class="result" v-for="result in results">
        <span class="m-name"> {{result.name}}</span>
        <span class="m-result"> {{result.result}}</span>
       
      </li>
    </div>

    <div data-v-24cb2d9a="" class="g-info">
   <div data-v-24cb2d9a="" class="u-title">
     学期培养目标
    <span data-v-24cb2d9a="" class="term"> 2017.02-2017.06 </span>：
    <span data-v-24cb2d9a="" class="aim">数据挖掘系统</span>
   </div> 
   <div data-v-24cb2d9a="" class="u-list">
    <div data-v-24cb2d9a="" class="u-title">
     知识要点：
    </div> 
    <div data-v-24cb2d9a="" class="u-item">
     <li data-v-24cb2d9a=""><span data-v-24cb2d9a="">1. 网络数据分析</span>
      <!----><span data-v-24cb2d9a="" class="desc">爬虫系统</span></li>
    </div>
    <div data-v-24cb2d9a="" class="u-item">
     <li data-v-24cb2d9a=""><span data-v-24cb2d9a="">2. 项目自动构架</span><span data-v-24cb2d9a="" class="sub">Gulp/Webpack</span><span data-v-24cb2d9a="" class="desc"></span></li>
    </div>
    <div data-v-24cb2d9a="" class="u-item">
     <li data-v-24cb2d9a=""><span data-v-24cb2d9a="">3. MVVM项目重构</span><span data-v-24cb2d9a="" class="sub">AngularJS /React/VUE</span><span data-v-24cb2d9a="" class="desc"></span></li>
    </div>
    <div data-v-24cb2d9a="" class="u-item">
     <li data-v-24cb2d9a=""><span data-v-24cb2d9a="">4. 虚拟化服务</span><span data-v-24cb2d9a="" class="sub">Docker</span><span data-v-24cb2d9a="" class="desc"></span></li>
    </div>
    <div data-v-24cb2d9a="" class="u-item">
     <li data-v-24cb2d9a=""><span data-v-24cb2d9a="">5. 文档</span><span data-v-24cb2d9a="" class="sub">项目进度规划/技术日志</span><span data-v-24cb2d9a="" class="desc">100篇</span></li>
    </div>
   </div>
  </div>
   
</div>
</template>

<script>
import api from '../api'

export default {
  data () {
    return {
      results: {}
    }
  },
  mounted () {
    var root = this
    api.getVoteResult(this, resp => {
      root.results = resp.body
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


.g-result {
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
  font-size: 48px;
  font-weight: 600;
  color: #333;
}

.g-bd {
  display: flex;
  flex-direction: row;
}

.result {
  background: #eee;
  padding: 40px;
  margin:10px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.result .m-name {
  font-size: 24px;
  font-weight: 600;
  color: #666;
}

.result .m-result {
  font-size: 48px;
  font-weight: 600;
  font-weight: 600;
  color: #ff3300;
  margin-top: 10px;
}

.g-info {
  display: flex;
  flex-direction: column;
  margin-top: 240px;

  border-top: 3px solid #e8e8e8;
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

</style>
