import React, { useEffect, useState } from 'react'
import { Form, Input, Select } from 'antd'
import { reqGetRoles } from '../../api';

const { Option } = Select;

// 从数据库中调取所有的role种类

const UserAdd = (props) => {

    // const { getAddOneUserFrom } = props
    const [form] = Form.useForm();
    const [roleTypes, setRoleTypes] = useState([]);

    // const onGenderChange = (value) => {
    //     switch (value) {
    //         case 'male':
    //             form.setFieldsValue({
    //                 note: 'Hi, man!',
    //             });
    //             break;

    //         case 'female':
    //             form.setFieldsValue({
    //                 note: 'Hi, lady!',
    //             });
    //             return;

    //         default:
    //             break;
    //     }
    // };

    // const onFinish = (values) => {
    //     console.log('Success:', values);
    // };
    // const onFinishFailed = (errorInfo) => {
    //     console.log('Failed:', errorInfo);
    // };

    useEffect(() => {
        props.getAddOneUserFrom(form)
        console.log('user什么时候子传父')
        getRoleTypes()
    }, []);

    const getRoleTypes = async () => {
        const { data } = await reqGetRoles()
        const rolesTypes = data.map((value, index, array) => {
            return value.roleName
        })
        setRoleTypes(rolesTypes)
        console.log('rolesTypes', rolesTypes)
        // setroleTypes('数据库中的数据')
    }
    return (
        <Form
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            form={form}
            layout="vertical"
            requiredMark={true}   // 必选样式，可以切换为必选或者可选展示样式。
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

            {/* <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item> */}

            <Form.Item name="userRole" label="角色" rules={[{ required: true }]}>
                <Select
                    placeholder="Select a option and change input text above"
                    // onChange={onGenderChange}
                    allowClear
                >
                    {
                        roleTypes.map((item) => {
                            return <Option value={item} key={item}>{item}</Option>
                        })
                    }
                    {/* <Option value="male">male</Option>
                    <Option value="female">female</Option> */}
                </Select>
            </Form.Item>
        </Form>
    )
}

export default UserAdd;