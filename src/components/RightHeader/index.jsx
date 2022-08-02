import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Layout, Dropdown, Avatar, Menu, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';

import './index.less'

export default function RightHeader() {
    const { Header } = Layout;
    const navigate = useNavigate()

    const logout = () => {
        // 1.清除本地web存储和内存
        memoryUtils.user = null
        storageUtils.removeUser()
        console.log(Boolean(memoryUtils.user))

        // 2，返回/login页面(好像在Admin有判定 内存没有user自动跳login【x】没有刷新页面不会自动重新判定)
        navigate('/login')
        message.success('已退出', 1);
    }

    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        // <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                        <h1>登录信息</h1>
                        // </a>
                    ),
                },
                {
                    type: 'divider',
                },
                {
                    key: '2',
                    label: (
                        // <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                        <div onClick={logout}>退出</div>
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
                <Avatar icon={<UserOutlined />} className='userImg' />
            </Dropdown>
        </Header>
    )
}
