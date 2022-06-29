<template>
    <div id="rightnav">
        <div id="atop">
            <div id="popularartic">
                <div @click="changeflag(0)"><i class="el-icon-collection"></i></div>
            </div>
            <div id="newcomment">
                <div @click="changeflag(1)"><i class="el-icon-chat-round"></i></div>
            </div>
            <div id="newartic">
                <div @click="changeflag(2)"><i class="el-icon-news"></i></div>
            </div>
        </div>
        <div id="amed">
            <transition name="toggle" mode="out-in">
                <div id="particle" v-if="showflag == 0" key="0">
                    <div id="title">热门文章</div>
                    <div id="content" v-for="(i, index) in datalist" :key="index" @click="jumptodetail(i)">
                        <div class="contentimg"><img :src="i.src" alt=""></div>
                        <div class="detail">
                            <div class="title">
                                <p>{{ i.title }}</p>
                            </div>
                            <div class="comments">
                                <i class="el-icon-chat-line-round" ></i>
                                <p>{{ i.comments }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="ncomment" v-else-if="showflag == 1" key="1">
                    <div id="title">最新评论</div>
                    <div id="content" v-for="(i, index) in datalist" :key="index">
                        <div class="contentimg"><img :src="i.src" alt=""></div>
                        <div class="detail">
                            <div class="title">
                                <p>{{ i.content }}</p>
                            </div>
                            <div class="comments">
                                <i class="el-icon-thumb"></i>
                                <p>{{ i.likes }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="nartic" v-else key="2">
                    <div id="title">最新文章</div>
                    <div id="content" v-for="(i, index) in datalist" :key="index" @click.native="jumptodetail(i)">
                        <div class="contentimg"><img :src="i.src" alt=""></div>
                        <div class="detail">
                            <div class="title">
                                <p>{{ i.title }}</p>
                            </div>
                            <div class="comments">
                                <i class="el-icon-time"></i>
                                <p>{{ i.creatime }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        <div id="abottom">
            <div id="title">
                <p>博客信息</p>
            </div>
            <div id="content">
                <div id="datalog">
                    <div class="data" v-for="(i, index) in dataloglist" :key="index">
                        <p>{{ i.title }}</p>
                        <div>{{ i.total }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getbeatlikeblog, getnewcomment } from '../api/index'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            showflag: 0,
            datalist: [],
            dataloglist: [
                {
                    title: "文章总数",
                    total: 0
                },
                {
                    title: "评论总数",
                    total: 0
                },
                {
                    title: "运行天数",
                    total: 0
                }
            ]
        }
    },
    computed: {
        ...mapState(['total', 'comment'])
    },
    mounted() {
        this.getdata();
        this.initdatalist('likes');
    },
    methods: {
        changeflag(i) {
            this.showflag = i;
            if (i == 0) {
                this.initdatalist('likes')
            } else if (i == 1) {
                this.updatedatelist()
            } else {
                this.initdatalist('creatime')
            }
        },
        async getdata() {
            await this.$store.dispatch('total');
            await this.$store.dispatch('allcomment')
            this.dataloglist[0].total = this.total;
            this.dataloglist[1].total = this.comment;
        },
        initdatalist(item) {
            let params = {
                orderby: item
            }
            getbeatlikeblog(params).then((res) => {
                // this.datalist = [];
                this.datalist = res.message.data;
                for (var i = 0; i < this.datalist.length; i++) {
                    let m = i + 1;
                    this.datalist[i].creatime = this.datalist[i].creatime.replace(/T[0-9:.]+Z/g, " ")
                    this.datalist[i].src = require('../assets/images/articleicon/' + m + '.jpg')
                }
            })
        },
        updatedatelist() {
            getnewcomment().then((res) => {
                // this.datalist = [];
                console.log(res);
                this.datalist = res.message.data;
                for (var i = 0; i < this.datalist.length; i++) {
                    let m = i + 1;
                    this.datalist[i].src = require('../assets/images/articleicon/' + m + '.jpg')
                }
            })
        },
        jumptodetail(val) {
            this.$router.replace({ path: "/myblog/Articled", query: { id: val.id, type: val.type } }).catch(err => err)
        }
    }
}
</script>

<style scoped>
#rightnav {
    width: 220px;
    height: 100%;
    background-color: #f9f9f9;
    box-shadow: 2px 0 3px #d3d5d8;
}

#atop {
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 2px 2px #efefef;
}

#atop>div {
    flex-grow: 1;
    height: 55px;
    /* border: 1px solid red; */
    box-sizing: border-box;
}

#atop>div>div {
    margin: auto;
    width: 50%;
    height: 100%;
    /* border: 1px solid blue; */
    box-sizing: border-box;
    cursor: pointer;
    position: relative;
}

#atop i {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-10px, -10px);
    display: block;
    width: 30px;
    height: 30px;
}

/* 侧边栏上面图片部分结束 */
/* 侧边栏中间部分 */
#amed #title {
    color: #8c939d;
    height: 45px;
    padding-left: 20px;
    line-height: 45px;
    font-size: 17px;
    font-weight: lighter;
    font-family: "syht";
}

#amed #content {
    display: flex;
    padding-left: 20px;
    align-items: flex-start;
    margin-bottom: 10px;
    cursor: pointer;
}

#amed .contentimg {
    border-radius: 5px;
    width: 50px;
    height: 50px;
    background-color: white;
    box-shadow: 4px 4px 2px #efefef;
}

#amed .contentimg img {
    margin: 5px auto;
    display: block;
    height: 40px;
    width: 40px;
}

#amed .detail {

    padding-right: 20px;
    width: 120px;
    padding-left: 10px;
    font-size: 13px;
    font-family: "syht";
    color: #8c939d;
    font-weight: 100;
}

#amed .detail P {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

#amed .comments {
    padding-top: 10px;
    display: flex;
    justify-items: center;
    align-items: center;
}

#amed .comments>img {
    display: block;
    width: 15px;
    height: 15px;
}

#amed .comments p {
    padding-left: 5px;
    font-size: 12px;
    word-wrap: break-word;
}

/* 侧边栏中间部分结束 */
/* 侧边栏底部区域 */
#abottom {
    margin-top: 35px;
    color: #8c939d;
    margin-bottom: 20px;
}

#abottom #title {
    line-height: 45px;
    padding-left: 20px;
    height: 45px;
    font-size: 17px;
    font-weight: lighter;
    font-family: "syht";
}

#abottom #content {
    height: 195px;
}

#abottom #datalog {
    border-radius: 10px;
    margin: auto;
    width: 80%;
    height: 100%;
    background-color: white;
    box-shadow: 4px 4px 2px #efefef;
}

#abottom .data {
    height: 65px;
    display: flex;
    justify-content: space-around;
    justify-items: center;
    align-items: center;
}

#abottom .data>div {
    width: 30px;
    height: 15px;
    border-radius: 10px;
    background-color: #8c939d;
    font-size: 13px;
    line-height: 15px;
    text-align: center;
    color: white;
}

/* =========================== */
.toggle-enter,
.toggle-leave-to {
    opacity: 0;
}

.toggle-enter-active,
.toggle-leave-active {
    transition: all 0.4s ease;
}

.toggle-enter-to,
.toggle-leave {
    opacity: 1;
}
</style>