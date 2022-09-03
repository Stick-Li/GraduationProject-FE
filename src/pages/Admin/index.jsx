import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Breadcrumb, Layout, Menu } from 'antd';
// import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/LeftNav';
import RightHeader from '../../components/RightContent/Header';
import RightMiddle from '../../components/RightContent/Middle';
import RightFooter from '../../components/RightContent/Footer';
import './index.less'

// 后台管理的路由组件
export default function Admin() {

  const navigate = useNavigate()

  // 检测内存中是否有user，有则进入后台页面，没有则进入登录页面
  const user = memoryUtils.user
  useEffect(() => {
    if (!user) {
      // console.log('内存中没有user，跳转至登录')
      navigate('/login')
    }
  }, []);// eslint-disable-line

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      {/* 根据user的menu【数组】中的值渲染菜单 */}
      <LeftNav />
      <Layout className="site-layout">
        <RightHeader />
        <RightMiddle />
        <RightFooter />
      </Layout>
    </Layout>
  );
}
