import { Button, Card, Form, Input, message, Modal, Space, Table, Tag } from 'antd';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { reqAddDepartment, reqAddMajor, reqGetAllDept, reqGetAllMajor, reqUpdateDepartment } from '../../api';



const Index = () => {

    const [formDept] = Form.useForm();
    const [formDeptUpdate] = Form.useForm()
    const [formMajor] = Form.useForm()

    const [visibleUpdateName, setVisibleUpdateName] = useState(false);
    const [visibleAddDept, setVisibleAddDept] = useState(false);
    const [visibleAddMajor, setVisibleAddMajor] = useState(false);
    const [loading, setLoading] = useState(true);

    const [major, setMajor] = useState();
    const [allDeptInfo, setAllDeptInfo] = useState();
    const [allMajorInfo, setAllMajorInfo] = useState();
    const [clickDeptInfo, setClickDeptInfo] = useState();
    const [clickDeptForMajor, setClickDeptForMajor] = useState();


    const showAddDept = () => {
        console.log('点击更新2')
        setVisibleAddDept(true)
    }
    const submitAddDept = async () => {
        const formValue = formDept.getFieldsValue()
        console.log('获取form的值', formValue)
        const { status, msg } = await reqAddDepartment(formValue)
        if (status === 200) {
            message.success({
                content: msg,
                duration: 2,
            });
            setVisibleAddDept(false);
            getAllDept()
        } else {
            message.error({
                content: `${status}：${msg}`,
                duration: 2
            })
        }
    };
    const cancelAddDept = () => {
        setVisibleAddDept(false);
        formDept.resetFields()
    };


    const showUpdateName = (deptData) => {
        console.log('点击更新，获取点击的值', deptData)
        formDeptUpdate.setFieldsValue(deptData)
        setClickDeptInfo(deptData)
        setVisibleUpdateName(true)
    }
    const submitUpdateName = async () => {
        const formValue = formDeptUpdate.getFieldsValue()
        console.log('获取form2的值', formValue)
        // if (JSON.stringify(clickDeptInfo.deptName) === JSON.stringify(formValue.deptName)) {
        if (clickDeptInfo.deptName === formValue.deptName) {
            console.log('相同，不用调起改变的接口')
        } else {
            console.log('不同，改变了，吊起改变接口')
            const { status, msg } = await reqUpdateDepartment(formValue)
            if (status === 200) {
                message.success({
                    content: msg,
                    duration: 2,
                });
                setVisibleAddDept(false);
                getAllDept()
            } else {
                message.error({
                    content: `${status}：${msg}`,
                    duration: 2
                })
            }
        }
        setVisibleUpdateName(false);
    };
    const cancelUpdateName = () => {
        setVisibleUpdateName(false);
        formDeptUpdate.resetFields()
    };

    const getDBMajorInfo = async (majorData) => {
        const { status, msg, data } = await reqGetAllMajor(majorData.deptId)
        if (status === 200) {
            console.log('拿到的数据：', data)
            setAllMajorInfo(data)
        } else {
            message.error({
                content: `${status}：${msg}`,
                duration: 2
            })
        }
    }

    const getAllMajors = (majorData) => {
        console.log('点击跳转至学院包含的专业')
        console.log('点击，获取点击的值', majorData)
        // {key: '63b8103d93b2521e5c9c06b1', deptName: '商学院', deptId: 2}
        setClickDeptForMajor(majorData)

        setMajor(columns2)  // 获取专业并渲染到页面

        getDBMajorInfo(majorData)
    }
    const showAddMajor = () => {
        setVisibleAddMajor(true)
    }
    const submitAddMajor = async () => {
        const formValue = formMajor.getFieldsValue()
        console.log('获取formMajor1的值', formValue)
        // {majorId: '080901', majorName: '计算机科学与技术'}
        let newData = { ...clickDeptForMajor, ...formValue }
        newData.key = "" + clickDeptForMajor.deptId + "-" + formValue.majorId
        const { status, msg } = await reqAddMajor(newData)
        if (status === 200) {
            message.success({
                content: msg,
                duration: 2,
            });
            setVisibleAddMajor(false);
            getDBMajorInfo(clickDeptForMajor)
            // getAllMajors()s
            formMajor.resetFields()

        } else {
            message.error({
                content: `${status}：${msg}`,
                duration: 2
            })
        }
    };
    const cancelAddMajor = () => {
        setVisibleAddMajor(false);
        formMajor.resetFields()
    };

    const columns = [
        {
            title: '二级学院',
            dataIndex: 'deptName',
            key: 'deptName',
            render: (text) => <a>{text}</a>,
        },
        {
            title: '学院代码',
            dataIndex: 'deptId',
            key: 'deptId',
        },
        // {
        //     title: 'Address',
        //     dataIndex: 'address',
        //     key: 'address',
        // },
        {
            title: '',
            key: 'action',
            // width: 200,
            align: 'right',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => { showUpdateName(record) }}>修改学院</a>
                    <a onClick={() => { getAllMajors(record) }}>查看专业</a>
                </Space>
            ),
        },
    ];
    const columns2 = [
        {
            title: '包含专业',
            dataIndex: 'majorName',
            key: 'majorName',
            render: (text) => <a>{text}</a>,
        },
        {
            title: '专业代码',
            dataIndex: 'majorId',
            key: 'majorId',
        },
        {
            title: '',
            key: 'action',
            // width: 200,
            align: 'right',
            render: (_, record) => (
                <Space size="middle">
                    {/* <a onClick={() => { showUpdateName(record) }}>修改学院</a> */}
                    <a>修改专业</a>
                </Space>
            ),
        },
    ];


    const title = major ? (
        <span>
            <span onClick={() => setMajor(false)} style={{ 'color': '#1890ff' }}>二级学院列表</span>
            <span>-&gt;{clickDeptForMajor.deptName ? clickDeptForMajor.deptName : '123'}&nbsp;包含专业</span>
        </span>
    ) : (
        <span>
            <span>二级学院列表</span>
            <span style={{ 'display': 'none' }}>-&gt;包含专业</span>
        </span>
    )

    const extra = major ?
        <>
            <Button onClick={() => { showAddMajor(true) }}>新增专业</Button>
            <Modal
                title='新增专业'
                visible={visibleAddMajor}
                onOk={submitAddMajor}
                onCancel={cancelAddMajor}
            >
                <Form
                    form={formMajor}
                >
                    <Form.Item
                        label="专业编号"
                        name="majorId"
                        rules={[
                            {
                                required: true,
                                message: '输入不得为空！',
                                type: Number
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="专业名称"
                        name="majorName"
                        rules={[
                            {
                                required: true,
                                message: '输入不得为空！',
                                type: String
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
        :
        <>
            <Button onClick={() => { showAddDept(true) }}>新增学院</Button>
            <Modal
                title='新增学院'
                visible={visibleAddDept}
                onOk={submitAddDept}
                onCancel={cancelAddDept}
            >
                <Form
                    form={formDept}
                >
                    <Form.Item
                        label="学院编号"
                        name="deptId"
                        rules={[
                            {
                                required: true,
                                message: '输入不得为空！',
                                type: Number
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="学院名称"
                        name="deptName"
                        rules={[
                            {
                                required: true,
                                message: '输入不得为空！',
                                type: String
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>

    const getAllDept = async () => {
        const { status, msg, data } = await reqGetAllDept()
        setLoading(false)
        if (status === 200) {
            console.log('拿到的数据：', data)
            let newData = []
            data.forEach((value) => {
                newData.push({
                    key: value._id,
                    deptName: value.deptName,
                    deptId: value.deptId,
                })
            })
            setAllDeptInfo(newData)
            console.log('新的数据', newData)
        } else {
            message.error({
                content: `${status}：${msg}`,
                duration: 2
            })
        }
    }
    useEffect(() => {
        getAllDept()
    }, [])


    return (
        <>
            {
                loading ?
                    <h1>loading...</h1>
                    :
                    <Card
                        title={title}
                        extra={extra}
                        className='right-content-card'
                    >
                        <Table columns={major ? columns2 : columns} dataSource={major ? allMajorInfo : allDeptInfo} />
                        <Modal
                            title='更改学院名称'
                            visible={visibleUpdateName}
                            onOk={submitUpdateName}
                            onCancel={cancelUpdateName}
                        >
                            <Form
                                form={formDeptUpdate}
                            >
                                <Form.Item
                                    label="学院编号"
                                    name="deptId"
                                    rules={[
                                        {
                                            required: true,
                                            message: '输入不得为空！',
                                            type: Number
                                        },
                                    ]}
                                >
                                    <Input disabled />
                                </Form.Item>
                                <Form.Item
                                    label="学院名称"
                                    name="deptName"
                                    rules={[
                                        {
                                            required: true,
                                            message: '输入不得为空！',
                                            type: String
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Form>
                        </Modal>
                    </Card>
            }

        </>
    );
}

export default Index;
