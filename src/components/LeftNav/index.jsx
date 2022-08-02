import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
// import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import items from '../../config/menuConfig'
import './index.less'
import logo from '../../assets/gengerMan.png'

export default function LeftNav() {

  // const [path, setPath] = useState('home')
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate()
  const { Sider } = Layout;

  const chooseMenuItem = (item) => {
    navigate(item.key)
  }
  const menuItemAction = () => {
    const path = window.location.pathname.slice(1)
    return path ? path : 'home'
  }


  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <div className="logo" >
        <img src={logo} alt="logo" />
        <h1>毕业设计管理系统</h1>
      </div>
      <Menu theme="dark" defaultSelectedKeys={menuItemAction} mode="inline" items={items} onClick={chooseMenuItem} />
    </Sider>
  )
}
