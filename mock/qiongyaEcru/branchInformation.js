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
      branchSecretaryId: '402883e973e5c2ce0173e5c2ce90', //支部书记id
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
  partyUserlist.push({
    id: '402883e973e5c2ce0173e5c2ce91' + i,
    realName: '支部成员' + i, //姓名
    dictSex: '8adcf7c96a48fae4016a4925e34b', //性别
    dateOfBirth: '2020-09-15', //出生日期
    dictNation: '8adcf7c96a48fae4016a49260741', //民族
    dictPoliticalStatus: '8adcf7c96a48fae4016a4925f283', //政治面貌
    phonenumber: '13609192876', //手机号码
    organizationName: '省委老干部',
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
  'GET /party': list,
  'POST /party': noResponse,
  'DELETE /party': noResponse,
  'PUT /party/:id': noResponse,
  'GET /party/:id': detailBranchInformation,
  'GET /partyUser/:id': partyUser,
  'POST /partyUser': noResponse,
  'DELETE /partyUser': noResponse,
};
