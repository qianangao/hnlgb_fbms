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
    age: '21', //年龄
    dictNation: '8adcf7c96a48fae4016a49260741', //民族
    endTime: '2020-08-24T01:29:19.393Z', //流动结束时间
    homeAddressDiy: '海南省昌平市创业一路201号', //家庭住址
    id: '8adcf70a73b359ff0173b365abfb' + i, //id
    originalUnitAndPosition: '局长', //原工作单位及职务
    partyName: '支部名称', //支部名称
    partyTime: '2020-08-24T01:29:19.393Z', //入党时间
    phonenumber: '15202432687', //手机号码
    realName: '张国强', //姓名
    sex: '8adcf7c96a48fae4016a4925e34b', //性别
    startTime: '2020-08-24T01:29:19.393Z', //开始流动时间
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

const detailFlowParty = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      age: '21', //年龄
      dictNation: '8adcf7c96a48fae4016a49260741', //民族
      endTime: '2020-08-24T01:29:19.393Z', //流动结束时间
      homeAddressDiy: '海南省昌平市创业一路201号', //家庭住址
      id: '8adcf70a73b359ff0173b365abfb', //id
      originalUnitAndPosition: '局长', //原工作单位及职务
      partyName: '支部名称', //支部名称
      partyTime: '2020-08-24T01:29:19.393Z', //入党时间
      phonenumber: '15202432687', //手机号码
      realName: '张国强', //姓名
      sex: '8adcf7c96a48fae4016a4925e34b', //性别
      startTime: '2020-08-24T01:29:19.393Z', //开始流动时间
    },
  });
};

export default {
  'GET /lgbsmp/api/flow_party': list,
  'POST /lgbsmp/api/flow_party': noResponse,
  'DELETE /lgbsmp/api/flow_party': noResponse,
  'PUT /lgbsmp/api/flow_party/:id': noResponse,
  'GET /lgbsmp/api/flow_party/:id': detailFlowParty,
};
