import { Button, Result } from 'antd';
/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, { getMenuData, getPageTitle } from '@ant-design/pro-layout';
import React from 'react';
import { Helmet } from 'react-helmet';

import { Link, connect } from 'umi';

import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { getAuthorityFromRouter } from '@/utils/utils';
import logo from '@/assets/logo.svg';
import SecurityLayout from './SecurityLayout';
import BasicFooter from './BasicFooter';

const noMatch = (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">返回登陆页</Link>
      </Button>
    }
  />
);

/**
 * use Authorized check all menu item
 */
const menuDataRender = menuList =>
  menuList.map(item => {
    const localItem = {
      ...item,
      // 使用remark替换name作为菜单以及面包屑展示
      name: item.remark || item.name,
      children: item.children ? menuDataRender(item.children) : [],
    };
    return Authorized.check(item.authority, localItem, null);
  });

const BasicLayout = props => {
  const {
    dispatch,
    children,
    settings,
    route = {
      routes: [],
    },
    location = {
      pathname: '/',
    },
  } = props;

  const { routes = [] } = route;

  const { breadcrumb } = getMenuData(routes);

  const documentTitle = getPageTitle({
    pathname: location.pathname,
    breadcrumb,
    ...settings,
    formatMessage({ id }) {
      const titleRoute = Object.values(breadcrumb).find(item => id === item.locale);
      return titleRoute.remark;
    },
  });

  /**
   * init variables
   */
  const handleMenuCollapse = payload => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  };

  // get children authority
  const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
    authority: undefined,
  };
  return (
    <ProLayout
      logo={logo}
      menuHeaderRender={(logoDom, titleDom) => (
        <Link to="/">
          {logoDom}
          <h1 style={{ fontSize: 16, whiteSpace: 'nowrap' }}>
            {titleDom ? titleDom.props.children : ''}
          </h1>
        </Link>
      )}
      onCollapse={handleMenuCollapse}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
          return defaultDom;
        }

        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers0 = []) => [
        {
          path: '/',
          breadcrumbName: '首页',
        },
        ...routers0,
      ]}
      itemRender={(route0, params, routes0) => {
        const last = routes0.indexOf(route) === routes0.length - 1;

        return last ? (
          <span>{route0.breadcrumbName}</span>
        ) : (
          <Link to={route0.path}>{route0.breadcrumbName}</Link>
        );
      }}
      footerRender={BasicFooter}
      menuDataRender={menuDataRender}
      rightContentRender={() => <RightContent />}
      {...props}
      {...settings}
    >
      <SecurityLayout>
        <Helmet>
          <title>{documentTitle}</title>
          <meta name="description" content={documentTitle} />
        </Helmet>
        <Authorized authority={authorized.authority} noMatch={noMatch}>
          {children}
        </Authorized>
      </SecurityLayout>
    </ProLayout>
  );
};

export default connect(({ global, settings }) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
