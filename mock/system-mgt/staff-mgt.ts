const noResponse = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {},
  });
};

const staffItems = [];

for (let i = 0; i < 10; i++) {
  staffItems.push({
    systemBlong: null,
    id: '2' + i, //id
    roleId: '402882866a4dba7f016a4dba84d1', //角色id
    roleName: '单位管理员（请勿删除）' + i, //角色名称
    organizationName: '测试单位', //单位名称
    organizationId: '4028b23f738f519401738f5194b9', //单位id
    userName: 'admin1', //用户名
    password: 'e10adc3949ba59abbe56e057f20f883e', //密码
    passwordForAnalysis: null,
    realName: '请勿删除', //姓名
    idCard: '610122199410162828', //身份证
    dictSex: '8adcf7c96a48fae4016a4925e34b', //性别 字典值
    dateOfBirth: '2018-10-22', //出生日期
    nativePlace: null,
    phonenumber: '18626485982', //电话
    startWorkTime: null,
    dictHealthStatus: null,
    createUserId: null,
    updateUserId: null,
    gmtCreate: null,
    gmtModified: null,
    isDeleted: null,
    createOrgId: null,
    partyTime: null,
    department: '市委老干部局', //所属部门
    fullPart: 0, //专兼职 0 专职 1兼职
    isCommunity: 0, //是否为社区工作人员 0否 1是
    community: null,
    communityId: null,
    imUserId: null,
    state: 1, //工作人员状态 1在职 2离职 3退休
    delegatee: null,
    unwrappingSerializer: false,
  });
}

const staffList = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      currentPage: 1,
      pageSize: 20,
      totalNum: 10,
      isMore: 0,
      totalPage: 1,
      startIndex: 0,
      items: staffItems,
    },
  });
};

const roleList = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: [
      {
        id: '402882866a4dba7f016a4dbbba05',
        roleName: '工作人员（请勿删除）',
        remark: '工作人员（请勿删除）',
      },
      {
        id: '402882866a4dba7f016a4dba84d1',
        roleName: '工作人员2',
        remark: '工作人员（请勿删除）',
      },
    ],
  });
};

export default {
  'GET /role-all': roleList,
  'POST /user': noResponse,
  'PUT /user/:id': noResponse,
  'DELETE /user': noResponse,
  'GET /user': staffList,
  'GET /user/reset_password/:id': noResponse,
};
