const routes = {
  path: '/information-release',
  name: 'information-release',
  icon: 'team',
  remark: '信息发布',
  routes: [
    {
      path: '/information-release/news-dynamic',
      name: 'information-release-news-dynamic',
      component: './information-release/news-dynamic',
      remark: '新闻动态',
    },
    {
      path: '/information-release/daily-broadcast',
      name: 'information-release-daily-broadcast',
      component: './information-release/daily-broadcast',
      remark: '每日播报',
    },
    {
      path: '/information-release/notice-announcement',
      name: 'information-release-notice-announcement',
      component: './information-release/notice-announcement',
      remark: '通知公告',
    },
  ],
};

export default routes;
