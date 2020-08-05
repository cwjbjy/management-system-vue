<template>
  <section>
    <el-card shadow="hover">
      <div slot="header">
        <strong>点击新增，新增一条数据；鼠标移动到单元格上，如果出现手的标志，双击单元格进行填写；原有单元格也可双击修改</strong>
        <el-button style="float: right; padding: 3px 0" type="text" @click="addItem">添加</el-button>
      </div>
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
          name: ["曹操", "孙权"],
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-02",
          name: ["吕布", "貂蝉"],
          province: "北京",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-04",
          name: ["诸葛亮", "周瑜"],
          province: "南通",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-01",
          name: ["大乔", "小乔"],
          province: "江苏",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
      ],
    };
  },
  methods: {
    addItem() {
      let item = {
        date: "",
        name: ["", ""],
        province: "",
        city: "",
        address: "",
        zip: null,
      };
      this.tableData.unshift(item)
    },
    //单元格类名的回调方法，当为特定列时，有特殊的样式
    fSetCellClass({ row, column, rowIndex, columnIndex }) {
      return "cell-p0";
    },
    dbClick(row, column, cell, event) {
      // console.log("event", event);
      if (event.target.dataset.type == "view") {
        //点击span区域
        let doc = event.target.parentNode; //div cell
        doc.setAttribute("class", "cell cell-content-active");
        doc.querySelector("input").focus();
        //ie浏览器input获取焦点光标默认在最左边，这里设置为最右边
        let input = event.target.previousElementSibling.firstElementChild;
        input.setSelectionRange(
          input.value.length,
          input.value.length,
          "forward"
        );
      }
    },
    inputBlur(row) {
      // console.log(event);
      let doc = event.target.parentNode.parentNode;
      doc.setAttribute("class", "cell cell-content");
    },
  },
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
    @include themify($themes) {
      border-top: 1px solid themed("card-border");
    }
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