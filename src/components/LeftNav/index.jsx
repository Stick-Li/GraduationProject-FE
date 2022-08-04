import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
// import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import memoryUtils from '../../utils/memoryUtils';
import allMenuItems from '../../config/menuConfig'
import './index.less'
import logo from '../../assets/gengerMan.png'

export default function LeftNav() {


  // const [path, setPath] = useState('home')
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate()
  const { Sider } = Layout;
  const path = window.location.pathname.slice(1)
  const user = memoryUtils.user
  const [newMenuItems, setnewMenuItems] = useState(allMenuItems);

  const chooseMenuItem = (item) => {
    navigate(item.key)
  }
  const menuItemAction = () => {
    return path ? path : 'home'
  }
  const menuDefaultOpenKeys = () => {
    if (path === 'role' || path === 'user') {
      return ['manage']
    }
  }

  useEffect(() => {
    const roleMenu = allMenuItems.map((item) => {
      return item.key
    })
    // console.log('当前用户展示的菜单items：', roleMenu)
    // console.log('*****menuConfig：*****', allMenuItems)


    // console.log('*****当前登录用户信息：*****', user)
    // const userItems = ['home', 'manage', 'role']
    // console.log('*****假设取到用户信息中的菜单items：*****', userItems)


  }, []);



  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <div className="logo" >
        <img src={logo} alt="logo" />
        <h1>毕业设计管理系统</h1>
      </div>
      <Menu theme="dark" defaultSelectedKeys={menuItemAction} defaultOpenKeys={menuDefaultOpenKeys} mode="inline" items={newMenuItems} onClick={chooseMenuItem} />
    </Sider>
  )
}
