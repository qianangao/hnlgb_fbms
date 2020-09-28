const noResponse = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {},
  });
};

const roleList = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      currentPage: 1,
      pageSize: 20,
      totalNum: 2,
      isMore: 0,
      totalPage: 1,
      startIndex: 0,
      items: [
        {
          id: '402882866a4dba7f016a4dbbba05', //id
          roleName: '工作人员（请勿删除）', //角色名称
          isAdmin: 0, //是否管理员 0 否 1 是
          remark: '工作人员（请勿删除）', //角色描述
          path: null,
          name: null,
          component: null,
          hideInMenu: null,
          gmtCreate: null,
          gmtModified: null,
          isDeleted: null,
          createUserId: null,
          updateUserId: null,
          createOrgId: null,
        },
        {
          id: '402882866a4dba7f016a4dba84d1',
          roleName: '单位管理员（请勿删除）',
          isAdmin: 1,
          remark: '单位管理员（请勿删除）',
          path: null,
          name: null,
          component: null,
          hideInMenu: null,
          gmtCreate: null,
          gmtModified: null,
          isDeleted: null,
          createUserId: null,
          updateUserId: null,
          createOrgId: null,
        },
      ],
    },
  });
};

export default {
  'POST /role': noResponse,
  'PUT /role/:id': noResponse,
  'DELETE /role': noResponse,
  'GET /role': roleList,
  'GET /role/:id': noResponse,
  'GET /role/:roleId/rule': noResponse,
  'POST /role/update_rule': noResponse,
};
