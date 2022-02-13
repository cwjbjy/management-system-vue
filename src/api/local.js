import HttpClient from '../service/axios';
/*
 * 加载本地数据
 */
export function getAirData() {
  return HttpClient.instance1.get('/static/airLine.json');
}
