const routes = {
  path: '/veteran-cadres',
  name: 'veteran-cadres',
  icon: 'team',
  remark: '离退休干部',
  authority: '01',
  routes: [
    {
      path: '/veteran-cadres/base-info',
      name: 'veteran-cadres-base-info',
      component: './veteran-cadres/base-info',
      authority: '01-01',
      remark: '基本信息',
    },
    {
      path: '/veteran-cadres/relocated',
      name: 'veteran-cadres-relocated',
      component: './veteran-cadres/relocated',
      authority: '01-02',
      remark: '易地安置',
    },
    {
      path: '/veteran-cadres/photo-info',
      name: 'veteran-cadres-photo-info',
      component: './veteran-cadres/photo-info',
      authority: '01-03',
      remark: '照片信息',
    },
    {
      path: '/veteran-cadres/specialty',
      name: 'veteran-cadres-specialty',
      component: './veteran-cadres/specialty',
      authority: '01-04',
      remark: '银色人才',
    },
    {
      path: '/veteran-cadres/hobby',
      name: 'veteran-cadres-hobby',
      component: './veteran-cadres/hobby',
      authority: '01-05',
      remark: '兴趣爱好',
    },
    {
      path: '/veteran-cadres/birthday-alert',
      name: 'veteran-cadres-birthday-alert',
      component: './veteran-cadres/birthday-alert',
      authority: '01-06',
      remark: '生日提醒',
    },
    {
      path: '/veteran-cadres/death-mgt',
      name: 'veteran-cadres-death-mgt',
      component: './veteran-cadres/death-mgt',
      authority: '01-07',
      remark: '离世管理',
    },
    {
      path: '/veteran-cadres/analysis',
      name: 'veteran-cadres-analysis',
      component: './veteran-cadres/analysis',
      authority: '01-08',
      remark: '统计分析',
    },
    {
      path: '/veteran-cadres/sheet',
      name: 'veteran-cadres-sheet',
      component: './veteran-cadres/sheet',
      authority: '01-09',
      remark: '年报统计',
    },

    // "id": "01-09",年报统计
  ],
};

export default routes;
