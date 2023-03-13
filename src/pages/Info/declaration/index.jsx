import React, { useState } from 'react'
import { Form, Input, Button, Modal, message, List, Avatar, Card } from 'antd';
import { reqSendMessage } from '../../../api';
import ChooseReceive from '../../../components/Info/ChooseReceive';
import './index.less'
const { TextArea } = Input;

export default function Declaration() {

    const [isReceive, setIsReceive] = useState(true);
    const [receiver, setReceiver] = useState({});
    const [form] = Form.useForm();

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
        console.log('Success:-----', values);
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
            form.resetFields()
        } else {
            message.error({
                content: `${status}：${msg}`,
                duration: 2
            })
        }
    };
    const data = [
        {
            title: '下发消息1',
            description: `已结束 | 截止时间:2022/09/20 00:00 | 个人通知`
        },
        {
            title: '下发消息2',
            description: `已结束 | 截止时间:2022/09/20 00:00 | 组内通知`
        },
        {
            title: '下发消息3',
            description: `已结束 | 截止时间:2022/09/20 00:00 | 个人通知`
        },
        {
            title: '下发消息4',
            description: `已结束 | 截止时间:2022/09/20 00:00 | 组内通知`
        },
    ];
    const data2 = [
        {
            title: '已查看',
            content: '1'
        },
        {
            title: '未查看',
            content: '2'
        },
        {
            title: '未回复',
            content: '3'
        },
    ];
    return (
        <>
            <div className='declTitle'>
                <h1 className='sendH1'> 指导记录</h1>
                <ChooseReceive className='chooseReceive' getReceiver={getReceiver} />
            </div>
            <List
                itemLayout="horizontal"
                dataSource={data}
                className='list'
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            className='leftContent'
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                            title={<a className='listItemTitle' href="https://ant.design">{item.title}</a>}
                            description={<span className='listItemDescription'>{item.description}</span>}
                        />
                        <div className='rightContent'>
                            <List
                                grid={{
                                    gutter: 10,
                                    column: 3,
                                }}
                                dataSource={data2}
                                renderItem={(item) => (
                                    <List.Item>
                                        <Card bordered={false} title={item.title}>{item.content}</Card>
                                    </List.Item>
                                )}
                            />
                        </div>
                    </List.Item>
                )}
            />

            {/* <Form
                name="normal_infoA"
                className="login-form"
                // initialValues={{
                //     remember: true,
                // }}
                onFinish={onFinish}
                // ref={formRef}
                form={form}     // form清空
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
                    <Input placeholder="题目" />
                </Form.Item>
                <Form.Item
                    // label=" "
                    name="declarationType"
                // rules={[
                //     {
                //         required: true,
                //         message: '输入不得为空！',
                //     },
                // ]}
                >
                    <TextArea
                        showCount
                        maxLength={500}
                        style={{
                            height: 120,
                        }}
                    // onChange={onChange}
                    />
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
            </Form> */}
        </>

    )
}


