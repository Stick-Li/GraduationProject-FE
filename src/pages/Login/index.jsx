import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import storageUtils from '../../utils/storageUtils';
import memoryUtils from '../../utils/memoryUtils';
import logo from '../../assets/gengerMan.png'
import './index.less'

export default function Login() {
  const [form] = Form.useForm();
  const key = 'updatable';

  const formRef = useRef()
  const navigate = useNavigate()

  const onFinish = (values) => {
    message.loading({
      content: 'Loading...',
      key,
    });
    // console.log('Received values of form: ', values);
    // 发起 ajax 请求
    axios({
      method: 'POST',
      url: 'http://127.0.0.1/login',
      data: values
    }).then((res) => {
      console.log('请求login接口返回的数据', res.data)
      const { status, msg, data } = res.data
      // 全局提示
      if (status === 200) {
        message.success({
          content: 'Loaded!',
          key,
          duration: 2,
        });
        // 向web存储存放登录信息user
        const loginUser = data
        memoryUtils.user = loginUser
        storageUtils.saveUser(data)
        console.log('登录信息已存储，跳转至后台页面')
        navigate('/')
      } else if (status === 400 || status === 401) {
        message.error({
          content: msg,
          key,
          duration: 2,
        });
      }
    }).catch(() => {
      message.error({
        content: '登录失败，请稍后重试',
        key,
        duration: 2,
      });
    })

  };
  const onReset = () => {
    form.resetFields();
  };
  return (
    <div className='login'>
      <header className='login-header'>
        <img src={logo} alt="logo" />
        <h1>毕业设计管理平台</h1>
      </header>
      <section className='login-content'>
        <h2>用户登录</h2>

        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          ref={formRef}
        >
          <Form.Item
            name="username"
            // 声明式验证：直接使用别人定义好的验证规则进行验证
            rules={[
              {
                required: true,
                message: '请输入账号！',
              },
              {
                whitespace: true,
                message: '用户名不得包含空字符！'
              },
              { min: 6, message: '账号至少6位!' },
              { max: 15, message: '账号最长15位!' },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="输入用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              /* 声明式验证
                { required: true, message: '请输入密码！', },
                { min: 6, message: '密码至少6位!' },
                { max: 10, message: '密码最长10位!' },
                { pattern: /^[0-9a-zA-Z_]+$/, message: '密码只能由数字、字母、下划线组成' },
              */
              // 自定义验证
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value) {
                    return Promise.reject(new Error('密码不得为空!'));
                  } else if (value.length <= 6) {
                    return Promise.reject(new Error('密码不能小于6位'));
                  } else if (value.length >= 18) {
                    return Promise.reject(new Error('密码不能大于18位'));
                  } else if (!/([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*/.test(value)) {
                    return Promise.reject(new Error('密码至少同时包含数字和字母'));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          {/* <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item> */}

          <Form.Item>
            <div className='login-content-form-btn'>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
              <Button htmlType="button" onClick={onReset} className="login-form-button">
                取消
              </Button>
            </div>
            {/* Or <a href="">register now!</a> */}
          </Form.Item>
        </Form>

      </section>
    </div>
  )
}
