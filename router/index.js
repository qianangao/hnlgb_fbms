// umi routes: https://umijs.org/zh/guide/router.html
import VeteranCadresRoutes from './veteran-cadres';
import OriginalAspirationRoutes from './original-aspiration';

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
                redirect: '/veteran-cadres/base-info',
              },
              VeteranCadresRoutes,
              OriginalAspirationRoutes,
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
