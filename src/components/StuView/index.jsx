import { Alert, Avatar, Button, List, message, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { reqGetAllTeachers, reqIsHaveStuValue, reqSelectTeachers } from '../../api';
import SelectiveSeq from '../SelectiveSeq'
import memoryUtils from '../../utils/memoryUtils';
import { UserOutlined } from '@ant-design/icons';

let selectInfo = new Map()

// console.log('1-1')

const App = () => {
    const [isAllSelect, setIsAllSelect] = useState(false);
    const [isDisabledValue, setIsDisabledValue] = useState({ "value1": false, "value2": false, "value3": false });
    const [isHaveStuValue, setIsHaveStuValue] = useState();
    const [allTeachersInfo, setAllTeachersInfo] = useState();
    // const [refresh, setRefresh] = useState();

    const getSelectState = (valueSql, valueInfo) => {
        if (valueSql === undefined) {
            console.log('警报！undefined！', valueSql, valueInfo)

            for (const [key, value] of selectInfo.entries()) {
                // console.log('key, value', key, value)
                if (JSON.stringify(value) === JSON.stringify(valueInfo)) {
                    // if (value === valueInfo.userId) {
                    selectInfo.delete(key)
                    // let newIsDisabledValue = [...isDisabledValue]
                    let newIsDisabledValue = { ...isDisabledValue }
                    newIsDisabledValue[key] = false
                    setIsDisabledValue(newIsDisabledValue)
                    // console.log(3, selectInfo)
                    break;
                }
            }
        } else {
            // 感觉对象和map没啥区别 是的
            if (!selectInfo.has(valueSql)) {
                // console.log(1, selectInfo)
                selectInfo.set(valueSql, valueInfo)
                // console.log(2, selectInfo)

                setIsDisabledValue(true)

                // let newIsDisabledValue = [...isDisabledValue]
                let newIsDisabledValue = { ...isDisabledValue }
                newIsDisabledValue[valueSql] = true
                setIsDisabledValue(newIsDisabledValue)
            }
        }

        // if (selectInfo.size === 3) {
        //   const result = await reqSelectTeachers(selectInfo)
        //   console.log('===添加志愿老师的请求', result)
        // }

        // console.log('getSelectState', valueSql, valueInfo, selectInfo)
        // console.log('父组件渲染顺序1')

    }
    const submitSelect = async () => {
        // 向后端传递数据 向local storage存储志愿顺序
        let selectInfoObj = {}
        for (const [key, value] of selectInfo.entries()) {
            // selectInfoObj[key] = value.userId
            selectInfoObj[key] = value
        }
        // console.log(selectInfo)
        // console.log(selectInfoObj)
        // 我_id变化了？？？？？？？,
        const { status, msg } = await reqSelectTeachers([memoryUtils.user.userId, selectInfoObj])
        // console.log('===添加志愿老师的请求', status, msg)
        if (status === 200) {
            message.success({
                content: msg,
                duration: 2,
            });
            getStuValue()
        } else {
            message.error({
                content: `${status}：${msg}`,
                duration: 2
            })
        }
        // 点击确定选择刷新页面

    }

    const getStuValue = async () => {
        const { status, data } = await reqIsHaveStuValue(memoryUtils.user.userId)

        if (status === 200) {
            let chooseTeachersInfo = []
            for (let i = 1; i <= 3; i++) {
                chooseTeachersInfo.push({
                    userId: data['value' + i].userId,
                    username: data['value' + i].username,
                    title: '还没想好写啥',
                })
            }
            // console.log('data', data)
            // console.log('chooseTeachersInfo', chooseTeachersInfo)
            setIsHaveStuValue(chooseTeachersInfo)
        } else {
            allTch()       //该用户还未选择导师，此时显示所有导师数据
        }
        // console.log(status, data)
        // console.log('-----', isHaveStuValue)
    }

    const allTch = async () => {
        // 按专业查询老师
        const { status, msg, data } = await reqGetAllTeachers()
        if (status === 200) {
            // 做一个数据加载出来前的加载效果
            // console.log('data', data)
            // console.log('memoryUtils.user', memoryUtils.user)
            // 根据当前专业筛选老师 data.userSubject: "工业设计"
            const subjectData = data.filter((value, index, array) => {
                return value.userSubject === memoryUtils.user.userSubject
            })
            const dataWithTitle = subjectData.map((value, index, array) => {
                if (value.userId == '000201324') {
                    return { ...value, titles: '某管理系统的的设计与实现 | 某后台项目的的设计与实现' }
                }
                return value
            })
            console.log(dataWithTitle, '!!!!!!')
            setAllTeachersInfo(dataWithTitle)
        } else {
            message.error({
                content: `${status}：${msg}`,
                duration: 2
            })
        }
    }

    useEffect(() => {
        // console.log('isHaveStuValue', isHaveStuValue)
        // console.log('memoryUtils.user.valueThu', memoryUtils.user.valueThu)
        let stuValue = []
        for (const key in memoryUtils.user.valueThu) {
            stuValue.push(memoryUtils.user.valueThu[key])
        }
        if (memoryUtils.user.valueThu) {
            console.log('1.登录时学生已经选择老师了，IsHaveStuValue为true')
            setIsHaveStuValue(stuValue)
        } else {
            console.log('2.登录时学生还没选老师，所以信息没有被存储到webStorage，要去数据库中再找找看有没有选')
            getStuValue()
        }
    }, []);

    console.log('1-2')
    return (
        // <>啥啊</>
        <>
            {
                // console.log('1-3'),
                memoryUtils.user.valueThu || isHaveStuValue ?
                    (
                        <>
                            <span>我的志愿</span>
                            <List
                                itemLayout="horizontal"
                                dataSource={isHaveStuValue || undefined}
                                renderItem={(item, index) => (
                                    <List.Item
                                        actions={[<a key="list-loadmore-more">more</a>]}
                                    >
                                        <List.Item.Meta
                                            avatar={
                                                <>
                                                    <span style={{ 'margin': '0 10px 0 0 ' }}>志愿{index + 1}</span>
                                                    <Avatar icon={<UserOutlined />} className='userImg' />
                                                </>
                                            }
                                            title={<span>{item.username}</span>}
                                            description={item.titles}
                                        />
                                    </List.Item>
                                )}
                            />
                        </>
                    )
                    :
                    (
                        <>
                            <span>选择志愿</span>
                            <Alert message="选择完毕后点击“确定选择”提交" type="info" showIcon />
                            <Tooltip placement="topLeft" title={'请先选择三名志愿导师'}>
                                <Button disabled={!(selectInfo.size === 3)} onClick={submitSelect}>确定选择</Button>
                            </Tooltip>
                            <List
                                itemLayout="horizontal"
                                dataSource={allTeachersInfo}
                                renderItem={(item) => (
                                    <List.Item
                                        actions={
                                            [<a key="list-loadmore-more">more</a>,
                                            <SelectiveSeq key={item.userId} selectInfo={item} getSelectState={getSelectState} isAllSelect={isAllSelect} isDisabledValue={isDisabledValue} />
                                            ]
                                        }
                                    >
                                        <List.Item.Meta
                                            avatar={<Avatar icon={<UserOutlined />} className='userImg' />}
                                            title={<span>{item.username}</span>}
                                            description={item.titles}
                                        />
                                    </List.Item>
                                )}
                            />
                        </>
                    )
            }
        </>
    )
};
export default App;