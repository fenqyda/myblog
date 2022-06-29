<template>
    <div id="admintop">
        <div id="top">
            <div id="top-left">
                <div class="el-icon-switch-button" @click="logout"></div>
            </div>
            <div id="top-right">
                <transition name="search" mode="out-in">
                    <div id="top-right-icon" class="el-icon-search" @click="showsearch = !showsearch" v-if="!showsearch"
                        :key="0">
                    </div>
                    <div id="top-right-box" v-else>
                        <div id="top-right-icon" class="el-icon-search" @click="showsearch = !showsearch" :key="1">
                        </div>
                        <div id="top-right-search">
                            <input v-model="search" type="text" placeholder="全局搜索" @keyup.enter="handleSearch"
                                slot="reference" />
                        </div>
                    </div>
                </transition>
            </div>
        </div>
        <div id="bottom"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: true,
            showsearch: false,
            search: ''
        }
    },
    methods: {
        handleSearch() {
            console.log(111);
        },
        logout() {
            this.$confirm('是否返回前台页面，并退出登录？', '确认信息', {
                distinguishCancelAndClose: true,
                confirmButtonText: '确认',
                cancelButtonText: '取消'
            }).then(() => {
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('userinfo');
                this.$router.replace("/myblog/home").catch(err => err)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '停留在当前页面'
                })
            });
        }
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

#admintop {
    width: 100%;
    height: 80px;
    overflow: hidden;
    background-color: white;
    border-bottom: 1px solid aqua;
    box-sizing: border-box;
}

#admintop p {
    font-weight: lighter;
    font-size: 15px;
    font-family: "syht";
    color: #c1cad8;
}

#adminpnav ul {
    list-style: none;
    width: 100%;
}

#admintop #top {
    padding: 0 20px 0 20px;
    height: 55px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 25px;
    box-shadow: 1px 1px 1px #d3d5d8;

}

#top-left {
    width: 30px;
    cursor: pointer;
}

#top-right {
    display: flex;
    align-items: center;
    height: 36px;
}

#top-right-icon {
    cursor: pointer;
}

#top-right-box {
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
}

#top-right-search {
    width: 250px;
    position: relative;
    flex-grow: 1;
    height: 100%;
    margin-left: 10px;
    border-bottom: 1px solid #545c64;
}

#top-right-search>input {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    height: 30px;
    color: #797e86;
    font-size: 13px;
    border: none;
    outline: none;
}

.search-enter,
.search-leave-to {
    left: 260px;
}

.search-enter-active,
.search-leave-active {
    transition: all 0.5s ease;
}

.search-enter-to,
.search-leave {
    left: 0px;
}
</style>