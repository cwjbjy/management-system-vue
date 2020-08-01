import HttpClient from './httpClient'

export default {
    getAirData(){
        return HttpClient.instance1.get("/mock/airLine.json")
    }
}