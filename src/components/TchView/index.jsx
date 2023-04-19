import { Button, Dropdown, Menu, Select, Space, Table, Tabs, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { reqGetAllStudents, reqGetAllTeachers } from '../../api';
import memoryUtils from '../../utils/memoryUtils';
import { DownOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';

const onChange = (key) => {
    // console.log(key);
};
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        filters: [],
        filterMode: 'tree',
        filterSearch: true,
        // filterSearch: (value, item) => {
        //   console.log('value, item', value, item)
        //   return item.title.includes(value)
        // },
        onFilter: (value, record) => {
            // console.log('value, record', value, record)
            return record.name.includes(value)
        },
        width: '30%',
    },
    {
        title: '志愿一',
        dataIndex: 'value1',
        filters: [],
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value, record) => {
            // console.log(2222, value, record)
            return value === record.value1 || value === record.value2 || value === record.value3
        },
        sorter: (a, b) => {
            // console.log(a, b)
            return a.value1.localeCompare(b.value1)
        },
        // sortDirections: ['descend'],
    },
    {
        title: '志愿二',
        dataIndex: 'value2',
        filters: [],
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value, record) => {
            // console.log(2222, value, record)
            return value === record.value1 || value === record.value2 || value === record.value3
        },
        sorter: (a, b) => a.value2.localeCompare(b.value2),
    },
    {
        title: '志愿三',
        dataIndex: 'value3',
        filters: [],
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value, record) => {
            // console.log(2222, value, record)
            return value === record.value1 || value === record.value2 || value === record.value3
        },
        sorter: (a, b) => {
            // console.log('111111', a, b)
            return a.value3.localeCompare(b.value3)
        },
    },

];

const onChangeTable = (pagination, filters, sorter, extra) => {
    // console.log('params', pagination, filters, sorter, extra);
};

// 下拉菜单
const handleMenuClick = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
};

const menuProps = {
    // items,
    onClick: handleMenuClick,
};

const onChangeSelected = (value) => {
    console.log(`selected ${value}`);
};
const onSearch = (value) => {
    console.log('search:', value);
};


const Index = (props) => {

    const [stuInfo, setStuInfo] = useState()
    const [chooseMyStuInfo, setChooseMyStuInfo] = useState()
    const [allTeachersInfo, setAllTeachersInfo] = useState(columns);
    const [selectItems, setSelectItems] = useState([{ value: '老师A', label: '老师A' }, { value: '老师B', label: '老师B', }]);
    const refSelect = useRef(null)

    const { role } = props

    const getStuInfo = async () => {
        const { status, msg, data } = await reqGetAllStudents(memoryUtils.user.userSubject)
        console.log('调起查找学生的接口', status, msg, data)
        if (status === 200) {
            // console.log('传过来的该专业下的学生：', data)
            const stuData = []
            data.map((value, index, array) => {
                const { userId, username, valueThu } = value
                stuData.push(
                    {
                        key: userId,
                        name: username,
                        value1: valueThu ? valueThu.value1.username : '【暂未选择】',
                        value2: valueThu ? valueThu.value2.username : '【暂未选择】',
                        value3: valueThu ? valueThu.value3.username : '【暂未选择】',
                    },
                )
                // if (memoryUtils.user.userRole === '专业负责人') {
                //     stuData.forEach((value, index, array) => {
                //         value['chooseTch'] = (
                //             <Dropdown
                //                 menu={{
                //                     items,
                //                 }}
                //             >
                //                 <a onClick={(e) => e.preventDefault()}>
                //                     <Space>
                //                         Hover me
                //                         <DownOutlined />
                //                     </Space>
                //                 </a>
                //             </Dropdown>
                //         )
                //     })
                // }
            })
            setStuInfo(stuData)

            const chooseMyStu = stuData.filter((value, index, array) => {
                const name = memoryUtils.user.username
                // console.log(name, value.value1, value.value2, value.value3)
                // console.log(value.value1 === name || value.value2 === name || value.value3 === name)
                return value.value1 === name || value.value2 === name || value.value3 === name
            })
            // console.log('-------', chooseMyStu)
            setChooseMyStuInfo(chooseMyStu)
        } else {
            message.error({
                content: `${status}：${msg}`,
                duration: 2
            })
        }
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
            }).map((value, index, array) => {
                return {
                    id: value.userId,
                    text: value.username,
                    value: value.username,
                }
            })
            console.log('!!!!!', subjectData)
            // setSelectItems(subjectData)

            const pipeiThu = subjectData.map((value) => {
                // console.log(Object.assign({ ...value }, { label: value.text }))
                // return Object.assign({ ...value }, { label: value.text })
                return { ...value, label: value.text }
            })
            console.log('???', pipeiThu)
            setSelectItems(pipeiThu)
            refSelect.current = pipeiThu
            // const
            if (memoryUtils.user.userRole === '专业负责人') {
                setAllTeachersInfo((data) => {
                    console.log('\\\\', data)
                    data.push({
                        title: '导师匹配',
                        dataIndex: 'chooseTch',
                        filters: [],
                        filterMode: 'tree',
                        filterSearch: true,
                        onFilter: (value, record) => {
                            // console.log(2222, value, record)
                            return value === record.value1 || value === record.value2 || value === record.value3
                        },
                        render: () => (
                            // <Space size="middle">
                            //     <Dropdown overlay={menu}>
                            //         <a>More <DownOutlined /></a>
                            //     </Dropdown>
                            // </Space>
                            <Select
                                showSearch
                                placeholder="请匹配导师 "
                                optionFilterProp="children"
                                onChange={onChangeSelected}
                                onSearch={onSearch}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                // options={selectItems}
                                options={refSelect.current}
                            />
                        )
                    })
                    return data
                })
            }
            setAllTeachersInfo((data) => {
                // console.log(',,,,', data)
                data.forEach((value, index, array) => {
                    return value.filters = subjectData
                })
                // console.log('....', data)
                return data
            })
        } else {
            message.error({
                content: `${status}：${msg}`,
                duration: 2
            })
        }
    }
    useEffect(() => {
        getStuInfo()
        allTch()
        console.log('????我数据呢')
    }, []);


    return (
        <div>
            {/* 教师视角 */}
            <Tabs defaultActiveKey="1" onChange={onChange}>
                <Tabs.TabPane tab="所有同学" key="1">
                    <Table columns={allTeachersInfo} dataSource={stuInfo} onChange={onChangeTable} />
                </Tabs.TabPane>
                {
                    role === '专业负责人' ? null :
                        <Tabs.TabPane tab="选择我的同学" key="2">
                            <Table columns={allTeachersInfo} dataSource={chooseMyStuInfo} onChange={onChangeTable} />
                        </Tabs.TabPane>
                }
            </Tabs>
        </div>
    );
}

export default Index;
