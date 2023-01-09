import React, { useState } from 'react'
import axios from 'axios';
import qs from 'qs'


export default function Home() {
  const [name, setName] = useState('');
  const [describe, setDescribe] = useState('');
  const [exclusive, setExclusive] = useState('True');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [wechat, setWechat] = useState('');
  // const fn1 = (event) => {
  //   event.preventDefault()

  //   console.log(qs.parse('name=stick%20lee&describe=react&exclusive=True&mobile=13031890225&email=leepy579%40163.com&wechat=qweqwe'))

  //   axios({
  //     method: "POST",
  //     url: "/test/72b88c04309911ec8d3d0242ac130003/v1_0_0/testprovider/create",
  //     data: 'name=stick%20lee&describe=react&exclusive=True&mobile=13031890225&email=leepy579%40163.com&wechat=qweqwe'
  //   })
  //     .then((res) => {
  //       console.log("create res", res.data);
  //     })
  //     .catch((error) => {
  //       console.log("error", error);
  //     });
  //   console.log("都不为空");

  // }
  // const fn2 = () => {
  //   axios({
  //     method: 'POST',
  //     url: "/test/72b88c04309911ec8d3d0242ac130003/v1_0_0/testprovider/get",
  //     // data: {
  //     //   id: Number(2976)
  //     // },
  //     data: 'id=2976'
  //   })
  //     .then((res) => {
  //       console.log("get:", res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }
  // const fn3 = () => {
  //   axios({
  //     method: 'POST',
  //     url: "/test/72b88c04309911ec8d3d0242ac130003/v1_0_0/testprovider/avatar_square/upload",
  //     data: qs.stringify({
  //       id: 2976,
  //       avatar_square: 123123,
  //     })
  //   })
  //     .then((res) => {
  //       console.log("get:", res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }
  return (
    <>
      <div>Home</div>
      <h1>信息录入</h1>
      流程：
      
      初次登录（-&gt;改密码）-&gt;补全信息
      {/* <div>
        <form>

          <button onClick={fn1}>提交</button>
        </form>

        <button onClick={fn2}>查找</button>

        <button onClick={fn3}>上传图片</button>

      </div> */}
    </>
  )
}
