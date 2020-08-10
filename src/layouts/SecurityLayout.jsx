import { PageLoading } from '@ant-design/pro-layout';
import React from 'react';
import { Redirect, connect } from 'umi';

import { stringify } from 'querystring';

class SecurityLayout extends React.Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    // this.props.dispatch({ type: 'login/getUserInfoFromCookie' });
    this.setState({
      isReady: true,
    });
  }

  render() {
    const { isReady } = this.state;
    const { children, loading, token } = this.props;
    // You can replace it to your authentication rule (such as check token exists)
    const isLogin = token;
    const queryString = stringify({
      redirect: window.location.href,
    });

    if ((!isLogin && loading) || !isReady) {
      return <PageLoading />;
    }

    if (!isLogin) {
      return <Redirect to={`/user/login?${queryString}`}></Redirect>;
    }

    return children;
  }
}

export default connect(({ login, loading }) => ({
  token: login.token,
  loading: loading.models.login, // TODO 添加获取用户信息相关逻辑
}))(SecurityLayout);
