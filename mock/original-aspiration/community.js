const noResponse = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {},
  });
};

const communityInfo = [];

for (let i = 0; i < 8; i++) {
  communityInfo.push({
    id: '402883e973e5c2ce0173e5c2ce9' + i, //id
    clubName: '社团名称' + i, //社团名称
    createTime: '2020-08-28', //发布时间
    organizationName: '省委老干部局', //发布单位
  });
}

const activityInfo = [];

for (let i = 0; i < 8; i++) {
  activityInfo.push({
    id: '402883e973e5c2ce0173e5c2ce9' + i, //id
    theme: '社团活动' + i, //社团活动主题
    clubName: '社团名称1', //社团名称
    createTime: '2020-09-16', //发布时间
    organizationName: '省委老干部局', //发布单位
  });
}

const listCommunity = (req, res) => {
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
      items: communityInfo,
    },
  });
};
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

const getCommunityDetail = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      id: '1', //社团id
      clubName: '社团1', //社团名称
      clubIntroduction: '社团简介', //社团简介
      dictClubType: 'eefdd4565676nn6556', //社团类型
      createTime: '2020-08-31', //发布时间
      organizationName: '省委老干部局', //发布单位
      memberItems: [
        { id: '402883e973e5c2ce0173e5c2ce91', realName: '伍仟1' },
        { id: '402883e973e5c2ce0173e5c2ce96', realName: '伍仟6' },
      ],
    },
  });
};

const commnityMember = (req, res) => {
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
          id: '1',
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
          id: '2',
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

const getActivityDetail = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      id: '2', //社团活动id
      theme: '社团活动主题', //社团活动主题
      content: '社团活动内容', //社团活动内容
      clubName: '社团活动名称', //社团名称
      createTime: '2020-09-15', //发布时间
      organizationName: '省委老干部局', //发布单位
    },
  });
};

export default {
  'GET /club-house/club': listCommunity,
  'GET /club-house/club-activity': listActivity,
  'GET /club-house/club/:id': getCommunityDetail,
  'GET /club-house/club-activity/:id': getActivityDetail,
  'GET /club-house/club-member/:id': commnityMember,
  'DELETE /club-house/club': noResponse,
  'DELETE /club-house/club-activity': noResponse,
  'DELETE /club-house/club-member/:id': noResponse,
  'POST /club-house/club': noResponse,
  'PUT /club-house/club/:id': noResponse,
  'POST /club-house/club-activity': noResponse,
};
