<template>
    <div id="section">
        <div id="img">
            <img :src="articdata.src" alt="">
        </div>
        <div id="article">
            <div id="content">
                <div id="top">
                    <h1>{{ articdata.title }}</h1>
                    <p>{{ articdata.decription }}</p>
                </div>
                <div id="bottom">
                    <div id="user">用户:{{ articdata.nickname }}</div>
                    <div id="time">上传时间:{{ articdata.creatime }}</div>
                    <div id="comments">现有{{ articdata.comments }}条评论</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["data","index"],
    data() {
        return {
            articdata: {}
        }
    },
    mounted() {
        this.articdata = this.data;
        this.articdata.creatime = this.articdata.creatime.replace(/T[0-9:.]+Z/g," ")
        this.articdata.src = require("../assets/images/articleimg/s"+ this.index +".png")
    },
    methods:{
        
    }
}
</script>

<style scoped>
#section {
    margin-top: 15px;
    display: flex;
    width: 100%;
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    transition: all 1s ease;
    cursor: pointer;
}

#section #img {
    width: 35%;
    border-radius: 10px 0 0 10px;
    overflow: hidden;
    transition: all 1s ease;
}

#section #img img {
    display: block;
    width: 100%;
    height: 100%;
}

#section #img:hover {
    transform: scale(1.1);
    transition: all 0.5s ease;
}

#section:hover {
    transform: scaleX(1.03) scaleY(1.1);
    transition: all 0.5s ease;
}
#article{
    max-width: 70%;
}

#content {
    height: 100%;
    padding: 0 20px 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

#article #top {
    padding-top: 20px;
    flex-grow: 1;
    border-bottom: 1px solid #f9f9f9;
    height: 100%;
    display: flex;
    flex-direction: column;
}

#article #top h1 {
    word-wrap: break-word;
    color: #797e86;
    font-size: 20px;
    margin-bottom: 10px;
}

#article #top p {
    color: #8c939d;
    font-size: 13px;
}

#article #bottom {
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: left;
    height: 35px;
    color: #8c939d;
}

#article #bottom>div {
    margin-left: 10px;
}

#article #bottom #user {
    margin-left: 0px;
}

@media only screen and (max-width:768px) {
    #section #img {
        width: 30%;
    }
}

@media only screen and (min-width:768px) {
    #section #img {
        width: 30%;
    }
}

@media only screen and (min-width:992px) {
    #section #img {
        width: 30%;
    }
}

@media only screen and (min-width:1200px) {
    #section #img {
        width: 35%;
    }
}
</style>