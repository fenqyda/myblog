<template>
    <div id="Adminquestion">
        <div id="search">
            <el-input size="medium" placeholder="请输入内容" suffix-icon="el-icon-search" v-model="search"
                style="margin-top: 2px">
            </el-input>
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="id"> </el-table-column>
            <el-table-column prop="title" label="标题" :show-overflow-tooltip="true"> </el-table-column>
            <el-table-column prop="content" label="内容" min-width="280" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="nickname" label="用户id"> </el-table-column>
            <el-table-column prop="state" label="状态"> </el-table-column>
            <el-table-column prop="decription" label="分类"> </el-table-column>
            <el-table-column label="操作" width="200px">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="handledelete(scope.row);">
                        删除</el-button>
                    <el-button type="primary" size="small" @click="showedit(scope.row)">
                        修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-sizes="[5, 10]" :page-size="pageSize" background
            layout="total, sizes, prev, pager, next, jumper" :total="total" :current-page="pageNum"
            @size-change="handleSizeChange" @current-change="handleCurrentChange">
        </el-pagination>
        <el-drawer title="编辑博客" :visible.sync="drawer" :direction="direction" :before-close="handleClose" size="50%">
            <div id="box" v-if="drawer">
                <editblog :form="this.blogform"></editblog>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import editblog from '../../../components/BlogEdits.vue'
import { getallquestion, getarticletotal, deleteblog } from '../../../api/index'
export default {
    components: { editblog },
    data() {
        return {
            pageNum: 1,
            total: 0,
            pageSize: 5,
            tableData: [],
            search: "",
            drawer: false,
            direction: 'rtl',
            blogform: {}
        }
    },
    created() {
        this.getdata();
    },
    methods: {
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(() => {
                    done();
                })
                .catch(() => { });
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.load();
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.load();
        },
        handleSearch() {
            console.log(this.search);
        },
        async getdata() {
            let params = {
                pageNo: this.pageNum,
                pageSize: this.pageSize
            }
            await getallquestion(params).then((res) => {
                if (res.code == 200) {
                    let temp = {
                        type: 1
                    }
                    getarticletotal(temp).then((rest) => {
                        this.total = rest.message.total;
                    })
                    this.tableData = res.message;
                }
            })
        },
        showedit(row) {
            console.log(row);
            this.blogform = row;
            console.log(this.blogform);
            this.drawer = true;
        },
        handledelete(row) {
            this.$confirm('是否删除当前项？', '确认信息', {
                distinguishCancelAndClose: true,
                confirmButtonText: '确认',
                cancelButtonText: '取消'
            }).then(() => {
                deleteblog(row).then((res) => {
                    if (res.code == 200) {
                        this.getdata();
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除操作'
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

#Adminquestion {
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