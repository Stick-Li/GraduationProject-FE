import React, { useState, useEffect } from 'react'
import { Button, Card, Table, Modal, message } from 'antd';
import './index.less'
import { reqAddRole, reqGetRoles, reqGetPower } from '../../api';

import RoleAdd from '../../components/Role/Add';
import RolePower from '../../components/Role/Power'
import memoryUtils from '../../utils/memoryUtils';

export default function Role() {

    const user = memoryUtils.user
    const [powerBtn, setPowerBtn] = useState(true);
    const [form, setForm] = useState({});
    const [role, setRole] = useState({});
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [rolesData, setRolesData] = useState([]);
    // const [chooseRoleId, setChooseRoleId] = useState('');

    const [visiblePower, setVisiblePower] = useState(false)     // showPowerModal?
    const [confirmLoadingPower, setConfirmLoadingPower] = useState(false);
    const [powerPath, setPowerPath] = useState([]);


    // 1.角色管理table部分
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
            dataIndex: 'powerTime',
            // key: 'auth_time'
        },
        {
            title: '授权人',
            dataIndex: 'powerUser',
            // key: 'auth_name'
        },
    ]
    const onRow = (role) => {
        return {
            onClick: event => { // 点击行
                console.log(2)
                console.log('row onClick()', role)
                setPowerBtn(false)
                // setChooseRoleId(role._id)
                setRole(role)
            },
        }
    }
    // 1-1 时间戳转换：1659411810317 -> "2022-8-2 11:43:30"
    const changeTime = (n) => {
        if (n) {
            n = new Date(n)     // promise?
            return n.toLocaleDateString().replace(/\//g, "-") + " " + n.toTimeString().substr(0, 8)
        }
    }
    const changeDataTime = (roles) => {
        return roles.map((oneRole) => {
            return {
                ...oneRole,
                createTime: changeTime(oneRole.createTime),
                powerTime: changeTime(oneRole.powerTime)
            }
        })
    }
    // 1-2 初始化数据渲染到页面
    const getRoles = async () => {
        const { status, msg, data } = await reqGetRoles()
        if (status === 200) {
            console.log('+', data)
            setRolesData(changeDataTime(data))
        } else {
            message.error({
                content: `${status}：${msg}`,
                duration: 2
            })
        }
        // console.log('2.rolesData', data)
    }
    useEffect(() => {
        // console.log('1.rolesData', rolesData)
        // 接口，这里获取role的数据
        getRoles()
    }, []);// eslint-disable-line

    // 2.新建角色部分
    const showAddModal = () => {
        setVisible(true);
    };
    const submitAddShow = async () => {
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
    // 2-1 子传父
    const getForm = (e) => {
        console.log('子组件RoleAdd传来的值', e)
        setForm(e)
    }

    // 3.添加权限部分
    // 3-1 子传父(选择的menuPath)
    const getMenuPath = (choosePath) => {
        console.log('添加权限，子传到父的值', choosePath)
        setPowerPath(choosePath)
    }
    // 3-2 控制Modal
    const showPowerModal = () => {
        setVisiblePower(true);
    };
    const submitPowerShow = async () => {
        // setModalText1('The modal will be closed after two seconds');
        setConfirmLoadingPower(true);
        // console.log('=-=-=-=', user)
        // 点击确定后调用接口，将_id(role._id)和menu(powerPath)都传到接口
        const result = await reqGetPower({ _id: role._id, menu: powerPath, powerTime: Date.now(), powerUser: user.username })
        console.log('接口，传递到数据库选中的menu值：', result)
        // setTimeout(() => {
        setVisiblePower(false);
        setConfirmLoadingPower(false);
        // }, 2000);

    };
    const cancelPowerShow = () => {

        setVisiblePower(false);
        setConfirmLoadingPower(false);
    };



    const card_header = (
        <span>
            <Button type="primary" onClick={showAddModal} className='cardBtn'>新建身份</Button>
            <Button type="primary" disabled={powerBtn} onClick={showPowerModal} className='cardBtn'>添加权限</Button>
        </span>
    )

    return (
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
                dataSource={rolesData}
                // dataSource={rolesData}   // 列表值 行
                rowSelection={{
                    type: 'radio',
                    selectedRowKeys: [role._id],
                    // selectedRowKeys: [role.key],
                    onSelect: (role) => { // 选择某个radio时回调
                        // console.log(1)
                        console.log(role)
                        setPowerBtn(false)
                        // setChooseRoleId(role._id)
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
                title={`设置${role.roleName}的权限`}
                visible={visiblePower}   // 是否弹出对话框
                onOk={submitPowerShow}
                confirmLoading={confirmLoadingPower} // 确定按钮 isloading
                onCancel={cancelPowerShow}
            // getContainer={false}    // form清空
            >
                <RolePower getMenuPath={getMenuPath} />
            </Modal>
        </Card>
    )
}