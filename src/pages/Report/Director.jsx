import { Avatar, Button, List, Modal, Table, message, messuserId } from 'antd';
import React, { useEffect, useState } from 'react';
import memoryUtils from '../../utils/memoryUtils';
import { reqGetAllTeachers } from '../../api';
import './fileContent.less'
import Xuantishenbao from '../Files/xuantishenbao';
import { useRef } from 'react';

const columns = [
    {
        title: '姓名',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: 'id',
        dataIndex: 'userId',
        key: 'userId',
    },
    {
        title: '学院',
        dataIndex: 'userInstitute',
        key: 'userInstitute',
    },
    {
        title: '专业',
        dataIndex: 'userSubject',
        key: 'userSubject',
    },
    // {
    //     title: 'Action',
    //     dataIndex: '',
    //     key: 'x',
    //     render: () => <a>Delete</a>,
    // },
];
// 课题申报 文件 表格
const ktsbInfo = {
    'userId': '000201324',
    'userInstitute': "信息工程学院",
    'userSubject': "计算机科学与技术",
    'titles': [
        {
            'bishedidian': "北京工业大学耿丹学院",
            'daoshixingming': "张三",
            'laiyuan': "xxx",
            'leixing': "x",
            'lianxidianhua': "13031890000",
            'nianling': 35,
            'radio-group': "b",
            'shenbaotimu': "某管理系统的的设计与实现",
            'suoxuezhuanye': "计算机科学与技术",
            'suozaidanwei': "北京工业大学耿丹学院",
            'zhicheng': "副教授",
            'ketijieshao': "本课题是一个xxx",
        },
        {
            'bishedidian': "北京工业大学耿丹学院",
            'daoshixingming': "张三",
            'laiyuan': "yyy",
            'leixing': "y",
            'lianxidianhua': "13031890000",
            'nianling': 35,
            'radio-group': "b",
            'shenbaotimu': "某后台项目的的设计与实现",
            'suoxuezhuanye': "计算机科学与技术",
            'suozaidanwei': "北京工业大学耿丹学院",
            'zhicheng': "副教授",
            'ketijieshao': "本课题是一个yyy",
        },
    ]
}

// const ktsbInfos2 =
//     [
//         {
//             'userId': '000201324',
//             'userInstitute': "信息工程学院",
//             'userSubject': "计算机科学与技术",
//             'titles': [
//                 {
//                     'bishedidian': "北京工业大学耿丹学院",
//                     'daoshixingming': "张三",
//                     'laiyuan': "xxx",
//                     'leixing': "x",
//                     'lianxidianhua': "13031890000",
//                     'nianling': 35,
//                     'radio-group': "b",
//                     'shenbaotimu': "某管理系统的的设计与实现",
//                     'suoxuezhuanye': "计算机科学与技术",
//                     'suozaidanwei': "北京工业大学耿丹学院",
//                     'zhicheng': "副教授",
//                     'ketijieshao': "本课题是一个xxx",
//                 },
//                 {
//                     'bishedidian': "北京工业大学耿丹学院",
//                     'daoshixingming': "张三",
//                     'laiyuan': "yyy",
//                     'leixing': "y",
//                     'lianxidianhua': "13031890000",
//                     'nianling': 35,
//                     'radio-group': "b",
//                     'shenbaotimu': "某后台项目的的设计与实现",
//                     'suoxuezhuanye': "计算机科学与技术",
//                     'suozaidanwei': "北京工业大学耿丹学院",
//                     'zhicheng': "副教授",
//                     'ketijieshao': "本课题是一个yyy",
//                 },
//             ]
//         },
//         {
//             'userId': '000201327',
//             'userInstitute': "信息工程学院",
//             'userSubject': "计算机科学与技术",
//             'titles': [
//                 {
//                     'shenbaotimu': "某管理系统的的设计与实现",
//                 },
//                 {
//                     'shenbaotimu': "某平台的的设计与实现",
//                 },
//             ]
//         }
//     ]

// const data = [
//     {
//         key: 1,
//         username: 'John Brown',
//         userId: 32,
//         description: 'My username is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
//         userInstitute: '信息工程学院',
//         userSubject: '计算机科学与技术'
//     },
//     {
//         key: 2,
//         username: 'Jim Green',
//         userId: 42,
//         description: 'My username is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
//     },
//     {
//         key: 3,
//         username: 'Not Expandable',
//         userId: 29,
//         description: 'This not expandable',
//     },
//     {
//         key: 4,
//         username: 'Joe Black',
//         userId: 32,
//         description: 'My username is Joe Black, I am 32 years old, living in SuserIdney No. 1 Lake Park.',
//     },
// ];

const Director = () => {
    const [allTeachersInfo, setAllTeachersInfo] = useState();
    const [inList, setInList] = useState([{ 'timu': 'xxx' }, { 'timu': 'yyy' }, { 'timu': 'zzz' }]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const itemRef = useRef(null)

    const showModal = (value) => {
        itemRef.current = value
        setIsModalOpen(true);
    };
    const handleOk = () => { setIsModalOpen(false); };
    const handleCancel = () => { setIsModalOpen(false); };

    const allTch = async () => {
        // 按专业查询老师
        const { status, msg, data } = await reqGetAllTeachers()
        if (status === 200) {
            // 做一个数据加载出来前的加载效果
            // console.log('data', data)
            // console.log('memoryUtils.user', memoryUtils.user)
            // 根据当前专业筛选老师 data.userSubject: "工业设计"
            const subjectData = data.filter((value, index, array) => {
                return value.userSubject === memoryUtils.user.userSubject
            })
            // .forEach((value, index, array) => {
            //     value.key = value.userId
            // })
            // const subjectDataWithKey = 
            subjectData.forEach((value, index, array) => {
                console.log(value)
                value['key'] = value.userId
            })
            console.log('----', subjectData)
            // console.log('++++', subjectDataWithKey)
            setAllTeachersInfo(subjectData)
        } else {
            message.error({
                content: `${status}：${msg}`,
                duration: 2
            })
        }
    }

    const getTitle = (userId) => {
        // 根据userId查找老师的课题信息 ktsbInfo
        const title = ktsbInfo['titles']
        // console.log('[][][][]]', title)
        setInList(title)
    }

    useEffect(() => {
        allTch()
    }, []);

    return (
        <>
            <Table
                onClick={(value) => { console.log(value) }}
                columns={columns}
                expandable={{
                    onExpand: (expanded, record) => {
                        console.log(expanded, record)
                        getTitle(record.userId)
                    },
                    expandedRowRender: (record) => (
                        <div className='inList'>
                            <List
                                size="small"
                                // bordered
                                dataSource={inList}
                                renderItem={(item) => (
                                    <List.Item key={item.userId} actions={[<a key={"list-loadmore-more"} onClick={() => { showModal(item) }}>more</a>]}>
                                        {item.shenbaotimu}
                                    </List.Item>
                                )
                                }
                            />
                        </div>
                    ),
                    rowExpandable: (record) => record.username !== 'Not Expandable',
                }}
                dataSource={allTeachersInfo}
            />
            <Modal title="选题申报表" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Xuantishenbao info={itemRef.current} />
            </Modal>
        </>
    );
}

export default Director;
