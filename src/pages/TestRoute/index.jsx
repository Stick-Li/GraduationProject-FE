// import React from 'react'

// export default function TextRoute() {
//   return (
//     <div>
//         暂时的路由组件，不知道具体放哪先放在最外层下
//     </div>
//   )
// }

import { Space, Table, Tag, Card, Button } from 'antd';
import React from 'react';
const { Column, ColumnGroup } = Table;
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
  }
]
const userData = [
  // {
  //   userId: '109019012',
  //   username: 'ljx'
  // }
];

const App = () => (
  <Card
    title={<Button type="primary" className='cardBtn'>daoru</Button>}
    extra={<Button></Button>}
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

  </Card>
);

export default App;