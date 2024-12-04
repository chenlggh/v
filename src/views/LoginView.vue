<script>
import axios from "axios";
import router from "@/router";

export default {
    name: "LoginView",
    data() {
        return {
            input1: "",
            input2: "",
            username: "",
            password: "",
            radio: '1',
            dialogFormVisible: false,
            formLabelWidth: '120px',
            form: {
                name: '',
                region: ''
            }
        }
    },
    methods: {
        login(username, password) {
            const params = {
                username: username,
                password: password
            }
            axios.post(`http://localhost:8080/login`, params).then(response => {
                if (response.data.msg == "success") {
                    alert("登录成功");
                    router.push("/book");
                } else {
                    alert("登录失败，请检查账号或密码");
                }
            }).catch(error => {
                console.log(error);
            });
        }
    }
}
</script>

<template>
    <body>
    <div class="box">
        <div id="box1">欢迎使用</div>
        <div id="box2">
            <el-input v-model="username" placeholder="请输入您的账号" prefix-icon="el-icon-user"></el-input>
        </div>
        <div id="box3">
            <el-input v-model="password" placeholder="请输入您的密码" prefix-icon="el-icon-lock"></el-input>
        </div>
        <div id="box4">
            <el-radio v-model="radio" label="1"><span style="font-family: '思源黑体';
             font-size: 14px; color: black;">我已阅读并同意《用户协议》</span></el-radio>
        </div>
        <div id="box5">
            <el-button type="primary" style="width: 320px; height: 40px;" @click="login(username,password)">登录
            </el-button>
        </div>
        <span style="position: absolute; top: 344px; left: 296px; color: #2678FF; font-size: 16px;
            text-decoration-line: none" @click="dialogFormVisible = true">
                <router-link to="/register">注册</router-link>
            </span>
        <span style="position: absolute; top: 344px; left: 40px; color: gray; font-size: 16px;">忘记密码</span>
    </div>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="活动名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="活动区域" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
    </el-dialog>
    </body>

</template>

<style scoped>
#box5 {
    width: 320px;
    height: 40px;
    position: absolute;
    top: 296px;
    left: 40px;
}

#box4 {
    width: 320px;
    height: 36px;
    position: absolute;
    top: 252px;
    left: 40px;
}

#box3 {
    width: 320px;
    height: 40px;
    position: absolute;
    top: 170px;
    left: 40px;
}

#box2 {
    width: 320px;
    height: 40px;
    position: absolute;
    top: 112px;
    left: 40px;
}

* {
    margin: 0;
    padding: 0;
    font-family: "思源黑体";
}

body {
    height: 1000px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #E0E0E0;
}

.box {
    background-color: #FFFFFF;
    border-radius: 5px;
    width: 400px;
    height: 408px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    position: relative;
}

#box1 {
    font-size: 24px;
    font-family: "思源黑体";
    width: 320px;
    height: 32px;
    position: absolute;
    top: 40px;
    left: 40px;
    display: inline-block;
    vertical-align: top;
}
</style>/