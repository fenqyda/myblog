<template>
  <div id="AdminRoot">
    <AdminNav></AdminNav>
    <div id="AdminRootright">
      <AdminTop></AdminTop>
      <router-view class="adminmainsection"></router-view>
    </div>
  </div>
</template>

<script>
import AdminNav from '../../components/admin/AdminNav.vue'
import AdminTop from '../../components/admin/AdminTop.vue'
export default {
  components: { AdminNav,AdminTop },
  data() {
    return {
      data: ""
    }
  },
}
</script>

<style lang="less">
@import "../../assets/fonts/font.css";

*{
  margin: 0px;
  padding: 0px;
}

// .mainsection{
  
// }

#AdminRoot {
  display: flex;
  font-family: "syht";
  width: 100%;
  height: 100%;
}
#AdminRootright{
  flex-grow: 1;
  margin-left: 210px;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>