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
    userName: '姓名' + i, //姓名
    age: 1, //年龄
    dateOfBirth: '2020-08-12', //出生日期
    originalUnitAndPosition: '局长', //原工作单位及职务
    hospitalName: 'string', //医院名
    lengthOfStay: '2020-08-14', //住院时间
    dischargeTime: '2020-08-14', //出院时间
    department: 'string', //科室
    hospitalBed: 'string', //病床
    state: 'string',
    condition: 'string', //病情
    therapeuticOutcome: 'string', //治疗结果
    dictSex: '8adcf7c96a48fae4016a4925e34b', //性别
    dictRetirementType: '8adcf7c96a48fae4016a4925f601', //离退休类型
    isVisit: 0, //是否看望
    organizationId: '1000',
    approver: null, //审核人
    approveDate: null, //审核时间
    dictApproveStatus: 0, //审核状态  0 待审核  1审核通过 2审核不通过
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

const hospitalRegistration = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      id: '402883e973e5c2ce0173e5c2ce9m', //userId
      condition: '正常', //病情
      departmentHospitalBed: '一科室3号床', //科室病床
      dischargeTime: '2020-08-12', //出院时间
      hospitalName: '海南医院', //医院名称
      isVisit: '是', //是否看望
      lengthOfStay: '2020-07-12', //住院时间
      therapeuticOutcome: '康复', //治疗结果
    },
  });
};

export default {
  'GET /hospital_register': list,
  'POST /hospital_register': noResponse,
  'DELETE /hospital_register': noResponse,
  'PUT /hospital_register/:id': noResponse,
  'GET /hospital_register/:id': hospitalRegistration,
};
