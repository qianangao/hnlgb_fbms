// umi routes: https://umijs.org/zh/guide/router.html
import VeteranCadresRoutes from './veteran-cadres';
import CoconutIslandParadiseRoutes from './coconutIsland-paradise';
import OriginalAspirationRoutes from './original-aspiration';
import WorkRecordRoutes from './work-record';
import InformationRelease from './information-release';
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
                remark: '首页',
                icon: 'dashboard',
              },
              VeteranCadresRoutes,
              CoconutIslandParadiseRoutes,
              OriginalAspirationRoutes,
              WorkRecordRoutes,
              InformationRelease,
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
