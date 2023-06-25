<template>
  <div class="body">
    <div class="from">
      <h2>登录</h2>
      <el-input
        class="input"
        v-model="form.username"
        placeholder="请输入账号"
        clearable
      ></el-input>
      <el-input
        class="input"
        placeholder="请输入密码"
        v-model="form.password"
        show-password
        clearable
      ></el-input>
      <el-button class="button" type="primary" @click="login">登录</el-button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { userLoginReq } from "../../../src/utils/request";
import { successAlert, warningAlert } from "../../utils/alert";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      changeUserInfoAction: "changeUserInfoAction",
    }),
    //登录验证
    loginVerify() {
      /*...*/
      return true;
    },
    login() {
      if (this.loginVerify()) {
        userLoginReq(this.form).then((res) => {
          if (res.data.code == 200) {
            successAlert("登录成功！");
            //将登录信息存储到仓库和本地存储
            console.log(res);
            this.changeUserInfoAction(res.data.list);
            this.$router.push("/");
          } else {
            warningAlert(res.data.msg);
          }
        });
      }
    },
  },
  mounted() {},
};
</script>
<style scoped>
.body {
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to right, #345055, #4b5e94);
    /* background:url("../../assets/NCC.jpg") no-repeat top center/100%; */
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.from {
  width: 400px;
  height: 300px;
  background-color: #fff;
  border-radius: 10px;
  /* position: absolute; */
  /* top: 200px; */
  /* bottom: 0; */
  /* left: 0; */
  /* right: 100px; */
  /* margin: auto; */
  /* width: 40%; */
  padding: 30px;
  margin-left:700px;
  text-align: center;
}

.form h1 {
  font-weight: bold;
}

.from .input {
  margin: 20px 0;
  width: 100%;
}

.from .button {
  width: 100%;
  margin-top: 10px;
}
</style>../../utils/request