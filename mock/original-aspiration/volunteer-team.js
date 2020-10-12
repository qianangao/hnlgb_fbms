const noResponse = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {},
  });
};

const TeamInfo = [];

for (let i = 0; i < 10; i++) {
  TeamInfo.push({
    id: '402883e973e5c2ce0173e5c2ce9' + i, //id
    teamName: '志愿团队', //团队名称
    teamContext: '团队介绍', //团队介绍
    teamType: ['type1', 'type2'],
    createDate: '2020-09-10', //团队创建时间
    chargePerson: '负责人', //团队负责人
    phoneNumber: '1888888888', //团队联系电话
    signUpNumCurrent: '12', //团队成员数
    createOrgId: '海南省委老干部局', //创建单位
  });
}

const listTeam = (req, res) => {
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
      items: TeamInfo,
    },
  });
};

const activityInfo = [];

for (let i = 0; i < 8; i++) {
  activityInfo.push({
    id: '402883e973e5c2ce0173e5c2ce9' + i, //id
    teamId: '11232334343', //所属活动团队id
    teamName: '志愿团队1', //所属活动团队名称
    publishState: 'publishState', //发布状态
    url: 'url', //活动网址
    photoAttachmentId: 'photoAttachmentId', //缩略图id
    fileId: 'fileId', //fileId
    fileUrl: 'fileUrl', //fileUrl
    fileName: 'fileName', //fileName
    context: '活动内容', //内容
    picUrl: 'picUrl', //缩略图url
    activityName: '志愿团队活动', //activityName
    activityAdd: 'activityAdd', //活动地址
    releaseTime: '2020-09-09', //发布时间
    releaseOrganizationName: '海南省委老干部局', //发布单位
    activityDate: 'releaseOrganizationName', //活动日期
    chargePerson: 'chargePerson', //活动负责人
    phoneNumber: 'phoneNumber', //联系电话
    attachmentInfo: {
      id: 'id', //fileId
      url: 'url', //fileUrl
      fileName: 'fileName', //fileName
    }, //附件信息实体
    picAttachmentInfo: {
      id: 'id', //fileId
      url: 'url', //fileUrl
      fileName: 'fileName', //fileName
    }, //缩略图信息实体
  });
}
const listActivity = (req, res) => {
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
      items: activityInfo,
    },
  });
};

const getTeamDetail = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      id: '8a7d93137424b5fc017424b5fc7b', //id
      teamName: '志愿团队', //团队名称
      teamContext: '团队介绍', //团队介绍
      createDate: '2020-09-09', //团队创建时间
      teamType: ['2-1-1', '2-2-2'],
      chargePerson: '赵品', //团队负责人
      phoneNumber: '18888888888', //团队联系电话
      signUpNumCurrent: '12', //团队成员数
      createOrgId: '海南省委老干部局', //创建单位
    },
  });
};
const teamMember = (req, res) => {
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
      items: [
        {
          id: '402883e973e5c2ce0173e5c2ce91',
          realName: '杨紫1', //姓名
          dictSex: '8adcf7c96a48fae4016a4925e34b', //性别
          dateOfBirth: '2020-09-15', //出生日期
          dictNation: '8adcf7c96a48fae4016a49260741', //民族
          dictPoliticalStatus: '8adcf7c96a48fae4016a4925f283', //政治面貌
          dictRetirementType: '8adcf7c96a48fae4016a4925f601', //离退休类型
          originalUnitAndPosition: '111', //原工作单位及职务
          dictRetirementLevel: '8adcf7c96a48fae4016a4925f71e', //职级
          dictTreatmentNow: '8adcf7c96a48fae4016a492643c9', //现享受待遇
          phonenumber: '13609192876', //手机号码
        },
        {
          id: '402883e973e5c2ce0173e5c2ce92',
          realName: '杨紫2', //姓名
          dictSex: '8adcf7c96a48fae4016a4925e34b', //性别
          dateOfBirth: '2020-09-15', //出生日期
          dictNation: '8adcf7c96a48fae4016a49260741', //民族
          dictPoliticalStatus: '8adcf7c96a48fae4016a4925f283', //政治面貌
          dictRetirementType: '8adcf7c96a48fae4016a4925f601', //离退休类型
          originalUnitAndPosition: '111', //原工作单位及职务
          dictRetirementLevel: '8adcf7c96a48fae4016a4925f71e', //职级
          dictTreatmentNow: '8adcf7c96a48fae4016a492643c9', //现享受待遇
          phonenumber: '13609192876', //手机号码
        },
        {
          id: '3',
          realName: '杨紫3', //姓名
          dictSex: '8adcf7c96a48fae4016a4925e34b', //性别
          dateOfBirth: '2020-09-15', //出生日期
          dictNation: '8adcf7c96a48fae4016a49260741', //民族
          dictPoliticalStatus: '8adcf7c96a48fae4016a4925f283', //政治面貌
          dictRetirementType: '8adcf7c96a48fae4016a4925f601', //离退休类型
          originalUnitAndPosition: '111', //原工作单位及职务
          dictRetirementLevel: '8adcf7c96a48fae4016a4925f71e', //职级
          dictTreatmentNow: '8adcf7c96a48fae4016a492643c9', //现享受待遇
          phonenumber: '13609192876', //手机号码
        },
        {
          id: '4',
          realName: '杨紫4', //姓名
          dictSex: '8adcf7c96a48fae4016a4925e34b', //性别
          dateOfBirth: '2020-09-15', //出生日期
          dictNation: '8adcf7c96a48fae4016a49260741', //民族
          dictPoliticalStatus: '8adcf7c96a48fae4016a4925f283', //政治面貌
          dictRetirementType: '8adcf7c96a48fae4016a4925f601', //离退休类型
          originalUnitAndPosition: '111', //原工作单位及职务
          dictRetirementLevel: '8adcf7c96a48fae4016a4925f71e', //职级
          dictTreatmentNow: '8adcf7c96a48fae4016a492643c9', //现享受待遇
          phonenumber: '13609192876', //手机号码
        },
        {
          id: '5',
          realName: '杨紫5', //姓名
          dictSex: '8adcf7c96a48fae4016a4925e34b', //性别
          dateOfBirth: '2020-09-15', //出生日期
          dictNation: '8adcf7c96a48fae4016a49260741', //民族
          dictPoliticalStatus: '8adcf7c96a48fae4016a4925f283', //政治面貌
          dictRetirementType: '8adcf7c96a48fae4016a4925f601', //离退休类型
          originalUnitAndPosition: '111', //原工作单位及职务
          dictRetirementLevel: '8adcf7c96a48fae4016a4925f71e', //职级
          dictTreatmentNow: '8adcf7c96a48fae4016a492643c9', //现享受待遇
          phonenumber: '13609192876', //手机号码
        },
      ],
    },
  });
};
const getMembersIds = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: ['402883e973e5c2ce0173e5c2ce91', '402883e973e5c2ce0173e5c2ce92'],
  });
};

const getActivityDetail = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      id: '402883e973e5c2ce0173e5c2ce9', //id
      teamId: '11232334343', //所属活动团队id
      teamName: '志愿团队1', //所属活动团队名称
      publishState: 'publishState', //发布状态
      url: 'url', //活动网址
      photoAttachmentId: 'photoAttachmentId', //缩略图id
      fileId: 'fileId', //fileId
      fileUrl: 'fileUrl', //fileUrl
      fileName: 'fileName', //fileName
      context: '活动内容', //内容
      picUrl: 'picUrl', //缩略图url
      activityName: '志愿团队活动', //activityName
      activityAdd: 'activityAdd', //活动地址
      releaseTime: '2020-09-09', //发布时间
      releaseOrganizationName: '海南省委老干部局', //发布单位
      activityDate: 'releaseOrganizationName', //活动日期
      chargePerson: 'chargePerson', //活动负责人
      phoneNumber: 'phoneNumber', //联系电话
      attachmentInfo: {
        id: 'id', //fileId
        url: 'url', //fileUrl
        fileName: 'fileName', //fileName
      }, //附件信息实体
      picAttachmentInfo: {
        id: 'id', //fileId
        url: 'url', //fileUrl
        fileName: 'fileName', //fileName
      }, //缩略图信息实体
    },
  });
};

export default {
  'GET /team': listTeam,
  'GET /team/user/:id': teamMember,
  'GET /teamActivity ': listActivity,
  'GET /team/registered/:id': teamMember,
  'GET /team/user/Ids/:id': getMembersIds,
  'GET /team/:id': getTeamDetail,
  'GET /teamActivity/:id ': getActivityDetail,
  'DELETE /team': noResponse,
  'DELETE /team/user': noResponse,
  'DELETE /teamActivity': noResponse,
  'PUT /team/:id': noResponse,
  'PUT /teamActivity/:id ': noResponse,
  'POST /team': noResponse,
  'POST /team/user': noResponse,
};
