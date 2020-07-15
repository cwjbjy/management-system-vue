<template>
  <section>
    <el-card shadow="hover">
      <h4>请将鼠标移动到图片上，体验效果</h4>
      <div class="block" id="small_Box">
        <img :src="src" class="imageBox" />
      </div>
    </el-card>
  </section>
</template>

<script>
export default {
  name: "magnifying",
  data() {
    return {
      src:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var span = document.createElement("span");
      var box = document.getElementById("small_Box");
      var img = document.createElement("img");
      var boxWidth = box.clientWidth;
      var boxHeight = box.clientHeight;
      var scale = 2;
      span.style.position = "absolute";
      span.style.width = boxWidth / scale + "px";
      span.style.height = boxHeight / scale + "px";
      span.style.display = "none";
      span.style.overflow = "hidden";
      span.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
      span.style.cursor = "pointer";
      box.appendChild(span);
      img.setAttribute("src", this.src);
      img.style.width = scale * boxWidth + "px";
      img.style.height = scale * boxHeight + "px";
      box.onmouseover = function(e) {
        span.style.display = "block";
      };
      box.onmousemove = function(e) {
        e = e || window.event;
        var x = e.clientX - box.offsetLeft - span.clientWidth / 2;
        var y = e.clientY - box.offsetTop - span.clientHeight / 2;
        if (x <= 0) {
          x = 0;
        }
        if (x >= box.clientWidth - span.clientWidth) {
          x = box.clientWidth - span.clientWidth;
        }
        if (y <= 0) {
          y = 0;
        }
        if (y >= box.clientHeight - span.clientHeight) {
          y = box.clientHeight - span.clientHeight;
        }
        span.style.left = x + "px";
        span.style.top = y + "px";
        img.style.marginLeft = -1 * span.offsetLeft * scale - x + "px";
        img.style.marginTop = -1 * span.offsetTop * scale - y + "px";
        span.appendChild(img);
      };
      box.onmouseout = function(e) {
        span.style.display = "none";
      };
    }
  }
};
</script>

<style scoped>
.block {
  width: 500px;
  height: 309px;
  position: relative;
}
.imageBox {
  width: 500px;
  height: 309px;
}
</style>