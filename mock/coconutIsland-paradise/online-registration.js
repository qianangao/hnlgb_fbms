const noResponse = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {},
  });
};

const onlineRegistrationInfo = [];

for (let i = 0; i < 20; i++) {
  onlineRegistrationInfo.push({
    id: '4028b23f73eae1b30173eae1xl1' + i, //id
    title: '森岛帆高寒假快乐' + i, //网络报名名称
    coreAdd: '风格', //网络报名地址
    phoneNumber: '13000001786', //联系电话
    organizationName: '省委老干部局', //所属单位
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
      items: onlineRegistrationInfo,
    },
  });
};

const detailOnlineRegistrationInfo = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      id: '4028b23f73eae1b30173eae1xl', //id
      title: '森岛帆高寒假快乐', //网络报名名称
      coreAdd: '风格', //网络报名地址
      phoneNumber: '13000001786', //联系电话
      organizationName: '省委老干部局', //所属单位
      context: '系统崔不吵不闹书库', //内容
      fileId: 'fileId',
      fileName: 'fileName',
      fileUrl: 'fileUrl',
      url: 'url', //缩略图路径
      urlId: 'urlId', //缩略图
      urlName: '我是缩略图',
      createOrgId: 'createOrgId',
      attachmentInfo: {
        id: 'id',
        url: 'url',
        fileName: 'fileName',
      },
      releaseTime: '2020-3-24',
      memberItems: [
        { id: '402883e973e5c2ce0173e5c2ce91', realName: '伍仟1' },
        { id: '402883e973e5c2ce0173e5c2ce96', realName: '伍仟6' },
      ],
    },
  });
};
const menberList = (req, res) => {
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
          realName: '吾皇大人', //姓名
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
          realName: '宫本武藏', //姓名
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
          id: '402883e973e5c2ce0173e5c2ce93',
          realName: '夏洛特', //姓名
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
          id: '402883e973e5c2ce0173e5c2ce94',
          realName: '蒙犽', //姓名
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

const memberIds = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: ['402883e973e5c2ce0173e5c2ce91', '402883e973e5c2ce0173e5c2ce92'],
  });
};

export default {
  'GET /online_registration': list,
  'POST /online_registration': noResponse,
  'DELETE /online_registration/user/:id': noResponse,
  'PUT /online_registration/:id': noResponse,
  'GET /online_registration/:id': detailOnlineRegistrationInfo,
  'GET /online_registration/user/:id': menberList,
  'GET /online_registration/users/:id': memberIds,
  'POST /online_registration/user': noResponse,
  'DELETE /online_registration/user': noResponse,
};
