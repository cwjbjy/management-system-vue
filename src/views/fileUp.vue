<template>
  <div style="margin-top: 20px;">
    <input type="file" id="image_uploads" accept=".jpg, .jpeg, .png" multiple />
    <img :src="src" @load="loadImage" />
  </div>
</template>


<script>
export default {
  data() {
    return {
      src: "",
      input: null
    };
  },
  methods: {
    updateImage() {
      const curFiles = this.input.files;
      console.log("curFiles", curFiles);
      this.src = URL.createObjectURL(curFiles[0]);
      console.log("this.src", this.src);
    },
    loadImage() {
      URL.revokeObjectURL(this.src);
    }
  },
  mounted() {
    this.input = document.querySelector("#image_uploads");
    this.input.addEventListener("change", this.updateImage);
  },
  beforeDestory() {
    this.input.removeEventListener("change", this.updateImage);
  }
};
</script>

