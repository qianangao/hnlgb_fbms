const routes = {
  path: '/coconutIsland-paradise',
  name: 'coconutIsland-paradise',
  icon: 'smile',
  authority: '04',
  remark: '椰岛乐园',
  routes: [
    {
      path: '/coconutIsland-paradise/senior-university',
      name: 'coconutIsland-paradise-senior-university',
      component: './coconutIsland-paradise/senior-university',
      authority: '04-01',
      remark: '老年大学',
    },
    {
      path: '/coconutIsland-paradise/works-corner',
      name: 'coconutIsland-paradise-works-corner',
      component: './coconutIsland-paradise/works-corner',
      authority: '04-02',
      remark: '作品园地',
    },
    {
      path: '/coconutIsland-paradise/medical-guide',
      name: 'coconutIsland-paradise-medical-guide',
      component: './coconutIsland-paradise/medical-guide',
      authority: '04-03',
      remark: '就医指南',
    },
    {
      path: '/coconutIsland-paradise/life-service',
      name: 'coconutIsland-paradise-life-service',
      component: './coconutIsland-paradise/life-service',
      authority: '04-04',
      remark: '生活服务',
    },
    {
      path: 'http://ggfw.hainan.gov.cn/ecdomain/framework/hnwbdt/index.jsp',
      target: '_blank',
      authority: '04-05',
      remark: '社保认证',
    },
    {
      path: '/coconutIsland-paradise/different-livingPlaces',
      name: 'coconutIsland-paradise-different-livingPlaces',
      component: './coconutIsland-paradise/different-livingPlaces',
      authority: '04-06',
      remark: '异地居住',
    },
    {
      path: '/coconutIsland-paradise/activity-center',
      name: 'coconutIsland-paradise-activity-center',
      component: './coconutIsland-paradise/activity-center',
      authority: '04-07',
      remark: '活动中心',
    },
    {
      path: '/coconutIsland-paradise/elderly-policy',
      name: 'coconutIsland-paradise-elderly-policy',
      component: './coconutIsland-paradise/elderly-policy',
      authority: '04-08',
      remark: '涉老政策',
    },

    {
      path: '/coconutIsland-paradise/help-elderly',
      name: 'coconutIsland-paradise-help-elderly',
      component: './coconutIsland-paradise/help-elderly',
      authority: '04-09',
      remark: '助老志愿',
    },
    {
      path: '/coconutIsland-paradise/online-registration',
      name: 'coconutIsland-paradise-online-registration',
      component: './coconutIsland-paradise/online-registration',
      authority: '04-10',
      remark: '网络报名',
    },
    {
      path: 'http://ggfw.hainan.gov.cn/ecdomain/framework/hnwbdt/index.jsp',
      target: '_blank',
      authority: '04-11',
      remark: '社保查询',
    },
    {
      path: 'http://ggfw.hainan.gov.cn/ecdomain/framework/hnwbdt/index.jsp',
      target: '_blank',
      authority: '04-12',
      remark: '医保查询',
    },
    {
      path: '/coconutIsland-paradise/health-education',
      name: 'coconutIsland-paradise-health-education',
      component: './coconutIsland-paradise/health-education',
      authority: '04-13',
      remark: '保健教育',
    },
    {
      path: '/coconutIsland-paradise/medical-policy',
      name: 'coconutIsland-paradise-medical-policy',
      component: './coconutIsland-paradise/medical-policy',
      authority: '04-14',
      remark: '医疗政策',
    },
    {
      path: '/coconutIsland-paradise/health-assessment',
      name: 'coconutIsland-paradise-health-assessment',
      component: './coconutIsland-paradise/health-assessment',
      authority: '04-15',
      remark: '健康测评',
    },
    // {
    //   path: '/coconutIsland-paradise/physical-examination',
    //   name: 'coconutIsland-paradise-physical-examination',
    //   component: './coconutIsland-paradise/physical-examination',
    //   authority: '04-16',
    //   remark: '体检管理',
    // },
    {
      path: '/coconutIsland-paradise',
      redirect: '/coconutIsland-paradise/senior-university',
      hideInMenu: true,
    },
  ],
};
export default routes;
