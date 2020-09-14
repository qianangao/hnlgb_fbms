const noResponse = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {},
  });
};

const caresInfo = [];

for (let i = 0; i < 8; i++) {
  caresInfo.push({
    id: '402883e973e5c2ce0173e5c2ce9' + i, //id
    mechanismName: '关工组织' + i,
    organizationName: '海南省委老干部局',
    releaseTime: '2020-08-0' + (i + 1),
  });
}

const trendsInfo = [];

for (let i = 0; i < 8; i++) {
  trendsInfo.push({
    id: '402883e973e5c2ce0173e5c2ce9' + i, //id
    theme: '关工动态' + i,
    organizationName: '海南省委老干部局',
    releaseTime: '2020-08-0' + (i + 1),
  });
}

const listCares = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      currentPage: 1,
      pageSize: 20,
      totalNum: 10,
      isMore: 1,
      totalPage: 2,
      startIndex: 0,
      items: caresInfo,
    },
  });
};
const listTrends = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      currentPage: 1,
      pageSize: 20,
      totalNum: 10,
      isMore: 1,
      totalPage: 2,
      startIndex: 0,
      items: trendsInfo,
    },
  });
};

const getCaresDetail = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      id: '402883e973e5c2ce0173e5c2ce9d', //userId
      mechanismName: '关工组织0',
      contactPerson: '张三111',
      contactInformation: '18888888888',
      introduction:
        '中国关心下一代工作委员会（简称：中国关工委），于1990年2月经党中央国务院批准成立。中国关工委是党中央批准成立的，以离退休老同志为主体、党政有关部门和群团组织负责人参加的，以关心、教育、培养全国各族青少年健康成长为目的的群众性工作组织；是党和政府教育青少年的参谋和助手、联系青少年的桥梁和纽带。',
    },
  });
};

const caresMember = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      currentPage: 1,
      pageSize: 20,
      totalNum: 10,
      isMore: 1,
      totalPage: 2,
      startIndex: 0,
      items: [
        {
          id: '1',
          memberName: '成员1',
          dictSex: '402883e973e5c2ce0173e5c2ce9d',
          phoneNumber: '18188888888',
        },
        {
          id: '2',
          memberName: '成员2',
          dictSex: '402883e973e5c2ce0173e5c2ce9d',
          phoneNumber: '18288888888',
        },
        {
          id: '3',
          memberName: '成员3',
          dictSex: '402883e973e5c2ce0173e5c2ce9d',
          phoneNumber: '18388888888',
        },
        {
          id: '4',
          memberName: '成员4',
          dictSex: '402883e973e5c2ce0173e5c2ce9d',
          phoneNumber: '18488888888',
        },
        {
          id: '5',
          memberName: '成员5',
          dictSex: '402883e973e5c2ce0173e5c2ce9d',
          phoneNumber: '18588888888',
        },
      ],
    },
  });
};

const getTrendsDetail = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      id: '402883e973e5c2ce0173e5c2ce9d', //userId
      theme: '关工动态0',
      organizationName: '海南省委老干部局',
      createTime: '2020-08-08',
      content:
        '中国关心下一代工作委员会（简称：中国关工委），于1990年2月经党中央国务院批准成立。中国关工委是党中央批准成立的，以离退休老同志为主体、党政有关部门和群团组织负责人参加的，以关心、教育、培养全国各族青少年健康成长为目的的群众性工作组织；是党和政府教育青少年的参谋和助手、联系青少年的桥梁和纽带。',
    },
  });
};

export default {
  'GET /care-generation/mechanism': listCares,
  'GET /care-generation/trends': listTrends,
  'GET /care-generation/mechanism/:id': getCaresDetail,
  'GET /care-generation/:id': getTrendsDetail,
  'GET /care-generation/mechanism/member/:id': caresMember,
  'DELETE /care-generation/mechanism': noResponse,
  'PUT /care-generation/mechanism': noResponse,
  'POST /care-generation/mechanism': noResponse,
  'PUT /care-generation/mechanism/:id': noResponse,
  'POST /care-generation': noResponse,
  'POST /care-generation/member': noResponse,
  'PUT /care-generation/member/:id': noResponse,
  'DELETE /care-generation/member': noResponse,
};
