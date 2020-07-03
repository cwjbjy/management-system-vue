<template>
  <div class="table-content">
    <el-card shadow="hover">
      <h4>管理员登陆方可看到后台管理页面；该基础表格包含排序，筛选，搜索，编辑，下载功能；注册时间旁按钮为排序，筛选功能；上述功能均已实现</h4>
      <div class="download">
        <el-button type="primary" @click="download">下载表格</el-button>
      </div>
      <el-table
        :data="tableData.filter(data => !search || data.user_name.toLowerCase().includes(search.toLowerCase()))"
        :default-sort="{prop: 'createTime', order: 'ascending'}"
        max-height="500px"
        style="width: 100%"
        border
        class="special_table"
        id="out-table"
      >
        <el-table-column label="序号" type="index" width="80"></el-table-column>
        <el-table-column label="用户名" prop="user_name"></el-table-column>
        <el-table-column label="角色描述">
          <template slot-scope="scope">
            <span
              v-html="scope.row.authority == 1 ? '管理员':'普通用户'"
              :class="[scope.row.authority == 1 ? 'blue':'']"
            ></span>
          </template>
        </el-table-column>
        <el-table-column
          label="注册时间"
          prop="createTime"
          sortable
          :filters="filtersData"
          :filter-method="filterHandler"
        ></el-table-column>
        <el-table-column>
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="输入用户名搜索" clearable />
          </template>
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              v-if="scope.row.authority == 1"
              @click="handleEdit(scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              v-if="scope.row.authority != 1"
              @click="handleDelete(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
  </div>
</template>

<script>
import API from "@/services/api";
import FileSaver from "file-saver";
import XLSX from "xlsx";
// import comfun from "@/js/comFunc"
export default {
  data() {
    return {
      tableData: [],
      search: "",
      dialogFormVisible: false,
      form: {
        name: "",
        pass: ""
      },
      formLabelWidth: "100px",
      row: {},
      rules: {
        pass: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      filtersData: []
    };
  },
  methods: {
    //获取数据
    init() {
      API.user().then(res => {
        this.tableData = res.data.data;
        this.tableData.forEach(item => {
          this.filtersData.push({
            text: item.createTime,
            value: item.createTime
          });
        });
      });
    },
    handleDelete(val) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            id: val
          };
          API.deleteUser(params).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.init();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleEdit(val) {
      this.row = val;
      this.form.name = this.row.user_name;
      this.dialogFormVisible = true;
    },
    changeUser() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let params = {
            id: this.row.id,
            user_name: this.form.name,
            password: this.form.pass
          };
          API.updateUser(params).then(res => {
            this.$message.success("修改成功");
            this.dialogFormVisible = false;
            this.init();
          });
        } else {
          this.$message.error("请检查输入内容");
        }
      });
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    download(e) {
      var outTable = XLSX.utils.table_to_book(
        document.querySelector("#out-table")
      );
      var downloadTable = XLSX.write(outTable, { bookType: "xlsx", type: "binary" });
      FileSaver.saveAs(
        new Blob([this.s2ab(downloadTable)], {
          type: "application/octet-stream"
        }),
        '人员信息表.xlsx'
      );
    },
    s2ab(s) {
      var cuf;
      var i;
      if (typeof ArrayBuffer !== "undefined") {
        cuf = new ArrayBuffer(s.length);
        var view = new Uint8Array(cuf);
        for (i = 0; i !== s.length; i++) {
          view[i] = s.charCodeAt(i) & 0xff;
        }
        return cuf;
      } else {
        cuf = new Array(s.length);
        for (i = 0; i !== s.length; ++i) {
          cuf[i] = s.charCodeAt(i) & oxFF;
        }
        return cuf;
      }
    }
  },
  created() {
    this.init();
  }
};
</script>

<style scoped lang="scss">
.table-content {
  padding: 10px;
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
@import "@/assets/scss/table.scss";
.userDialog {
  .el-dialog {
    width: 35%;
  }
}
</style>