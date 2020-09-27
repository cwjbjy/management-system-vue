<template>
  <!-- 多级表头 -->
  <el-table-column :label="coloumnHeader.label">
    <template v-for="(item, index) in coloumnHeader.children">
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
  </el-table-column>
</template>

<script>
export default {
  name: "tableItem",
  props: {
    coloumnHeader: {
      type: Object,
      required: true,
    },
  },
  methods: {
    inputBlur(row) {
      console.log(row);
      let doc = event.target.parentNode.parentNode;
      doc.setAttribute("class", "cell cell-content");
    },
  },
};
</script>