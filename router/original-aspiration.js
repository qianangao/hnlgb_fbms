const routes = {
  path: '/original-aspiration',
  name: 'original-aspiration',
  icon: 'team',
  remark: '琼崖初心',
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
      remark: '社团之家',
    },
    {
      path: '/original-aspiration/activity-home',
      name: 'activity-home',
      component: './original-aspiration/activity-home',
      remark: '活动信息',
    },
    {
      path: '/original-aspiration/achievement-exhibition',
      name: 'achievement-exhibition',
      component: './original-aspiration/achievement-exhibition',
      remark: '成果展台',
    },
    {
      path: '/original-aspiration/advanced-deeds',
      name: 'advanced-deeds',
      component: './original-aspiration/advanced-deeds',
      remark: '先进事迹',
    },
    {
      path: '/original-aspiration/experience-introduction',
      name: 'experience-introduction',
      component: './original-aspiration/experience-introduction',
      remark: '经验介绍',
    },
    {
      path: '/original-aspiration/elegant-demeanor',
      name: 'elegant-demeanor',
      component: './original-aspiration/elegant-demeanor',
      remark: '五老风采',
    },
  ],
};

export default routes;
