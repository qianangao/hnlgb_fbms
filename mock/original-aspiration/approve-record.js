const noResponse = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {},
  });
};

const listInfo = [];

for (let i = 0; i < 20; i++) {
  listInfo.push({
    id: '4028b23f73eae1b30173eae1b37b' + i, //id
    userId: '402883e973e5c2ce0173e5c2ce9d', //userId
    realName: '审批备案', //姓名
    dateOfBirth: '2020-08-12', //出生日期
    dictSex: '8adcf7c96a48fae4016a4925e34b', //性别
    recordDate: '2020-06-18', //备案时间
    recordItems: '困难帮扶', //备案事项 字典值 生活不能自理护理费、困难帮扶、遗属困难补助、五好支部创建、四就近活动场建设、出境出国
    remark: '测试修改',
    dictRetirementType: '8adcf7c96a48fae4016a4925f601', //离退休类型
    createOrgId: '1000',
    createUserId: '1',
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
      recordDate: '2020-06-18', //备案时间
      recordItems: '困难帮扶', //备案事项 字典值 生活不能自理护理费、困难帮扶、遗属困难补助、五好支部创建、四就近活动场建设、出境出国
      remark: '测试修改',
      dictRetirementType: '8adcf7c96a48fae4016a4925f601', //离退休类型
      createOrgId: '1000',
      createUserId: '1',
    },
  });
};

export default {
  'GET /examine_record': list,
  'POST /examine_record': noResponse,
  'DELETE /examine_record': noResponse,
  'PUT /examine_record/:id': noResponse,
  'GET /examine_record/:id': detail,
};
