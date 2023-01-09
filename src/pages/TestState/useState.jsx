import React, { memo, useMemo, useState } from 'react';
import { useCallback } from 'react';

const Child = (props) => {
    console.log('   --执行子组件--   ')
    return (
        <>
            <span onClick={props.fn}>嘿这里是子组件,</span>
            <span >父组件传递过来的值：{props.m}</span>
        </>
    )
}
const ChildMemo = memo(Child) // 或者直接在Child的箭头函数外面套一个memo

const UseState = () => {
    const [n, setN] = useState(0);
    const [m, setM] = useState(10);

    const onClickChild = useMemo(
        () => {
            console.log('一个平平无奇的监听函数')
        }, [m]
    )
    const onClickChild2 = useCallback(
        () => {
            console.log('一个平平无奇的监听函数')
        }, [m]
    )

    console.log('-----执行父组件-----', 'n', n, 'm', m)
    return (
        <div>
            <span>这里是父组件</span>
            <button onClick={() => { setN(n + 1) }}>n：{n}</button>
            <button onClick={() => { setM(m + 10) }}>m：{m}</button>
            <br />
            {/* <Child m={m} /> */}
            {/* <ChildMemo m={m} /> */}
            <ChildMemo m={m} fn={onClickChild2} />
        </div>
    );
}

export default UseState;
