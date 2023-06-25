<template>
  <el-button  type="danger"  @click="del()">删除</el-button>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {

    del(){
      this.$confirm("你确定要删除吗？","删除提示",{
        confirmButtonText:"删除",
        cancelButtonText:"取消",
        type:"warning"
      }).then(()=>{
        // console.log(1111); 
        this.$emit("del")
      }).catch(()=>{
        //取消删除
        this.$message({
          type:'info',
          message: '已取消删除！'
        })
      })
    },
  },
};
</script>
<style scoped>
</style>