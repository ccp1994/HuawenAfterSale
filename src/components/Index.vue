<template>
  <div style="background:#f5f5f5;">
    <Header :show-back="false" :show-right="true" title="华文售后管理" @rightClick="rightClick"/>
    <el-input v-model="search_content" placeholder="请输入要搜索的内容" clearable style="width:90%;margin:auto;position:absolute;left:0;right:0;"></el-input>

    <scroller :on-refresh="reffor" ref="scrfor" style="margin-top:120px;" height="100%">
      <div class="dis-flex flex-y" v-for="(item,i) in dataList" :key="i"
           style="padding:0 10px;border-bottom:1px solid #eee;">
        <div>
          <img :src="item.images[0]" style="width:80px;height:80px; display:inline; object-fit: cover"/>
        </div>
        <div class="dis-flex flex-x flex-x-center" style="margin-left:5px;">
          <p>{{item.title}}</p>
          <p style="margin-top:5px;">{{item.content}}</p>
        </div>

      </div>

    </scroller>

  </div>
</template>

<script>
  import Header from './ui/Header.vue'
  import {getProblem} from '@/server/problem.js';

  export default {
    name: 'Index',
    data() {
      return {
        search_content: '',
        pagesize: 0,
        dataList: []
      }

    },
    components: {
      Header
    },
    mounted() {
      this.reffor()

    },
    methods: {
      rightClick() {
        this.$router.push('/problemIn')
      }, //每页下拉条数pagemax：dataList：循环数组
      // 下拉刷新
      async reffor() {
        let _data = await getProblem(
          {'page': this.pagesize},
        );
        this.loading = false;
        if (_data.code === 1) {
          // console.log(data);
          //这一步是判断你当前请求的这一页数据是不是最后一页，如果是最后一页
          //就不能请求了（这个根据后端给的接口判断，只要能判断出就行了，
          // 判断是下拉刷新还是上拉加载（这一步也是比较巧妙的，当然也很好理解）
          this.dataList = _data.data;

        } else {
          this.$message(_data.message);

        }
        this.$refs.scrfor.finishPullToRefresh();

      },
      // 上拉加载
      async inffor(done) {
        this.pagesize++;
        let _data = await getProblem(
          {'page': this.pagesize},
        );
        this.loading = false;
        if (_data.code === 1) {
          // console.log(data);
          //这一步是判断你当前请求的这一页数据是不是最后一页，如果是最后一页
          //就不能请求了（这个根据后端给的接口判断，只要能判断出就行了，
          // 判断是下拉刷新还是上拉加载（这一步也是比较巧妙的，当然也很好理解）
          if (_data.data.length > 0) {
            this.dataList = this.dataList.concat(
              _data.data
            );
          }
        } else {
          this.$message(_data.message);
        }
        this.$refs.scrfor.finishInfinite();

      }
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
