import HttpClient from './httpClient'
/*
* 加载本地数据
*/
export default {
    getAirData(){
        return HttpClient.instance1.get("/static/airLine.json")
    }
}