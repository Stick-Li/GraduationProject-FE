import React from 'react';
import starEmpty from '../../assets/starEmpty.png'
import startHalf from '../../assets/starHalf-yellow.png'
import start from '../../assets/star-yellow.png'
import './index.less'

const StartScore = () => {
    return (
        <div>
            星星组件：
            {
                ([...new Array(5)]).map(() => {
                    return <img className='start' src={starEmpty} alt="" />
                    {/* 想在这里加个空格怎么加？？？ */}
                })
            }
        </div>
    );
}

export default StartScore;
