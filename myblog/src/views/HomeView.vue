<template>
  <div id="home">
    <div id="content">
      <div id="content-left">
        <div id="hometop">
          <p>雷明的blog</p>
        </div>
        <div id="homeeather">
          <acimg></acimg>
          <Article class="aritcle" v-for="(i, index) in datalist" :key="index" :data="i" :index="index" @click.native="jumptodetail(i)">
          </Article>
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
import acimg from '../components/AutoChangeimg.vue'
import rightnav from '../components/RightNav.vue'
import { getallarticle } from '../api/index'
export default {
  components: { Article, acimg, rightnav, FooterCom },
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
      await getallarticle(params).then((res) => {
        if(res.code == 200){
          this.datalist = res.message.data;
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
       this.$router.push({path:"/myblog/Articled",query:{id:val.id,type:val.type}})
    }
  }
}
</script>

<style  scoped>
#content {
  display: flex;
  justify-content: space-between;

}

#content-left {
  width: 80%;
}

#paginationbox {
  width: 100%;
  height: 200px;
  position: relative;
}

#pagination {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#hometop {
  width: 100%;
  height: 100px;
  background-color: #f9f9f9;
  position: relative;
}

#hometop p {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  font-size: 25px;
  font-family: 楷体, 隶书;
}

#homeeather {
  padding: 15px 15px 0 15px;
}

#acimg {
  overflow: hidden;
  position: relative;
}

#acimg>ul {
  position: absolute;
  list-style: none;
  display: flex;
}

#acimg>ul li img {
  width: 100%;
  height: 100%;
  display: block;
}

@media only screen and (max-width:768px) {

  #content-right {
    display: none;
  }

  #content-left {
    width: 100%;
  }
}

@media only screen and (min-width:768px) {

  #content-right {
    display: none;
  }

  #content-left {
    width: 100%;
  }

  .aritcle {
    height: 157px;
  }
}

@media only screen and (min-width:992px) {
  #content-right {
    display: block;
  }

  #home {
    width: 750px;
  }

  #content-left {
    width: 80%;
  }

  .aritcle {
    height: 157px;
  }
}

@media only screen and (min-width:1200px) {
  #content-right {
    display: block;
  }

  #home {
    width: 950px;
  }

  #content-left {
    width: 80%;
  }

  .aritcle {
    height: 200px;
  }
}
</style>
