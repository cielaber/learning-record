<template>
  <el-table
    :data="roleList"
    style="width: 100%"
    border
    :default-sort="{ prop: '', order: 'descending' }"
  >
    <el-table-column prop="id" label="角色编号" sortable width="180">
    </el-table-column>
    <el-table-column prop="rolename" label="角色姓名" sortable width="180">
    </el-table-column>
    <el-table-column label="状态">
      <template slot-scope="scope">
        <el-button v-if="scope.row.status ==1" type="primary">启用</el-button>
        <el-button v-else type="info">禁用</el-button>
      </template>
    </el-table-column>
    <el-table-column label="操作"  width="180">
      <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
        <del-btn @del="del(scope.row.id)"></del-btn>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { roleDelReq } from '../../../utils/request';
import {warningAlert,successAlert} from "../../../utils/alert"
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      roleList:"role/roleList"
    }),
  },
  methods: {
    ...mapActions({
      reqListAction:"role/reqListAction"
    }),
    //点击编辑
    edit(id){
      this.$emit("edit",id)
    },
    //删除
    del(id){
      roleDelReq(id).then((res)=>{
        if(res.data.code == 200){
          successAlert(res.data.msg);
          this.reqListAction();
        }else{
          warningAlert(res.data.list);
        }

      })
    }
  },
  mounted() {
    this.reqListAction();
  },
};
</script>
<style scoped>
</style>