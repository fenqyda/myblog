<template>
    <div id="Topnav">
        <div id="navtitle" @click="replacetohome">
            <p>雷明的blog</p>
        </div>
        <div id="navsearch">
            <div id="search">
                <input v-model="search" type="text" placeholder="站内搜索" @keyup.enter="handleSearch" slot="reference">
                <img src="../assets/images/icons8-搜索.svg" alt="搜索图标" @click="handleSearch">
            </div>
            <el-popover placement="bottom" width="60" trigger="manual" content="搜索栏不能为空！" v-model="visible"
                class="popover">
            </el-popover>
        </div>
        <div id="showlogin" @click="showlogin" @mouseleave="hiddenlogin">
            <transition name="loginfade">
                <div id="login" v-if="loginflag">
                    <div id="loginmain" v-if="!logined">
                        <div id="logintop">
                            <div id="logsel" :class="role0 == true ? 'active' : ''" @click="cahangestylerole0">登录</div>
                            <div id="rigesel" :class="role1 == true ? 'active' : ''" @click="cahangestylerole1">注册</div>
                        </div>
                        <div id="loginbottom">
                            <transition name="fade" mode="out-in">
                                <div id="loginpage" v-if="showflag" key="page0">
                                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px">
                                        <el-form-item label="邮箱" prop="email">
                                            <el-input v-model="ruleForm.email"></el-input>
                                        </el-form-item>
                                        <el-form-item label="密码" prop="pwd">
                                            <el-input type="password" v-model="ruleForm.pwd"></el-input>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button type="primary" @click="submitFormtologin()" style="width:200px">
                                                登录
                                            </el-button>
                                        </el-form-item>
                                    </el-form>
                                </div>
                                <div id="regispage" v-else key="page1">
                                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px">
                                        <el-form-item label="邮箱" prop="email">
                                            <el-input v-model="ruleForm.email"></el-input>
                                        </el-form-item>
                                        <el-form-item label="用户名" prop="username">
                                            <el-input v-model="ruleForm.username"></el-input>
                                        </el-form-item>
                                        <el-form-item label="密码" prop="pwd">
                                            <el-input type="password" v-model="ruleForm.pwd"></el-input>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button type="primary" @click="submitFormtoregis()" style="width:200px">
                                                注册
                                            </el-button>
                                        </el-form-item>
                                    </el-form>
                                </div>
                            </transition>
                        </div>
                    </div>
                    <div id="loginmain" v-if="logined">
                        <div id="userinfo">
                            <div id="avatar">
                                <img :src="this.$store.state.userinfo.avatar" alt="">
                            </div>
                            <div id="name">
                                <p>当前登录用户:<br>{{ this.$store.state.userinfo.nickname }}</p>
                            </div>
                        </div>
                        <div id="logout">
                            <div id="logoutbtn" @click="logout">退出登录</div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { userlogin, register } from '../api/index'
export default {
    data() {
        return {
            visible: false,
            avator: false,
            role0: true,
            role1: false,
            ruleForm: {
                email: "",
                username: "",
                pwd: ""
            },
            logined: false,
            loginflag: false,
            showflag: true,
            rules: {
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' }
                ],
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                pwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 11, message: '密码应为6到11位', trigger: 'blur' }
                ],
            },
            search: "",
            imageUrl: "",
            username: "",
        }
    },
    mounted() {
        this.setlogined()
    },
    computed: {
        ...mapGetters(['getuserinfo']),
        getuserinfo1() {
            return this.getuserinfo
        }
    },
    watch: {
        getuserinfo1(val) {
            // console.log(JSON.parse(sessionStorage.getItem('userinfo')).avatar);
            this.imageUrl = val.avatar;
            this.username = val.nickname;
        }
    },
    methods: {
        setlogined() {
            if (sessionStorage.getItem('token')) {
                this.logined = true;
            } else {
                this.logined = false;
            }
        },
        cahangestylerole0() {
            this.role0 = true;
            this.role1 = false;
            this.showflag = true;
        },
        cahangestylerole1() {
            this.role0 = false;
            this.role1 = true;
            this.showflag = false;
        },
        showlogin() {
            this.loginflag = true;
        },
        hiddenlogin() {
            this.loginflag = false;
        },
        replacetohome() {
            this.$router.replace("/myblog/home").catch(err => err)
        },
        handleSearch() {
            if (this.search) {
                this.$router.replace({ path: "/myblog/Search", query: { keywords: this.search } })
            } else {
                this.visible = true;
                setTimeout(() => {
                    this.visible = false;
                }, 1500)
            }
        },
        submitFormtologin() {
            let data = this.ruleForm
            userlogin(data).then((res) => {
                if (this.ruleForm.email == "") {
                    return this.$notify({
                        title: '请输入邮箱',
                        duration: 1000,
                    });
                }
                if (this.ruleForm.pwd == "") {
                    return this.$notify({
                        title: '请输入密码',
                        duration: 1000,
                    });
                }
                if (res.code == 200) {
                    sessionStorage.setItem('token', res.message.token);
                    this.$store.dispatch('getuserinfo', res.message.id);
                    this.$store.dispatch('changelogin', true);
                    this.ruleForm = {};
                    this.setlogined();
                    this.$notify({
                        title: '登录成功',
                    });
                } else {
                    this.$notify({
                        title: res.message,
                    });
                }
            })
        },
        submitFormtoregis() {
            if (this.ruleForm.email == "") {
                return this.$notify({
                    title: '请输入邮箱',
                    duration: 1000,
                });
            }
            if (this.ruleForm.username == "") {
                return this.$notify({
                    title: '请输入用户名',
                    duration: 1000,
                });
            }
            if (this.ruleForm.pwd == "") {
                return this.$notify({
                    title: '请输入密码',
                    duration: 1000,
                });
            }
            console.log(111);
            let data = this.ruleForm
            register(data).then((res) => {
                if (res.code == 200) {
                    this.$notify({
                        title: res.message,
                    });
                    this.cahangestylerole0();
                } else {
                    this.$notify({
                        title: res.message,
                    });
                }
            })
        },
        logout() {
            this.$confirm('是否退出登录？', '确认信息', {
                distinguishCancelAndClose: true,
                confirmButtonText: '确认',
                cancelButtonText: '取消'
            }).then(() => {
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('userinfo');
                this.$store.dispatch('changelogin', false);
                this.$store.commit('inituserinfo');
                this.$router.replace("/myblog/home").catch(err => err)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消退出'
                })
            });
        }
    }
}
</script>

<style scoped>
* {
    margin: 0px;
    padding: 0px;
}

#Topnav {
    z-index: 1000;
    position: fixed;
    display: flex;
    top: 0px;
    border-radius: 2px;
    height: 50px;
    width: inherit;
    background-color: #f9f9f9;
    box-shadow: 0px 0px 9px #d3d5d8;
}

#navtitle {
    background-image: url(../assets/images/mainpage.png);
    background-repeat: no-repeat;
    background-position: 35px 12px;
    height: 100%;
    cursor: pointer;
    width: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
}

#navtitle:hover {
    background-color: rgba(245, 192, 255, 0.49);
}

#navtitle p {
    font-family: "syht";
    font-size: 18px;
    font-weight: 900;
    color: #797e86;
}

#navsearch {
    margin-left: 20px;
    flex-grow: 1;
    width: 400px;
    height: 100%;
    position: relative;
}

#search {
    display: flex;
    box-shadow: 0 0 6px #efefef;
    overflow: hidden;
    border-radius: 20px;
    width: 200px;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    box-shadow: 1px 1px 1px #d3d5d8;
}

#search>input {
    font-family: "syht";
    padding-left: 15px;
    font-size: 13px;
    color: #797e86;
    width: 155px;
    height: 30px;
    border-radius: 20px 0 0 20px;
    border: none;
    outline-color: aqua;
}

#search>img {
    cursor: pointer;
}

#search>input::-webkit-input-placeholder {
    color: #797e86;
    font-family: "syht";
    font-size: 14px;
}

.popover {
    position: absolute;
    top: 50px;
    box-shadow: 1px 1px 1px #d3d5d8;
}

#showlogin {
    cursor: pointer;
    position: relative;
    height: 50px;
    width: 50px;
    background-image: url(../assets/images/icons8-登录圆角-30.png);
    background-repeat: no-repeat;
    background-position: 10px 10px;
}

#showlogin:hover {
    background-color: rgba(245, 192, 255, 0.49);
}


#login {
    border-radius: 10px;
    position: absolute;
    left: -250px;
    top: 50px;
    width: 300px;
    /* height: 250px; */
    background-color: white;
    box-shadow: 2px 2px 3px #d3d5d8;
}

#loginmain {
    margin: auto;
    width: 90%;
    height: 100%;
}

#userinfo {
    display: flex;
    width: 100%;
    height: 60%;
    margin: 20px auto;
    /* background-color: #797e86; */
    align-items: center;
    justify-content: space-between;
}

#userinfo #avatar {
    margin-left: 10px;
    width: 70px;
    height: 70px;
    /* background-color: rebeccapurple; */
    border-radius: 10px;
    overflow: hidden;
}

#userinfo #avatar img {
    display: block;
    width: 100%;
    height: 100%;
}

#userinfo #name {
    margin: 0 10px 0 10px;
    height: 70px;
    /* background-color: aqua; */
    flex-grow: 1;
    color: #797e86;
    font-size: 20px;
}

#logout {
    width: 100%;
    margin: auto;
    display: flex;
    justify-content: center;
}

#logoutbtn {
    margin: 30px 10px 30px 10px;
    text-align: center;
    line-height: 50px;
    width: 100px;
    height: 50px;
    background-color: red;
    border-radius: 10px;
    color: white;
    box-shadow: 0px 0px 9px #d3d5d8;
}

#logintop {
    width: 100%;
    height: 40px;
    display: flex;
    border-bottom: 1px solid #d3d5d8;
}

#logsel,
#rigesel {
    text-align: center;
    line-height: 40px;
    font-size: 14px;
    width: 70px;
    height: 100%;
}

#loginpage,
#regispage {
    padding-top: 20px;
}

.unactive {
    background-color: none;
    border-bottom: none;
}

.active {
    background-color: rgba(245, 192, 255, 0.49);
    border-bottom: 1px solid blue;
    box-sizing: border-box;
}

/* =====================显示登录框的过渡效果========================== */
.loginfade-enter,
.loginfade-leave-to {
    opacity: 0;
}

.loginfade-enter-active,
.loginfade-leave-active {
    transition: all 1s ease;
}

.loginfade-enter-to,
.loginfade-leave {
    opacity: 1;
}

/* =====================登录注册页面更换的过渡效果==================== */
.fade-enter,
.fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 1s ease;
}

.fade-enter-to,
.fade-leave {
    transform: translateX(0px);
    opacity: 1;
}
</style>