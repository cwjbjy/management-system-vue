<template>
<!-- 适合任意级别表头、任意合并单元格、编辑状态可控制表格 -->
  <el-table
    :data="tableData"
    style="width: 100%"
    class="special_table"
    :cell-class-name="fSetCellClass"
    @cell-dblclick="dbClick"
  >
    <template v-for="(item, index) in tableHeader">
      <table-item
        v-if="item.children"
        :key="index"
        :coloumn-header="item"
      ></table-item>
      <el-table-column
        :label="item.label"
        :prop="item.prop"
        :key="index"
        v-else
      >
        <template slot-scope="scope">
          <div v-if="Array.isArray(scope.row[item.prop])">
            <div
              v-for="(dataItem, index) in scope.row[item.prop]"
              class="cell-content"
              :key="index"
            >
              <el-input
                @blur="inputBlur(scope.row)"
                class="none"
                v-model="scope.row[item.prop][index]"
              ></el-input>
              <span :data-type="[item.status?'view':'']" class="spanContent">{{ dataItem }}</span>
            </div>
          </div>
          <div v-else>
            <el-input
              @blur="inputBlur(scope.row)"
              class="none"
              v-model="scope.row[item.prop]"
            ></el-input>
            <span :data-type="[item.status?'view':'']" class="spanContent">{{
              scope.row[item.prop]
            }}</span>
          </div>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
import tableItem from "./tableItem";
export default {
  props: {
    tableData: {
      type: Array,
      default: [],
    },
    tableHeader: {
      type: Array,
      default: [],
    },
  },
  components: {
    tableItem,
  },
  methods: {
    //单元格类名的回调方法，当为特定列时，有特殊的样式
    fSetCellClass({ row, column, rowIndex, columnIndex }) {
      return "cell-p0";
    },
    dbClick(row, column, cell, event) {
      // console.log("column", column);
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
      console.log(row);
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