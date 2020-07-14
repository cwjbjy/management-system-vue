<template>
  <div class="I18n">
    <el-card shadow="hover">
      <div class="container">
        <el-button
          type="primary"
          @click="$i18n.locale = $i18n.locale === 'zh'?'en':'zh';"
        >{{$t('i18n.btn')}}</el-button>
        <h3>{{$t('i18n.title')}}</h3>
        <h4>{{$t('i18n.title1')}}</h4>
        <p>{{$t('i18n.p1')}}</p>
        <p>{{$t('i18n.p2')}}</p>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name:'I18n',
  data() {
    return {};
  }
};
</script>

<style scoped>
.I18n {
  padding: 10px;
}
.list p {
  margin-bottom: 20px;
}
a {
  color: #409eff;
}
</style>
