import { Button, Col, Form, Input, Row } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React from 'react';

const Kaitibaogao = () => {
    return (
        <>
            <div className='fileContent'>
                <Form
                    className='contentForm'
                    name="basic"
                    // form={form}
                    // ref={formRef}
                    // initialValues={props.info}
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    {/* <Row> */}
                    {/* <Col span={18}> */}
                    <Form.Item
                        label="课题名称"
                        name="ketimingcheng"
                        rules={[
                            {
                                required: true,
                                message: '必须输入！',
                            },
                        ]}

                    >
                        <Input />
                    </Form.Item>
                    {/* </Col> */}
                    <Row>
                        <Col span={8}>
                            <Form.Item
                                label="课题来源"
                                name="ketilaiyuan"
                                rules={[
                                    {
                                        required: true,
                                        message: '必须输入！',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                label="课题类型"
                                name="ketileixing"
                                rules={[
                                    {
                                        required: true,
                                        message: '必须输入！',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                label="指导教师"
                                name="zhidaojiaoshi"
                                rules={[
                                    {
                                        required: true,
                                        message: '必须输入！',
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
                                label="毕设地点"
                                name="bishedidian"
                                rules={[
                                    {
                                        required: true,
                                        message: '必须输入！',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item name="radio-group" label="性别"
                                rules={[
                                    {
                                        required: true,
                                        message: '必须输入！',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="年龄"
                                name="nianling"
                                rules={[
                                    {
                                        required: true,
                                        message: '必须输入！',
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
                                message: '必须输入！',
                            },
                        ]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 12,
                            span: 12,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>

                    </Form.Item>
                </Form>
            </div >

        </>
    );
}

export default Kaitibaogao;
