const routes = {
  path: '/work-record',
  name: 'work-record',
  icon: 'file-text',
  authority: '05',
  remark: '工作记录',
  routes: [
    {
      path: '/work-record/hospital-record',
      name: 'work-record-hospital-record',
      component: './work-record/hospital-record',
      authority: '05-01',
      remark: '住院登记',
    },
    {
      path: '/work-record/visits-condolences',
      name: 'work-record-visits-condolences',
      component: './work-record/visits-condolences',
      authority: '05-02',
      remark: '走访慰问',
    },
    {
      path: '/work-record/support-difficult',
      name: 'work-record-support-difficult',
      component: './work-record/support-difficult',
      authority: '05-03',
      remark: '困难帮扶',
    },
    {
      path: '/work-record/approve-record',
      name: 'work-record-approve-record',
      component: './work-record/approve-record',
      authority: '05-04',
      remark: '审批备案',
    },
    {
      path: '/work-record/out-register',
      name: 'work-record-out-register',
      component: './work-record/out-register',
      authority: '05-05',
      remark: '外出登记',
    },
    {
      path: '/work-record/license-register',
      name: 'work-record-license-register',
      component: './work-record/license-register',
      authority: '05-06',
      remark: '证照登记',
    },
    {
      path: '/work-record',
      redirect: '/work-record/hospital-record',
      hideInMenu: true,
    },
  ],
};

export default routes;
