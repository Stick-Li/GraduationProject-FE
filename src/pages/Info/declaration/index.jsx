import React, { useState } from 'react'
import { Form, Input, Button, Modal, message } from 'antd';
import { reqSendMessage } from '../../../api';
import ChooseReceive from '../../../components/Info/ChooseReceive';

export default function Declaration() {

    const [isReceive, setIsReceive] = useState(true);
    const [receiver, setReceiver] = useState({});

    const getReceiver = (receiver) => {
        console.log('传来的值，判断这边的button', receiver)
        if (receiver.receiverRole || receiver.receiverId) {
            setReceiver(receiver)
            setIsReceive(false)
            // console.log(message)
        } else {
            setIsReceive(true)
        }
    }

    const onFinish = async (values) => {
        // console.log('Success:', values);
        const decInfo = {
            ...receiver,
            message: JSON.stringify(values),
            // sendTime: new Date()
        }
        console.log('Success2:', decInfo);
        const { status, msg } = await reqSendMessage(decInfo)
        if (status === 200) {
            message.success({
                content: '发布成功！',
                duration: 2
            })

        } else {
            message.error({
                content: `${status}：${msg}`,
                duration: 2
            })
        }
    };


    return (
        <>
            <h1>毕业设计（论文）题目申报表</h1>

            <ChooseReceive getReceiver={getReceiver} />


            <Form
                name="normal_infoA"
                className="login-form"
                // initialValues={{
                //     remember: true,
                // }}
                onFinish={onFinish}
            // ref={formRef}
            // form={form}     // form清空
            >
                <Form.Item
                    // label=" "
                    name="declarationTitle"
                    rules={[
                        {
                            required: true,
                            message: '输入不得为空！',
                        },
                    ]}
                >
                    <Input placeholder="申报题目" />
                </Form.Item>
                <Form.Item
                    // label=" "
                    name="declarationType"
                    rules={[
                        {
                            required: true,
                            message: '输入不得为空！',
                        },
                    ]}
                >
                    <Input placeholder="类型" />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" disabled={isReceive}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>

    )
}


