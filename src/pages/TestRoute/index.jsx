import { UserOutlined } from '@ant-design/icons';
import { Avatar, Badge } from 'antd';
import React from 'react';
import './index.less'

const App = () => (
  <>
    {/* <span> */}
      <Badge count={5}>
        <Avatar shape="square" icon={<UserOutlined />} />
      </Badge>
    {/* </span> */}
    {/* <span>
      <Badge dot>
        <Avatar shape="square" icon={<UserOutlined />} />
      </Badge>
    </span> */}
  </>
);

export default App;