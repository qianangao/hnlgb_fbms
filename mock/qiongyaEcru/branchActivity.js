const noResponse = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {},
  });
};

const staffInfo = [];
const partyUser = [];
for (let i = 0; i < 20; i++) {
  staffInfo.push({
    activityAdd: '活动地点', //地点
    activityDate: '2020-08-25T02:17:07.027Z', //时间
    activityNoticeName: '活动名称' + (i + ''), //活动名称
    attachmentInfo: {
      fileName: 'string', //附件名称
      id: 'string', //附件id
      url: 'string', //附件url
    },
    context: 'string', //活动详情
    dictActivityChildType: 'string', //活动类别
    fileId: 'string', //附件id
    holdActivityId: 'string', //活动id
    host: '主持人', //主持人
    id: '402883e973e5c2ce0173e5c2ce9d' + (i + ''), //活动id
    isInput: 0, //是否手动输入
    noticeId: 'string', //通知id
    organizationId: 'string', //组织id
    partyName: '支部名称', //支部名称
    photoAttachmentId: 'string', //缩略图id
    picAttachmentInfo: {
      fileName: 'string', ////缩略图名称
      id: 'string', //缩略图id
      url: 'string', ////缩略图url
    },
    picUrl: 'string', //缩略图url
    publishState: 0, //发布状态
    releaseOrganizationName: 'string', //发布单位0
    createTime: '2020-08-10T02:17:07.027Z', //保存时间
    releaseTime: '2020-08-25T02:17:07.027Z', //发布时间
    url: 'null',
  });
  partyUser.push({
    administratorLevel: 'string',
    affiliation: 'string',
    attachmentIdPicture: 0,
    awardSituation: 'string',
    bawuIndustrialReformOrgansGrades: 'string',
    belongAreas: 'string',
    birthday: '2020-08-19T09:24:30.717Z',
    birthdayDays: 0,
    childrenNum: 0,
    chineseHomeAddressVillage: 'string',
    chineseResidentAddressAillage: 'string',
    communityId: 'string',
    createOrgId: 'string',
    createUserId: 'string',
    culturalRevolutionLevel: 'string',
    dateOfBirth: '2020-08-19T09:24:30.717Z',
    deadTime: '2020-08-19T09:24:30.717Z',
    departmentId: 0,
    dependencyNum: 0,
    dictAllergenUnitNaturel: 'string',
    dictDegree: 'string',
    dictHealth: 'string',
    dictHealthStatus: 'string',
    dictIdentity: 'string',
    dictLiveStatu: 'string',
    dictMarriage: 'string',
    dictMedicalTreatment: 'string',
    dictNation: 'string',
    dictPoliticalStatus: 'string',
    dictRetirementLevel: 'string',
    dictRetirementType: 'string',
    dictRevolutionPeriod: 'string',
    dictSex: 'string',
    dictSpouseHealth: 'string',
    dictSpouseSex: 'string',
    dictSpouseStatus: 'string',
    dictSubordinate: 'string',
    dictTreatmentNow: 'string',
    dictUnitNature: 'string',
    gmtCreate: '2020-08-19T09:24:30.717Z',
    gmtModified: '2020-08-19T09:24:30.717Z',
    grade: 'string',
    groupNumber: 'string',
    healthId: 'string',
    hierarchy: 'string',
    higherOrgannization: 'string',
    homeAddressArea: 'string',
    homeAddressCity: 'string',
    homeAddressCountry: 'string',
    homeAddressDiy: 'string',
    homeAddressProvince: 'string',
    homeAddressVillage: 'string',
    homeNameList: 'string',
    id: '402883e973e5c2ce0173e5c2ce9d' + i,
    idCard: 'string',
    imUserId: 'string',
    improveTreatment: 'string',
    industry: 'string',
    institutionalNature: 'string',
    isArmyRetiredCadres: 0,
    isAtBeijing: 0,
    isDead: 0,
    isDeleted: 0,
    isDifferentLive: 0,
    isDifferentPlace: 0,
    isParty: 0,
    isPrimaryContact: 0,
    isSameUnit: 'string',
    jiusanIndustrialReformOrgansGrades: 'string',
    level: 'string',
    lgbRoleId: 'string',
    nameUsedBefore: 'string',
    nativePlace: 'string',
    nowThePipeUnits: 'string',
    nowThePipeUnitsId: 'string',
    noworkChildrenNum: 0,
    organizationContactName: 'string',
    organizationId: 'string',
    organizationName: 'string',
    organizationPhone: 'string',
    originalArea: 'string',
    originalUnitAndPosition: 'string',
    partyId: 'string',
    partyName: 'string',
    partyTime: 'string',
    password: 'string',
    phonenumber: 'string',
    pictureId: 0,
    postCode: 'string',
    purchaseSituation: 'string',
    realName: 'string',
    receivedArea: 'string',
    resettlementTime: '2020-08-19T09:24:30.717Z',
    residentAddressArea: 'string',
    residentAddressCity: 'string',
    residentAddressCountry: 'string',
    residentAddressDiy: 'string',
    residentAddressList: 'string',
    residentAddressProvince: 'string',
    residentAddressVillage: 'string',
    residentialAddress: 'string',
    residentialAddressDetails: 'string',
    residentialAddressName: 'string',
    retireRetirementTime: '2020-08-19T09:24:30.717Z',
    retirementCertificate: 'string',
    retirementDate: 'string',
    retirementDepartmentCode: 'string',
    retirementPostCode: 'string',
    retirementPostName: 'string',
    solarOrLunar: 'string',
    specialContribution: 'string',
    spouseBirthOfDate: '2020-08-19T09:24:30.717Z',
    spouseDieDate: '2020-08-19T09:24:30.717Z',
    spouseIsDead: 'string',
    spouseName: 'string',
    spouseOther: 'string',
    spousePhone: 'string',
    spouseUnit: 'string',
    startWorkTime: '2020-08-19T09:24:30.717Z',
    statisticSymbol: 0,
    structureArea: 0,
    supportNum: 0,
    technicalPosition: 'string',
    telephone: 'string',
    telephone1: 'string',
    telephone2: 'string',
    telephone3: 'string',
    treatmentApprovalNumber: 'string',
    treatmentApproveTime: '2020-08-19T09:24:30.717Z',
    unit: 'string',
    updateUserId: 'string',
    userId: 'string',
    userName: 'string',
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
      activityAdd: '活动地点', //地点
      activityDate: '2020-08-25T02:17:07.027Z', //时间
      activityName: '活动名称', //活动名称
      attachmentInfo: {
        fileName: '测试附件', //附件名称
        id: '8adcf70a73b359ff0173b365abfb', //附件id
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', //附件url
      },
      context: '活动详情活动详情', //活动详情
      dictActivityChildType: 'string', //活动类别
      fileId: 'string', //附件id
      holdActivityId: 'string', //活动id
      host: '主持人', //主持人
      id: 'string', //活动id
      isInput: 0, //是否手动输入
      noticeId: 'string', //通知id
      organizationId: 'string', //组织id
      partyName: '支部名称', //支部名称
      partyId: '8adcf70a73b359', //支部id
      photoAttachmentId: 'string', //缩略图id
      picAttachmentInfo: {
        fileName: '测试图片', ////缩略图名称
        id: '8adcf70a73b359ff0173b365abfb', //缩略图id
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', ////缩略图url
      },
      picUrl: 'string', //缩略图url
      publishState: 0, //发布状态
      releaseOrganizationName: 'string', //发布单位
      releaseTime: '2020-08-25T02:17:07.027Z', //发布时间
      url: 'null',
    },
  });
};

const partyUserList = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      currentPage: 1,
      pageSize: 10,
      totalNum: 20,
      isMore: 1,
      totalPage: 3,
      startIndex: 0,
      items: partyUser,
    },
  });
};

export default {
  'GET /orgLife': list,
  'POST /orgLife': noResponse,
  'DELETE /orgLife': noResponse,
  'PUT /orgLife/:id': noResponse,
  'GET /orgLife/:id': detailOrgLife,
  'GET /branchPartyUser/:id': partyUserList,
};
