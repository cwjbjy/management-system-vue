let filters = function (Vue) {
    //将时间戳转为年月日
    Vue.filter('formDate', function (value) {
        let date = new Date(value*1000);
        let year = date.getFullYear();
        let month = date.getMonth() + 1; 
        let r = date.getDate(); 
        return year + "-" + month + "-" + r;
    });
}

export default filters