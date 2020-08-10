// umi routes: https://umijs.org/zh/guide/router.html
import VeteranCadresRoutes from './veteran-cadres';

const router = [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            path: '/user',
            redirect: '/user/login',
          },
          {
            name: 'login',
            path: '/user/login',
            remark: '登录',
            component: './user/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/BasicLayout',
        Routes: ['src/pages/Authorized'],
        routes: [
          // VeteranCadresRoutes,
          {
            path: '/inspect-log',
            name: 'inspect-log',
            component: './inspect-log',
            icon: 'fileText',
            remark: '巡查日志',
            hideChildrenInMenu: true,
          },
          {
            path: '/',
            redirect: '/inspection-mgt',
          },
          {
            component: '404',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];

module.exports = router;
