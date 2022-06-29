<template>
    <div id="comment">
        <div id="input">
            <div id="avatar">
                <img :src="userinfo.avatar" alt="">
            </div>
            <div id="inputcontent">
                <el-input type="textarea" placeholder="请输入内容" v-model="textarea" maxlength="30" show-word-limit
                    @keyup.enter="postcomment">
                </el-input>
            </div>
            <div id="inputbtn">
                <div id="post" @click="postcomment">发送</div>
                <div id="cancel" @click="cancelinput">取消</div>
            </div>
        </div>
        <div id="commentlist">
            <div id="commenttop">
                <div id="left">
                    <p v-if="showmode">热门评论 共{{ total }}条</p>
                    <p v-else>最新评论 共{{ total }}条</p>
                </div>
                <div id="right">
                    <p v-if="showmode">热度排序</p>
                    <p v-else>时间排序</p>
                </div>
            </div>
            <div id="commentcontent" v-for="(item, index) in commentList" :key="index">
                <div id="top">
                    <div id="avatar">
                        <img :src="item.avatar" alt="">
                    </div>
                    <div id="nameandtime">
                        <p id="name">{{ item.nickname }}</p>
                        <p>{{ item.createDate }}</p>
                    </div>
                </div>
                <div id="content">
                    <p>{{ item.content }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getcomment, postcomment } from '../api/index'
export default {
    props: ["bid", "type"],
    data() {
        return {
            avator: "",
            userid: 1,
            commentList: [],
            showmode: true,
            textarea: "",
            total: 0,
            userinfo: {},
            id:0,
            atype:0,
        }
    },
    mounted() {
        this.id = this.bid;
        this.atype = this.type;
        this.getdatalist()
        this.userinfo = this.$store.state.userinfo
    },
    methods: {
        getdatalist() {
            let params = {
                id: this.id,
                type: this.atype
            }
            getcomment(params).then((res) => {
                if (res.code == 200) {
                    this.total = res.message.length;
                    this.commentList = res.message;
                }else{
                    this.$notify({
                        title: res.message,
                    });
                }
            })
        },
        postcomment() {
            let data = {
                uid: JSON.parse(sessionStorage.getItem('userinfo')).id,
                bid: this.bid,
                type: this.type,
                content: this.textarea
            }
            postcomment(data).then((res) => {
                if (res.code == 200) {
                    this.$notify({
                        title: res.message,
                    });
                    this.getdatalist()
                }else{
                    this.$notify({
                        title: res.message,
                    });
                }
            })
        },
        cancelinput() {
            this.textarea = "";
        }
    }
}
</script>

<style scoped>
#comment {
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100%;
    margin: 10px 10px 0 10px;
}

#commentlist {
    flex-grow: 1;
    /* background-color: aqua; */
    margin-bottom: 50px;
}

#commenttop {
    height: 40px;
    display: flex;
    align-items: center;
    justify-items: center;
    justify-content: space-between;
}

#commenttop p {
    color: #8c939d;
    font-size: 16px;
}

#commenttop #right {
    cursor: pointer;
}

#commentcontent {
    margin-top: 20px;
    height: 80px;
}

#commentcontent #top {
    display: flex;
    height: 40px;
}

#avatar {
    width: 50px;
    display: flex;
}

#avatar img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid black;
    margin: auto;
    overflow: hidden;
}

#commentcontent #top #nameandtime {
    display: flex;
    justify-content: space-between;
    padding: 0px 0 5px 10px;
    flex-grow: 1;
}

#nameandtime p {
    font-size: 14px;
    color: #8c939d;
}
#nameandtime #name {
    font-size: 14px;
    color: black;
}


#commentcontent #content {
    margin-left: 60px;
    color: #8c939d;
}

#input {
    width: 100%;
    height: 100px;
    bottom: 0;
    display: flex;
    align-items: center;
}

#inputcontent {
    flex-grow: 1;
    margin-left: 10px;
}

#inputbtn {
    margin-left: 10px;
    width: 50px;
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

#inputbtn>div {
    border-radius: 5px;
    width: 50px;
    height: 20px;
    color: #efefef;
    font-size: 13px;
    text-align: center;
    cursor: pointer;
}

#post {
    background-color: green;
}

#cancel {
    background-color: gray;
}
</style>