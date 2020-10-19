<template>
  <section>
    <el-card shadow="hover">
      <div slot="header">
        <strong
          >点击新增，新增一条数据；鼠标移动到单元格上，如果出现手的标志，双击单元格进行填写；原有单元格也可双击修改</strong
        >
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="addItem"
          >添加</el-button
        >
      </div>
      <w-table :tableData="tableData" :tableHeader="tableHeader" />
    </el-card>
  </section>
</template>

<script>
import WTable from "@/components/_lib/CwjTable";
export default {
  name: "baseTable",
  components: {
    WTable,
  },
  data() {
    return {
      tableHeader: [
        {
          label: "日期",
          prop: "date",
          status:true, //编辑状态
        },
        {
          label: "配送信息",
          children: [
            {
              label: "姓名",
              prop: "name",
              status:true,
            },
            {
              label: "地址",
              children: [
                {
                  label: "省份",
                  prop: "province",
                  status:true,
                },
                {
                  label: "市区",
                  prop: "city",
                  status:true,
                },
                {
                  label: "地址",
                  prop: "address",
                  status:true,
                },
                {
                  label: "邮编",
                  prop: "zip",
                  status:true,
                },
              ],
            },
          ],
        },
      ],
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
      this.tableData.unshift(item);
    },
  },
};
</script>

