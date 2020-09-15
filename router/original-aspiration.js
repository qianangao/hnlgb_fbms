const routes = {
  path: '/original-aspiration',
  name: 'original-aspiration',
  icon: 'team',
  remark: '南海初心',
  routes: [
    {
      path: '/original-aspiration/cares-next',
      name: 'cares-next',
      component: './original-aspiration/cares-next',
      remark: '关工工作',
    },
    {
      path: '/original-aspiration/community-info',
      name: 'community-info',
      component: './original-aspiration/community-info',
      remark: '社团信息',
    },
    {
      path: '/original-aspiration/activity-home',
      name: 'activity-home',
      component: './original-aspiration/activity-home',
      remark: '活动之家',
    },
  ],
};

export default routes;
