import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

const Layout = ({ children }) => <ConfigProvider locale={zhCN}>{children}</ConfigProvider>;

export default Layout;
