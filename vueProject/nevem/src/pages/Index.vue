<template>
  <el-container>
    <el-header style="height:38px;text-align: right; font-size: 12px">
      <span>后台管理系统</span>
    </el-header>
    <el-container style="height: 940px;">
  <LeftNav></LeftNav>
    <el-main>
      <el-table :data="tableData">
        <el-table-column prop="date" label="日期" width="140">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
        <el-table-column prop="" label="操作">
          <div>删除</div>
        </el-table-column>
      </el-table>
    </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
     const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item)
      }
  }
}
</script>

<style scoped>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 38px;
  }
  
  .el-aside {
    color: #333;
  }
</style>
