import React, { useRef, useState } from 'react'
import { Form, Input, Button, Modal, message, List, Avatar, Card } from 'antd';
import { reqSendMessage } from '../../../api';
import ChooseReceive from '../../../components/Info/ChooseReceive';
import './index.less'
import { UserOutlined } from '@ant-design/icons';
import memoryUtils from '../../../utils/memoryUtils';
import { Link } from 'react-router-dom';
const { TextArea } = Input;

const data = [
    {
        title: `日常指导-测试下发消息1`,
        description: `个人指导：个人的消息内容 个人的消息内容 个人的消息内容。。。`
    },
    {
        title: '答辩环节记录-中期检查-测试下发消息2',
        description: `组内指导：组内发的消息内容 组内发的消息内容 组内发的消息内容。。。`
    },
    {
        title: '日常指导-日常',
        description: `组内指导：指导`
    },
    // {
    //     title: '下发消息4',
    //     description: `已结束 | 截止时间:2022/09/20 00:00 | 组内通知`
    // },
];

export default function Declaration() {

    const [isReceive, setIsReceive] = useState(true);
    const [receiver, setReceiver] = useState({});
    const [dataInfo, setDataInfo] = useState(data);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const [form] = Form.useForm();
    const modelRef = useRef({ 'title': '题目', 'description': '详细内容' })


    const showModal = (data) => {
        setIsModalOpen(true);
        modelRef.current = data
        console.log(11111)
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const getReceiver = (receiver) => {
        console.log('传来的值，判断这边的button', receiver)
        const dataArr = [...data]
        dataArr.push({
            // title: receiver.chooseLink==='richang'?'日常指导':'答辩环节记录'+`-${receiver.receiverTitle}`,
            title: (
                receiver.chooseLink === 'richang' ? '日常指导' :
                    receiver.chooseLink === 'kaiti' ?
                        '答辩环节记录-开题答辩' : receiver.chooseLink === 'zhongqi' ?
                            '答辩环节记录-中期检查' : receiver.chooseLink === 'lunwen' ?
                                '答辩环节记录-最终论文答辩' : null
            ) + `-${receiver.receiverTitle}`,
            description: (receiver.receiverId ? '个人指导' : '组内指导') + `：${receiver.receiverContent}`,
            chooseLink: receiver.chooseLink
        })
        setDataInfo(dataArr)
        // if (receiver.receiverRole || receiver.receiverId) {
        //     setReceiver(receiver)
        //     setIsReceive(false)
        //     // console.log(message)
        // } else {
        //     setIsReceive(true)
        // }
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

    const data2 = [
        {
            title: '已查看',
            // content: '1'
        },
        {
            title: '未查看',
            // content: '2'
        },
        {
            title: '未回复',
            // content: '3'
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
                dataSource={dataInfo}
                className='list'
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            className='leftContent'
                            avatar={<Avatar icon={<UserOutlined />} className='userImg' />}
                            title={<a className='listItemTitle' onClick={() => { showModal(item) }}>{item.title}</a>}
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
            <Modal title={modelRef.current.title} visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                {
                    memoryUtils.user.userRole === '学生' ?
                        modelRef.current.chooseLink === 'kaiti' ? <Link to='/kaitibaogao'>点击跳转至开题报告页面填写</Link> :
                            modelRef.current.chooseLink === 'zhongqi' ? <Link to='/zhongqijiancha'>点击跳转至中期检查页面填写</Link> :
                                modelRef.current.chooseLink === 'lunwen' ? <Link to='/shenqingdabian'>点击跳转至申请最终论文答辩页面填写</Link> : null : null
                }
                <p>{modelRef.current.description.slice(modelRef.current.description.indexOf('：') + 1)}</p>
            </Modal>
        </>

    )
}


