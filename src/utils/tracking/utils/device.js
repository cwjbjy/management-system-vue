import { browserType } from './methods';

const { screen } = window;
const { clientWidth, clientHeight } = document.documentElement;
const { width, height, colorDepth, pixelDepth } = screen;

export default {
  clientHeight, // 网页可见区高度
  clientWidth, // 网页可见区宽度
  colorDepth, // 显示屏幕调色板的比特深度
  pixelDepth, // 显示屏幕的颜色分辨率
  screenWidth: width, // 显示屏幕的宽度
  screenHeight: height, // 显示屏幕的高度
  browserType: browserType(), // 浏览器类型
};
