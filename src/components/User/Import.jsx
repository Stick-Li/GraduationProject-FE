import React, { useState, useEffect } from 'react';
import { InboxOutlined, FileExcelOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { reqGetRoles } from '../../api';
import * as XLSX from 'xlsx';

const UsersImport = (props) => {
  // const [usersData, setUsersData] = useState([]);
  const [filesLength, setFilesLength] = useState(1);
  const [rolesArr, setRolesArr] = useState([]);
  // let nowFilesLength = 0
  // const [defaultFile, setDefaultFile] = useState([]);


  const { Dragger } = Upload;
  const filesProps = {
    name: 'file',
    accept: '.xls,.xlsx',
    maxCount: 2,
    // showUploadList: {
    //   showRemoveIcon: false
    // },
    defaultFileList: [
      {
        uid: '0',
        name: '示例 其中表头为userId（学号）和userRole（角色）的是必填项',
        status: 'done',
        // response: 'Server Error 500',
        // custom error message to show
        url: '/',   // 没啥作用（保持蓝色x
      }
    ],
    beforeUpload(file) {
      console.log('beforeInfo', file)

      if (filesLength === 1) {
        getExcelData(file)
      } else {
        message.error({
          content: '如需要重新提交，请删除上次提交记录',
          duration: 2
        })
      }

      return false;
    },
    onPreview(file) {
      console.log('点击下载Excel', file)
      if (file.uid === '0') {
        downloadDefaultExcel()
      }
    },
    onChange(info) {
      const { status } = info.file;

      // await getExcelData(info)

      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
        setFilesLength(info.fileList.length)
      }

      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },

    // onDrop(e) {
    //   console.log('Dropped files', e.dataTransfer.files);
    // },
    onRemove: (file) => {
      console.log(file)
      const { uid } = file
      if (uid === '0') {
        message.error({
          content: '默认参考文件无法删除！',
          duration: 2
        })
        return false
      }
    }
    // multiple: true,
    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    // action:'http://127.0.0.1/uploadexcel',


  };
  // 拿到Excel的数据
  const getExcelData = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const datas = e.target.result;
      const workbook = XLSX.read(datas, {
        type: 'binary'
      });
      const first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonArr = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });
      handleImportData(jsonArr, file);    //传递拿到的Excel的数据jsonArr
    };
    reader.readAsBinaryString(file);
  }
  // 解析数据
  const handleImportData = (arrExcal, file) => {
    console.log('嵌套数组形式的excel数据:', arrExcal)
    const th = arrExcal.splice(0, 1)[0] //拿到 + 去掉表头

    // 将嵌套数组改为存放对象的数组
    const newArr = arrExcal.map((value, index, array) => {
      return {
        ...value.map((value1, index1, array1) => {
          return value1
        })
      }
    })
    // console.log('',newArr)

    // 生成新的存放对象的数组，将对象属性名改为Excel表头
    const data = []
    newArr.forEach((value, index, array) => {
      const dataChild = {}
      for (const thKey in th) {
        // console.log('thKey', th[thKey])
        // console.log('value', value[thKey])
        dataChild[th[thKey]] = value[thKey]
        // console.log('dataChild', dataChild)
      }
      data.push(dataChild)
    })

    console.log(data)

    // 这部分一会独立出去 不要每次提交都重新去数据库请求数据，然后改success的部分
    try {
      data.forEach((value, index, array) => {
        // id和角色存在，且角色属于数据库中的角色
        // console.log('----', value.userRole, rolesArr, rolesArr.indexOf(value.userRole))
        if (!value.userId || rolesArr.indexOf(value.userRole) === -1) {
          message.error({
            content: '表格数据不规范',
            duration: 2
          })
          props.getExcelDataText({
            status: 2,
            message: '表格数据不规范，不可提交'
          })
          throw new Error('表格数据不规范')
        }
      })
      // setUsersData(data)
      message.success({
        content: '表格数据解析完成',
        duration: 2
      })
      props.getExcelDataText({
        status: 1,
        data,
        message: ''
      })
    } catch (error) {
      console.log('try catch:', error)
    }


    // jsonArr.splice(0, 1); // 去掉表头
    // const jsonArrData = jsonArr.map((item, index) => {
    //   let jsonObj = {};
    //   jsonObj.index = index + 1;
    //   jsonObj.key = 'user-wage-' + index;
    //   item.forEach((im, i) => {
    //     jsonObj[tableColumns[i].dataIndex] = im;
    //   })
    //   return jsonObj;
    // });
    // setWageTableData(jsonArrData)
  }
  // 下载默认文件 https://blog.csdn.net/weixin_42839080/article/details/104185468
  const downloadDefaultExcel = () => {
    const arr = [
      ['userId', 'userRole', 'username', 'userPhone', 'userInstitute', 'userSubject'],
      ['190201323', '学生', '', '', '', ''],
      ['190000000', '教师', '张三', '13000000000', '工学院', '计算机科学与技术'],
    ]
    // 将数组转为sheet
    const sheet = XLSX.utils.aoa_to_sheet(arr);
    // 先组装wookbook数据格式
    let workbook = {
      SheetNames: ['test'], // 总表名  ??啥玩意
      Sheets: { test: sheet }, // test是表名
    };
    // 下载表格
    XLSX.writeFile(workbook, '表格填写参考-用户导入.xlsx');
  }
  const getRoleArr = async () => {
    // 还要判断一下是否有重复学号
    const { data, status, msg } = await reqGetRoles()
    // console.log('拿到roles', result.data)
    if (status === 200) {
      const rolesArr = data.map((value, index, array) => {
        return value.roleName
      })
      setRolesArr(rolesArr)
      console.log('-=-=-', rolesArr)
    } else {
      message.error({
        content: `${status}：${msg}`,
        duration: 2
      })
    }
  }
  useEffect(() => {
    getRoleArr()
  }, []);

  return (
    <Dragger {...filesProps}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        {/* Click or drag file to this area to upload */}
        点击或拖拽表格文件至此进行上传
        {/* 请导入表头Excel表格 */}
      </p>
      <p className="ant-upload-hint">
        {/* Support for a single or bulk upload. Strictly prohibit from uploading company data or other
      band files */}
        学号和角色为表格内的必填项数据
      </p>
    </Dragger>
  );
}

export default UsersImport;
