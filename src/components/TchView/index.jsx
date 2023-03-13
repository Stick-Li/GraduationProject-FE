import { Table, Tabs } from 'antd';
import React from 'react';

const onChange = (key) => {
    console.log(key);
};
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        filters: [
            {
                text: '李1',
                value: '李1',
            },
            {
                text: '建',
                value: '建',
            },
            {
                text: 'lv youyou',
                value: 'lv youyou',
            },
        ],
        filterMode: 'tree',
        filterSearch: true,
        // filterSearch: (value, item) => {
        //   console.log('value, item', value, item)
        //   return item.title.includes(value)
        // },
        onFilter: (value, record) => {
            console.log('value, record', value, record)
            return record.name.includes(value)
        },
        width: '30%',
    },
    {
        title: '志愿一',
        dataIndex: 'value1',
        filters: [
            {
                text: '李1',
                value: '李1',
            },
            {
                text: '建',
                value: '建',
            },
            {
                text: 'lv youyou',
                value: 'lv youyou',
            },
        ],
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value, record) => {
            console.log(2222, value, record)
        },
        sorter: (a, b) => {
            console.log(a, b)
            return a.value1.localeCompare(b.value1)
        },
        // sortDirections: ['descend'],
    },
    {
        title: '志愿二',
        dataIndex: 'value2',
        filters: [
            {
                text: '李1',
                value: '李1',
            },
            {
                text: '建',
                value: '建',
            },
            {
                text: 'lv youyou',
                value: 'lv youyou',
            },
        ],
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value, record) => {
            console.log(2222, value, record)
        },
        sorter: (a, b) => a.value2.localeCompare(b.value2),
    },
    {
        title: '志愿三',
        dataIndex: 'value3',
        filters: [
            {
                text: '李1',
                value: '李1',
            },
            {
                text: '建',
                value: '建',
            },
            {
                text: 'lv youyou',
                value: 'lv youyou',
            },
        ],
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value, record) => {
            console.log(2222, value, record)
        },
        sorter: (a, b) => {
            // console.log('111111', a, b)
            return a.value3.localeCompare(b.value3)
        },
    },
    // {
    //     title: 'Address',
    //     dataIndex: 'address',
    //     filters: [
    //         {
    //             text: 'London',
    //             value: 'London',
    //         },
    //         {
    //             text: 'New York',
    //             value: 'New York',
    //         },
    //     ],
    //     onFilter: (value, record) => record.address.includes(value),
    //     filterSearch: true,
    //     width: '40%',
    // },
];
const data = [
    {
        key: '1',
        name: '李建勋',
        value1: '李老师',
        value2: '张老师',
        value3: '吴老师',
        // address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: '赵建国',
        value1: '查老师',
        value2: '陆老师',
        value3: '萧老师',
        // address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: '红小豆',
        value1: '胡老师',
        value2: '章老师',
        value3: '张老师',
        // address: 'Sidney No. 1 Lake Park',
    },
    {
        key: '4',
        name: '芋圆',
        value1: '王老师',
        value2: '刘老师',
        value3: '李老师',
        // address: 'London No. 2 Lake Park',
    },
];
const onChangeTable = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};
const Index = () => {
    return (
        <div>
            {/* 教师视角 */}
            <Tabs defaultActiveKey="1" onChange={onChange}>
                <Tabs.TabPane tab="所有同学" key="1">
                    <Table columns={columns} dataSource={data} onChange={onChangeTable} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="选择我的同学" key="2">
                    Content of Tab Pane 2
                </Tabs.TabPane>
            </Tabs>
        </div>
    );
}

export default Index;
