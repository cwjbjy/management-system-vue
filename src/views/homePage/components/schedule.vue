<template>
  <el-card shadow="hover" style="height: 406px">
    <div slot="header">
      <span>待办事项</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="openDialog('add')">添加</el-button>
    </div>
    <el-table :show-header="false" :data="todoList" style="width: 100%" ref="table" height="288px">
      <el-table-column width="40">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.status"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <div class="todo-item" :class="{ 'todo-item-del': scope.row.status }">
            {{ scope.row.title }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="35">
        <template slot-scope="scope">
          <i class="el-icon-edit c_pointer" @click="openDialog('edit', scope.row, scope.$index)"></i>
        </template>
      </el-table-column>
      <el-table-column width="35">
        <template slot-scope="scope">
          <i class="el-icon-delete c_pointer" @click="deleteRow(scope.$index)"></i>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" center>
      <el-input v-model="schedule" placeholder="请输入内容"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="closeDialog">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import { vuexApp } from '@/mixin';
export default {
  name: 'Schedule',
  data() {
    return {
      dialogFormVisible: false,
      dialogTitle: '',
      schedule: '',
      status: 0, //0增加，1编辑
      itemIndex: 0,
    };
  },
  mixins: [vuexApp],
  created() {
    //解决IE浏览器渲染过慢，表格宽度计算错误
    this.$nextTick(() => {
      this.$refs.table.doLayout();
    });
  },
  methods: {
    openDialog(val, row, index) {
      this.itemIndex = index;
      this.status = val;
      this.dialogFormVisible = true;
      switch (this.status) {
        case 'add':
          this.schedule = '';
          this.dialogTitle = '增加事项';
          return;
        case 'edit':
          this.dialogTitle = '编辑事项';
          this.schedule = row.title;
          return;
        default:
          return;
      }
    },
    closeDialog() {
      switch (this.status) {
        case 'add':
          this.SET_TODO({ type: 'add', data: this.schedule });
          this.$message.success('增加成功');
          this.dialogFormVisible = false;
          return;
        case 'edit':
          this.SET_TODO({
            type: 'edit',
            index: this.itemIndex,
            data: this.schedule,
          });
          this.$message.success('编辑成功');
          this.dialogFormVisible = false;
          return;
        default:
          return;
      }
    },
    deleteRow(index) {
      this.$confirm('此操作将永久删除该事项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.SET_TODO({
            type: 'delete',
            index,
          });
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.c_pointer {
  cursor: $cursor-pointer;
}
.todo-item {
  font-size: 14px;
  @include themify($themes) {
    color: themed('card-font');
  }
}
.todo-item-del {
  text-decoration: line-through;
}
</style>
