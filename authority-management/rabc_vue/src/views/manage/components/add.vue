<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '用户添加' : '用户编辑'"
      :visible.sync="info.isShow"
      @close="close()"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="所属角色">
          <el-select v-model="form.roleid" placeholder="请选择所属角色">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="sure()" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button v-else type="primary" @click="update()">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { indexRoutes } from "../../../router/index";
import { userAddReq, userUpdateReq, userInfoReq } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";

export default {
  props: ["info"],
  data() {
    return {
      //初始化表单数据
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      //菜单图标
      icons: [
        "el-icon-s-goods",
        "el-icon-s-help",
        "el-icon-s-marketing",
        "el-icon-setting",
      ],
      //菜单地址
      indexRoutes,
    };
  },
  computed: {
    ...mapGetters({
      list: "role/roleList",
    }),
  },
  methods: {
    ...mapActions({
      reqListAction: "manage/reqListAction",
      reqRoleAction: "role/reqListAction",
      reqTotalAction: "manage/reqTotalAction",
    }),
    //重置数据
    empty() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    //如果是添加按钮打开的表单，就什么都不做，如果是编辑开的表单，就清除form
    close() {
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //点击取消
    cancel() {
      //表单消失
      this.info.isShow = false;
    },
    //添加验证
    addVerify() {
      if (!this.form.roleid) {
        warningAlert("请选择所属角色！");
        return false;
      }
      if (!this.form.username) {
        warningAlert("请输入管理员名称！");
        return false;
      }
      if (!this.form.password) {
        warningAlert("请输入管理员密码！");
        return false;
      }
      if (!this.form.status) {
        warningAlert("请选择管理员状态！");
        return false;
      }
      return true;
    },
    //点击确定
    sure() {
      if (this.addVerify()) {
        //发起请求
        userAddReq(this.form).then((res) => {
          if (res.data.code == 200) {
            //成功弹窗
            successAlert(res.data.msg);
            //数据重置
            this.empty();
            //表单消失
            this.info.isShow = false;
            //列表数据要刷新
            this.reqTotalAction();
            this.reqListAction();
          } else {
            warningAlert(res.data.msg);
          }
        });
      }
    },
    //点击编辑时出现的表单,根据id请求数据
    look(id) {
      userInfoReq(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          //密码置空不显示
          this.form.password = "";
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //点击修改,与确定添加的步骤相同
    update() {
      if (this.addVerify()) {
        userUpdateReq(this.form).then((res) => {
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            this.empty();
            this.info.isShow = false;
            //重新请求数据
            this.reqTotalAction();
            this.reqListAction();
          } else {
            warningAlert(res.data.msg);
          }
        });
      }
    },
  },
  mounted() {
    //如果没有请求过角色管理的数据，就请求一次，如果请求过，就不用请求了
    if (this.list.length == 0) {
      this.reqRoleAction();
    }
  },
};
</script>
<style scoped>
</style>