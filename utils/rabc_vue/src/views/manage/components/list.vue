<template>
  <div>
    <el-table
    class="table"
      :data="list"
      style="width: 100%;"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="用户编号" >
      </el-table-column>
      <el-table-column prop="username" label="用户名">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色" >
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="primary"
            >启用</el-button
          >
          <el-button v-else type="info">禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column class="operation" label="操作" width="180">
        <template slot-scope="scope">
          <el-button class="btn" type="primary" @click="edit(scope.row.uid)"
            >编辑</el-button
          >
          <del-btn @del="del(scope.row.uid)"></del-btn>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination class="pag" background layout="prev, pager, next" :total="total" :page-size="size" @current-change="changePage">
    </el-pagination>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { userDelReq } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "manage/userList",
      total:"manage/total",
      size:"manage/size"
    }),
  },
  methods: {
    ...mapActions({
      reqListAction: "manage/reqListAction",
      reqTotalAction: "manage/reqTotalAction",
      reqPageAction:"manage/reqPageAction"
    }),
    //点击编辑
    edit(id) {
      this.$emit("edit", id);
    },
    //点击删除按钮
    del(id) {
      //确定删除
      userDelReq(id).then((res) => {
        if (res.data.code == 200) {
          //删除成功提示
          successAlert(res.data.msg);
          //重新请求数据
          this.reqTotalAction();
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //页码改变
    changePage(e){
        // console.log(e);
        this.reqPageAction(e);
    }
  },
  mounted() {
    this.reqTotalAction();
    this.reqListAction();
  },
};
</script>
<style scoped>
/* .table{
  margin:0 auto;
}
.pag{
  text-align: center;
} */
</style>