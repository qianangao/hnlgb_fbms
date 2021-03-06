const routes = {
  path: '/information-release',
  name: 'information-release',
  icon: 'mail',
  authority: '07',
  remark: '信息发布',
  routes: [
    {
      path: '/information-release/notice-announcement',
      name: 'information-release-notice-announcement',
      component: './information-release/notice-announcement',
      authority: '07-01',
      remark: '通知公告',
    },
    {
      path: '/information-release/picture-news',
      name: 'information-release-picture-news',
      component: './information-release/picture-news',
      authority: '07-02',
      remark: '图片新闻',
    },
    {
      path: '/information-release/news-dynamic',
      name: 'information-release-news-dynamic',
      component: './information-release/news-dynamic',
      authority: '07-03',
      remark: '新闻动态',
    },
    {
      path: '/information-release/politics-news',
      name: 'information-release-politics-news',
      component: './information-release/politics-news',
      authority: '07-05',
      remark: '要闻速览',
    },
    {
      path: '/information-release/work-dynamic',
      name: 'information-release-work-dynamic',
      component: './information-release/work-dynamic',
      authority: '07-06',
      remark: '工作动态',
    },
    {
      path: '/information-release/daily-broadcast',
      name: 'information-release-daily-broadcast',
      component: './information-release/daily-broadcast',
      authority: '07-04',
      remark: '每日播报',
    },
    {
      path: '/information-release',
      redirect: '/information-release/notice-announcement',
      hideInMenu: true,
    },
  ],
};

export default routes;
