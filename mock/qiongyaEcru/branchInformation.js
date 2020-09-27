const noResponse = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {},
  });
};

const staffInfo = [];

for (let i = 0; i < 20; i++) {
  staffInfo.push({
    branchDeputySecretaryOneId: 'string', //支部副书记id1
    branchDeputySecretaryOneName: '赵乐际', //支部副书记
    branchDeputySecretaryTwoId: 'string', //支部副书记id2
    branchDeputySecretaryTwoName: 'string', //支部副书记
    branchSecretaryId: 'string', //支部书记id
    branchSecretaryName: '张国强', //支部书记
    dateForChangingLeaders: '2020-08-13 03:00:16', // 换届时间
    dictPartyCategory: 'string',
    dictPartyType: '党员支部', //支部类型
    disciplineCommissaryId: 'string', //纪检委员id
    disciplineCommissaryName: 'string', //纪检委员
    id: '402883e973e5c2ce0173e5c2ce9d' + (i + ''),
    organCommissaryId: 'string', //组织委员id
    organCommissaryName: 'string', //组织委员
    organizationId: 'string',
    organizationName: 'string',
    partyMemberNum: 5, //党员数量
    partyName: '支部名称',
    publicityCommissaryId: 'string', //宣传委员id
    publicityCommissaryName: 'string', //宣传委员
    unit: 'string', //所属单位
    venues: '海南省张平县', //支部活动地点
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
      items: staffInfo,
    },
  });
};

const detailBranchInformation = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      branchDeputySecretaryOneId: 'string', //支部副书记id1
      branchDeputySecretaryOneName: '赵乐际', //支部副书记
      branchDeputySecretaryTwoId: 'string', //支部副书记id2
      branchDeputySecretaryTwoName: 'string', //支部副书记
      branchSecretaryId: 'string', //支部书记id
      branchSecretaryName: '张国强', //支部书记
      dateForChangingLeaders: '2020-08-13 03:00:16', // 换届时间
      dictPartyCategory: 'string',
      dictPartyType: '党员支部', //支部类型
      disciplineCommissaryId: 'string', //纪检委员id
      disciplineCommissaryName: 'string', //纪检委员
      id: '402883e973e5c2ce0173e5c2ce9d',
      organCommissaryId: 'string', //组织委员id
      organCommissaryName: 'string', //组织委员
      organizationId: 'string',
      organizationName: 'string',
      partyMemberNum: 5, //党员数量
      partyName: '支部名称',
      publicityCommissaryId: 'string', //宣传委员id
      publicityCommissaryName: 'string', //宣传委员
      unit: 'string', //所属单位
      venues: '海南省张平县', //支部活动地点
    },
  });
};

//支部成员列表

const partyUserlist = [];

for (let i = 0; i < 20; i++) {
  staffInfo.push({
    branchDeputySecretaryOneId: 'string', //支部副书记id1
    branchDeputySecretaryOneName: '赵乐际', //支部副书记
    branchDeputySecretaryTwoId: 'string', //支部副书记id2
    branchDeputySecretaryTwoName: 'string', //支部副书记
    branchSecretaryId: 'string', //支部书记id
    branchSecretaryName: '张国强', //支部书记
    dateForChangingLeaders: '2020-08-13 03:00:16', // 换届时间
    dictPartyCategory: 'string',
    dictPartyType: '党员支部', //支部类型
    disciplineCommissaryId: 'string', //纪检委员id
    disciplineCommissaryName: 'string', //纪检委员
    id: '402883e973e5c2ce0173e5c2ce9d' + (i + ''),
    organCommissaryId: 'string', //组织委员id
    organCommissaryName: 'string', //组织委员
    organizationId: 'string',
    organizationName: 'string',
    partyMemberNum: 5, //党员数量
    partyName: '支部名称',
    publicityCommissaryId: 'string', //宣传委员id
    publicityCommissaryName: 'string', //宣传委员
    unit: 'string', //所属单位
    venues: '海南省张平县', //支部活动地点
  });
}

const partyUser = (req, res) => {
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
      items: partyUserlist,
    },
  });
};

export default {
  'GET /branchInformation': list,
  'POST /branchInformation': noResponse,
  'DELETE /branchInformation': noResponse,
  'PUT /branchInformation/:id': noResponse,
  'GET /branchInformation/:id': detailBranchInformation,
  'GET /partyUser/:id': partyUser,
};
