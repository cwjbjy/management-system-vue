<template>
  <div ref="echarts" class="myChart"></div>
</template>

<script>
export default {
  name: 'earthModel',
  data() {
    return {
      baseTexture: '/images/world.jpg',
      environment: '/images/starfield.jpg',
      texture: '/images/pisa.hdr',
    };
  },
  methods: {
    prepareDomain() {
      var echartsInstance = window.echarts.init(this.$refs.echarts);
      echartsInstance.clear();
      var option = {
        backgroundColor: '#000',
        globe: {
          baseTexture: this.baseTexture,
          heightTexture: this.baseTexture,
          displacementScale: 0.04, //地球顶点位移的大小
          // environment: this.environment,
          shading: 'realistic',
          realisticMaterial: {
            roughness: 0.9, //表示材质的粗糙度
          },
          postEffect: {
            enable: true,
          },
          light: {
            main: {
              intensity: 5, //主光源强度
              shadow: true,
            },
            ambientCubemap: {
              // texture: this.texture,
              diffuseIntensity: 0.2, //漫反射强度
            },
          },
          viewControl: {
            autoRotate: true,
            autoRotateSpeed: 5,
          },
        },
      };
      echartsInstance.setOption(option);
      window.onresize = function () {
        echartsInstance.resize();
      };
    },
  },
  mounted: function () {
    this.prepareDomain();
  },
  created() {},
};
</script>

<style type="text/scss">
.myChart {
  width: 100%;
  height: calc(100vh - 70px);
}
</style>
