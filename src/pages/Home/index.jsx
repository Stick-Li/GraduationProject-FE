import React, { useEffect, useLayoutEffect, useState } from 'react'
import axios from 'axios';
import qs from 'qs'
import { Tabs } from 'antd';
import A from '../../components/TestComponents/A'
import B from '../../components/TestComponents/B'

import MouseCat from '../../components/TestComponents/Mouse_Tree'

import MyModal from '../../components/TestComponents/MyModal';

const fn4 = () => {
  // console.log('一个普通的函数-外面版')
}
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
  return (
    <>
    <h1>首页：文件库（待做）</h1>
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
