import { getMenuData, getPageTitle } from '@ant-design/pro-layout';

import { Helmet } from 'react-helmet';
import { Link, connect } from 'umi';
import React from 'react';

import BasicFooter from './BasicFooter';
import logo from '../assets/logo.svg';
import styles from './UserLayout.less';

const UserLayout = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);

  const title = getPageTitle({
    pathname: location.pathname,
    breadcrumb,
    ...props,
    formatMessage({ id }) {
      const titleRoute = Object.values(breadcrumb).find(item => id === item.locale);
      return titleRoute.remark;
    },
  });

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>海南省离退休干部服务管理平台</span>
              </Link>
            </div>
            <div className={styles.desc}>海南省离退休干部服务管理平台</div>
          </div>
          {children}
        </div>
        <BasicFooter />
      </div>
    </>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
