const routes = {
  path: '/work-helper',
  name: 'work-helper',
  icon: 'team',
  remark: '工作助手',
  routes: [
    {
      path: '/work-helper/policy-stipulate',
      name: 'work-helper-policy-stipulate',
      component: './work-helper/policy-stipulate',
      remark: '政策规定与解答',
    },
    {
      path: '/work-helper/receive-file',
      name: 'work-helper-receive-file',
      component: './work-helper/receive-file',
      remark: '收发文件',
    },
  ],
};

export default routes;
