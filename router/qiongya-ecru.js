const routes = {
  path: '/qiongya-ecru',
  name: 'qiongya-ecru',
  icon: 'team',
  remark: '南海银辉',
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
    {
      path: '/qiongya-ecru/study-record',
      name: 'qiongya-ecru-study-record',
      component: './qiongya-ecru/study-record',
      remark: '学习记录',
    },
    {
      path: '/qiongya-ecru/party-record',
      name: 'qiongya-ecru-party-record',
      component: './qiongya-ecru/party-record',
      remark: '党费记录',
    },
    {
      path: '/qiongya-ecru/online-class',
      name: 'qiongya-ecru-online-class',
      component: './qiongya-ecru/online-class',
      remark: '网络课堂',
    },
    {
      path: '/qiongya-ecru/flow-party',
      name: 'qiongya-ecru-flow-party',
      component: './qiongya-ecru/flow-party',
      remark: '流动党员登记',
    },
  ],
};

export default routes;
