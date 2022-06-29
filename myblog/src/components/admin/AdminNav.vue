<template>
    <div id="adminpnav">
        <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" >
            <el-menu-item index="1" @click="turnto(1)">
                <i class="el-icon-s-home"></i>
                <span slot="title">返回前台</span>
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>博客管理</span>
                </template>
                <el-menu-item-group>
                    <template slot="title">已有博客</template>
                    <el-menu-item index="2-1" @click="turnto(21)">技术博客</el-menu-item>
                    <el-menu-item index="2-2" @click="turnto(22)">学习手册</el-menu-item>
                    <el-menu-item index="2-3" @click="turnto(23)">生活分享</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="上传博客">
                    <el-menu-item index="2-4" @click="turnto(24)">上传博客</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="3" @click="turnto(3)">
                <i class="el-icon-user-solid"></i>
                <span slot="title">用户管理</span>
            </el-menu-item>
            <el-menu-item index="4" @click="turnto(4)">
                <i class="el-icon-s-comment"></i>
                <span slot="title">评论管理</span>
            </el-menu-item>
            <el-menu-item index="5" @click="turnto(5)">
                <i class="el-icon-s-data"></i>
                <span slot="title">网站数据</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isCollapse: false
        }
    },
    methods: {
        turnto(index){
            console.log(index);
            if(index == 1){
                this.$router.replace("/myblog/home").catch(err => err)
            }else if(index == 3){
                this.$router.replace("/AdminRoot/AdminUser").catch(err => err)
            }else if(index == 4){
                 this.$router.replace("/AdminRoot/AdminComment").catch(err => err)
            }else if(index == 5){
                 this.$router.replace("/AdminRoot/Adminhome").catch(err => err)
            }else if(index == 21){
                this.$router.replace("/AdminRoot/AdminBlogs").catch(err => err)
            }else if(index == 22){
                this.$router.replace("/AdminRoot/AdminQuestion").catch(err => err)
            }else if(index == 23){
                this.$router.replace("/AdminRoot/AdminLife").catch(err => err)
            }else if(index == 24){
                this.$router.replace("/AdminRoot/AddBlog").catch(err => err)
            }
        }
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 210px;
    height: 100%;
}

#adminpnav {
    position: fixed;
    width: 210px;
    height: 100%;
    background-color: #324054;
}

#adminpnav p {
    font-weight: lighter;
    font-size: 15px;
    font-family: "syht";
    color: #c1cad8;
}

/* #adminpnav ul {
    list-style: none;
    width: 100%;
}

#adminpnav ul li {
    width: 100%;
    height: 55px;
    display: flex;
    justify-content: left;
    align-items: center;
    cursor: pointer;
}

#adminpnav ul li>img {
    margin-left: 20px;
}

#adminpnav ul li>div {
    padding-left: 20px;
}

#adminpnav ul li:hover {
    background-color: #283344;
    transition: background-color 0.25s ease;
} */
</style>