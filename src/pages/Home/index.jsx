import React, { Fragment, useEffect, useLayoutEffect, useState } from 'react'
import './index.less'
import axios from 'axios';
import qs from 'qs'
import { Button, Divider, Dropdown, List, Menu, Space, Table, Tabs, Tag, Upload } from 'antd';
import A from '../../components/TestComponents/A'
import B from '../../components/TestComponents/B'

import MouseCat from '../../components/TestComponents/Mouse_Tree'

import MyModal from '../../components/TestComponents/MyModal';
import { DownOutlined, EllipsisOutlined, LinkOutlined, PaperClipOutlined, SmileOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import memoryUtils from '../../utils/memoryUtils';

const fn4 = () => {
  // console.log('一个普通的函数-外面版')
}

const data = [
  (
    <div className='home'>
      <PaperClipOutlined />
      <a href='E:/。大四毕设/2023论文规范/北京工业大学耿丹学院2023届本科生毕业设计（论文）工作规范.docx'>毕业设计（论文）工作规范.docx</a>
    </div>
  ),
  (
    <div className='home'>
      <PaperClipOutlined />
      <a href=''>毕业设计（论文）文稿模板.doc</a>
    </div>
  ),
  (
    <div className='home'>
      <PaperClipOutlined />
      <a href=''>外文资料及中文译文模板.docx</a>
    </div>
  ),
  (
    <div className='home'>
      <PaperClipOutlined />
      <a href=''>信息与文献参考文献著录规则（GB∕T7714-2015）.pdf</a>
    </div>
  ),
  (
    <div className='home spanABtn'>
      <span>
        <EllipsisOutlined />
        <span>敬请期待</span>
      </span>
      {
        memoryUtils.user.userId === 'Admin123' ?
          <Button icon={<UploadOutlined />}>Upload</Button>
          :
          null
      }

    </div>
  ),
];


export default function Home() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [name, setName] = useState('张');
  const [describe, setDescribe] = useState('描述1');

  const [test, setTest] = useState("hello world1");
  const [test2, setTest2] = useState("hello world2");

  const fn1 = () => {
    setNum1(num1 + 1)
    setNum1(num1 + 2)
    setNum1(num1 + 3)
    setName('李')
  }

  const fn2 = () => {
    setTimeout(() => {
      setNum2(num2 + 1)
      setNum2(num2 + 2)
      setNum2(num2 + 3)
      setDescribe('描述2')
    },);
  }
  const fn3 = () => {
    // console.log('一个普通的函数')
  }
  useEffect(() => {
    // 第一个参数放在外面定义
    fn4()
    fn3()

    console.log('useEffect')
  },);
  console.log('------------------')
  useEffect(() => {
    // let i = 0;
    // while (i <= 100000000) {
    // setTest("world hello 1")
    // i++
    // };
    console.log(11111111111)
  }, []);

  useLayoutEffect(() => {
    // let i = 0;
    // while (i <= 100000000) {
    // setTest2("world hello 2")
    // i++
    // };
    console.log(22222222222)
  }, []);
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: <span>1</span>,
        },
        {
          key: '2',
          label: <span>2</span>,
          icon: <SmileOutlined />,
          disabled: true,
        },
        {
          key: '3',
          label: <span>3</span>,
          disabled: true,
        },
        {
          key: '4',
          danger: true,
          label: 'a danger item',
        },
      ]}
    />
  );
  const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange({ file, fileList }) {
      if (file.status !== 'uploading') {
        console.log(file, fileList);
      }
    },

  };
  return (
    <>
      {/* <h1>欢迎来到耿丹学院毕业设计管理平台</h1> */}
      <Divider orientation="left">欢迎来到耿丹学院毕业设计管理平台</Divider>
      <List
        size="large"
        // header={<div>Header</div>}
        // footer={<div>Footer</div>}
        bordered
        dataSource={data}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />

      {/* <Upload {...props}>
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload> */}
      {/* <h1>首页：文件库（待做）</h1>
      <Dropdown overlay={menu}>
          <Space>
            Hover me
            <DownOutlined />
          </Space>
      </Dropdown> */}
      {/* {console.log('render-------------------')}

      <button onClick={() => fn1()}>三次useState：{num1}{name}</button>
      <button onClick={() => fn2()}>三次useState，包裹setTimeout：{num2}{describe}</button>

      <div>Home</div>
      <h1>信息录入</h1>
      流程：

      初次登录（-&gt;改密码）-&gt;补全信息

      <A />
      <B />
      <h1>useEffect:{test}</h1>
      <h1>useLayoutEffect:{test2}</h1>

      <MouseCat />

      <MyModal content={'内容'} /> */}
    </>
  )
}
// import React, { Component } from 'react';

// class Index extends Component {
//   state = {
//     age: 0,
//     num: 0
//   }
//   fn1 = () => {
//     this.setState({ age: this.state.age + 1 })
//     this.setState({ age: this.state.age + 1 })
//     this.setState({ age: this.state.age + 1 })
//   }
//   fn2 = () => {
//     setTimeout(() => {
//       this.setState({ num: this.state.num + 1 })
//       this.setState({ num: this.state.num + 1 })
//       this.setState({ num: this.state.num + 1 })
//     });
//   }
//   render() {
//     return (
//       <>
//         {console.log('render')}
//         <div>
//           <span>{this.state.age}</span><button onClick={this.fn1}>按钮1</button>
//         </div>
//         <div>
//           <span>{this.state.num}</span><button onClick={this.fn2}>按钮2</button>
//         </div>
//       </>
//     );
//   }
// }

// export default Index;
