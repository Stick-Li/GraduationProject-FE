import { Button, Col, Form, Input, Row, message } from 'antd';
import React from 'react';
import memoryUtils from '../../utils/memoryUtils';
import { useRef } from 'react';
import { useEffect } from 'react';

const Shenqingdabian = (props) => {

    const [form] = Form.useForm();
    const formRef = useRef(props)

    const onFinish = (values) => {
        console.log('申请答辩:', values);
        message.success({
            content: `提交成功！`,
            duration: 2
        })
        form.resetFields()
    };

    useEffect(() => {
        // ref和form的使用
        formRef.current.resetFields()
        form.setFieldValue({ ...props.info?.fileContent })
        console.log('[[[[[message]]]]]', props.info?.fileContent)
        // formRef.current.resetFields()
    }, [props.info]);

    return (
        <div className='fileContent'>
            <Form
                className='contentForm'
                name="basic"
                autoComplete="off"
                onFinish={onFinish}
                form={form}
                ref={formRef}
                initialValues={props.info?.fileContent}
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

                {
                    memoryUtils.user.userRole !== '学生' ? null :
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
                }
            </Form>
        </div>
    );
}

export default Shenqingdabian;
