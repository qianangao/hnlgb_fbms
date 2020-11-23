const routes = {
  path: '/system-mgt',
  name: 'system-mgt',
  icon: 'setting',
  remark: '系统管理',
  routes: [
    {
      path: '/system-mgt/organization-mgt',
      name: 'system-mgt-organization-mgt',
      component: './system-mgt/organization-mgt',
      authority: '08-01',
      remark: '单位管理',
    },
    {
      path: '/system-mgt/staff-mgt',
      name: 'system-mgt-staff-mgt',
      component: './system-mgt/staff-mgt',
      authority: '08-02',
      remark: '工作人员管理',
    },
    {
      path: '/system-mgt/role-mgt',
      name: 'system-mgt-role-mgt',
      component: './system-mgt/role-mgt',
      authority: '08-03',
      remark: '角色管理',
    },
    {
      path: '/system-mgt/role-rule',
      name: 'system-mgt-role-rule',
      component: './system-mgt/role-rule',
      authority: '08-04',
      remark: '角色授权',
    },
    {
      path: '/system-mgt/download-mgt',
      name: 'system-mgt-download-mgt',
      component: './system-mgt/download-mgt',
      authority: '08-07',
      remark: '下载管理',
    },
    {
      path: '/system-mgt/monitor-center',
      name: 'system-mgt-monitor-center',
      component: './system-mgt/monitor-center',
      authority: '08-05',
      remark: '监测中心',
    },
    {
      path: '/system-mgt/dictionary-mgt',
      name: 'system-mgt-dictionary-mgt',
      component: './system-mgt/dictionary-mgt',
      remark: '字典管理',
    },
    {
      path: '/system-mgt',
      redirect: '/system-mgt/organization-mgt',
      hideInMenu: true,
    },
  ],
};

export default routes;
