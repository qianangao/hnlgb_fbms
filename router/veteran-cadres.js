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
  ],
};

export default routes;
