<template>
    <div id="search">
        <div id="content">
            <div id="content-left">
                <div id="toptitkle">
                    <p>搜索"{{ this.$route.query.keywords }}"的结果</p>
                </div>
                <div id="top">
                    <el-breadcrumb separator-class="el-icon-arrow-right" id="breadcrumb">
                        <el-breadcrumb-item :to="{ path: '/myblog/home' }" replace>首页</el-breadcrumb-item>
                        <el-breadcrumb-item>搜索结果</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div id="eather">
                    <Article class="aritcle" v-for="(i, index) in datalist" :key="index" :data="i" :index="index"
                        @click.native="jumptodetail(i)">
                    </Article>
                </div>
                <div id="paginationbox">
                    <el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="total"
                        id="pagination" @current-change="handleCurrentChange">
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
import { dosearch } from '../api/index'
export default {
    components: { Article, rightnav, FooterCom },
    data() {
        return {
            datalist: [],
            pageNo: 1,
            pageSize: 5,
            currentpage: 1,
            total: 10,
        }
    },
    mounted() {
        this.doSearch();
    },
    methods: {
        handleCurrentChange(val) {
            this.pageNo = val;
            this.datalist = []; //不加这一句，子组件不会刷新数据
            this.doSearch();
        },
        async doSearch() {
            let data = {
                keywords: this.$route.query.keywords,
                pageNo: this.pageNo,
                pageSize: this.pageSize
            }
            await dosearch(data).then((res) => {
                if(res.code == 200){
                    this.datalist = res.message;
                }
            })
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
