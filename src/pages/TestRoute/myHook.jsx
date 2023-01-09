import React, { useState, useEffect, useRef } from 'react'

export default function useCount(receive) {
    // console.log('---', receive)
    const [count, setCount] = useState(receive);

    const timerRef = useRef(null)  //ref不走状态更新

    useEffect(() => {
        // console.log('+++', count) // 7
        // setCount((e) => e - 1)
        // console.log('+++', count)   // 7??
        timerRef.current = setInterval(() => {
            setCount((e) => e - 1)
        }, 1000);
        return () => {
            clearInterval(timerRef.current)
        }
    }, []);     // 只执行一次（调用的时候）
    useEffect(() => {
        console.log(count)
        if (count === 0) {
            clearInterval(timerRef.current)
        }
    }, [count]);    // 每次count变化的时候执行

    return [count]
}
