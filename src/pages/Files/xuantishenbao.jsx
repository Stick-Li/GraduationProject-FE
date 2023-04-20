import { Button, Checkbox, Col, Form, Input, InputNumber, Radio, Row } from 'antd';
import React, { useEffect, useRef } from 'react';
import './fileContent.less'
import memoryUtils from '../../utils/memoryUtils';

const { TextArea } = Input;

const Xuantishenbao = (props) => {
    console.log('=====', props.info)
    const [form] = Form.useForm();

    const formRef = useRef(props)
    // console.log('+++++', formRef.current.setFieldValue())

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        // ref和form的使用
        formRef.current.resetFields()
        form.setFieldValue({...props.info })
        // formRef.current.resetFields()
    }, [props.info]);

    return (
        <>
            <div className='fileContent'>
                <Form
                    className='contentForm'
                    name="basic"
                    form={form}
                    ref={formRef}
                    initialValues={props.info}
                    // initialValues={{
                    //     remember: true,
                    // }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Row>
                        <Col span={18}>
                            <Form.Item
                                label="申报题目"
                                name="shenbaotimu"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                                wrapperCol={{
                                    span: 19,
                                }}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Form.Item
                                label="类型"
                                name="leixing"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            // labelCol={{
                            //     span: 4,
                            // }}
                            // wrapperCol={{
                            //     span: 12,
                            // }}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={12}>
                            <Form.Item
                                label="来源"
                                name="laiyuan"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                                wrapperCol={{
                                    span: 19,
                                }}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="毕设地点"
                                name="bishedidian"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={6}>
                            <Form.Item
                                label="导师姓名"
                                name="daoshixingming"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="radio-group" label="性别"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Radio.Group>
                                    <Radio value="a">男</Radio>
                                    <Radio value="b">女</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="年龄"
                                name="nianling"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <InputNumber />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="职称"
                                name="zhicheng"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <Form.Item
                                label="所在单位"
                                name="suozaidanwei"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="所学专业"
                                name="suoxuezhuanye"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="联系电话"
                                name="lianxidianhua"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        label="课题介绍"
                        name='ketijieshao'
                        rules={[
                            {
                                required: true,
                                // message: 'Please input your password!',
                            },
                        ]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        {
                            memoryUtils.user.userRole === '专业负责人' ? null :
                                <Button type="primary" htmlType="submit">
                                    提交
                                </Button>
                        }
                    </Form.Item>
                </Form>
            </div >

        </>
    );
}

export default Xuantishenbao;
