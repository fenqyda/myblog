<template>
    <div id="Adminuser">
        <div id="search">
            <el-input size="medium" placeholder="请输入内容" suffix-icon="el-icon-search" v-model="search"
                style="margin-top: 2px">
            </el-input>
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="id" width="180"> </el-table-column>
            <el-table-column prop="email" label="邮箱地址" min-width="280">
            </el-table-column>
            <el-table-column prop="nickname" label="昵称"> </el-table-column>
            <el-table-column prop="state" label="状态"> </el-table-column>
            <el-table-column prop="authority" label="权限"> </el-table-column>
            <el-table-column label="操作" width="200px">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="handledelete(scope.row)">删除</el-button>
                    <el-button type="primary" size="small" @click="showedit(scope.row)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-sizes="[5, 10]" :page-size="pageSize" background
            layout="total, sizes, prev, pager, next, jumper" :total="total" :current-page="pageNum"
            @size-change="handleSizeChange" @current-change="handleCurrentChange">
        </el-pagination>
        <el-drawer title="编辑博客" :visible.sync="drawer" :direction="direction" :before-close="handleClose" size="50%">
            <div id="box" v-if="drawer">
                <el-form ref="form" :model="userform" label-width="80px" size="mini">
                    <el-form-item label="邮箱">
                        <el-input v-model="userform.email"></el-input>
                    </el-form-item>
                    <el-form-item label="昵称">
                        <el-input v-model="userform.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-select v-model="userform.sex" placeholder="请选择性别">
                            <el-option label="男" value=0></el-option>
                            <el-option label="女" value=1></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input v-model="userform.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="签名">
                        <el-input v-model="userform.sign"></el-input>
                    </el-form-item>
                    <el-form-item label="权限">
                        <el-select v-model="userform.authority" placeholder="请选择博客类型">
                            <el-option label="管理员权限" value=0></el-option>
                            <el-option label="用户权限" value=1></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div id="postbtnbox" @click="postuserform">
                    <div id="postbtn">上传</div>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import { getalluserinfo, changeuserinfo, banuserinfo } from '../../../api/index'
export default {
    data() {
        return {
            pageNum: 1,
            total: 0,
            pageSize: 5,
            tableData: [],
            search: "",
            drawer: false,
            direction: 'rtl',
            userform: {}
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
            this.getdata();
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.getdata();
        },
        handleSearch() {
            console.log(this.search);
        },
        async getdata() {
            let params = {
                pageNo: this.pageNum,
                pageSize: this.pageSize
            }
            await getalluserinfo(params).then((res) => {
                this.tableData = res.message.data;
                this.total = res.message.count
            })
        },
        showedit(row) {
            this.userform = row;
            this.drawer = true;
        },
        postuserform() {
            changeuserinfo(this.userform).then((res) => {
                if (res.code == 200) {
                    this.$notify({
                        title: res.message,
                        duration: 500,
                    });
                }
            })
        },
        handledelete(row) {
            this.$confirm('是否封禁该用户？', '确认信息', {
                distinguishCancelAndClose: true,
                confirmButtonText: '确认',
                cancelButtonText: '取消'
            }).then(() => {
                banuserinfo(row).then((res) => {
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

#Adminuser {
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

#postbtnbox {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
}

#postbtn {
    color: white;
    cursor: pointer;
    box-shadow: 2px 2px 3px #d3d5d8;
    border-radius: 10px;
    text-align: center;
    line-height: 50px;
    background-color: red;
    width: 100px;
    height: 50px;
    margin: 30px 0 30px 0;
}
</style>