<template>
     <div class="login-container">
        <el-form :model="ruleForm2" :rules="rules2"
         status-icon
         ref="ruleForm2" 
         label-position="left" 
         label-width="0px" 
         class="demo-ruleForm login-page">
            <h3 class="title">澎湃投票系统登录</h3>
                <el-form-item prop="username">
                    <el-input type="text" 
                        v-model="ruleForm2.username" 
                        auto-complete="off" 
                        placeholder="用户名"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" 
                        v-model="ruleForm2.password" 
                        auto-complete="off" 
                        placeholder="密码"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="verifyCode">
                    <el-input type="text" 
                        v-model="ruleForm2.verifyCode" 
                        auto-complete="off" 
                        placeholder="验证码"
                        class="verifycode-input"
                    ></el-input>
                    <img class="verifycode" @click='changeVerifyCode' :src="imgSrc"/>
                </el-form-item>
            <el-checkbox 
                v-model="checked"
                class="rememberme"
            >记住密码</el-checkbox>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="logining">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
 
<script>
import { apiUrl } from '../config'
export default {
     data(){
        return {
            verifycodeVersion: 0 ,
            logining: false,
            ruleForm2: {
                username: 'admin',
                password: '123456',
                verifyCode: ''
            },
            rules2: {
                username: [{required: true, message: '请输入账号', trigger: 'blur'}],
                password: [{required: true, message: '请输入密码', trigger: 'blur'}],
                verifyCode: [{required: true, message: '请输入验证码', trigger: 'blur'}]
            },
            checked: false
        }
    },
    methods: {
        changeVerifyCode () {
            this.verifycodeVersion++
        },
        handleSubmit(){
            this.$refs.ruleForm2.validate((valid) => {
                if(valid){
                    this.logining = true;
                    this.axios({
                        url:'admin/login',
                        method:'post',
                        data: {
                            username: this.ruleForm2.username,
                            password: this.ruleForm2.password,
                            verifyCode: this.ruleForm2.verifyCode
                        }
                    })
                    .then(res => {
                        if (res.data.success) {
                            this.logining = false;
                            sessionStorage.setItem('user', this.ruleForm2.username);
                            this.$router.push({path: '/home'});
                        } else {
                            this.logining = false;
                            this.$alert(res.data.msg, '提示', {
                                confirmButtonText: 'ok'
                            })
                        }
                    })
                }else{
                    return false;
                }
            })
        }
    },
    computed: {
        imgSrc() {
            return apiUrl+"verifyCode/captcha?v="+this.verifycodeVersion
        }
    },
}
</script>
 
<style scoped>
.verifycode{
    cursor: pointer;
    position: absolute;
    right:0;
    top: 0;
    width: 100px;
    height: 40px;
}
.verifycode-input{
    padding-right:120px;
}
.login-container {
    width: 100%;
    height: 100%;
    background: #4373a5;
 
    /* 登录框上下对齐 */
    display: flex;
    align-items: center;
}
.title {
    text-align:center;
    margin-bottom: 10px;
}
.login-page {
    border-radius: 5px;
    margin:0px auto;
    width: 350px;
    padding: 20px 15px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
}


</style>