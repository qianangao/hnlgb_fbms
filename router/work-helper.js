const routes = {
  path: '/work-helper',
  name: 'work-helper',
  icon: 'robot',
  authority: '06',
  remark: '工作助手',
  routes: [
    {
      path: '/work-helper/staff-directory',
      name: 'work-helper-staff-directory',
      component: './work-helper/staff-directory',
      authority: '06-01',
      remark: '工作人员电话簿',
    },
    {
      path: '/work-helper/policy-stipulate',
      name: 'work-helper-policy-stipulate',
      component: './work-helper/policy-stipulate',
      authority: '06-02',
      remark: '政策规定与解答',
    },
    {
      path: '/work-helper/receive-file',
      name: 'work-helper-receive-file',
      component: './work-helper/receive-file',
      authority: '06-03',
      remark: '收发文件',
    },
    {
      path: '/work-helper',
      redirect: '/work-helper/staff-directory',
      hideInMenu: true,
    },
  ],
};

export default routes;
