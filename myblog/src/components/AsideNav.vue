<template>
    <div id="asidenav" ref="asidenav">
        <div id="asidetop">
            <div id="avator">
                <el-upload action="#" :show-file-list="false" :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
            <div id="text">
                <p>{{ text }}</p>
            </div>
        </div>
        <div id="asidemiddle">
            <div id="title">
                <p>导航</p>
            </div>
            <div id="content">
                <ul>
                    <li v-for="(i, index) in menulist" :key="index" @click="linkto(index)">
                        <i :class="i.class"></i>
                        <p>{{ i.name }}</p>
                    </li>
                </ul>
            </div>
        </div>
        <div id="asidebottom">
            <el-tooltip class="item" effect="dark" content="后台管理" placement="top">
                <div id="manager">
                    <i class="el-icon-s-management" @click="turntomlogin"></i>
                    <p>管理</p>
                </div>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="关于本网站" placement="top">
                <div id="about">
                    <i class="el-icon-info"></i>
                    <p>关于</p>
                    <div id="abouttip"></div>
                </div>
            </el-tooltip>
        </div>
    </div>
</template>

<script>
import { authority } from '../api/index'
export default {
    data() {
        return {
            imageUrl: '',
            text: "记录美好生活",
            menulist: [
                { name: "首页", class: 'el-icon-house' },
                { name: "学习手册", class: 'el-icon-reading' },
                { name: "技术博客", class: 'el-icon-document' },
                { name: "分享生活", class: 'el-icon-sunset' },
            ],
            screenheight: 0
        };
    },
    mounted() {
        this.screenheight = window.innerHeight;
        console.log(this.screenheight);
        if (JSON.parse(sessionStorage.getItem('userinfo'))) {
            this.imageUrl = JSON.parse(sessionStorage.getItem('userinfo')).avatar;
        }
    },
    computed: {
        getuserinfo1() {
            return this.$store.state.userinfo
        }
    },
    watch: {
        getuserinfo1: {
            handler(newValue){ //当词条改变时执行事件
                if(newValue.avatar){
                    this.imageUrl = newValue.avatar;
                }else{
                    this.imageUrl = "";
                }
            }
            // console.log(JSON.parse(sessionStorage.getItem('userinfo')).avatar);
        }
    },
    methods: {
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        linkto(i) {
            if (i == 0) {
                this.$router.replace("/myblog/home").catch(err => err)
            } else if (i == 1) {
                this.$router.replace("/myblog/stu").catch(err => err)
            } else if (i == 2) {
                this.$router.replace("/myblog/Blog").catch(err => err)
            } else if (i == 3) {
                this.$router.replace("/myblog/Life").catch(err => err)
            }
        },
        turntomlogin() {
            if (JSON.parse(sessionStorage.getItem('userinfo'))) {
                authority({ id: JSON.parse(sessionStorage.getItem('userinfo')).id }).then((res) => {
                    if (res.code == 200) {
                        this.$router.replace("/AdminRoot/AdminBlogs")
                    } else {
                        this.$router.push("/mlogin")
                    }
                })
            } else {
                this.$router.push("/mlogin")
            }
        }
    }
}
</script>

<style scoped>
#asidenav {
    z-index: 999;
    position: fixed;
    background-color: #f9f9f9;
    width: 220px;
    height: calc(100% - 50px);
    display: flex;
    flex-direction: column;
}

#asidetop {
    border-bottom: 1px solid #ffffff;
    box-sizing: border-box;
    width: 100%;
    height: 170px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

#avator {
    border: 1px dashed #d9d9d9;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    position: relative;
    margin-bottom: 5px;
    overflow: hidden;
}

#avator:hover {
    transform: rotate(360deg) scale(1.1);
    transition: transform 1.5s ease;
    border-color: #409EFF;
}

#asidetop p {
    font-size: 13px;
    font-family: "syht";
    color: #8c939d;
}

#asidemiddle {
    border-bottom: 1px solid #ffffff;
    box-sizing: border-box;
    flex-grow: 1;
}

#asidemiddle #title {
    width: 100%;
    height: 35px;
}

#asidemiddle #title>p {
    padding-left: 11px;
    padding-top: 11px;
    font-size: 13px;
    font-family: "syht";
    color: #8c939d;
}

#content>ul {
    list-style: none;
    overflow: hidden;
    width: 100%;
}

#content>ul li {
    padding-left: 20px;
    display: flex;
    width: 100%;
    height: 45px;
    justify-content: left;
    align-items: center;
    cursor: pointer;
}

#content>ul li img {
    display: block;
    width: 20px;
    height: 20px;
}

#content>ul li p {
    padding-left: 10px;
    font-size: 15px;
    font-family: "syht";
    color: #8c939d;
}

#content>ul li:hover {
    background-color: #EFEFEF;
}

#asidebottom {
    background-color: #ffffff;
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    display: flex;
}

#manager,
#about {
    cursor: pointer;
    position: relative;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

#asidebottom p {
    font-weight: 100;
    font-size: 15px;
    font-family: "syht";
    color: #8c939d;
}

#asidebottom img {
    display: block;
    width: 17px;
    height: 17px;
}


/* ==================element ui 样式===================== */

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
}

.avatar {
    width: 100px;
    height: 100px;
    display: block;
}
</style>