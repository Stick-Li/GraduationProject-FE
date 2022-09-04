// 时间戳转换：1659411810317 -> "2022-8-2 11:43:30"
var changeTime = function (data) {
    let date = new Date(parseInt(data));
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let minute = date.getMinutes();
    let second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute; second = second < 10 ? ('0' + second) : second;
    // console.log( y + '-' + m + '-' + d + ' ' + '　' + h + ':' + minute + ':' + second) 
    let dates = y + '-' + m + '-' + d + '　' + h + ':' + minute + ':' + second;
    return dates;
}

export default changeTime;