<template>
  <div id="video">
    <div id="content">
      <div id="content-left">
        <div id="toptitkle">
          <p>分享生活</p>
        </div>
        <div id="top">
          <el-breadcrumb separator-class="el-icon-arrow-right" id="breadcrumb">
            <el-breadcrumb-item :to="{ path: '/myblog/home' }" replace>首页</el-breadcrumb-item>
            <el-breadcrumb-item>分享生活</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div id="eather">
          <Article class="aritcle" v-for="(i, index) in datalist" :key="index" :data="i" :index="index" @click.native="jumptodetail(i)"></Article>
        </div>
        <div id="paginationbox">
          <el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="total" id="pagination"
            @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </div>
      <div id="content-right">
        <rightnav></rightnav>
      </div>
    </div>
    <footer-com></footer-com>
  </div>
</template>

<script>
import FooterCom from '../components/FooterCom.vue'
import Article from '../components/ArticleSimple.vue'
import rightnav from '../components/RightNav.vue'
import { getlifelist,getarticletotal } from '../api/index'
export default {
  components: { Article, rightnav, FooterCom },
  data() {
    return {
      datalist: [
      ],
      pageNo: 1,
      pageSize: 5,
      currentpage: 1,
      total: 10,
    }
  },
  mounted() {
    this.getdata();

  },
  methods: {
    async getdata() {
      let params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      await getlifelist(params).then((res) => {
        if(res.code == 200){
          this.datalist = res.message;
        }
      })
      await getarticletotal({type:3}).then((res)=>{
        if(res.code == 200){
          this.total = res.message.total;
        }
      })
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.datalist = []; //不加这一句，子组件不会刷新数据
      this.getdata();
    },
    jumptodetail(val) {
      this.$router.push({ path: "/myblog/Articled", query: { id: val.id, type: val.type } })
    }
  }
}
</script>

<style src="../assets/css/page.css" scoped>
#Study {
  padding-left: 220px;
}
</style>
