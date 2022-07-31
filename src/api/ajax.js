import axios from "axios";
import { message } from 'antd';

const ajax = (type = 'GET', url, data = {}) => {

    // 接受axios返回的值（是Promise类型）
    let promise;

    console.log('传给ajax的data：', data)

    return new Promise((resolve, reject) => {
        if (type === 'GET') {
            promise = axios.get(url, {
                params: data    // ?这么写对吗
            })
        } else if (type === 'POST') {
            promise = axios.post(url, data)
        }

        promise.then(response => {
            // axios请求发送成功返回数据↓
            resolve(response.data)
        }).catch(error => {
            message.error('服务器出错了：', error);
        })
    })
}
export default ajax;