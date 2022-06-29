<template>
  <div id="UserRoot">
    <topnav></topnav>
    <asidenav></asidenav>
    <transition name="fade" mode="out-in">
      <router-view class="mainsection"></router-view>
    </transition>
    <BackToTopVue></BackToTopVue>
  </div>
</template>

<script>
import topnav from '../components/TopNav.vue'
import asidenav from '../components/AsideNav.vue'
import BackToTopVue from '../components/BackToTop.vue'
export default {
  components: { topnav, asidenav, BackToTopVue },
  data() {
    return {
      data: ""
    }
  },
}
</script>

<style lang="less">
@import "../assets/fonts/font.css";

* {
  margin: 0px;
  padding: 0px;
}

.mainsection {
  margin-top: 50px;
  padding-left: 220px;
}

#UserRoot {
  font-family: "syht";
  width: 1170px;
  margin: 0 auto;
}

@media only screen and (min-width:768px) {

  #UserRoot,
  #Topnav {
    width: 750px;
  }

  .mainsection {
    width: 530px;
  }
}

@media only screen and (min-width:992px) {

  #UserRoot,
  #Topnav {
    width: 970px;
  }

  .mainsection {
    width: 750px;
  }
}

@media only screen and (min-width:1200px) {

  #UserRoot,
  #Topnav {
    width: 1170px;
  }

  .mainsection {
    width: 950px;
  }
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s ease;
}

.fade-enter-to,
.fade-leave {
    opacity: 1;
}
</style>
