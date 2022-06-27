import { emit, pageId } from './base';

/**
 * 发送数据
 * option 请求参数
 */
function tracePageView({ currentUrl, delay }) {
  setTimeout(() => {
    emit({
      eventType: 'pv',
      eventId: pageId,
      url: window.location.href,
      referer: currentUrl,
      title: document.title,
      triggerTime: Date.now(),
      delay,
    });
  }, 17);
}

/* 监听popstate和hashchange事件 */
// hash变化也会触发popstate事件,而且会先触发popstate事件
// 可以使用popstate来代替hashchange,如果支持History H5 Api
// https://developer.mozilla.org/zh-CN/docs/Web/API/Window/popstate_event
function addHashEvent(cb) {
  const hashEvent = 'pushState' in window.history ? 'popstate' : 'hashchange';
  window.addEventListener(hashEvent, cb, false);
}

/**
 * 路由Pv采集
 * pvHashtag 是否监听hash变化
 */
function init({ pv }) {
  if (!pv) return;

  let visitTime = Date.now();

  tracePageView({ currentUrl: document.referrer });

  //document.referrer在hash路由中获取不到，手动记录
  let currentUrl = window.location.href;
  // 劫持history.pushState history.replaceState
  const historyPushState = window.history.pushState;
  const historyReplaceState = window.history.replaceState;

  window.history.pushState = function () {
    historyPushState.apply(window.history, arguments);
    tracePageView({ currentUrl, delay: Date.now() - visitTime });
    currentUrl = window.location.href;
  };

  window.history.replaceState = function () {
    historyReplaceState.apply(window.history, arguments);
    tracePageView({ currentUrl, delay: Date.now() - visitTime });
    currentUrl = window.location.href;
  };

  addHashEvent(() => {
    tracePageView({ currentUrl, delay: Date.now() - visitTime });
    currentUrl = window.location.href;
  });
}

export default {
  init,
  tracePageView,
};
