import React, { useState, useEffect } from 'react'
import { Card, Button, Table, Modal, message, Space, Popconfirm } from 'antd';
import { FileExcelOutlined } from '@ant-design/icons';
import UserAdd from '../../components/User/Add';
import UsersImport from '../../components/User/Import';
import { reqAddOneUser, reqAddUsers, reqGetAllUsers, reqUpdateOneUser, reqDeleteOneUser } from '../../api';

export default function User() {

  const [visibleAddOneUser, setVisibleAddOneUser] = useState(false);
  const [addOneForm, setAddOneForm] = useState({});
  const [userData, setUserData] = useState([]);

  const [visibleImportUsers, setVisibleImportUsers] = useState(false);
  const [excelDataText, setExcelDataText] = useState({ status: 0 });

  const [visibleUpdateUser, setVisibleUpdateUser] = useState(false);
  const [nowUpdateUser, setNowUpdateUser] = useState();

  const userColumns = [
    {
      title: '学号/工号',
      dataIndex: 'userId'
    },
    {
      title: '姓名',
      dataIndex: 'username'
    },
    {
      title: '手机号',
      dataIndex: 'userPhone'
    },
    {
      title: '学院',
      dataIndex: 'userInstitute'
    },
    {
      title: '专业',
      dataIndex: 'userSubject'
    },
    {
      title: '所属角色',
      dataIndex: 'userRole'
    },
    {
      title: 'Action',
      // key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* <a>Invite {record.username}</a> */}
          <a onClick={() => { showUpdateUser(record) }}>Update</a>
          <Popconfirm
            title="确定删除该用户？"
            onConfirm={() => { confirmDelete(record._id) }}
            // onCancel={cancelDelete}
            okText="是"
            cancelText="否"
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ]
  // const userData = [
  //   {
  //     // key: '1',
  //     userId: 190201323,
  //     username: '李建勋',
  //     userPhone: 13031890225,
  //     userInstitute: '工学院',
  //     userSubject: '计算机科学与技术',
  //     userRole: '学生',
  //   },
  //   {
  //     userId: 190000000,
  //     username: '红小豆',
  //     userPhone: 13000000000,
  //     userInstitute: '工学院',
  //     userSubject: '工业设计',
  //     userRole: '学生',
  //   },
  // ]

  // 1.添加一个用户
  const showAddOneUser = () => {
    setVisibleAddOneUser(true)
  }
  const submitAddOneUser = async () => {
    const getAddOneUser = addOneForm.getFieldValue()
    // console.log('确定按钮，拿到所有值', getAddOneUser)
    if (getAddOneUser.userId) {
      // 写接口，将新增用户加到user数据库
      const { status, msg } = await reqAddOneUser(getAddOneUser)
      if (status === 200) {
        message.success({
          content: '新增用户成功',
          duration: 2
        })
        // 再次调用初始化方法渲染users--------------------------------------------------
        getUsers()
        setVisibleAddOneUser(false)
        addOneForm.resetFields()
      } else {
        message.error({
          content: `${status}：${msg}`,
          duration: 2
        })
      }
    } else {
      message.error({
        content: '请将必填项完整',
        duration: 2,
      })
    }
  }
  const cancelAddOneUser = () => {
    setVisibleAddOneUser(false)
    addOneForm.resetFields()
  }
  // 添加用户子组件传来的useForm操作表单
  const getAddOneUserFrom = (e) => {
    // console.log('父组件拿到子组件的Form值：', e)
    setAddOneForm(e)
  }

  // excel导入用户
  const showImportUsers = () => {
    setVisibleImportUsers(true)
  }
  const submitImportUsers = async (e) => {
    if (excelDataText.status === 2) {
      message.error({
        content: excelDataText.message,
        duration: 2
      })
    } else if (excelDataText.status === 1) {
      // 发接口
      const { status, msg } = await reqAddUsers(excelDataText.data)
      if (status === 200) {
        message.success({
          content: '表格数据导入数据库成功！',
          duration: 2
        })
        getUsers()
        setVisibleImportUsers(false)
      } else {
        message.error({
          content: `${status}:${msg}`,
          duration: 2
        })
      }
    } else {
      // 不做任何请求
    }
  }
  const cancelImportUsers = (e) => {
    setVisibleImportUsers(false)
  }
  const getExcelDataText = (e) => {
    setExcelDataText(e)
  }

  // 修改
  const showUpdateUser = (userDate) => {
    setVisibleUpdateUser(true)
    console.log('点击更新!!!', userDate)
    setNowUpdateUser(userDate)  // 显示当前信息
  }
  const submitUpdateUser = async () => {
    const getAddOneUser = addOneForm.getFieldValue()
    // console.log('确定按钮，拿到所有值', getAddOneUser)
    // 访问接口，根据_id查找人，找到更新，userId的更新不能和数据库冲突
    const { status, msg } = await reqUpdateOneUser(getAddOneUser)
    if (status === 200) {
      message.success({
        content: '修改当前用户成功',
        duration: 2
      })

      getUsers()
      setVisibleUpdateUser(false)
      addOneForm.resetFields()
    } else {
      message.error({
        content: `${status}：${msg}`,
        duration: 2
      })
    }
  }
  const cancelUpdateUser = () => {
    setVisibleUpdateUser(false)
    addOneForm.resetFields()
  }

  // 确认删除
  const confirmDelete = async (_id) => {
    // console.log(_id);
    // 删除接口
    const { status, msg } = await reqDeleteOneUser({ _id })
    if (status === 200) {
      message.success({
        content: msg,
        duration: 2
      });
      getUsers()
    } else {
      message.error({
        content: `${status}：${msg}`,
        duration: 2
      })
    }

  };

  const getUsers = async () => {
    const { status, msg, data } = await reqGetAllUsers()
    if (status === 200) {
      setUserData(data.filter(value => value.username !== 'Admin'))   // 抛了高级管理员Admin123（没ID）
      // console.log('数据库中的users值：', data)
    } else {
      message.error({
        content: `${status}：${msg}`,
        duration: 2
      })
    }
  }
  useEffect(() => {
    getUsers()
  }, []);

  const card_header_left = <span>一个按条件搜索的框</span>
  const card_header_right = (
    <>
      <Button type="primary" onClick={showAddOneUser} className='cardBtn'>新建用户</Button>
      <Button type="primary" onClick={showImportUsers} className='cardBtn'>导入用户</Button>
    </>
  )

  // const card_header_right2 = <Button type="primary" onClick={showChangeUser} className='cardBtn'>修改用户</Button>

  return (
    // 导入用户信息的功能（excel），手动增删改查的功能
    <Card
      title={card_header_left}
      extra={card_header_right}
      className='right-content-card'
    >
      <Table
        bordered
        columns={userColumns}
        dataSource={userData}
        rowKey={user => user.userId}
      // style={userData === [] ? { 'height': 581 } : ''}
      >
      </Table>
      <Modal
        title='新增用户'
        visible={visibleAddOneUser}
        onOk={submitAddOneUser}
        onCancel={cancelAddOneUser}
      >
        <UserAdd getAddOneUserFrom={getAddOneUserFrom} />
      </Modal>
      <Modal
        title='excel导入用户'
        visible={visibleImportUsers}
        onOk={submitImportUsers}
        okText='上传数据'
        onCancel={cancelImportUsers}
      >
        {/* <FileExcelOutlined />
        请按照此表格形式上传数据 */}
        <UsersImport getExcelDataText={getExcelDataText} />
      </Modal>
      <Modal
        title='更新用户信息'
        visible={visibleUpdateUser}
        onOk={submitUpdateUser}
        // okText='上传数据'
        onCancel={cancelUpdateUser}
      >
        {/* <FileExcelOutlined />
        请按照此表格形式上传数据 */}
        {/* <UsersImport getExcelDataText={getExcelDataText} /> */}
        <UserAdd getAddOneUserFrom={getAddOneUserFrom} changeUser={nowUpdateUser} />
      </Modal>
    </Card>
  )
}

// 下一步就是做功能！！！
// 1.个人信息填写
// 然后结合人家的视频去看和自己写的哪里不行
// ts学习（）
// 2.毕设功能
// 教师提交