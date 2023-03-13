import React, { useEffect, useRef, useState } from 'react';
import './MyModal.css'
const MyModal = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const { content } = props
    // 在第一次渲染时取 body 原始的 overflow 值
    const bodyOverflow = useRef(window.getComputedStyle(document.body).overflow);
    function handleClick(event) {
        // event.target指向触发事件的元素, event.currentTarget指向事件绑定的元素
        // 点击蒙层本身时关闭模态框，点击模态框的内容时不关闭
        if (event.target === event.currentTarget) {
            setModalVisible(false)
        }
    }
    useEffect(() => {
        if (modalVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = bodyOverflow.current;
        }
    }, [modalVisible]);
    useEffect(() => {
        // 组件销毁时恢复 body 的 overflow 值
        return () => {
            document.body.style.overflow = bodyOverflow.current;
        }
    }, []);
    return (
        <>
            <button onClick={() => setModalVisible(true)}>点击打开</button>
            <div id='modalAll' onClick={handleClick} style={modalVisible ? null : { display: 'none' }}>
                <div id="modalBox">
                    <span onClick={() => setModalVisible(false)}>×</span>
                    {content}
                </div>
            </div>
        </>
    );
}
// 我没有挂载到body上

export default MyModal;
