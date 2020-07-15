<template>
  <section>
    <el-card shadow="hover">
      <h4>双击表格中的单元格可实现修改当前单元格功能（表头不可修改）；</h4>
      <el-table
        :data="tableData"
        style="width: 100%"
        class="special_table"
        :cell-class-name="fSetCellClass"
        @cell-dblclick="dbClick"
      >
        <el-table-column prop="date" label="日期">
          <template slot-scope="scope">
            <el-input @blur="inputBlur(scope.row)" class="none" v-model="scope.row.date"></el-input>
            <span data-type="view" class="spanContent">{{scope.row.date}}</span>
          </template>
        </el-table-column>
        <el-table-column label="配送信息">
          <el-table-column prop="name" label="姓名">
            <template slot-scope="scope">
              <div v-for="(item,index) in scope.row.name" class="cell-content" :key="index">
                <el-input @blur="inputBlur(scope.row)" class="none" v-model="scope.row.name[index]"></el-input>
                <span data-type="view" class="spanContent">{{item}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="地址">
            <el-table-column prop="province" label="省份">
              <template slot-scope="scope">
                <el-input @blur="inputBlur(scope.row)" class="none" v-model="scope.row.province"></el-input>
                <span data-type="view" class="spanContent">{{scope.row.province}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="city" label="市区">
              <template slot-scope="scope">
                <el-input @blur="inputBlur(scope.row)" class="none" v-model="scope.row.city"></el-input>
                <span data-type="view" class="spanContent">{{scope.row.city}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="地址">
              <template slot-scope="scope">
                <el-input @blur="inputBlur(scope.row)" class="none" v-model="scope.row.address"></el-input>
                <span data-type="view" class="spanContent">{{scope.row.address}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="zip" label="邮编">
              <template slot-scope="scope">
                <el-input @blur="inputBlur(scope.row)" class="none" v-model="scope.row.zip"></el-input>
                <span data-type="view" class="spanContent">{{scope.row.zip}}</span>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-card>
  </section>
</template>

<script>
export default {
  name: "baseTable",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: ["曹操", "孙权", "刘备"],
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-02",
          name: ["吕布", "貂蝉"],
          province: "北京",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: ["诸葛亮", "周瑜"],
          province: "南通",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: ["大乔", "小乔"],
          province: "江苏",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ]
    };
  },
  methods: {
    //单元格类名的回调方法，当为特定列时，有特殊的样式
    fSetCellClass({ row, column, rowIndex, columnIndex }) {
      return "cell-p0";
    },
    dbClick(row, column, cell, event) {
      console.log("event", event);
      if (event.target.dataset.type == "view") {
        //点击span区域
        event.path[1].className += " cell-content-active";
        event.path[1].querySelector("input").focus();
      } else {
        //点击单元格cell非span区域 （由于点击的元素不同，path也不同）
        event.path[0].children[0].className += " cell-content-active";
        event.path[0].children[0].querySelector("input").focus();
      }
    },
    inputBlur(row) {
      console.log(event);
      let elm = event.path[2];
      elm.className = "cell";
    }
  }
};
</script>

<style lang="scss">
.special_table td,
.special_table th {
  text-align: center;
}
.el-table .cell {
  padding: 0;
}
.cell-p0 {
  padding: 0;
  div {
    padding: 0;
  }
  span {
    display: block;
    padding: 12px;
  }
  .cell-content {
    border-top: 1px solid #ebeef5;
  }

  .cell-content:nth-of-type(1) {
    border-top: none;
  }
  .none {
    display: none;
  }
  .spanContent {
    cursor: pointer;
  }
  .cell-content-active {
    .el-input {
      display: block;
    }
    span {
      display: none;
    }
  }
}
</style>