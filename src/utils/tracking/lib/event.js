import { emit } from './base';

/**
 * 点击事件全埋点
 */
function clickCollection() {
  document.addEventListener(
    'click',
    (e) => {
      // 点击事件
      const config = {
        eventType: 'click',
        url: window.location.href,
        target: e.target.outerText,
        triggerTime: Date.now(),
      };
      emit(config);
    },
    true,
  );
}

function init({ eventCore }) {
  if (!eventCore) return;
  clickCollection();
}

/**
 * 主动触发事件上报
 */
function traceCustomEvent(eventId, title, params = {}) {
  emit({ eventId, title, params, eventType: 'custom', triggerTime: Date.now() });
}

export default {
  init,
  traceCustomEvent,
};
