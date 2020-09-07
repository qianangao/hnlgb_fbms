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
    id: '402883e973e5c2ce0173e5c2ce9' + i, //id
    userId: '123456' + i,
    dictSex: '8adcf7c96a48fae4016a4925e34b', //标题
    originalUnitAndPosition: '海口市林业局副局长' + i,
    realName: 'death' + i,
    dictRetirementLevel: '8adcf7c96a48fae4016a4925e34b',
    dieDate: '2010-03-05',
    dieReason: '心脏病' + (i + 1),
    farewell: '不详',
    farewellDate: '',
    consolationDate: '2010-04-05',
    consolationPer: '儿子',
    unConsolationRea: ' ',
    remarks: 'remarks',
    dictNation: '8adcf7c96a48fae4016a4925e34b',
    dateOfBirth: '1947-09-08',
    dictRetirementType: '8adcf7c96a48fae4016a4925e34b',
    dictTreatmentNow: '8adcf7c96a48fae4016a4925e34b',
    spouseName: 'spouseName',
    orgId: 'orgId',
    organizationId: 'organizationId',
  });
}

const list = (req, res) => {
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
      items: staffInfo,
    },
  });
};

export default {
  'GET /user/death': list,
  'DELETE /user/death': noResponse,
  'PUT /user/death/:id': noResponse,
};
