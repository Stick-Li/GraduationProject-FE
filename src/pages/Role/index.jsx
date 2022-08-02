import React, { useState, useEffect } from 'react'
import { Button, Card, Table, Modal, message } from 'antd';
import './index.less'
import { reqAddRole, reqGetRoles } from '../../api';

import RoleAdd from '../RoleAdd';
import RolePower from '../RolePower'

export default function Role() {

    // const [form] = useForm()
    const [form, setForm] = useState({});
    const [role, setRole] = useState({});
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [roleData, setRoleData] = useState([]);

    const [visiblePower, setVisiblePower] = useState(false)
    const [confirmLoadingPower, setConfirmLoadingPower] = useState(false);


    // 角色管理table部分
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
    // 时间戳转换：1659411810317 -> "2022-8-2 11:43:30"
    const changeTime = (n) => {
        n = new Date(n)     // promise?
        return n.toLocaleDateString().replace(/\//g, "-") + " " + n.toTimeString().substr(0, 8)
    }
    const changeDataTime = (roles) => {
        return roles.map((oneRole) => {
            return {
                ...oneRole,
                createTime: changeTime(oneRole.createTime)
            }
        })
    }
    const getRoles = async () => {
        const { status, msg, data } = await reqGetRoles()
        if (status === 200) {
            setRoleData(changeDataTime(data))
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

    // 新建角色部分
    const showAddModal = () => {
        setVisible(true);
    };
    const submitAddShow = async () => {
        // console.log('-------', form)
        setConfirmLoading(true);
        // const role = formRef.current.getFieldValue('newRole')
        const role = form.getFieldValue('newRole')
        // 添加新角色的接口
        const { status, msg } = await reqAddRole({ role, createTime: Date.now() })
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
    const cancelAddShow = () => {
        console.log('点击了取消按键');
        setVisible(false);
    };
    const getForm = (e) => {
        console.log('子组件RoleAdd传来的值', e)
        setForm(e)
    }

    // 添加权限部分
    const showPowerModal = () => {
        setVisiblePower(true);
    };
    const submitPowerShow = () => {
        // setModalText1('The modal will be closed after two seconds');
        setConfirmLoadingPower(true);
        setTimeout(() => {
            setVisiblePower(false);
            setConfirmLoadingPower(false);
        }, 2000);
    };
    const cancelPowerShow = () => {
        console.log('Clicked cancel button');
        setVisiblePower(false);
    };


    const card_header = (
        <span>
            <Button type="primary" onClick={showAddModal} className='cardBtn'>新建角色</Button>
            <Button type="primary" onClick={showPowerModal} className='cardBtn'>添加权限</Button>
        </span>
    )

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
                    onOk={submitAddShow}
                    confirmLoading={confirmLoading} // 确定按钮 isloading
                    onCancel={cancelAddShow}
                    getContainer={false}    // form清空
                >
                    {/* <p>{modalText}</p> */}
                    <RoleAdd getForm={getForm} />
                </Modal>
                <Modal
                    title="设置权限"
                    visible={visiblePower}   // 是否弹出对话框
                    onOk={submitPowerShow}
                    confirmLoading={confirmLoadingPower} // 确定按钮 isloading
                    onCancel={cancelPowerShow}
                // getContainer={false}    // form清空
                >
                    <RolePower />
                </Modal>
            </Card>
        </>
    )
}