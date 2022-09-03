import React, { useState, useEffect, useRef } from 'react'
import { Form, Input, Button, Modal, Radio, Select } from 'antd';
import memoryUtils from '../../utils/memoryUtils';
import { reqGetRoles } from '../../api';

const { Option } = Select;

const ChooseReceive = (props) => {

    const [form] = Form.useForm();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [value, setValue] = useState(1);
    const [isRoleHidden, setIsRoleHidden] = useState({ display: 'block' });
    const [isIdHidden, setIsIdHidden] = useState({ display: 'none' });
    const [roleTypes, setRoleTypes] = useState([]);

    const roleRef = useRef()
    const idRef = useRef()

    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        console.log('最终值', form.getFieldsValue())
        props.getReceiver(form.getFieldsValue())
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const onChange = (e) => {
        // console.log('radio checked', e.target.value);
        setValue(e.target.value);
        if (e.target.value === 1) {
            setIsRoleHidden({ display: 'block' })
            setIsIdHidden({ display: 'none' })
            // form.setFieldValue({ receiverId: undefined })
            form.resetFields()
            // console.log(form.getFieldsValue())
        } else {
            setIsRoleHidden({ display: 'none' })
            setIsIdHidden({ display: 'block' })
            // form.setFieldValue({ receiverRole: undefined })
            form.resetFields()
            // console.log(form.getFieldsValue())
        }
    };

    const getRoleTypes = async () => {
        const { data } = await reqGetRoles()
        const rolesTypes = data.map((value, index, array) => {
            return value.roleName
        })
        setRoleTypes(rolesTypes)
        console.log('rolesTypes', rolesTypes)
        // setroleTypes('数据库中的数据')
    }

    useEffect(() => {
        getRoleTypes()
    }, []);

    return (
        <>
            <Button type="primary" onClick={showModal}>
                选择要进行通知的人
            </Button>
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                    initialValues={{ senderId: memoryUtils.user ? `${memoryUtils.user.userId}` : `` }}
                >
                    <Form.Item
                        label="发信人"
                        name="senderId"
                        rules={[
                            {
                                required: true,
                                message: '输入不得为空！',
                            },
                        ]}
                    >
                        <Input disabled placeholder='' />
                    </Form.Item>
                    <Radio.Group onChange={onChange} value={value}>
                        <Radio value={1}>收信人身份</Radio>
                        <Radio value={2}>收信人学号</Radio>
                    </Radio.Group>
                    <Form.Item
                        label="收信人"
                        required
                        // className='receiverRole'
                        name="receiverRole"
                        style={isRoleHidden}
                    >
                        <Select ref={roleRef} placeholder="收信人身份">
                            {
                                roleTypes.map((item) => {
                                    return <Option value={item} key={item}>{item}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="收信人"
                        // className='receiverId'
                        name="receiverId"
                        rules={[
                            {
                                required: true,
                                message: '输入不得为空！',
                            },
                        ]}
                        style={isIdHidden}

                    >
                        <Input ref={idRef} placeholder="收信人学号" />
                        {/* 可以用节流防抖 */}
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default ChooseReceive;
