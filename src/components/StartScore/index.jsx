import React, { useState } from 'react';
import starEmpty from '../../assets/starEmpty.png'
import startHalf from '../../assets/starHalf-yellow.png'
import start from '../../assets/star-yellow.png'
import './index.less'

const StartScore = (props) => {
    const { score } = props

    const [hasHalf, setHasHalf] = useState(false);


    const scoreArr = score.toString().split('.')
    const allNum = parseInt(scoreArr[0])    //3
    const halfNum = parseInt(scoreArr[1] > 5 ? 1 : 0) //1
    const emptyNum = 5 - allNum - halfNum  // 1
    const startArr = []

    const allStart = () => {
        for (let i = 0; i < allNum; i++) {
            startArr.push(<img className='start' key={'start' + i} src={start} alt="" />)
        }
        if (halfNum) {
            startArr.push(<img className='start' key={'halfNum'} src={startHalf} alt="" />)
        }
        if (emptyNum) {
            for (let i = 0; i < emptyNum; i++) {
                startArr.push(<img className='start' key={'starEmpty' + i} src={starEmpty} alt="" />)
            }
        }
        return startArr;
    }
    // allStart()

    return (
        <div>
            星星组件：{allStart()}
        </div>
    );
}

export default StartScore;
