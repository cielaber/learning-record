<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加角色' : '编辑角色'"
      :visible.sync="info.isShow"
      @close="close"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="角色名称">
          <el-input
            v-model="form.rolename"
            placeholder="请输入角色名称"
          ></el-input>
        </el-form-item>
        <!--
            data:要展示的组件
             props：children用来判断是否有下一层的字段，label用来展示在页面中的字段 -->
        <el-form-item label="角色权限">
          <el-tree
            ref="tree"
            :data="menuList"
            show-checkbox
            node-key="id"
            :props="{ children: 'children', label: 'title' }"
          >
          </el-tree>
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
        <el-button v-if="info.isAdd" type="primary" @click="sure()"
          >添 加</el-button
        >
        <el-button v-else @click="update()">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { roleAddReq, roleInfoReq, roleEditReq } from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        rolename: "",
        menus: "[]",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      //   roleList: "role/roleList",
      menuList: "menu/list",
    }),
  },
  methods: {
    ...mapActions({
      reqMenuListAction: "menu/reqListAction",
      reqRoleListAction: "role/reqListAction",
    }),
    // 表单置空
    empty() {
      this.form = {
        rolename: "",
        menus: "[]",
        status: 1,
      };
      this.$refs.tree.setCheckedKeys([]);
    },
    //添加验证
    addVerify() {
      if (!this.form.rolename) {
        warningAlert("请输入角色名称！");
        return false;
      }
      console.log(typeof(this.form.menus));
      if (this.form.menus =="[]") {
        warningAlert("请选择角色权限！");
        return false;
      }
      if (!this.form.status) {
        warningAlert("请选择商品分类状态！");
        return false;
      }
      return true;
    },
    //确定添加
    sure() {
       //树形控件取值
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      if (this.addVerify()) {
        roleAddReq(this.form).then((res) => {
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            //表单消失
            this.info.isShow = false;
            //表单置空
            this.empty();
            this.reqRoleListAction();
          } else {
            warningAlert(res.data.msg);
          }
        });
      }
    },
    // 取消添加
    cancel() {
      this.info.isShow = false;
    },
    //如果是添加按钮打开的表单，就什么都不做，如果是编辑开的表单，就清除form
    close() {
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //点击编辑，查看一条数据
    look(id) {
      roleInfoReq(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          //补id，提交修改请求时需要
          this.form.id = id;
          //修改树型控件的值
          this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus));
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    update() {
        this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      if (this.addVerify()) {
      
        roleEditReq(this.form).then((res) => {
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            this.empty();
            this.info.isShow = false;
            this.reqRoleListAction();
          } else {
            warningAlert(res.data.msg);
          }
        });
      }
    },
  },
  mounted() {
    if (this.menuList.length == 0) {
      this.reqMenuListAction();
    }
  },
};
</script>
<style scoped>
</style>