import React, { useEffect, useState } from 'react'
import { Form, Input, Select } from 'antd'
import { reqGetAllDept, reqGetAllMajor, reqGetRoles } from '../../api';

const { Option } = Select;

// 从数据库中调取所有的role种类

const UserAdd = (props) => {

    // const { getAddOneUserFrom } = props
    const [nowUserInfo, setNowUserInfo] = useState({});

    const [form] = Form.useForm();
    const [roleTypes, setRoleTypes] = useState([]);
    const [deptInfos, setDeptInfos] = useState([]);
    const [majorInfos, setMajorInfos] = useState([]);

    const [changeInfo, setChangeInfo] = useState();


    // useEffect(() => {
    //     // console.log(props.changeUser.userId, nowUserInfo.userId)
    //     console.log(props.changeUser)
    //     console.log(nowUserInfo.userId)

    //     if (props.changeUser.userId !== nowUserInfo.userId) {
    //         form.setFieldsValue(props.changeUser)
    //         console.log('不是同一个人，页面重新渲染，填充选择的信息到弹出框', props.changeUser)
    //         setNowUserInfo(props.changeUser)
    //     } else {
    //         console.log('是同一个人，页面不重新渲染')
    //     }
    // },);

    useEffect(() => {
        props.getAddOneUserFrom(form)
        // console.log('user什么时候子传父')
        getRoleTypes()
        getDeptInfos()
        console.log('只在页面第一次渲染运行')
    }, []);

    const getRoleTypes = async () => {
        const { data } = await reqGetRoles()
        const rolesTypes = data.map((value, index, array) => {
            return value.roleName
        })
        setRoleTypes(rolesTypes)
        // console.log('rolesTypes', rolesTypes)
        // setroleTypes('数据库中的数据')
    }
    const getDeptInfos = async () => {
        const { data } = await reqGetAllDept()
        // console.log('data-----', data)
        setDeptInfos(data)
    }
    const getMajorInfos = async (deptId) => {
        const { data } = await reqGetAllMajor(deptId)
        const majorInfos = data.map((value, index, array) => {
            return value.majorName
        })
        setMajorInfos(majorInfos)
    }
    const handleChange = (value) => {
        console.log('改变二级学院的选择', value)
        form.setFieldsValue({ userSubject: null })
        deptInfos.forEach((valueInfo) => {
            if (value === valueInfo.deptName) {
                getMajorInfos(valueInfo.deptId)
            }
        })
    };
    return (
        <Form
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            form={form}
            layout="vertical"
            requiredMark={true}   // 必选样式，可以切换为必选或者可选展示样式。
        // initialValues={changeInfo}
        >
            <Form.Item
                label="学号/工号"
                name="userId"
                rules={[
                    {
                        required: true, // 必填样式设置
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="姓名"
                name="username"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="手机号"
                name="userPhone"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="学院"
                name="userInstitute"
            >
                {/* <Input /> */}
                <Select
                    placeholder="请选择该用户所在学院"
                    onChange={handleChange}
                    allowClear
                >
                    {
                        deptInfos.map((item) => {
                            return <Option value={item.deptName} key={item.deptId}>{item.deptName}</Option>
                        })
                    }
                </Select>
            </Form.Item>
            <Form.Item
                label="专业"
                name="userSubject"
            >
                {/* <Input /> */}
                <Select
                    placeholder="请选择该用户所学专业"
                    notFoundContent="请先选择学院"
                    // onChange={onGenderChange}
                    allowClear
                >
                    {
                        majorInfos.map((item) => {
                            return <Option value={item} key={item}>{item}</Option>
                        })
                    }
                </Select>
            </Form.Item>
            <Form.Item name="userRole" label="角色" rules={[{ required: true }]}>
                <Select
                    placeholder="请选择该用户角色"
                    // onChange={onGenderChange}
                    allowClear
                >
                    {
                        roleTypes.map((item) => {
                            return <Option value={item} key={item}>{item}</Option>
                        })
                    }
                </Select>
            </Form.Item>
        </Form>
    )
}

export default UserAdd;