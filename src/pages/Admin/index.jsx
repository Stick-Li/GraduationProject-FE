import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils'
import './index.less'

// 后台管理的路由组件
export default function Admin() {
  // 检测内存中是否有user，有则进入后台页面，没有则进入登录页面
  const user = memoryUtils.user
  const navigate = useNavigate()
  useEffect(() => {
    console.log('-=-=-=-user:', user)
    if (!user) {
      console.log('内存中没有user，跳转至登录')
      navigate('/login')
    }
  }, []);// eslint-disable-line


  return (
    <div className='test'>
      <h1>这里放接下来的后台页面</h1>
    </div>
  )
}
