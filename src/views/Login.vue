<template>
  <el-form :model="form"  ref="form" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">PICC肇庆提数系统</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="form.gh" auto-complete="off" placeholder="工号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="form.password" auto-complete="off" placeholder="密码"  @keyup.enter.native="onSubmit"></el-input>
    </el-form-item>
    <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="onSubmit" :loading="logining">登录</el-button>

    </el-form-item>
  </el-form>
</template>

<script>
import { Message } from 'element-ui';

  export default {
    data() {
      return {
        logining: false,
        form: {
          gh: '',
          password: ''
        },
        checked: true
      };
    },
    methods: {
      onSubmit() {
        if(this.checkgh() && this.checkpassword()){
          const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        // http://56.145.32.54:8081
        // http://56.145.32.63:8080
          // this.$http.post('http://56.145.32.63:8080/login/check',this.form,{ emulateJSON: true }).then(
          this.$http.post('http://56.145.32.32:8082/login/check',this.form,{ emulateJSON: true }).then(
              response =>{
                  this.code = response.data.code;
                  this.name = response.data.data;
                  this.depflag = response.data.data2;


                  if(this.code==0){
                    loading.close();
                    
                    this.$message.error({
                      message: '登陆失败！工号或者密码有误！',
                    });
                    return false;
                  } 
                  else if(this.code==1){
                    loading.close();
                      this.$message.success({
                      message: '登陆成功',
                    });                    
                    let pare = {
                      depflag: this.depflag,
                      name : this.name,
                      gh : this.form.gh,
                    }

                    this.$store.commit('login',pare);
                    this.$router.push({name: 'home'})
                  }else{
                    loading.close();
                      this.$message.error({
                      message: '系统错误！请稍后再试！',
                    });
                  }

              }
          )
        }          
      },
      checkgh(){
        if(this.form.gh.length<8){
          this.$message.error({
          message: '工号格式有误!工号为8位！',
                    });
          return false;
        }else{
          return true;
        }
      },
      checkpassword(){
        if(this.form.password.length<6){
          this.$message.error({
          message: '密码格式有误，不能小于6位!',
                    });          

          return false;
        }else{
          return true;
        }
      }
    }
  }

</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>