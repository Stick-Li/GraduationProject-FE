import React, { useState } from 'react';
import startEmpty from '../../assets/starEmpty.png'
import startHalf from '../../assets/starHalf-yellow.png'
import start from '../../assets/star-yellow.png'
import './index.less'

const StartScoreHandle = () => {

    const [score, setScore] = useState(2);
    
    const handleStore = (e) => {
        console.log(e + 1)
        setScore(e + 1)
    }
    return (
        <div>
            星星组件：
            {
                ([...new Array(5)]).map((_, index) => {
                    if (index < score) {
                        return <img key={index} className='start' onClick={() => { handleStore(index) }} src={start} alt="" />
                    } else {
                        return <img key={index} className='start' onClick={() => { handleStore(index) }} src={startEmpty} alt="" />
                    }
                })
            }
        </div>
    );
}

export default StartScoreHandle;
