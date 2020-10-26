// umi routes: https://umijs.org/zh/guide/router.html
import VeteranCadresRoutes from './veteran-cadres';
import CoconutIslandParadiseRoutes from './coconutIsland-paradise';
import OriginalAspirationRoutes from './original-aspiration';
import WorkRecordRoutes from './work-record';
import InformationRelease from './information-release';
import WorkHelper from './work-helper';
import SystemMgt from './system-mgt';
import QiongyaEcru from './qiongya-ecru';
const router = [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/white',
        component: '../layouts/UserLayout',
        routes: [
          {
            path: '/white',
            redirect: '/white/login',
          },
          {
            name: 'login',
            path: '/white/login',
            remark: '登录',
            component: './user/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            routes: [
              {
                path: '/',
                redirect: '/home',
              },
              {
                path: '/home',
                name: 'home',
                component: './home',
                authority: '09',
                remark: '首页',
                icon: 'dashboard',
              },
              VeteranCadresRoutes,
              QiongyaEcru,
              OriginalAspirationRoutes,
              CoconutIslandParadiseRoutes,
              WorkRecordRoutes,
              WorkHelper,
              InformationRelease,
              SystemMgt,
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
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
