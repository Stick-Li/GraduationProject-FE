import { Alert, Avatar, Button, List, Select, Skeleton, Tooltip } from 'antd';
import React, { useState } from 'react';
import { reqSelectTeachers } from '../../api';
import SelectiveSeq from '../../components/SelectiveSeq'
import memoryUtils from '../../utils/memoryUtils';

const data = [
  {
    userId: '190201323',
    username: '姜饼人老师',
    title: 'Ant Design Title 1',
  },
  {
    userId: '190201324',
    username: '姜饼人老师2',
    title: 'Ant Design Title 2',
  },
  {
    userId: '190201325',
    username: '姜饼人老师3',
    title: 'Ant Design Title 3',
  },
  {
    userId: '190201326',
    username: '姜饼人老师4',
    title: 'Ant Design Title 4',
  },
];
let selectInfo = new Map()

const App = () => {
  const [isAllSelect, setIsAllSelect] = useState(false);
  // const [isDisabledValue, setIsDisabledValue] = useState(false);
  // const [isDisabledValue, setIsDisabledValue] = useState([false, false, false]);
  const [isDisabledValue, setIsDisabledValue] = useState({ "value1": false, "value2": false, "value3": false });


  const getSelectState = (valueSql, valueInfo) => {


    if (valueSql === undefined) {
      console.log('警报！undefined！', valueSql, valueInfo)

      for (const [key, value] of selectInfo.entries()) {
        console.log('key, value', key, value)
        if (JSON.stringify(value) === JSON.stringify(valueInfo)) {
          selectInfo.delete(key)
          // let newIsDisabledValue = [...isDisabledValue]
          let newIsDisabledValue = { ...isDisabledValue }
          newIsDisabledValue[key] = false
          setIsDisabledValue(newIsDisabledValue)
          console.log(3, selectInfo)
        }
        break;
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
      selectInfoObj[key] = value.userId
    }
    // console.log(selectInfoObj)
    const result = await reqSelectTeachers([memoryUtils.user._id, selectInfoObj])
    console.log('===添加志愿老师的请求', result)

  }
  return (
    <>
      {/* <Alert message="选择完毕后点击“确定选择”提交" type="info" showIcon />
      <button>所有导师</button>
      <button>已经选择</button>
      <Tooltip placement="topLeft" title={'请先选择三名志愿导师'}>
        <Button disabled={!(selectInfo.size === 3)} onClick={submitSelect}>确定选择</Button>
      </Tooltip>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            actions={
              [<a key="list-loadmore-more">more</a>,
              <SelectiveSeq key={item.userId} selectInfo={item} getSelectState={getSelectState} isAllSelect={isAllSelect} isDisabledValue={isDisabledValue} />
              ]
            }
          >
            <List.Item.Meta
              avatar={<Avatar src="" />}
              title={<span>{item.username}</span>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      /> */}
    </>
  )
};
export default App;