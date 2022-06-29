<template>
    <div id="acimg" ref="element">
        <el-carousel :height="heigth" :interval="4000" arrow="hover" :loop="true">
            <el-carousel-item v-for="(item,index) in imgsrc" :key="index">
            <figure>
                <img :src="item.src" alt="">
            </figure>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
    data() {
        return {
            imgsrc:[
                {name:1,src:require("../assets/images/pic.jpg")},
                {name:2,src:require("../assets/images/pic.jpg")},
                {name:3,src:require("../assets/images/pic.jpg")},
                {name:4,src:require("../assets/images/pic.jpg")},
            ],
            acimgw:0,
            heigth:"0",
            resizeflag:false,
        }
    },
    mounted(){
        window.onresize = () => {
            if (!this.resizeflag) {
                this.resizeflag = true
                setTimeout(() => {
                    this.getWidth()
                    this.resizeflag = false
                }, 100)
            }
        }
        this.acimgw = this.$refs.element.offsetWidth;
        this.heigth = this.acimgw/2 + "px";
    },
    watch: {
        acimgw(val) {
            this.heigth = val/2 + "px";
        }
    },
    beforeDestory() {
        window.onresize = null;
    },
    methods:{
        getWidth() {
            this.acimgw = this.$refs.element.offsetWidth;
        },
    }
}
</script>

<style scoped>
#acimg {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: auto;
    border-radius: 10px;
}

#acimg img {
     width: 100%;
    height: 100%;
    display: block;
}

</style>