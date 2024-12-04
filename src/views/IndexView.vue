<script>
import axios from "axios";


export default {
    name: "IndexView",
    data() {
        return {
            tableData: [],
            dialogFormVisible1: false,
            dialogFormVisible2: false,
            form: {
                bookName: "",
                bookType: "",
                author: "",
                publisher: "",
                price: "",
                bookId: ""
            },
            formLabelWidth: '120px',
            currentPage: 1,
            pageSize: 5,
            count: 0
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        formatDate(dateString) {
            const options = {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            };
            return new Date(dateString).toLocaleString('zh-CN', options);
        },
        deleteBook(id) {
            axios.delete(`http://localhost:8080/books/${id}`).then(response => {
                if (response.status === 200) {
                    alert("删除成功");
                    this.fetchData();
                }
            }).catch(error => {
                alert("删除失败");
                console.log(error);
            })
        }
        ,
        addBook(bookName, bookType, author, publisher, price) {
            const data = {
                bookName: bookName,
                bookType: bookType,
                author: author,
                publisher: publisher,
                price: price,
            };
            axios.post(`http://localhost:8080/books`, data).then(response => {
                if (response.status === 200) {
                    alert("新增成功");
                    this.dialogFormVisible1 = false;
                    this.form.bookName = "";
                    this.form.bookType = "";
                    this.form.author = "";
                    this.form.publisher = "";
                    this.form.price = "";
                    this.fetchData();
                }
            }).catch(error => {
                alert("新增失败");
                console.log(error);
            });
        }
        ,
        updateBook(bookName, bookType, author, publisher, price, bookId) {
            const data = {
                bookName: bookName,
                bookType: bookType,
                author: author,
                publisher: publisher,
                price: price,
                bookId: bookId
            }
            axios.put(`http://localhost:8080/books`, data).then(response => {
                if (response.status === 200) {
                    alert("修改成功");
                    this.form.bookName = "";
                    this.form.bookType = "";
                    this.form.author = "";
                    this.form.publisher = "";
                    this.form.price = "";
                    this.dialogFormVisible2 = false;
                    this.fetchData()
                }
            }).catch(error => {
                alert("修改失败");
                console.log(error);
            })
        }
        ,
        getByBookId(bookId) {
            axios.get(`http://localhost:8080/books/${bookId}`).then(response => {
                if (response.status === 200) {
                    this.form.bookName = response.data.data.bookName;
                    this.form.bookType = response.data.data.bookType;
                    this.form.author = response.data.data.author;
                    this.form.publisher = response.data.data.publisher;
                    this.form.price = response.data.data.price;
                }
            }).catch(error => {
                alert("获取失败");
                console.log(error);
            });
        },
        fetchData() {
            axios.get('http://localhost:8080/books', {
                params: {
                    page: this.currentPage,
                    pageSize: this.pageSize
                }
            }).then(response => {
                this.tableData = response.data.data.rows;
                this.count = response.data.data.count;
            }).catch(error => {
                alert("获取失败");
                console.error(error);
            });
        }
        ,
        handleCurrentChange(page) {
            this.currentPage = page;
            this.fetchData(); // 每次页面变化时获取新的数据
        }
    },
    mounted() {
        this.fetchData();
    }
}
</script>

<template>
    <el-container>
        <el-header style="font-size: 40px; background-color: rgb(238, 241, 246)">
            <div>图书管理系统</div>
        </el-header>
        <el-container>
            <el-aside width="200px" style="background-color: #545c64; height: 880px;">
                <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>图书管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1">选项1</el-menu-item>
                            <el-menu-item index="1-2">选项2</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">导航二</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航三</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <el-button type="primary" style="margin-bottom: 20px; float: left"
                           @click="dialogFormVisible1 = true">新增+
                </el-button>
                <br>
                <el-table
                    :data="tableData" border>
                    <el-table-column prop="bookId" label="编号" width="180" align="center"></el-table-column>
                    <el-table-column prop="bookName" label="书名" width="180" align="center"></el-table-column>
                    <el-table-column prop="bookType" label="类型" width="180" align="center"></el-table-column>
                    <el-table-column prop="author" label="作者" width="180" align="center"></el-table-column>
                    <el-table-column prop="publisher" label="出版社" width="180" align="center"></el-table-column>
                    <el-table-column prop="price" label="价格(元)" width="180" align="center"></el-table-column>
                    <el-table-column label="操作" width="300" align="center">
                        <template slot-scope="scope">
                            <el-button @click="deleteBook(scope.row.bookId)" type="text" size="medium">删除</el-button>
                            <el-button type="text" size="medium" @click="dialogFormVisible2 = true;
                            getByBookId(scope.row.bookId);form.bookId = scope.row.bookId;">编辑
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="operatingTime" label="操作时间" width="180" align="center">
                        <template slot-scope="scope">
                            {{ formatDate(scope.row.operatingTime) }}
                        </template>
                    </el-table-column>
                </el-table>
                <br><br>
                <div style="width: 600px;">
                    <el-pagination background layout="total, prev, pager, next, jumper" :total="count"
                                   :current-page="currentPage" :page-size="pageSize"
                                   @current-change="handleCurrentChange"></el-pagination>
                </div>

                <el-dialog title="新增图书" :visible.sync="dialogFormVisible1">
                    <el-form :model="form">
                        <el-form-item label="书本名称" :label-width="formLabelWidth">
                            <el-input v-model="form.bookName" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="书本类型" :label-width="formLabelWidth">
                            <el-input v-model="form.bookType" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="作者" :label-width="formLabelWidth">
                            <el-input v-model="form.author" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="出版社" :label-width="formLabelWidth">
                            <el-input v-model="form.publisher" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="价格(元)" :label-width="formLabelWidth">
                            <el-input v-model="form.price" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                        <el-button type="primary" @click="dialogFormVisible1 = false;
                            addBook(form.bookName, form.bookType, form.author, form.publisher, form.price)">确 定
                        </el-button>
                    </div>
                </el-dialog>

                <el-dialog title="编辑图书" :visible.sync="dialogFormVisible2">
                    <el-form :model="form">
                        <el-form-item label="书本名称" :label-width="formLabelWidth">
                            <el-input v-model="form.bookName" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="书本类型" :label-width="formLabelWidth">
                            <el-input v-model="form.bookType" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="作者" :label-width="formLabelWidth">
                            <el-input v-model="form.author" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="出版社" :label-width="formLabelWidth">
                            <el-input v-model="form.publisher" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="价格(元)" :label-width="formLabelWidth">
                            <el-input v-model="form.price" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                        <el-button type="primary" @click="dialogFormVisible2 = false;
                            updateBook(form.bookName, form.bookType, form.author, form.publisher, form.price, form.bookId)">
                            确 定
                        </el-button>
                    </div>
                </el-dialog>
            </el-main>
        </el-container>
    </el-container>
</template>

<style scoped>

</style>