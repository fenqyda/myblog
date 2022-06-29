<template>
    <div id="footer">
        <div id="left"></div>
        <div id="right">
            <p>Powered by <a href="#">xxx</a></p>
        </div>
    </div>
</template>

<script>

</script>

<style scoped>
#footer{
    justify-content: space-between;
    display: flex;
    width: 100%;
    height: 50px;
    background-color: #f9f9f9;
    align-items: center;
    border-radius: 2px;
    box-shadow: 2px 0 3px #d3d5d8;
    position: relative;
    z-index: 999;
}
#footer #right{
    margin-right: 20px;
}
#footer a,p{
    text-decoration: none;
    color: #797e86;
    font-size: 13px;
    font-weight: 100;
}

</style>