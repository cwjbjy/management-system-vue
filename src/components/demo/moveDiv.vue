<template>
  <!-- 移动圆形 -->
  <div id="dv"></div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    divMove() {
      var dv = document.querySelector("#dv");
      var x = 0;
      var y = 0;
      var l = 0;
      var t = 0;
      dv.onmousedown = function(e) {
        //获取x坐标和y坐标
        x = e.clientX;
        y = e.clientY;
        //获取左部和顶部的偏移量
        l = dv.offsetLeft;
        t = dv.offsetTop;
        //如果不加，将会导致当拖拽区域脱离文档时，文档就捕获不了鼠标事件
        if (dv.setCapture) {
          /*在当前线程的指定窗口里设置鼠标捕获。
          一旦窗口捕获了鼠标，所有鼠标输入都针对该窗口，
          无论光标是否在窗口的边界内还是边界外。
          同一时刻只能有一个窗口捕获鼠标*/
          dv.setCapture();
        }
        //这里一定要用文档监听，因为很容易移出所选的区域
        document.onmousemove = function(e) {
          var nx = e.clientX;
          var ny = e.clientY;
          //计算移动后的左偏移量和顶部的偏移量
          var nl = nx - (x - l);
          var nt = ny - (y - t);
          dv.style.left = nl + "px";
          dv.style.top = nt + "px";
        };
        document.onmouseup = function() {
          document.onmousemove = document.onmouseup = null;
          if (dv.releaseCapture) {
            dv.releaseCapture();
          }
        };
      };
    }
  },
  mounted() {
    this.divMove();
  }
};
</script>

<style>
#dv {
  width: 100px;
  height: 100px;
  background-color: blue;
  border-radius: 50%;

  position: absolute;
}
</style>