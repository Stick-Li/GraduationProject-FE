import React from 'react'
import { Layout } from 'antd';

export default function RightFooter() {
    const { Footer } = Layout;
    return (
        <Footer
            style={{
                textAlign: 'center',
            }}
        >
            北京工业大学耿丹学院毕业设计管理系统
        </Footer>
    )
}
