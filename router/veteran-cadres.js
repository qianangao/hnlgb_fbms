const routes = {
  path: '/veteran-cadres',
  name: 'veteran-cadres',
  icon: 'team',
  remark: '离退休老干部',
  routes: [
    {
      path: '/veteran-cadres/base-info',
      name: 'veteran-cadres-base-info',
      component: './veteran-cadres/base-info',
      remark: '基本信息',
    },
    {
      path: '/veteran-cadres/relocated',
      name: 'veteran-cadres-relocated',
      component: './veteran-cadres/relocated',
      remark: '异地安置',
    },
    {
      path: '/veteran-cadres/photo-info',
      name: 'veteran-cadres-photo-info',
      component: './veteran-cadres/photo-info',
      remark: '照片信息',
    },
    {
      path: '/veteran-cadres/specialty',
      name: 'veteran-cadres-specialty',
      component: './veteran-cadres/specialty',
      remark: '银色人才',
    },
    {
      path: '/veteran-cadres/hobby',
      name: 'veteran-cadres-hobby',
      component: './veteran-cadres/hobby',
      remark: '兴趣爱好',
    },
    {
      path: '/veteran-cadres/birthday-alert',
      name: 'veteran-cadres-birthday-alert',
      component: './veteran-cadres/birthday-alert',
      remark: '生日提醒',
    },
    {
      path: '/veteran-cadres/death-mgt',
      name: 'veteran-cadres-death-mgt',
      component: './veteran-cadres/death-mgt',
      remark: '离世管理',
    },
  ],
};

export default routes;
