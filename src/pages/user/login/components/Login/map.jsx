import { LockOutlined, MailOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import styles from './index.less';

export default {
  UserName: {
    props: {
      size: 'large',
      id: 'userName',
      prefix: <UserOutlined className={styles.prefixIcon} />,
      placeholder: 'admin',
    },
    rules: [
      {
        required: true,
        message: '请输入用户名!',
      },
    ],
  },
  Password: {
    props: {
      size: 'large',
      prefix: <LockOutlined className={styles.prefixIcon} />,
      type: 'password',
      id: 'password',
      placeholder: '888888',
    },
    rules: [
      {
        required: true,
        message: '请输入密码!',
      },
    ],
  },
  Mobile: {
    props: {
      size: 'large',
      prefix: <MobileOutlined className={styles.prefixIcon} />,
      placeholder: '手机号',
    },
    rules: [
      {
        required: true,
        message: '请输入手机号!',
      },
      {
        pattern: /^1\d{10}$/,
        message: '错误的手机号格式!',
      },
    ],
  },
  Captcha: {
    props: {
      size: 'large',
      prefix: <MailOutlined className={styles.prefixIcon} />,
      placeholder: '验证码',
    },
    rules: [
      {
        required: true,
        message: '请输入验证码!',
      },
    ],
  },
};
