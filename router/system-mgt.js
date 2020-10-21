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
      remark: '单位管理',
    },
    {
      path: '/system-mgt/staff-mgt',
      name: 'system-mgt-staff-mgt',
      component: './system-mgt/staff-mgt',
      remark: '工作人员管理',
    },
    {
      path: '/system-mgt/role-mgt',
      name: 'system-mgt-role-mgt',
      component: './system-mgt/role-mgt',
      remark: '角色管理',
    },
    {
      path: '/system-mgt/role-rule',
      name: 'system-mgt-role-rule',
      component: './system-mgt/role-rule',
      remark: '角色授权',
    },
  ],
};

export default routes;
