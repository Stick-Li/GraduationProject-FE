import { Select } from 'antd';
import React, { useState } from 'react';

const Index = (props) => {
    // const [isDisabledValue, setIsDisabledValue] = useState([false, false, false]);
    // let isAllSelect = []

    let { isAllSelect, isDisabledValue } = props

    const handleChange = (value) => {
        // console.log(`selected ${value}`, props.selectInfo);
        props.getSelectState(value, props.selectInfo)
        // console.log('子组件渲染顺序1')
    };
    // 当确认选择后将结果传递给后端
    return (
        <>
            {/* {console.log('[][][][]', isDisabledValue)} */}
            {/* {console.log('子组件渲染顺序2')} */}
            <Select
                defaultValue=""
                style={{
                    width: 85,
                }}
                disabled={isAllSelect}
                onChange={handleChange}
                allowClear
                options={[
                    {
                        // value: 0,
                        // disabled: isDisabledValue[0],
                        value: 'value1',
                        disabled: isDisabledValue['value1'],
                        label: '志愿一',
                    },
                    {
                        value: 'value2',
                        disabled: isDisabledValue['value2'],
                        label: '志愿二',
                    },
                    {
                        value: 'value3',
                        disabled: isDisabledValue['value3'],
                        label: '志愿三',
                    },
                ]}
            />
        </>
    );
}

export default Index;
