import { Button, Col, Form, Input, Row } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React from 'react';

const Zhongqijiancha = () => {
    return (
        <div className='fileContent'>
            <Form
                className='contentForm'
                name="basic"
                autoComplete="off"
            >
                <Row>
                    <Col span={8}>
                        <Form.Item
                            label="学生姓名"
                            name="stuName"
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
                    <Col span={8}>
                        <Form.Item
                            label="专业（班级）"
                            name="stuClass"
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
                    <Col span={12}>
                        <Form.Item
                            label="指导教师"
                            name="thuName"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="职称"
                            name="thuTitle"
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
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="指导次数/周"
                            name="timesAWeak"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="指导时间/周"
                            name="hoursAWeek"
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
                    <Col span={21}>
                        <Form.Item
                            label="已完成内容"
                            name="finishArea"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <TextArea rows={4} />
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <Form.Item
                            label="%"
                            name="finishAreaPercentage"
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
                    <Col span={21}>
                        <Form.Item
                            label="待完成内容"
                            name="unFinishArea"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <TextArea rows={4} />
                        </Form.Item>
                    </Col>

                    <Col span={3}>
                        <Form.Item
                            label="%"
                            name="unFinishAreaPercentage"
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
                    label="后期工作计划"
                    name="rules"
                    rules={[
                        {
                            required: true,
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
        </div>
    );
}

export default Zhongqijiancha;
