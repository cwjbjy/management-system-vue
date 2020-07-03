export default{
    getTime(){
        var date = new Date();//实例一个时间对象；
        var year = date.getFullYear();//获取系统的年；
        var month = date.getMonth()+1;//获取系统月份，由于月份是从0开始计算，所以要加1
        var day = date.getDate();//获取系统日
        var hour = date.getHours();//获取系统时间
        var minute = date.getMinutes(); //分
        var second = date.getSeconds();//秒
        console.log('1',month)
        if(month < 10){
            month = '0' + month
            console.log('2',month)
        }
        if(day < 10){
            day = '0' + day
        }
        if(hour < 10){
            hour = '0' + hour
        }
        if(minute < 10){
            minute = '0' + minute
        }
        if(second < 10){
            second = '0' + second
        }
        let time = year + '-' + month + '-' + day + " " + hour + ':' + minute + ':' + second
        return time
    }
}