// import { AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } from '@ant-design/icons';
import { Alert } from 'antd';
import React from 'react';
import { connect } from 'umi';
import md from 'utility';
import LoginForm from './components/Login';

import styles from './style.less';

const { Tab, UserName, Password, Submit } = LoginForm;

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = props => {
  const { userLogin = {}, submitting } = props;
  const { status } = userLogin;

  // //对称加密算法
  // const encrypt = word => {
  //   var key = CryptoJS.enc.Utf8.parse('liantong20190410'); //Latin1 w8m31+Yy/Nw6thPsMpO5fg==
  //   var srcs = CryptoJS.enc.Utf8.parse(word);
  //   var encrypted = CryptoJS.AES.encrypt(srcs, key, {
  //     mode: CryptoJS.mode.ECB,
  //     padding: CryptoJS.pad.Pkcs7,
  //   });
  //   return encrypted.toString();
  // };

  const handleSubmit = values => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: {
        ...values,
        password: values.password ? md.md5(values.password) : '',
      },
    });
  };
  return (
    <div className={styles.main}>
      <LoginForm activeKey="account" onSubmit={handleSubmit}>
        <Tab key="account" tab="账户密码登录">
          {status === 'error' && !submitting && <LoginMessage content="账户或密码错误" />}

          <UserName
            name="username"
            placeholder="用户名"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <Password
            name="password"
            placeholder="密码"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
        </Tab>
        <Submit loading={submitting}>登录</Submit>
        <div className={styles.other}>
          {/* <Link className={styles.register} to="/user/register">
            注册账户
          </Link> */}
        </div>
      </LoginForm>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
