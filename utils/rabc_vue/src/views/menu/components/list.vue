<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="菜单编号" >
      </el-table-column>
      <el-table-column prop="title" label="菜单名称" >
      </el-table-column>
      <el-table-column label="菜单图标">
        <template slot-scope="scope">
          <Icon :type="scope.row.icon"></Icon>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="primary">启用</el-button>
          <el-button v-else type="info">禁用</el-button>
        </template>
         </el-table-column>
      <el-table-column class="operation" label="操作" width="180">
        <template slot-scope="scope">
          <el-button class="btn" type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @del="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { menuDelReq } from '../../../utils/request';
import { successAlert, warningAlert } from '../../../utils/alert';
export default {
  data() {
    return {
    };
  },
  mounted() {
      this.reqListAction()
  },
  computed: {
    ...mapGetters({
        list:"menu/list"
    }),
  },
  methods: {
    ...mapActions({
        reqListAction:"menu/reqListAction"
    }),
    //点击编辑
    edit(id){
      // console.log(id);
      this.$emit("edit",id);
    },
    //点击删除按钮
    del(id){
      // console.log(id);
        //确定删除
        menuDelReq(id).then((res)=>{
          console.log(res);
          if(res.data.code == 200){
            //删除成功提示
            successAlert(res.data.msg);
            //重新请求数据
            this.reqListAction()
          }else{
            warningAlert(res.data.msg)
          }
      })
    },
  },
};
</script>
<style scoped>

</style>