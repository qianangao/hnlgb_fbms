const all = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      retiredRe: 3, //离休人数
      retired: 0, //退休人数
      amount: 3, //离退休总数
      man: 3, //男
      woman: 0, //女
    },
  });
};
const sex = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      retiredRe: 3, //离休人数
      retired: 0, //退休人数
      retiredReMan: 3, //离休男性人数
      retiredReWoman: 0, //离休女性人数
      retiredMan: 0, //退休男性人数
      retiredWoman: 0, //退休女性人数
    },
  });
};
const treatment = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: [
      {
        dictRevolutionPeriod: '8adcf7c96a48fae4016a492602df', //参加革命工作时期
        provincialDepartment: 0, //省部级
        bureaus: 0, //厅局级
        countyArea: 0, //县处级
        sectionBelow: 0, //科以下
        total: 0, //总计
      },
      {
        dictRevolutionPeriod: '8adcf7c96a48fae4016a492603c4',
        provincialDepartment: 0,
        bureaus: 0,
        countyArea: 0,
        sectionBelow: 0,
        total: 0,
      },
      {
        dictRevolutionPeriod: '8adcf7c96a48fae4016a492603f3',
        provincialDepartment: 0,
        bureaus: 0,
        countyArea: 0,
        sectionBelow: 0,
        total: 0,
      },
      {
        dictRevolutionPeriod: '8adcf7c96a48fae4016a492604e6',
        provincialDepartment: 0,
        bureaus: 0,
        countyArea: 0,
        sectionBelow: 0,
        total: 0,
      },
      {
        dictRevolutionPeriod: '1',
        provincialDepartment: 0,
        bureaus: 0,
        countyArea: 0,
        sectionBelow: 0,
        total: 0,
      },
    ],
  });
};

const period = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: [
      {
        dictUnitNature: '8adcf7df6afc354a016afc354a83', //单位性质
        provincialDepartment: 2, //省部级
        bureaus: 0, //厅局级
        countyArea: 0, //县处级
        sectionBelow: 0, //科以下
        total: 2, //总计
      },
      {
        dictUnitNature: '8adcf7df6afc354a016afc356c0a',
        provincialDepartment: 0,
        bureaus: 0,
        countyArea: 0,
        sectionBelow: 0,
        total: 0,
      },
      {
        dictUnitNature: '8adcf7df6afc354a016afc358fa2',
        provincialDepartment: 0,
        bureaus: 0,
        countyArea: 0,
        sectionBelow: 0,
        total: 0,
      },
      {
        dictUnitNature: '8a7d87e46b59a3ed016b59a3ed87',
        provincialDepartment: 0,
        bureaus: 0,
        countyArea: 0,
        sectionBelow: 0,
        total: 0,
      },
      {
        dictUnitNature: '1',
        provincialDepartment: 2,
        bureaus: 0,
        countyArea: 0,
        sectionBelow: 0,
        total: 2,
      },
    ],
  });
};
const institution = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      office: 0, //机关
      cause: 0, //事业单位
      enterprise: 0, //企业
      other: 0, //其他
      retireTotal: 0, //退休总人数
    },
  });
};
const party = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      total: 2, //总计
      toRetirePartyMember: 2, //离休党员
      retirePartyMember: 0, //退休党员
    },
  });
};
export default {
  'GET /statistic_analysis/all': all,
  'GET /statistic_analysis/sex': sex,
  'GET /statistic_analysis/treatment': treatment,
  'GET /statistic_analysis/institution/period': period,
  'GET /statistic_analysis/institution': institution,
  'GET /statistic_analysis/party': party,
};
