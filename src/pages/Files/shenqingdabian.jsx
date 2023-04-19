import { Button, Col, Form, Input, Row } from 'antd';
import React from 'react';

const Shenqingdabian = () => {
    return (
        <div className='fileContent'>
            <Form
                className='contentForm'
                name="basic"
                autoComplete="off"
            >
                <Form.Item
                    label="课题名称"
                    name="title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="指导教师（职称）"
                    name="thuName"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="申请理由"
                    name="appRole"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>






                <Row>
                    <Col span={8}>
                        <Form.Item
                            label="学生二级学院"
                            name="college"
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
                            label="专业"
                            name="major"
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
                            label="学号"
                            name="stuId"
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
        </div>
    );
}

export default Shenqingdabian;
