<template>
  <div>
    <el-button class="addBtn" type="primary" @click="add()">添加</el-button>
    <v-list @edit="edit"></v-list>
    <v-add :info="info" ref="add"></v-add>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

import vAdd from "./components/add"
import vList from "./components/list"
export default {
  components:{
    vAdd,
    vList
  },
  data() {
    return {
      //传递给add的数据
      info:{
        //表单的状态
        isShow:false,
        //标记是编辑还是添加,true是添加
        isAdd:true
      }
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      
    }),
    //点击添加，表单出现
     add(){
      this.info.isShow = true;
      this.info.isAdd = true;
    },
    //点击编辑
    edit(id){
      console.log(id);
      // 表单出现
      this.info.isShow = true;
      //标记是编辑不是添加
      this.info.isAdd = false;
      //让表单根据id获取一条信息
      this.$refs.add.look(id)
    }
  },
  mounted() {
    
  },
};
</script>
<style scoped>
.addBtn{
    /* float:left; */
  margin: 10px 0;
}
</style>