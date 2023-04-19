import React from 'react'
import { Outlet } from 'react-router-dom';
import { Breadcrumb, Layout } from 'antd';
import memoryUtils from '../../utils/memoryUtils';

export default function RightContent() {
    const { Content } = Layout;
    const path = window.location.pathname.slice(1)

    return (
        <Content
            style={{
                margin: '0 16px',
            }}
        >
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>{memoryUtils.user.userId}</Breadcrumb.Item>
                <Breadcrumb.Item>{path === 'xuantishenbao' ? '选题申报' : path === 'kaitibaogao' ? '开题报告' : path === 'zhongqijiancha' ? '中期答辩' : path === 'shenqingdabian' ? '申请答辩' : path}</Breadcrumb.Item>
            </Breadcrumb>
            <div
                className="site-layout-background"
                style={{
                    padding: 24,
                    minHeight: 360,
                }}
            >
                {/* Bill is a cat. */}
                <Outlet />
            </div>
        </Content>
    )
}
