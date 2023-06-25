<template>
  <div>
    <el-button class="addBtn" type="primary" @click="add()">添加</el-button>
    <v-list @edit="edit"></v-list>
    <v-add ref="add" :info="info"></v-add>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import vAdd from "./components/add"
import vList from "./components/list"
export default {
  components: {
    vAdd,
    vList
  },
  data() {
    return {
      info: {
        isShow: false,
        isAdd:true
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    //点击添加，表单出现
     add(){
      this.info.isShow = true;
      this.info.isAdd = true;
    },
    edit(id){
      this.info.isShow = true;
      this.info.isAdd = false;
      this.$refs.add.look(id)
    }
  },
  mounted() {},
};
</script>
<style scoped>
.addBtn{
    /* float:left; */
  margin: 10px 0;
}
</style>