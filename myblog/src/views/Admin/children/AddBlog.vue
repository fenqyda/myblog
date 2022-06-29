<template>
    <div id="addblog">
        <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
            <el-form-item label="博客标题">
                <el-input v-model="sizeForm.title"></el-input>
            </el-form-item>
            <el-form-item label="博客描述">
                <el-input v-model="sizeForm.profile"></el-input>
            </el-form-item>
            <el-form-item label="博客类型">
                <el-select v-model="sizeForm.type" placeholder="请选择博客类型">
                    <el-option label="技术博客" value=2></el-option>
                    <el-option label="编程问题" value=1></el-option>
                    <el-option label="生活分享" value=3></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <mavon-editor v-model="sizeForm.content" />
        <div id="postbtnbox" @click="showvalue">
            <div id="postbtn">上传博客</div>
        </div>
    </div>
</template>

<script>
import { uploadblog } from '../../../api/index'
export default {
    data() {
        return {
            sizeForm: {
                title: "",
                profile: "",
                type: null,
                content: "",
            },
        }
    },
    methods: {
        showvalue() {
            uploadblog(this.sizeForm).then((res) => {
                if (res.code == 200) {
                    this.$notify({
                        title: res.message,
                        duration: 500,
                    });
                    this.sizeForm = {
                        title: "",
                        profile: "",
                        type: null,
                        content: "",
                    }
                }
            })
        }
    }
}
</script>

<style scoped>
#addblog {
    display: flex;
    flex-direction: column;
    margin: 20px 20px 0 20px;
}

#postbtnbox {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
}

#postbtn {
    color: #797e86;
    cursor: pointer;
    box-shadow: 2px 2px 3px #d3d5d8;
    border-radius: 10px;
    text-align: center;
    line-height: 50px;
    background-color: white;
    width: 100px;
    height: 50px;
    margin: 30px 0 30px 0;
}
</style>