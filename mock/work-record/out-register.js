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
    id: '4028b23f73eae1b30173eae1bm1' + i, //id
    userId: '402883e973e5c2ce0173e5c2ce9d', //userId
    destination: '测试', //目的地
    applicationTime: '2020-08-18', //申请时间
    abroadTime: '2020-08-18', //出国时间
    returnTime: '2020-08-18', //返回时间
    reason: '测试', //事由
    realName: '伍仟', //姓名
    dictRetirementType: '8adcf7c96a48fae4016a4925f601', //离退休类型
    dictTreatmentNow: '8adcf7c96a48fae4016a492643c9', //现享受待遇
    originalUnitAndPosition: '局长', //原工作单位和职务
    dictSex: '8adcf7c96a48fae4016a4925e34b', //性别
    dateOfBirth: '2020-08-12', //出生日期
    organizationId: '1000', //创建单位id
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

const outRegister = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      id: '402883e973e5c2ce0173e5c2ce9m', //userId
      destination: '海南', //目的地
      applicationTime: '2020-08-12', //申请时间
      returnTime: '2020-08-12', //返回时间
      reason: '探亲', //事由
    },
  });
};

export default {
  'GET /outbound_record': list,
  'POST /outbound_record': noResponse,
  'DELETE /outbound_record': noResponse,
  'PUT /outbound_record/:id': noResponse,
  'GET /outbound_record/:id': outRegister,
};
