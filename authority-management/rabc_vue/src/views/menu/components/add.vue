<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加菜单' : '编辑菜单'"
      :visible.sync="info.isShow"
      @close="close()"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input
            v-model="form.title"
            placeholder="请输入菜单名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select
            v-model="form.pid"
            @change="changePid()"
            placeholder="请选择上级菜单"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item label="菜单图标" v-if="form.type == 1">
          <el-select v-model="form.icon" placeholder="请选择目录图标">
            <el-option v-for="item in icons" :value="item" :key="item">
              <Icon :type="item"></Icon>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" v-else>
          <el-select v-model="form.url" placeholder="请选择菜单地址">
            <el-option
              v-for="item in indexRoutes"
              :key="item.name"
              :label="item.name"
              :value="'/' + item.path"
            >
            </el-option>
          </el-select>
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
import { menuAddReq, menuUpdateReq, menuInfoReq } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";

export default {
  props: ["info"],
  data() {
    return {
      //初始化表单数据
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        //1为启用，2为禁用
        status: 1,
      },
      //菜单图标
      icons: [
        "ios-apps",
        "md-apps",
        "ios-clipboard",
        "md-clipboard",
        "ios-create",
        "md-create",
        "ios-crop",
        "md-crop",
        "ios-menu",
        "md-menu",
        "ios-options",
        "md-options",
        "ios-paper",
        "md-paper",
      ],
      //菜单地址
      indexRoutes,
    };
  },
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  methods: {
    ...mapActions({
      reqListAction: "menu/reqListAction",
    }),
    //重置数据
    empty() {
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    //如果是添加按钮打开的表单，就什么都不做，如果是编辑开的表单，就清除form
    close() {
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //上级菜单变，菜单类型跟着变
    changePid() {
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    //点击取消
    cancel() {
      //表单消失
      this.info.isShow = false;
    },
    //添加验证
    addVerify() {
      if (!this.form.title) {
        warningAlert("请输入菜单名称！");
        return false;
      }
      if (this.form.pid == 0) {
        if (!this.form.icon) {
          warningAlert("请选择目录图标！");
          return false;
        }
      } else {
        if (!this.form.url) {
          warningAlert("请选择菜单上级地址！");
          return false;
        }
      }
      if (!this.form.status) {
        warningAlert("请选择商品分类状态！");
        return false;
      }
      return true;
    },
    //点击确定
    sure() {
      if (this.addVerify()) {
        //发起请求
        menuAddReq(this.form).then((res) => {
          if (res.data.code == 200) {
            //成功弹窗
            successAlert(res.data.msg);
            //数据重置
            this.empty();
            //表单消失
            this.info.isShow = false;
            //列表数据要刷新
            this.reqListAction();
          } else {
            warningAlert(res.data.msg);
          }
        });
      }
    },
    //点击编辑时出现的表单,根据id请求数据
    look(id) {
      console.log(id);
      menuInfoReq(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //点击修改,与确定添加的步骤相同
    update() {
      if (this.addVerify()) {
        menuUpdateReq(this.form).then((res) => {
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            this.empty();
            this.info.isShow = false;
            this.reqListAction();
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
</style>