const routes = {
  path: '/qiongya-ecru',
  name: 'qiongya-ecru',
  icon: 'team',
  remark: '琼崖本色',
  routes: [
    {
      path: '/qiongya-ecru/branch-information',
      name: 'qiongya-ecru-branch-information',
      component: './qiongya-ecru/branch-information',
      remark: '支部信息',
    },
    {
      path: '/qiongya-ecru/branch-activity',
      name: 'qiongya-ecru-branch-activity',
      component: './qiongya-ecru/branch-activity',
      remark: '支部活动',
    },
  ],
};

export default routes;
