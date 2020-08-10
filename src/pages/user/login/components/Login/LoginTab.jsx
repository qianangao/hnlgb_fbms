import React, { Component } from 'react';

import { Tabs } from 'antd';
import LoginContext from './LoginContext';

const { TabPane } = Tabs;

const generateId = (() => {
  let i = 0;
  return (prefix = '') => {
    i += 1;
    return `${prefix}${i}`;
  };
})();

class LoginTab extends Component {
  uniqueId = '';

  constructor(props) {
    super(props);
    this.uniqueId = generateId('login-tab-');
  }

  componentDidMount() {
    const { tabutil } = this.props;

    if (tabutil) {
      tabutil.addTab(this.uniqueId);
    }
  }

  render() {
    const { children } = this.props;
    return <TabPane {...this.props}>{children}</TabPane>;
  }
}

const WrapContext = props => (
  <LoginContext.Consumer>
    {value => <LoginTab tabutil={value.tabutil} {...props} />}
  </LoginContext.Consumer>
); // 标志位 用来判断是不是自定义组件

WrapContext.typeName = 'LoginTab';
export default WrapContext;
