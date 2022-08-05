import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Layout, Menu, message } from 'antd';
// import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import memoryUtils from '../../utils/memoryUtils';
// import allMenuItems from '../../config/menuConfig'
import items from '../../config/menuConfig'
import { reqGetMenuPath } from '../../api';
import './index.less'
import logo from '../../assets/gengerMan.png'

export default function LeftNav() {


  // const [path, setPath] = useState('home')
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate()
  const { Sider } = Layout;
  const path = window.location.pathname.slice(1)
  const user = memoryUtils.user
  // const allMenuItem = [...items]
  const [newMenuItems, setNewMenuItems] = useState([...items]);   // useState浅拷贝，展开运算符深拷贝

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

  // const filterMenu = (newMenuPath, oldMenu) => {
  const filterMenu = (newMenuPath, oldMenu) => {

    for (let i = oldMenu.length - 1; i >= 0; i--) {
      console.log(oldMenu[i])
      if (!newMenuPath.includes(oldMenu[i].key)) {
        oldMenu.splice(i, 1);
      } else {
        if (oldMenu[i].children) {
          for (let j = oldMenu[i].children.length - 1; j >= 0; j--) {
            if (!newMenuPath.includes(oldMenu[i].children[j].key)) {
              oldMenu[i].children.splice(j, 1)
            }
          }
        }
      }
    }
    return oldMenu;
  }

  const getMenuPath = async () => {
    const { status, msg, menuPath } = await reqGetMenuPath(user.userRole)
    // console.log('*', menuPath, [...items])
    // console.log('-', ['home', 'manage', 'role', 'manage1', 'user1']
    //   , [
    //     {
    //       key: 'home',
    //       children: undefined
    //     },
    //     {
    //       key: 'manage',
    //       children: [
    //         { key: 'role', children: undefined },
    //         { key: 'user', children: undefined },
    //       ],
    //     },
    //     {
    //       key: 'manage1',
    //       children: [
    //         { key: 'role1', children: undefined },
    //         { key: 'user1', children: undefined },
    //       ],
    //     },
    //     {
    //       key: 'manage2',
    //       children: [
    //         { key: 'role1', children: undefined },
    //         { key: 'user1', children: undefined },
    //       ],
    //     }
    //   ])
    if (status === 200) {
      // console.log('-----当前菜单path数组应该为-----：', menuPath)
      // 现在有menuPath了，用当时写的方法过滤左侧导航栏(Admin不进行过滤)
      // const a = await filterMenu(
      //   ['home', 'manage', 'role', 'manage1', 'user1']
      //   , [
      //     {
      //       key: 'home',
      //       children: undefined
      //     },
      //     {
      //       key: 'manage',
      //       children: [
      //         { key: 'role', children: undefined },
      //         { key: 'user', children: undefined },
      //       ],
      //     },
      //     {
      //       key: 'manage1',
      //       children: [
      //         { key: 'role1', children: undefined },
      //         { key: 'user1', children: undefined },
      //       ],
      //     },
      //     {
      //       key: 'manage2',
      //       children: [
      //         { key: 'role1', children: undefined },
      //         { key: 'user1', children: undefined },
      //       ],
      //     }
      //   ])
      // console.log('+++++a.过滤后菜单（部分）+++++', a)
      console.log('menuPath', menuPath)
      console.log('+++++b.过滤前菜单（所有）+++++', [...items])
      const b = await filterMenu(menuPath, [...items])
      console.log('+++++b.过滤后菜单（部分）+++++', b)
      setNewMenuItems(b)
    } else {
      message.error({
        content: `${status}：${msg}`,
        duration: 2
      })
    }
    // console.log('1.已获得新角色权限 2.意过滤完生成新导航栏')
  }

  useEffect(() => {
    // console.log('+++++1.标准菜单（所有）+++++', newMenuItems)
    // console.log('+++++2.标准菜单（所有）+++++', newMenuItems)
    // console.log('-----进行过滤-----')
    // 这里调用接口，查user.userRole对应的menuPath(除Admin123)
    if (user.userId !== 'Admin123') {
      getMenuPath()
    }
    // console.log('+++++过滤后菜单（部分）+++++', newMenuItems)
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
