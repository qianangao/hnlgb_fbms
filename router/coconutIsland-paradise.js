const routes = {
  path: '/coconutIsland-paradise',
  name: 'coconutIsland-paradise',
  icon: 'smile',
  remark: '椰岛乐园',
  routes: [
    {
      path: '/coconutIsland-paradise/different-livingPlaces',
      name: 'coconutIsland-paradise-different-livingPlaces',
      component: './coconutIsland-paradise/different-livingPlaces',
      remark: '异地居住',
    },
    {
      path: '/coconutIsland-paradise/activity-center',
      name: 'coconutIsland-paradise-activity-center',
      component: './coconutIsland-paradise/activity-center',
      remark: '活动中心',
    },
    {
      path: '/coconutIsland-paradise/elderly-policy',
      name: 'coconutIsland-paradise-elderly-policy',
      component: './coconutIsland-paradise/elderly-policy',
      remark: '涉老政策',
    },
    {
      path: '/coconutIsland-paradise/senior-university',
      name: 'coconutIsland-paradise-senior-university',
      component: './coconutIsland-paradise/senior-university',
      remark: '老年大学',
    },
    // {
    //   path: '/coconutIsland-paradise/works-corner',
    //   name: 'coconutIsland-paradise-works-corner',
    //   component: './coconutIsland-paradise/works-corner',
    //   remark: '作品园地',
    // },
  ],
};
export default routes;
