import React, { useState, useEffect, useRef } from 'react'
import { Form, Input, Button, Modal, Radio, Select, Cascader, Switch } from 'antd';
import memoryUtils from '../../utils/memoryUtils';
import { reqGetRoles } from '../../api';
import './index.less'
import TextArea from 'antd/lib/input/TextArea';

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

    const options = [
        {
            value: 'zhejiang',
            label: '日常指导',
            // children: [
            //     {
            //         value: 'hangzhou',
            //         label: 'Hangzhou',
            //         children: [
            //             {
            //                 value: 'xihu',
            //                 label: 'West Lake',
            //             },
            //         ],
            //     },
            // ],
        },
        {
            value: 'jiangsu',
            label: '答辩环节',
            children: [
                {
                    value: 'nanjing',
                    label: '开题答辩',
                },
                {
                    value: 'nanjing',
                    label: '中期答辩',
                },
                {
                    value: 'nanjing',
                    label: '论文答辩',
                },
            ],
        },
    ];

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
            // setIsRoleHidden({ display: 'block' })
            setIsIdHidden({ display: 'none' })
            // form.setFieldValue({ receiverId: undefined })
            form.resetFields()
            // console.log(form.getFieldsValue())
        } else {
            // setIsRoleHidden({ display: 'none' })
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
        <div className='ChooseReceive'>
            <Button type="primary" onClick={showModal} className='chooseReceiveBtn'>
                发布消息
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
                    <Form.Item
                        label="收信类型"
                    // name=""
                    >
                        <Radio.Group onChange={onChange} value={value} className='receiver1or2'>
                            <Radio value={1}>小组收信</Radio>
                            <Radio value={2}>个人收信</Radio>
                        </Radio.Group>
                    </Form.Item>
                    {/* <Radio.Group onChange={onChange} value={value} className='receiver1or2'>
                        <Radio value={1}>收信人身份</Radio>
                        <Radio value={2}>收信人学号</Radio>
                    </Radio.Group>*/}
                    {/* <Form.Item
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
                    </Form.Item> */}
                    <Form.Item
                        label="收信人"
                        // className='receiverId'
                        name="receiverId"
                        required
                        rules={[
                            {
                                required: true,
                                message: '输入不得为空！',
                            },
                        ]}
                        style={isIdHidden}

                    >
                        <Input ref={idRef} placeholder="收信人学号" />
                        {/* <Select ref={roleRef} placeholder="收信人身份">
                            {
                                roleTypes.map((item) => {
                                    return <Option value={item} key={item}>{item}</Option>
                                })
                            }
                        </Select> */}
                    </Form.Item>
                    <Form.Item
                        label="题  目"
                        name="receiverTitle"
                        required
                        rules={[
                            {
                                required: true,
                                message: '请填写题目',
                            },
                        ]}
                    >
                        <Input placeholder="请输入标题" />
                    </Form.Item>
                    <Form.Item
                        // label="内 容"
                        name="receiverContent"
                    >
                        <TextArea
                            // value={value}
                            // onChange={(e) => setValue(e.target.value)}
                            placeholder="请输入具体内容"
                            // defaultValue="请输入具体内容"
                            autoSize={{
                                minRows: 3,
                                maxRows: 5,
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="应用环节"
                        name=""
                        required
                    >
                        <Input.Group compact>
                            {/* <Select
                                style={{
                                    width: '30%',
                                }}
                                defaultValue="Home"
                            >
                                <Option value="Home">Home</Option>
                                <Option value="Company">Company</Option>
                            </Select> */}
                            <Cascader
                                style={{
                                    width: '100%',
                                }}
                                options={options}
                                placeholder="选择该操作环节"
                            />
                        </Input.Group>
                    </Form.Item>
                    <Form.Item
                        label="是否立即发布"
                        name=""
                    >
                        <Switch defaultChecked onChange={onChange} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default ChooseReceive;
