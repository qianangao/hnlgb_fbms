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
    organizationId: '1000', //单位id
    realName: '伍仟' + i, //姓名
    homeAddressDiy: null,
    dictSex: '8adcf7c96a48fae4016a4925e34b', //性别
    dictNation: '8adcf7c96a48fae4016a49260741', //民族
    dateOfBirth: '2020-08-12', //出生日期
    dictPoliticalStatus: '8adcf7c96a48fae4016a4925f283', //政治面貌
    startWorkTime: '2020-08-12', //参加工作时间
    originalUnitAndPosition: '局长' + i, //原工作单位及职务
    dictRetirementLevel: '8adcf7c96a48fae4016a4925f71e', //级别
    dictRetirementType: '8adcf7c96a48fae4016a4925f601', //离退休类型
    phonenumber: '1865555555' + i, //电话号码
    dictTreatmentNow: '8adcf7c96a48fae4016a492643c9', //现享受待遇
    spouseName: null,
    childrenNum: null,
    idCard: '440103199003077458', //身份证号
    nowThePipeUnits: '现管单位', //现管单位
    nowThePipeUnitsId: '40fd998a6f42a78d016f45ff33ee', //现管单位id
    partyName: '离退休党支部', //支部名称
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

const getUserInfo = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      id: '402883e973e5c2ce0173e5c2ce9d', //userId
      organizationId: '1000', //单位id
      userName: '440103199003077458', //用户名
      password: 'e10adc3949ba59abbe56e057f20f883e', //登陆密码
      realName: '伍仟', //姓名
      nameUsedBefore: '哈哈', //曾用名
      idCard: '440103199003077458', //身份证号
      dictSex: '8adcf7c96a48fae4016a4925e34b', //性别
      dateOfBirth: '2020-08-12', //出生日期
      birthday: '2020-08-05', //生日(个人意愿)
      birthdayDays: null,
      solarOrLunar: '1', //阴历/阳历
      dictNation: '8adcf7c96a48fae4016a49260741', //民族
      nativePlace: null,
      dictDegree: '40fd998a6b97e32b016b98519fe4', //文化程度
      phonenumber: '18655555555', //电话号码
      dictUnitNature: '8adcf7df6afc354a016afc354a83', //单位性质
      dictRetirementType: '8adcf7c96a48fae4016a4925f601', //离退休类型
      retirementDate: '2020-08-13', //离退休时间
      dictRetirementLevel: '8adcf7c96a48fae4016a4925f71e', //职级
      dictTreatmentNow: '8adcf7c96a48fae4016a492643c9', //先享受待遇
      isAtBeijing: 0,
      originalUnitAndPosition: '局长', //原工作单位及职务
      treatmentApproveTime: '2020-08-04', //现享受待遇批准时间
      improveTreatment: '同意', //提高享受待遇情况
      isParty: 1,
      partyTime: null,
      startWorkTime: '2020-08-12', //参加工作时间
      dictRevolutionPeriod: '8adcf7c96a48fae4016a492602ad', //参加革命工作时期
      dictHealthStatus: '8adcf7c96a48fae4016a49260516', //健康状态
      isDead: 0, //是否在世
      isDifferentPlace: 0,
      isDifferentLive: 0, //是否易地居住
      isArmyRetiredCadres: 0,
      dictPoliticalStatus: '8adcf7c96a48fae4016a4925f283', //政治面貌
      retirementCertificate: null,
      createUserId: '1', //创建人id
      gmtCreate: '2020-08-13 03:00:16', //创建时间
      isDeleted: 0,
      createOrgId: '1000', //创建单位id
      isPrimaryContact: 0,
      organizationName: '省委老干部局', //单位名称
      partyName: null, //入党时间
      treatmentApprovalNumber: '国土资函(2010)88号', //待遇批准文号
      dictAllergenUnitNaturel: '8a7d86d26b6f7a36016b6f7bdb31', //原工作单位性质
      spouseIsDead: '0',
      nowThePipeUnits: '省委老干部局', //现管单位
      nowThePipeUnitsId: '1000', //现管单位id
      hierarchy: '8a7d86d26b6f7a36016b6f7a366f', //层级
      higherOrgannization: null,
      statisticSymbol: 1, //统计标志
      dictHealth: '8adcf7c96a48fae4016a49260516', //健康状态
      dictMedicalTreatment: '828085c56aded154016aded8d789', //享受医疗待遇情况
      dictIdentity: '身份性质', //身份性质
      awardSituation: '奖罚情况', //奖罚情况
      specialContribution: '特殊贡献', //特殊贡献
      dictOrganizationArea: '28257c9df1b911ea9cdd6c4b90894a7d', //组织区域
      academicTitles: '高级', //职称
    },
  });
};

const getFamilyInfo = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      homeAddressDiy: '山的那边海的那边',
      residentAddressDiy: '蓝精灵隔壁的羊驼平原',
      dictMarriage: '8adcf7c96a48fae4016a4925e570', //婚姻状态
      dictLiveStatu: '8adcf7c96a48fae4016a4925e79d', //居住状态
      purchaseSituation: '有', //购房情况
      structureArea: '100.00', //住房面积
      childrenNum: 2, //子女数
      noworkChildrenNum: 1, //无劳动能力子女数
      supportNum: 1, //赡养人数
      dependencyNum: 1, //抚养人数
      telephone: '88888888', //住宅电话
      telephone1: '888888888', //固定电话1
      telephone2: '88888888', ////固定电话2
      groupNumber: '874', //集团号码
      postCode: '710000', //邮编
      homeAddressArea: null,
      homeAddressCountry: null,
      homeAddressVillage: '1000-1015/1000-1015-1010/1000-1015-1010-1001/', //家庭住址
      residentAddressArea: null,
      residentAddressCountry: null,
      residentAddressVillage: '1000-1015/1000-1015-1010/1000-1015-1010-1001/', //常住住址
      homeNameList: '延庆区四海镇西沟里村民委员会', //家庭住址名称
      residentAddressList: '延庆区四海镇西沟里村民委员会', //常住住址名称
    },
  });
};

const getPartTime = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      id: '4028b23f73ebcd260173ebcd262f', //id
      userId: '402883e973e5c2ce0173e5c2ce9d', //userId
      realName: '伍仟', //姓名
      dictSex: '8adcf7c96a48fae4016a4925e34b', //性别
      dateOfBirth: '2020-08-12', //出生日期
      dictPoliticalStatus: '8adcf7c96a48fae4016a4925f283', //政治面貌
      originalUnitAndPosition: '局长', //原工作单位及职务
      dictRetirementLevel: '8adcf7c96a48fae4016a4925f71e', //职级
      dictRetirementType: '8adcf7c96a48fae4016a4925f601', //离退休职级
      phonenumber: '18655555555', //电话号码
      dict: null,
      createUserId: null,
      updateUserId: null,
      gmtCreate: null,
      gmtModified: null,
      isDeleted: null,
      createOrgId: null,
      dictTreatmentNow: '8adcf7c96a48fae4016a492643c9', //现享受待遇
      dictNation: '8adcf7c96a48fae4016a49260741', //民族
      organizationId: '1000', //单位id
      socialGroups: '广场舞大队', //社会团体
      post: '领舞', //职务
      placeOfResidence: '1000/1000-1001/1000-1001-1002/1000-1001-1002-1003', //兼职常驻地
      placeOfResidenceName: '万宁市/广场舞镇/回头乡/小钢炮村', //兼职常驻地名称
      detailedAddress: '我家住在黄土高坡', //详细地址
    },
  });
};

const getHealthInfo = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      id: '402883e973e5c2ce0173e5c2ce9d', //id
      userId: 'userId',
      realName: 'realName',
      dictSex: 'dictSex',
      dateOfBirth: 'dateOfBirth',
      dictRetirementType: 'dictRetirementType',
      phonenumber: 'phonenumber	',
      medical: 'medical',
      dictHealth: 'dictHealth',
      disease: 'disease',
      action: 'action',
      disability: 'disability',
      caregivers: 'caregivers',
      assignedHospital: 'assignedHospital',
      nearHospital: 'nearHospital',
      retiredCadres: 'retiredCadres',
      hasMedical: 'hasMedical	',
      dictMedicalTreatment: 'dictMedicalTreatment',
      medicalTreatment: 'medicalTreatment',
      dictNation: 'dictNation',
      originalUnitAndPosition: 'originalUnitAndPosition',
      dictPoliticalStatus: 'dictPoliticalStatus',
      dictRetirementLevel: 'dictRetirementLevel',
      dictTreatmentNow: 'dictTreatmentNow',
      organizationId: 'organizationId',
    },
  });
};

export default {
  'GET /users': list,
  'POST /users': noResponse,
  'DELETE /users': noResponse,
  'GET /users/excel': noResponse,
  'GET /users/export': noResponse,
  'GET /users/export_excel': noResponse,

  'GET /users/:id': getUserInfo,
  'PUT /users/:id': noResponse,
  'PUT /users/password/:id': noResponse,
  'PUT /users/list/organization': noResponse,
  'GET /users/family/:id': getFamilyInfo,
  'PUT /users/family/:id': noResponse,
  'GET /part_time/:id': getPartTime,
  'PUT /part_time/:id': noResponse,
  'GET /users/health/:id': getHealthInfo,
  'PUT /users/health/:id': noResponse,
};
