<template>
  <section>
    <el-card shadow="hover">
      <strong
        >管理员登录方可看到后台管理页面；该基础表格包含排序，筛选，编辑功能；表格中注册时间旁按钮为排序，筛选功能；上述功能均已实现</strong
      >
      <div class="frontArea">
        <el-table
          :data="tableData.filter((data) => !search || data.user_name.toLowerCase().includes(search.toLowerCase()))"
          :default-sort="{ prop: 'createTime', order: 'ascending' }"
          max-height="500px"
          style="width: 100%"
          border
          id="out-table"
          header-align="center"
        >
          <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
          <el-table-column label="用户名" prop="userName" align="center"></el-table-column>
          <el-table-column label="单击图像可以放大" align="center">
            <template slot-scope="scope">
              <el-image
                class="table-td-thumb"
                :src="`${baseURL}${scope.row.photo}`"
                :preview-src-list="[`${baseURL}${scope.row.photo}`]"
                fit="cover"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column label="角色描述" align="center">
            <template slot-scope="scope">
              <span
                v-html="scope.row.authority == 1 ? '管理员' : '普通用户'"
                :class="[scope.row.authority == 1 ? 'blue' : '']"
              ></span>
            </template>
          </el-table-column>
          <el-table-column
            label="注册时间"
            prop="createTime"
            sortable
            :filters="filtersData"
            :filter-method="filterHandler"
            align="center"
          ></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-edit" v-if="scope.row.authority == 1" @click="handleEdit(scope.row)"
                >编辑</el-button
              >
              <el-button
                type="text"
                icon="el-icon-delete"
                class="red"
                v-if="scope.row.authority != 1"
                @click="handleDelete(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-dialog title="编辑" :visible.sync="dialogFormVisible" class="userDialog">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="修改密码" prop="pass" :label-width="formLabelWidth">
          <el-input v-model="form.pass" autocomplete="off" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeUser">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import CryptoJS from 'crypto-js';

import { user, deleteUser, updateUser } from '@/api/user';
import { getURL } from '@/mixin/url';
export default {
  name: 'UserManage',
  data() {
    return {
      tableData: [],
      search: '',
      dialogFormVisible: false,
      form: {
        name: '',
        pass: '',
      },
      formLabelWidth: '100px',
      row: {},
      rules: {
        pass: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
      filtersData: [],
    };
  },
  mixins: [getURL],
  created() {
    this.init();
  },
  activated() {
    this.init();
  },
  methods: {
    init() {
      user().then((res) => {
        this.tableData = res.data.data;
        this.filtersData = [];
        this.tableData.forEach((item) => {
          this.filtersData.push({
            text: item.createTime,
            value: item.createTime,
          });
        });
      });
    },
    handleDelete(val) {
      let params = {
        id: val,
      };
      deleteUser(params).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!',
        });
        this.init();
      });
    },
    handleEdit(val) {
      this.row = val;
      this.form.name = this.row.user_name;
      this.dialogFormVisible = true;
    },
    changeUser() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let params = {
            id: this.row.id,
            userName: this.form.name,
            password: CryptoJS.MD5(this.form.pass).toString(),
          };
          updateUser(params).then(() => {
            this.$message.success('修改成功');
            this.dialogFormVisible = false;
            this.init();
          });
        } else {
          this.$message.error('请检查输入内容');
        }
      });
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
  },
};
</script>

<style scoped lang="scss">
.frontArea {
  margin-top: 15px;
}
.blue {
  color: blue;
}
.red {
  color: red;
}
.download {
  text-align: right;
  margin-bottom: 10px;
}
</style>
<style lang="scss">
.userDialog {
  .el-dialog {
    width: 40%;
    .el-dialog__body {
      padding-right: 50px;
    }
  }
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
