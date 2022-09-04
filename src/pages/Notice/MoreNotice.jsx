import React from 'react';
import { useLocation } from 'react-router-dom';
import changeTime from '../../utils/timeUtils'

const MoreNotice = () => {
    const { state: { senderId, receiverId, message, sendTime } } = useLocation()
    // console.log('00', state)
    return (
        <div>
            <p>👈</p>
            详情：
            <div>{`发信人Id：${senderId}`}</div>
            <div>{`收信人Id：${receiverId}`}</div>
            <div>申报题目：{JSON.parse(message).declarationTitle}</div>
            <div>题目类型：{JSON.parse(message).declarationType}</div>
            {/* <div>时间：{changeTime(sendTime)}</div> */}
            <div>时间：{changeTime(sendTime)}</div>
            {/* 将那个时间戳写成方法，拿过来用 */}
        </div>
    );
}

export default MoreNotice;
