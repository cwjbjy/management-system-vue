import { browserType } from './browserType';

let visitTime = Date.now();

export default function track(from, to) {
  const currentTime = Date.now();
  let data = {
    type: 'uv',
    uid: '用户id',
    //当前页面就是从这个 URI 所代表的页面 跳转或打开的
    referer: document.referrer,
    eventTime: new Date().getTime(),
    browserType: browserType(),
    version: 'PC管理系统 v1.0',
    extra: {
      from: {
        name: from.name || '',
        path: from.path || '',
        query: from.query || '',
      },
      to: {
        name: to.name || '',
        path: to.path || '',
        query: to.query || '',
      },
    },
    //当前页面停留时间
    delay: currentTime - visitTime,
    //获取性能指标
    resource_timing: window.performance.timing,
  };
  visitTime = currentTime;
  return data;
}
