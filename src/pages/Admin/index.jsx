import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Breadcrumb, Layout, Menu } from 'antd';
// import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/LeftNav';
import RightHeader from '../../components/RightHeader';
import RightContent from '../../components/RightContent';
import RightFooter from '../../components/RightFooter';
import './index.less'

// 后台管理的路由组件
export default function Admin() {

  const navigate = useNavigate()

  // 检测内存中是否有user，有则进入后台页面，没有则进入登录页面
  const user = memoryUtils.user
  useEffect(() => {
    if (!user) {
      console.log('内存中没有user，跳转至登录')
      navigate('/login')
    }
  }, []);// eslint-disable-line

  // function getItem(label, key, icon, children) {
  //   return {
  //     key,
  //     icon,
  //     children,
  //     label,
  //   };
  // }
  // const items = [
  //   getItem('Option 1', '1', <PieChartOutlined />),
  //   getItem('Option 2', '2', <DesktopOutlined />),
  //   getItem('User', 'sub1', <UserOutlined />, [
  //     getItem('Tom', '3'),
  //     getItem('Bill', '4'),
  //     getItem('Alex', '5'),
  //   ]),
  //   getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  //   getItem('Files', '9', <FileOutlined />),
  // ];

  // const { Header, Content, Footer, Sider } = Layout;
  // const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <LeftNav />
      {/* <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider> 
      */}
      <Layout className="site-layout">
        <RightHeader />
        <RightContent />
        <RightFooter />
        {/* <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        /> */}
        {/* 
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
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            Bill is a cat.
          </div>
        </Content> */}
        {/* <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
}
