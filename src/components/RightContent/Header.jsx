import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Dropdown, Avatar, Menu, message, Badge } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';

import './Header.less'
import { reqGetNoticeArr } from '../../api';

export default function RightHeader() {

    const [badgeCount, setBadgeCount] = useState(0);
    const [noticeArr, setNoticeArr] = useState({});

    const { Header } = Layout;
    const navigate = useNavigate()

    const logout = () => {
        // 1.清除本地web存储和内存
        memoryUtils.user = null
        storageUtils.removeUser()
        // console.log(Boolean(memoryUtils.user))

        // 2，返回/login页面(好像在Admin有判定 内存没有user自动跳login【x】没有刷新页面不会自动重新判定)
        navigate('/login')
        message.success('已退出', 1);
    }

    // 获取到storage的userId，传递给后端，查询noticeModule的receiveId
    const getNoticeArr = async () => {
        const { data } = await reqGetNoticeArr({ receiverId: memoryUtils.user.userId })
        setNoticeArr(data)
        console.log('****', data)
        const notReadArr = data.filter((value, index, array) => {
            return value.isReceiveRead === false
        })
        console.log('****', notReadArr)
        setBadgeCount(notReadArr.length)      // 只有刷新app才会展示最新结果，如何实现实时？
        // 点击信息去看信息
        console.log('------', noticeArr)
    }
    // const getNoticeArr = () => {
    //     setNoticeArr(noticeData)
    //     setBadgeCount(notReadArr.length)
    // }

    useEffect(() => {
        getNoticeArr()
    }, []);// eslint-disable-line

    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        // <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                        <span onClick={() => navigate('/info')}>个人信息</span>
                        // </a>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <Badge dot={badgeCount !== 0}>
                            <Link to='/notice' state={noticeArr} style={{ color: 'black' }}>消息</Link>
                        </Badge>
                    )
                },
                {
                    type: 'divider',
                },
                {
                    key: '3',
                    label: (
                        // <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                        <span onClick={logout}>退出</span>
                        // </a>
                    ),
                }
            ]}
        />
    );
    return (
        <Header
            className="site-layout-background right-header"
            style={{
                padding: 0,
            }}
        >
            <Dropdown overlay={menu} placement="bottomRight">
                <Badge count={badgeCount}>
                    {/* 下一步就是 按照未读数生成数字 */}
                    <Avatar icon={<UserOutlined />} className='userImg' />
                </Badge>
            </Dropdown>
            <span className='sayHello'>早上好，<b>{memoryUtils.user ? memoryUtils.user.username : ''}</b></span>
        </Header>
    )
}
