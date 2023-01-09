import React from 'react'
import memoryUtils from '../../utils/memoryUtils';
import StuView from '../../components/StuView'


export default function index() {
  console.log(memoryUtils.user)
  let role = memoryUtils.user.userRole
  const studentInfosList = (
    <>老师视角: 学生信息列表</>
  )
  const teacherInfosList = (
    <>学生视角: 老师信息列表</>
  )
  return (
    <>
      <h1>双向选择</h1>
      {/* 
        根据user内容判断是教师还是学生还是教务处，然后展示页面
        教师：可以看到学生的列表
        学生：可以看到教师的列表
        教务处/二级学院：看到教师和学生的列表
       */}
      <div style={role !== '学生' ? null : { 'display': 'none' }}>
        {/* 教师等视角 */}
        {studentInfosList}
      </div>
      <hr />
      {/* 将工号传递到后端，查找所有学生的志愿，有包含工号的就拿过来 */}
      <div style={role !== '教师' ? null : { 'display': 'none' }}>
        {/* 学生等视角 */}
        {teacherInfosList}
        <StuView />
      </div>
      {/* 
        调接口，拿到教师/学生信息
       */}
    </>
  )
}
