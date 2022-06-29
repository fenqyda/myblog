<template>
    <div id="Admincomment">
        <div id="search">
            <el-input size="medium" placeholder="请输入内容" suffix-icon="el-icon-search" v-model="search"
                style="margin-top: 2px">
            </el-input>
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="id" width="180"> </el-table-column>
            <el-table-column prop="content" label="内容" width="180">
            </el-table-column>
            <el-table-column prop="userid" label="用户id"> </el-table-column>
            <el-table-column prop="blogid" label="博客id"> </el-table-column>
            <el-table-column prop="state" label="状态"> </el-table-column>
            <el-table-column prop="likes" label="点赞数"> </el-table-column>
            <el-table-column label="操作" width="200px">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="handledelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-sizes="[5, 10]" :page-size="pageSize" background
            layout="total, sizes, prev, pager, next, jumper" :total="total" :current-page="pageNum"
            @size-change="handleSizeChange" @current-change="handleCurrentChange">
        </el-pagination>
    </div>
</template>

<script>
import {getallcomments,deletecomment} from '../../../api/index'
export default {
    data() {
        return {
            pageNum: 1,
            total: 0,
            pageSize: 5,
            tableData: [],
            search: "",
        }
    },
    created() {
        this.getdata();
    },
    methods: {
        load() {

        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getdata();
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.getdata();
        },
        handleSearch() {
            console.log(this.search);
        },
        async getdata(){
            let params = {
                pageNo: this.pageNum,
                pageSize: this.pageSize
            }
            await getallcomments(params).then((res)=>{
                console.log(res);
                this.tableData = res.message.data;
                this.total = res.message.count
            })
        },
        handledelete(row){
            console.log(row);
            this.$confirm('是否删除该评论？', '确认信息', {
                distinguishCancelAndClose: true,
                confirmButtonText: '确认',
                cancelButtonText: '取消'
            }).then(() => {
                deletecomment(row).then((res) => {
                    if (res.code == 200) {
                        this.getdata();
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                })
            });
        }
    },
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

#Admincomment {
    margin: 10px 10px 0 10px;
    padding: 5px 5px 10px 5px;
}

#search {
    display: flex;
    /* justify-content: space-between; */
    align-content: center;
    width: 300px;
}

#search .el-button {
    margin-left: 10px;
}
</style>