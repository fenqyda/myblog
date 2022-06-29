<template>
  <div id="article">
    <div id="content">
      <div id="content-left">
        <div id="pretop">
          <div id="pretop-top">
            <h1>{{ articdata.title }}</h1>
          </div>
          <div id="pretop-bottom">
            <div id="user">用户:{{ articdata.nickname }}</div>
            <div id="time">上传时间:{{ articdata.creatime }}</div>
            <div id="comments">现有{{ articdata.comments }}条评论</div>
          </div>
        </div>
        <div id="breadcrumbbox">
          <el-breadcrumb separator-class="el-icon-arrow-right" id="breadcrumb">
            <el-breadcrumb-item :to="{ path: '/' }" replace>首页</el-breadcrumb-item>
            <el-breadcrumb-item>正文</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div id="main">
          <div id="maintop">
            <img src="../assets/images/articleimg/1.jpg" alt="">
          </div>
          <div id="mainarticle" v-html="articdata.content">

          </div>
        </div>
        <div id="commentbox">
          <CommentSec :bid="id" :type="this.$route.query.type" v-if="refresh"></CommentSec>
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
import CommentSec from '../components/CommentSection.vue'
import FooterCom from '../components/FooterCom.vue'
import rightnav from '../components/RightNav.vue'
import { gettablename, getblog } from '../api/index'
export default {
  components: { FooterCom, rightnav, CommentSec },
  data() {
    return {
      articdata: {},
      id: 0,
      refresh:true,
    }
  },
  created() {
    this.articdata = {};
    console.log(111);
    this.id = this.$route.query.id;
    this.getblogdata();
  },
  watch: {
    '$route'() {
      this.articdata = {};
      console.log(111);
      this.id = this.$route.query.id;
      this.getblogdata();
      this.refreshcomp();
    }
  },
  methods: {
    async getblogdata() {
      let params = {
        type: this.$route.query.type,
      }
      await gettablename(params).then((res) => {
        params = {
          id: this.id,
          name: res.message[0].name
        }
        getblog(params).then((res) => {
          this.articdata = res.message[0];
          this.articdata.creatime = this.articdata.creatime.replace(/T[0-9:.]+Z/g, " ")
        })
      })
    },
    refreshcomp(){
      this.refresh = false;
      this.$nextTick(()=>{
        this.refresh = true;
      })
    }
  }
}
</script>

<style  scoped>
#article {
  padding-left: 220px;
}

#content {
  display: flex;
  justify-content: space-between;

}

#content-left {
  width: 80%;
}

#pretop {
  width: 100%;
  height: 100px;
  background-color: #f9f9f9;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#pretop #pretop-top {
  width: 100%;
  height: 70px;
}

#pretop #pretop-top h1 {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  font-size: 25px;
  font-family: 楷体, 隶书;
}

#pretop #pretop-bottom {
  width: 100%;
  flex-grow: 1;
  display: flex;
  justify-content: space-around;
  color: #8c939d;
  font-size: 12px;
}

#breadcrumbbox {
  margin: 20px 20px 20px 20px;
  height: 40px;
  border-radius: 5px;
  background-color: #f9f9f9;
  position: relative;
  display: flex;
  align-items: center;
}

#breadcrumb {
  margin-left: 20px;
}

#breadcrumbbox p {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  font-size: 25px;
  font-family: 楷体, 隶书;
}

#main {
  margin: 20px 20px 20px 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
}

#maintop {
  height: 200px;
  width: 100%;
  border-radius: 5px 5px 0 0;
  transition: transform 1s ease;
  overflow: hidden;
}

#mainarticle {
  margin: 30px 30px 0 30px;
  padding-bottom: 60px;
}

#mainarticle>>>p,
#mainarticle>>>li {
  font-size: 16px;
  line-height: 1.8;
  color: #8c939d;
}

#mainarticle>>>ul {
  margin-top: 10px;
  list-style: none;
}

#mainarticle>>>ul>>>li::before {
  content: " ";
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #797e86;
  border-radius: 50%;
  margin-right: 10px;
}

#mainarticle>>>h1 {
  margin-bottom: 20px;
  margin-top: 30px;
  font-size: 30px;
  color: #797e86;
}

#mainarticle>>>h2 {
  margin-bottom: 20px;
  margin-top: 30px;
  font-size: 25px;
  color: #797e86;
}

#mainarticle>>>h3 {
  margin-bottom: 20px;
  margin-top: 30px;
  font-size: 20px;
  color: #797e86;
}

#mainarticle>>>h4 {
  margin-bottom: 20px;
  margin-top: 30px;
  font-size: 18px;
  color: #797e86;
}

#mainarticle>>>h5 {
  margin-bottom: 20px;
  margin-top: 30px;
  font-size: 16px;
  color: #797e86;
}

#commentbox {
  overflow: hidden;
  margin: 20px 20px 20px 20px;
  border-radius: 5px;
  background-color: #f9f9f9;
}

#maintop img {
  display: block;
  width: 100%;
  height: 100%;
}

#maintop:hover {
  transform: scale(1.05);
  transition: transform 1s ease;
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
