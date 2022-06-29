<template>
  <div id="mlogin">
    <div id="login-container">
      <div class="container">
        <div class="container-signup" :class="{ noactive: !noactived }">
          <transition name="loginorregis" mode="out-in">
            <form class="form" id="form1" v-if="showMode">
              <h2 class="form__title">注 册</h2>
              <input type="text" placeholder="用户名" class="input" v-model="username" />
              <input type="email" placeholder="Email" class="input" v-model="email" />
              <div class="password">
                <div id="pwdinput">
                  <input :type="pwdMode ? 'password' : 'text'" placeholder="密码" class="input" v-model="pwd" />
                  <input :type="pwdMode ? 'password' : 'text'" placeholder="再次输入密码" class="input" v-model="secpwd" />
                </div>
                <div id="pwdshow">
                  <img v-show="pwdMode" @click.prevent="dealPwdMode(false)"
                    src="../../assets/images/adminlogin/hide_pwd.png" alt="" width="20" />
                  <img v-show="!pwdMode" @click.prevent="dealPwdMode(true)"
                    src="../../assets/images/adminlogin/show_pwd.png" alt="" width="20" />
                </div>
              </div>
              <button class="btn">注 册</button>
            </form>
            <button class="btn" id="signUp" v-else @click="changeshowMode">注 册</button>
          </transition>
        </div>



        <div class="container-signin" :class="{ noactive: noactived }">
          <transition name="loginorregis" mode="out-in">
            <form class="form" id="form2" v-if="!showMode">
              <h2 class="form__title">登 录</h2>
              <input type="email" placeholder="Email" class="input" v-model="email" />
              <div class="password">
                <div id="pwdinput">
                  <input :type="pwdMode ? 'password' : 'text'" placeholder="密码" class="input" v-model="pwd" />
                </div>
                <div id="pwdshow">
                  <img v-show="pwdMode" @click.prevent="dealPwdMode(false)"
                    src="../../assets/images/adminlogin/hide_pwd.png" alt="" width="20" />
                  <img v-show="!pwdMode" @click.prevent="dealPwdMode(true)"
                    src="../../assets/images/adminlogin/show_pwd.png" alt="" width="20" />
                </div>
              </div>
              <a href="#" class="link">忘记密码?</a>
              <button class="btn" @click="login">登 录</button>
            </form>
            <button class="btn" id="signIn" v-else @click="changeshowMode">登 录</button>
          </transition>
        </div>

      </div>
      <!-- <transition name="loginorregis">
        <button class="btn" id="signIn" v-if="showMode" @click="changeshowMode">登 录</button>
        <button class="btn" id="signUp" v-else @click="changeshowMode">注 册</button>
      </transition> -->
    </div>
  </div>
</template>

<script>
import { adminlogin,getuserinfo } from '../../api/index'
export default {
  data() {
    return {
      showMode: true, // 登录方式, true 验证码登录 false 账号登录
      noactived: true,
      pwdMode: true, // 密码的显示方式 true 密文 false 明文
      pwd: "", // 密码
      secpwd: "", //验证密码
      username: "", // 用户名
      email: "",
    }
  },
  methods: {
    changeshowMode() {
      this.showMode = !this.showMode;
      this.noactived = !this.noactived;
    },
    dealPwdMode(i) {
      this.pwdMode = i;
    },
    async login() {
      let data = {
        email: this.email,
        pwd: this.pwd
      }
      await adminlogin(data).then((res) => {
        if (res.success_code == 200) {
          sessionStorage.setItem('token', res.message.token);
          if (res.message.id != JSON.parse(sessionStorage.getItem('userinfo')).id) {
            sessionStorage.removeItem('userinfo')
          }
          getuserinfo({id:res.message.id}).then((res)=>{
            sessionStorage.setItem('userinfo',JSON.stringify(res.message[0]))
          })
          this.$notify({
            title: '登录成功',
            duration:500,
            message:'将在本弹窗关闭后跳转到后台主页',
            onClose: ()=>{
              this.$router.replace("/AdminRoot/AdminBlogs")
            }
          });
        }else{
          this.$notify({
            title: res.message,
            duration:500,
          });
        }
      })
    }
  }
}
</script>

<style scoped>
#mlogin {
  width: 100%;
  height: 100vh;
  background-image: url(../../assets/images/adminlogin/logo-bg.jpg);
  background-size: cover;
  position: relative;
}

#login-container {
  border: none;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 5px rgb(80, 71, 71);
  border-radius: 10px;
  width: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
}

.input {
  padding-left: 20px;
  border-radius: 20px;
  width: 100%;
  height: 30px;
  margin-top: 10px;
  border: none;
  outline-color: aqua;
  box-shadow: 1px 1px 1px #d3d5d8;
}

.container {
  display: flex;
  justify-content: space-around;
}

.container-signup,
.container-signin {
  width: 50%;
  padding: 30px 10px 30px 10px;
  background-color: #efefef;
}

.form {
  margin: auto;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form__title {
  color: #797e86;
  font-size: 20px;
  font-weight: 100;
}

.btn {
  width: 100px;
  height: 30px;
  background-color: #7593af;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 0px 6px #d3d5d8;
  color: #f9f9f9;
  font-weight: bold;
  margin-top: 20px;
  cursor: pointer;
}

#signIn,
#signUp {
  margin: 0;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}

#signUp {
  left: 100px;
}

#signIn {
  left: 400px;
}

.container .noactive {
  background-color: rgba(255, 255, 255, 0);
}

.password {
  width: calc(100% + 20px);
  display: flex;
  position: relative;
}

#pwdinput {
  width: 80%;
}

#pwdshow {
  padding-top: 15px;
  margin-left: 25px;
}

.link {
  text-decoration: none;
  color: #7593af;
  margin-top: 60px;
}

.container__overlay {
  position: absolute;
}

.loginorregis-enter,
.loginorregis-leave-to {
  opacity: 0;
}

.loginorregis-enter-active,
.loginorregis-leave-active {
  transition: all 0.25s ease;
}

.loginorregis-enter-to,
.loginorregis-leave {
  opacity: 1;
}
</style>