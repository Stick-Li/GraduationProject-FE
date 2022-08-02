import React, { useState, useEffect } from 'react'
import { Button, Card, Table, Modal, Form, Input, message } from 'antd';
import './index.less'
import { reqAddRole, reqGetRoles } from '../../api';
import { useForm } from 'antd/es/form/Form';

export default function Role() {

    // const formRef = createRef()
    const [form] = useForm()
    const [role, setRole] = useState({});
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    // const [modalText, setModalText] = useState('新增角色的input框');
    const [roleData, setRoleData] = useState([]);


    const columns = [
        {
            title: '身份名称',
            dataIndex: 'roleName',
            // key: 'name'
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            // key: 'create_time'
        },
        {
            title: '授权时间',
            dataIndex: 'authTime',
            // key: 'auth_time'
        },
        {
            title: '授权人',
            dataIndex: 'authName',
            // key: 'auth_name'
        },
    ]

    const onRow = (role) => {
        return {
            onClick: event => { // 点击行
                console.log('row onClick()', role)
                setRole(role)
            },
        }
    }

    const showModal = () => {
        setVisible(true);
    };
    const submitShow = async () => {
        // console.log('-------', form)

        // console.log('1ref.current', formRef.current)
        setConfirmLoading(true);
        // const role = formRef.current.getFieldValue('newRole')
        const role = form.getFieldValue('newRole')
        // 添加新角色的接口
        const { status, msg } = await reqAddRole({ role, createTime: Date.now() })
        // console.log('接口返回的值：', result)
        // console.log('2ref.current', formRef)
        if (status === 200) {
            setVisible(false);
            setConfirmLoading(false);
            message.success({
                content: `${msg}`,
                duration: 2
            })

            form.resetFields()
            getRoles()
        } else {
            setConfirmLoading(false);
            message.error({
                content: `${status}：${msg}`,
                duration: 2
            })
        }
    };
    const cancelShow = () => {
        console.log('点击了取消按键');
        setVisible(false);
    };

    const card_header = (
        <span>
            <Button type="primary" onClick={showModal} className='cardBtn'>新建角色</Button>
            <Button type="primary" className='cardBtn'>添加权限</Button>
        </span>
    )

    const getRoles = async () => {
        const { status, msg, data } = await reqGetRoles()
        if (status === 200) {
            setRoleData(data)
            console.log('拿到数据')
        } else {
            message.error({
                content: `${status}：${msg}`,
                duration: 2
            })
        }
        console.log('2.roleData', data)
    }
    useEffect(() => {
        console.log('1.roleData', roleData)
        // 接口，这里获取role的数据（获取的数据分为有和无两种情况）
        getRoles()
    }, []);// eslint-disable-line


    return (
        <>
            <Card
                // title="Default size card"
                extra={card_header}
                className='right-content-card'
            >
                <Table
                    bordered
                    // rowKey={user => user.key}
                    rowKey={user => user._id}
                    columns={columns}
                    dataSource={roleData}
                    // dataSource={roleData}   // 列表值 行
                    rowSelection={{
                        type: 'radio',
                        selectedRowKeys: [role._id],
                        // selectedRowKeys: [role.key],
                        onSelect: (role) => { // 选择某个radio时回调
                            console.log(role)
                            setRole(role)
                        }
                    }}
                    onRow={onRow}
                // pagination={{ defaultPageSize: PAGE_SIZE }}
                >
                </Table>
                <Modal
                    title="新增身份"
                    visible={visible}   // 是否弹出对话框
                    onOk={submitShow}
                    confirmLoading={confirmLoading} // 确定按钮 isloading
                    onCancel={cancelShow}
                    getContainer={false}    // form清空
                >
                    {/* <p>{modalText}</p> */}
                    <Form
                        name="normal_role"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        // onFinish={onFinish}
                        // ref={formRef}
                        form={form}     // form清空
                    >

                        <Form.Item
                            // label=" "
                            name="newRole"
                            rules={[
                                {
                                    required: true,
                                    message: '输入不得为空！',
                                },
                            ]}
                        >
                            <Input placeholder="新增身份角色" />
                        </Form.Item>
                        {/* <Form.Item>
                            <Button type="primary" htmlType="submit">
                                确定
                            </Button>
                        </Form.Item> */}
                    </Form>
                </Modal>
            </Card>
        </>
    )
}