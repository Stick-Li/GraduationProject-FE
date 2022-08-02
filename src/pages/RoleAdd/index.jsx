import React, { useEffect } from 'react'
import {  Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';

export default function RoleAdd(props) {

    const [form] = useForm()

    useEffect(() => {
        console.log('=-1=2-4=12-1=',)
        props.getForm(form)
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
