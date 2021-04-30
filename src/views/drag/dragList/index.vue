<template>
  <section>
    <el-card shadow="hover">
      <strong>可通过拖拽进行分组与排序;暂不支持IE</strong>
      <div class="drag-box frontArea">
        <div class="drag-box-item">
          <div class="item-title">todo</div>
          <draggable
            v-model="todo"
            @remove="removeHandle"
            group="sortlist"
            ghostClass="ghost-style"
          >
            <transition-group tag="div" id="todo" class="item-ul">
              <div v-for="item in todo" class="drag-list pointer" :key="item.id">{{item.content}}</div>
            </transition-group>
          </draggable>
        </div>
        <div class="drag-box-item">
          <div class="item-title">doing</div>
          <draggable
            v-model="doing"
            @remove="removeHandle"
            group="sortlist"
            ghostClass="ghost-style"
          >
            <transition-group tag="div" id="doing" class="item-ul">
              <div v-for="item in doing" class="drag-list pointer" :key="item.id">{{item.content}}</div>
            </transition-group>
          </draggable>
        </div>
        <div class="drag-box-item">
          <div class="item-title">done</div>
          <draggable
            v-model="done"
            @remove="removeHandle"
            group="sortlist"
            ghostClass="ghost-style"
          >
            <transition-group tag="div" id="done" class="item-ul">
              <div v-for="item in done" class="drag-list pointer" :key="item.id">{{item.content}}</div>
            </transition-group>
          </draggable>
        </div>
      </div>
    </el-card>
  </section>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "DragList",
  data() {
    return {
      todo: [
        {
          id: 1,
          content: "开发图表组件"
        },
        {
          id: 2,
          content: "开发拖拽组件"
        },
        {
          id: 3,
          content: "开发权限测试组件"
        }
      ],
      doing: [
        {
          id: 1,
          content: "开发登录注册页面"
        },
        {
          id: 2,
          content: "开发头部组件"
        },
        {
          id: 3,
          content: "开发表格相关组件"
        },
        {
          id: 4,
          content: "开发表单相关组件"
        }
      ],
      done: [
        {
          id: 1,
          content: "初始化项目，生成工程目录，完成相关配置"
        },
        {
          id: 2,
          content: "开发项目整体框架"
        }
      ]
    };
  },
  components: {
    draggable
  },
  created() {
    document.body.ondrop = function(event) {
      event.preventDefault();
      event.stopPropagation();
    };
  },
  methods: {
    removeHandle(event) {
      this.$message.success(`从 ${event.from.id} 移动到 ${event.to.id} `);
    }
  }
};
</script>

<style scoped lang="scss">
.frontArea{
  margin-top: 15px;
}
.drag-box {
  display: flex;
  &-item {
    flex: 1;
    min-width: 300px;
    margin-right: 16px;
    border-radius: 6px;
    @include themify($themes) {
      background-color: themed("background-drag");
      border: 1px solid themed("card-border");
    }
  }
}
.item-title {
  padding: 8px 8px 8px 12px;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 600;
}
.item-ul {
  padding: 0 8px 8px;
  height: 500px;
  overflow-y: scroll;
}
.item-ul::-webkit-scrollbar {
  width: 0;
}
.drag-list {
  border: 1px solid;
  padding: 10px;
  margin: 5px 0 10px;
  list-style: none;
  border-radius: 6px;
  @include themify($themes) {
    background: themed("card-background");
  }
}
.drag-list:hover {
  @include themify($themes) {
    border: 1px solid themed("card-border-active");
  }
}
.drag-title {
  font-weight: 400;
  line-height: 25px;
  margin: 10px 0;
  font-size: 22px;
}
.ghost-style {
  display: block;
  color: transparent;
  border-style: dashed;
}
</style>
