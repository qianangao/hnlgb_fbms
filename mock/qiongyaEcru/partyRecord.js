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
    createOrgId: 'string', //创建id
    dateOfBirth: '2020-08-20T01:10:58.101Z', //出生日期
    dictNation: 'string', //民族
    dictPaymentState: 'string', //缴费状态
    dictPoliticalStatus: 'string', //政治面貌
    dictRetirementType: 'string', //离退休类型
    dictSex: '8adcf7c96a48fae4016a4925e34b', //性别
    id: '54523657785' + i, //缴费记录id
    originalUnitAndPosition: 'string', //原工作单位及职务
    partyId: 'string', //支部id
    partyName: 'test支部', //支部名称
    paymentAmount: 'string', //缴费金额
    paymentState: 0, //缴费状态
    paymentTime: '2020-08-20T01:10:58.101Z', //缴费时间
    userId: 'string', //用户id
    userName: '俞鸣', //用户姓名
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

const detailOrgLife = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      createOrgId: 'string', //创建id
      dateOfBirth: '2020-08-20T01:10:58.101Z', //出生日期
      dictNation: 'string', //民族
      dictPaymentState: '0', //缴费状态
      dictPoliticalStatus: 'string', //政治面貌
      dictRetirementType: 'string', //离退休类型
      dictSex: '8adcf7c96a48fae4016a4925e34b', //性别
      id: '12334854785', //缴费记录id
      originalUnitAndPosition: 'string', //原工作单位及职务
      partyId: 'string', //支部id
      partyName: 'test支部', //支部名称
      paymentAmount: '100', //缴费金额
      paymentState: 0, //缴费状态
      paymentTime: '2020-08-20T01:10:58.101Z', //缴费时间
      userId: 'string', //用户id
      userName: '张三', //用户姓名
    },
  });
};

export default {
  'GET /lgbsmp/api/partyDue': list,
  'POST /lgbsmp/api/partyDue': noResponse,
  'DELETE /lgbsmp/api/partyDue': noResponse,
  'PUT /lgbsmp/api/partyDue/:id': noResponse,
  'GET /lgbsmp/api/partyDue/:id': detailOrgLife,
  'GET /lgbsmp/api/partyDueExport': noResponse,
};
