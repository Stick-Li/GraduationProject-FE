import React, { useEffect } from 'react'
import {  Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';

export default function RoleAdd(props) {

    const [form] = useForm()

    useEffect(() => {
        props.getForm(form)
        console.log('role什么时候子传父')
    });

    return (
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
        </Form>
    )
}
