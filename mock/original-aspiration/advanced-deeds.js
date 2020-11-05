const noResponse = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {},
  });
};

const PersonalInfo = [];

for (let i = 0; i < 10; i++) {
  PersonalInfo.push({
    id: '402883e973e5c2ce0173e5c2ce9' + i, //id
    title: '个人先进事迹', //标题
    updateTime: '2020-09-23', //保存时间
    realName: '请勿删除', //老干部
    pushTime: '2020-09-23', //发布时间
    organizationName: '海南省委老干部局', //发布单位
  });
}

const listPersonal = (req, res) => {
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
      items: PersonalInfo,
    },
  });
};

const UnitInfo = [];

for (let i = 0; i < 10; i++) {
  UnitInfo.push({
    id: '402883e973e5c2ce0173e5c2ce9' + i, //id
    title: '集体先进事迹', //标题
    updateTime: '2020-09-23', //保存时间
    realName: '请勿删除', //老干部
    pushTime: '2020-09-23', //发布时间
    organizationName: '海南省委老干部局', //发布单位
  });
}

const listUnit = (req, res) => {
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
      items: UnitInfo,
    },
  });
};

const getUnitDetail = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      id: '8a7d93137424c068017424c09cf4', //id
      title: '集体先进事迹标题', //主题
      introduction: '集体先进事迹内容', //简介
      dictUnit: '集体工作人员', //集体分类
      createTime: '2020-08-25', //创建时间
      updateTime: '2020-08-25', //更新时间
      isPublished: 1, //已发布
      pushTime: '2020-08-25', //发布时间
      realName: '请勿删除', //老干部
      organizationName: '省委老干部局', //发布单位
      teamType: ['1-1', '2-1-2'],
    },
  });
};
const getPersonalDetail = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      id: '8a7d93137424b5fc017424b5fc7b', //id
      title: '个人先进事迹标题', //标题
      introduction: '个人先进事迹内容', //简介
      dictPerson: '老干部', //分类
      createTime: '2020-08-25', //创建时间
      updateTime: '2020-08-25', //更新时间
      isPublished: 1, //已发布
      pushTime: '2020-08-25', //发布时间
      realName: '请勿删除', //老干部
      organizationName: '省委老干部局', //发布单位
    },
  });
};

export default {
  'GET /person-advanced-deeds': listPersonal,
  'GET /unit-advanced-deeds': listUnit,
  'GET /person-advanced-deeds/:id': getPersonalDetail,
  'GET /unit-advanced-deeds/:id': getUnitDetail,
  'DELETE /person-advanced-deeds': noResponse,
  'DELETE /unit-advanced-deeds': noResponse,
  'PUT /person-advanced-deeds/:id': noResponse,
  'PUT /unit-advanced-deeds/:id': noResponse,
  'POST /person-advanced-deeds': noResponse,
  'POST /unit-advanced-deeds': noResponse,
};
