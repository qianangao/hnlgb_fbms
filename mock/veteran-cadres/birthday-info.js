const noResponse = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {},
  });
};

const reminTime = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      time: '09:00',
    },
  });
};

const staffInfo = [];

for (let i = 0; i < 20; i++) {
  staffInfo.push({
    id: '402883e973e5c2ce0173e5c2ce9' + i, //id
    organizationId: '1000', //单位id
    realName: 'birthday' + i, //姓名
    homeAddressDiy: null,
    dictSex: '8adcf7c96a48fae4016a4925e34b', //性别
    dictNation: '8adcf7c96a48fae4016a49260741', //民族
    dateOfBirth: '2010-08-31', //出生日期
    dictPoliticalStatus: '8adcf7c96a48fae4016a4925f283', //政治面貌
    startWorkTime: '2020-08-12', //参加工作时间
    originalUnitAndPosition: '海口市老干部局副主任' + i, //原工作单位及职务
    dictRetirementLevel: '8adcf7c96a48fae4016a4925f71e', //级别
    dictRetirementType: '8adcf7c96a48fae4016a4925f601', //离退休类型
    phonenumber: '1865555555' + i, //电话号码
    dictTreatmentNow: '8adcf7c96a48fae4016a492643c9', //现享受待遇
    spouseName: null,
    childrenNum: null,
    idCard: '440103199003077458', //身份证号
    nowThePipeUnits: '现管单位', //现管单位
    nowThePipeUnitsId: '40fd998a6f42a78d016f45ff33ee', //现管单位id
    hobby: '书法', //兴趣爱好
    isReminder: 0, // 是否提示
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
  'GET  /birthday-reminder': list,
  'GET  /birthday-reminder/cron': reminTime,
  'PUT /user/isReminder': noResponse,
  'PUT /user/change_cron': noResponse,
};
