import HttpClient from './httpClient'

export default {
    getAirData(){
        return HttpClient.instance1.get("/fakeData/airLine.json")
    }
}