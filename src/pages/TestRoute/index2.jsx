import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Index2() {
    const { state: { name, age } } = useLocation()
    return (
        <>
            <div>这里是测试页面跳转到的子路由</div>
            <span>拿到参数:{`${name}的年龄是${age}`}</span>
        </>
    )
}



