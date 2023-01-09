import React, { Component, Fragment, useCallback, useMemo, useState } from 'react';
import { Button, Card, Space } from 'antd';
import useCount from '../TestRoute/myHook';
import { Route, Routes } from 'react-router-dom';
import Tab from '../../components/Tab'

import StartScore from '../../components/StartScore'
import StartScoreHandle from '../../components/StartScoreHandle'


// 原始结果:原始的时候,点击两个按钮中任意一个,两个子组件都会重新渲染

// // 子组件 BaseInfo：
// const BaseInfo = (props) => {
//   console.log('BaseInfo 重新渲染， props：', props)
//   const { title, dataSource = {} } = props

//   return (
//     <Card title={title}>
//       <div>姓名：{dataSource.name}</div>
//     </Card>
//   )
// }

// 测试一：修改子组件 BaseInfo 为 React.memo 包裹
// 结果一: 点击按钮BaseInfo, 两个子组件都渲染; 点击按钮OtherInfo 只渲染OtherInfo,不渲染memo包裹的点击按钮BaseInfo
const BaseInfo = React.memo((props) => {
    console.log('BaseInfo 重新渲染， props：', props)
    const { title, dataSource = {} } = props

    return (
        <Card title={title}>
            <div>姓名：{dataSource.name}</div>
        </Card>
    )
})

// 子组件 OtherInfo：
const OtherInfo = (props) => {
    console.log('OtherInfo 重新渲染， props：', props)
    const { title, dataSource } = props

    return (
        <Card title={title}>
            <div>学校：{dataSource.school}</div>
        </Card>
    )
}

// 父组件 FunctionTest：
const FunctionTest = () => {
    const [baseInfo, setBaseInfo] = useState({ name: '混沌' })
    const [otherInfo, setOtherInfo] = useState({ school: '上海大学' })

    // 测试二：在测试一的基础上，在父组件 FunctionTest 中添加引用类型 (对象/数组/方法)，并传给两个子组件
    // 结果二:点击任意一个按钮, 两个都重新渲染
    // const commonObject = useMemo(() => { { } }, [])

    const updateBaseInfo = useCallback(() => {
        console.log('更新BaseInfo组件：', baseInfo)
        setBaseInfo({ name: '饕餮' })
    }, [])
    const updateOtherInfo = useCallback(() => {
        console.log('更新OtherInfo组件：', otherInfo)
        setOtherInfo({ school: '河南大学' })
    }, [])


    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Space>
                <Button
                    onClick={() => {
                        console.log('点击-修改BaseInfo组件的信息')
                        setBaseInfo({ name: '貔貅' })
                    }}
                >修改BaseInfo组件的信息</Button>
                <Button onClick={() => {
                    console.log('点击-修改OtherInfo组件的信息')
                    setOtherInfo({ school: '北京大学' })
                }}
                >修改OtherInfo组件的信息</Button>
            </Space>

            <BaseInfo title="BaseInfo组件"
                dataSource={baseInfo}
                // commonObject={commonObject}
                updateBaseInfo={updateBaseInfo}
            />
            <OtherInfo title="OtherInfo组件"
                dataSource={otherInfo}
                // commonObject={commonObject}
                updateOtherInfo={updateOtherInfo}
            />
        </Space>
    )
}

const tabInfo = {
    'tab1': 'tab1内容',
    'tab2': 'tab2内容',
    'tab3': 'tab3内容',
}

const Index = () => {
    // const [count] = useCount(8)
    return (
        <div>
            <p>我写的组件们：</p>

            <h5>tab切换：</h5>
            <Tab tabInfo={tabInfo} />
            <hr />

            <h5>倒计时：</h5>
            {/* 倒计时：{count} */}
            <hr />

            <h5>星星打分：</h5>
            <StartScore score={3.6} />
            <StartScoreHandle />
            <hr />

            <h5>usememo:</h5>
            <Parent />


            {/* useMemo memo useCallback */}
            {/* <FunctionTest /> */}
        </div>
    );
}
export default Index;

const Parent = () => {
    const [count, setCount] = useState(0);
    const [son1Count, setSon1Count] = useState(0);
    const [son2Count, setSon2Count] = useState(0);
    return (
        <div>
            {console.log("Parent render")}
            <button onClick={() => setCount(v => v + 1)}>Parent + 1</button>
            <button onClick={() => setSon1Count(v => v + 1)}>Son1 + 1</button>
            <button onClick={() => setSon2Count(v => v + 1)}>Son2 + 1</button>
            <h3>Parent: {count}</h3>
            <Son1 son1Count={son1Count} />
            <Son2 son2Count={son2Count} />
        </div>
    );
};
const Son1 = React.memo((props) => {
    return (
        <div>
            {console.log("Son1 render")}
            Son1 : ( 父组件传来的值 ) {props.son1Count}
        </div>
    );
});
const Son2 = (props) => {
    return (
        <div>
            {console.log("Son2 render")}
            Son2 : ( 父组件传来的值 ) {props.son2Count}
        </div>
    );
};
// 子组件所依赖的值没发生变化就不需要重新渲染,只需将子组件用 React.memo 包裹即可
