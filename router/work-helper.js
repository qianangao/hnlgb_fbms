const routes = {
  path: '/work-helper',
  name: 'work-helper',
  icon: 'team',
  remark: '工作助手',
  routes: [
    {
      path: '/work-helper/staff-directory',
      name: 'work-helper-staff-directory',
      component: './work-helper/staff-directory',
      remark: '工作人员电话簿',
    },
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
