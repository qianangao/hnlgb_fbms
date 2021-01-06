const routes = {
  path: '/qiongya-ecru',
  name: 'qiongya-ecru',
  icon: 'flag',
  authority: '02',
  remark: '南海银辉',
  routes: [
    {
      path: '/qiongya-ecru/branch-information',
      name: 'qiongya-ecru-branch-information',
      component: './qiongya-ecru/branch-information',
      authority: '02-01',
      remark: '支部信息',
    },
    {
      path: '/qiongya-ecru/activity-site',
      name: 'qiongya-ecru-activity-site',
      component: './qiongya-ecru/activity-site',
      authority: '02-07',
      remark: '活动地点管理',
    },
    {
      path: '/qiongya-ecru/branch-activity',
      name: 'qiongya-ecru-branch-activity',
      component: './qiongya-ecru/branch-activity',
      authority: '02-02',
      remark: '支部活动',
    },
    {
      path: '/qiongya-ecru/study-record',
      name: 'qiongya-ecru-study-record',
      component: './qiongya-ecru/study-record',
      authority: '02-03',
      remark: '学习记录',
    },
    // {
    //   path: '/qiongya-ecru/party-record',
    //   name: 'qiongya-ecru-party-record',
    //   component: './qiongya-ecru/party-record',
    //   authority: '02-04',
    //   remark: '党费记录',
    // },
    {
      path: '/qiongya-ecru/online-class',
      name: 'qiongya-ecru-online-class',
      component: './qiongya-ecru/online-class',
      authority: '02-05',
      remark: '网络课堂',
    },
    {
      path: '/qiongya-ecru/flow-party',
      name: 'qiongya-ecru-flow-party',
      component: './qiongya-ecru/flow-party',
      authority: '02-06',
      remark: '流动党员登记',
    },
    {
      path: '/qiongya-ecru',
      redirect: '/qiongya-ecru/branch-information',
      hideInMenu: true,
    },
  ],
};

export default routes;
