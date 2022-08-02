import axios from "axios";
import { message } from 'antd';

const ajax = (type, url, data = {}) => {

    console.log('前端传到后端的数据：', data)

    // 接受axios返回的值（是Promise类型）
    let promise;

    return new Promise((resolve, reject) => {
        if (type === 'GET') {
            promise = axios.get(url, {
                params: data    // ?这么写对吗
            })
        } else if (type === 'POST') {
            promise = axios.post(url, data)
        }

        promise.then(response => {
            // axios请求发送成功返回给前端的数据↓
            resolve(response.data)
        }).catch(error => {
            message.error({
                content: `服务器出错了：${error}`,
                duration: 2,
            })
        })
    })
}
export default ajax;