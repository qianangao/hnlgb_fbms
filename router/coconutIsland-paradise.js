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
  ],
};
export default routes;
