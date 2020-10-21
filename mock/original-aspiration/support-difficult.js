const noResponse = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {},
  });
};

const listInfo = [];

for (let i = 0; i < 10; i++) {
  listInfo.push({
    id: '4028b23f73eae1b30173eae1b37b' + i, //id
    userId: '402883e973e5c2ce0173e5c2ce9d', //userId
    realName: '困难帮扶', //姓名
    dateOfBirth: '2020-08-12', //出生日期
    dictSex: '8adcf7c96a48fae4016a4925e34b', //性别
    helpDate: '2020-08-18', //帮扶日期
    helpMoney: '1000', //帮扶金额
    helpOrganization: '海南省委老干部局', //帮扶单位
    helpReason: '重大疾病', //帮扶原因
    helpPeople: '测试', //发放人
    helpLeader: null,
    entourage: null,
    remark: 'string',
    attachmentURLs: null,
    dictRetirementType: '8adcf7c96a48fae4016a4925f601', //离退休类型
    organizationId: '1000',
    information: '测试', //情况说明
    helpMode: '现金', //帮扶形式 字典值(现金、物资、人力)
    helpType: 1, //帮扶类型 1特困补助申请管理、 2遗孀补助申请管理
    organizationName: null,
  });
}

const list = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      currentPage: 1,
      pageSize: 10,
      totalNum: 20,
      isMore: 1,
      totalPage: 2,
      startIndex: 0,
      items: listInfo,
    },
  });
};

const detail = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      id: '8adcf7ea74005ec101740061175e', //id
      userId: '402883e973e5c2ce0173e5c2ce9d', //userId
      realName: '伍仟', //姓名
      dateOfBirth: '2020-08-12', //出生日期
      dictSex: '8adcf7c96a48fae4016a4925e34b', //性别
      helpDate: '2020-08-18', //帮扶日期
      helpMoney: '1000', //帮扶金额
      helpOrganization: '海南省委老干部局', //帮扶单位
      helpReason: '哈哈', //帮扶原因
      helpPeople: '测试', //发放人
      helpLeader: null,
      entourage: null,
      remark: 'string',
      attachmentURLs: null,
      dictRetirementType: '8adcf7c96a48fae4016a4925f601', //离退休类型
      organizationId: '1000',
      information: '测试', //情况说明
      helpMode: '现金', //帮扶形式 字典值(现金、物资、人力)
      helpType: 1, //帮扶类型 1特困补助申请管理、 2遗孀补助申请管理
      organizationName: null,
    },
  });
};

export default {
  'GET /difficulty_help': list,
  'POST /difficulty_help': noResponse,
  'DELETE /difficulty_help': noResponse,
  'PUT /difficulty_help/:id': noResponse,
  'GET /difficulty_help/:id': detail,
};
