const routes = {
  path: '/original-aspiration',
  name: 'original-aspiration',
  icon: 'trophy',
  authority: '03',
  remark: '琼崖初心',
  routes: [
    {
      path: '/original-aspiration/cares-next',
      name: 'cares-next',
      component: './original-aspiration/cares-next',
      authority: '03-01',
      remark: '关工工作',
    },
    {
      path: '/original-aspiration/community-info',
      name: 'community-info',
      component: './original-aspiration/community-info',
      authority: '03-02',
      remark: '社团之家',
    },
    {
      path: '/original-aspiration/activity-home',
      name: 'activity-home',
      component: './original-aspiration/activity-home',
      authority: '03-03',
      remark: '活动信息',
    },
    {
      path: '/original-aspiration/achievement-exhibition',
      name: 'achievement-exhibition',
      component: './original-aspiration/achievement-exhibition',
      authority: '03-04',
      remark: '成果展台',
    },
    {
      path: '/original-aspiration/advanced-deeds',
      name: 'advanced-deeds',
      component: './original-aspiration/advanced-deeds',
      authority: '03-05',
      remark: '先进事迹',
    },
    {
      path: '/original-aspiration/experience-introduction',
      name: 'experience-introduction',
      component: './original-aspiration/experience-introduction',
      authority: '03-06',
      remark: '经验介绍',
    },
    {
      path: '/original-aspiration/elegant-demeanor',
      name: 'elegant-demeanor',
      component: './original-aspiration/elegant-demeanor',
      authority: '03-07',
      remark: '五老风采',
    },
    {
      path: '/original-aspiration/volunteer-team',
      name: 'volunteer-team',
      component: './original-aspiration/volunteer-team',
      authority: '03-08',
      remark: '志愿团队',
    },
  ],
};

export default routes;
