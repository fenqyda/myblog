<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

</script>

<style lang="less">
html {
  background-color: #efefef;
}
#content{
  overflow-y: overlay;
}
::-webkit-scrollbar{
  width: 5px;
}
::-webkit-scrollbar-thumb{
  width: 5px;
  background-color:#797e86;
  border-radius: 5px 5px 5px 5px;
  opacity: 0.6;
}
</style>
