import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import React from 'react';
const props = {
  // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',

  // onChange({ file, fileList }) {
  //   if (file.status !== 'uploading') {
  //     console.log(file, fileList);
  //   }
  // },

  defaultFileList: [
    {
      uid: '1',
      name: 'xxx.png',
      status: 'done',
      response: 'Server Error 500',
      // custom error message to show
      url: 'http://www.baidu.com/xxx.png',
    },
  //   {
  //     uid: '2',
  //     name: 'yyy.png',
  //     status: 'done',
  //     url: 'http://www.baidu.com/yyy.png',
  //   },
  //   {
  //     uid: '3',
  //     name: 'zzz.png',
  //     status: 'error',
  //     response: 'Server Error 500',
  //     // custom error message to show
  //     url: 'http://www.baidu.com/zzz.png',
  //   },
  ],

  itemRender: (originNode, file, currentFileList) => {
    return <div>{originNode}{file}{currentFileList}</div>
  }
};

const App = () => (
  <Upload {...props}>
    <Button icon={<UploadOutlined />}>Upload</Button>
  </Upload>
);

export default App;