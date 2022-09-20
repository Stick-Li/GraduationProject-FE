import React from 'react';
import { Card, Badge } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { reqChangeIsReceiveRead } from '../../api';
import changeTime from '../../utils/timeUtils'
import './index.less'


const Notice = () => {
    const { state: noticeArr } = useLocation()
    // const [arr, setArr] = useState(noticeArr);
    console.log(noticeArr)

    // const noticeArr = [{ _id: 1 }, { _id: 2 }]

    const goMore = async (value) => {
        await reqChangeIsReceiveRead(value)
        // 跳转到详情页面
        // navigator('')

        // const newNoticeArr = noticeArr.map((notice) => {
        //     // return notice.isReceiveRead
        //     if (notice._id === value._id) {
        //         const newNotice = notice
        //         newNotice.isReceiveRead = true
        //         // 去数据库改isReceiveRead
        //         return newNotice
        //         // return 0
        //     } else {
        //         return notice
        //         // return 1
        //     }
        // })
        // console.log('点击goMore：', value)
        // console.log('已读：', newNoticeArr)
        // setArr(newNoticeArr)


    }
    const card_right = (value) => (
        // <div onClick={() => { goMore(value) }}>

        <Badge dot={!value.isReceiveRead}>
            <Link
                onClick={() => { goMore(value) }}
                to='/notice/more'
                state={value}
            >
                More
            </Link>
        </Badge>
        // </div>
    )
    return (
        <div className='allCard'>
            {
                noticeArr.map((value) => {
                    return (
                        <Card
                            key={value._id}
                            title={`发信人：${value.senderId}`}
                            extra={card_right(value)}
                            // extra={<More />}
                            style={{
                                width: 600,
                            }}
                            className='card'
                        >
                            <div>
                                <div>题目：{JSON.parse(value.message).declarationTitle}</div>
                                <div className='sendContent'>内容：{JSON.parse(value.message).declarationType}</div>
                            </div>
                            <br />
                            <p className='sendTime'>发布时间：{changeTime(value.sendTime)}</p>
                        </Card>
                    )
                })
            }
        </div>
    );
}

export default Notice;
