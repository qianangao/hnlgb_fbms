const noResponse = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {},
  });
};

const visitInfo = [];

for (let i = 0; i < 8; i++) {
  visitInfo.push({
    id: '402883e973e5c2ce0173e5c2ce9' + i, //id
    userId: '4028b23f739458e201739458e263' + i, //userId
    userRealName: '走访慰问', //姓名
    type: '402883ea73c687ef0173c687ef71', //走访类型
    address: '海南', //地址
    time: '2020-08-06', //时间
    leader: '张三', //慰问领导
    entourage: '李四', //陪同人员
    consolationGoods: '手机', //慰问品
    consolationMoney: '1000', //慰问金
    userAge: null,
    birthday: '2020-07-28', //出生日期
    photoAttachmentId: null, //图片id
    photoAttachmentName: null, //图片名称
    photoAttachmentPath: null, //图片路径
    photoAttachmentUrl: null, //图片url
    organizationName: null,
    dictSex: '8adcf7c96a48fae4016a4925e34b', //性别
    dictRetirementType: '8adcf7c96a48fae4016a4925f601', //离退休类型
    spouseName: null, //遗属姓名
    spouseBirthOfDate: null, //遗属出生日期
    picAttachmentInfo: null, //图片信息
    organizationId: '1000', //单位id
    feedback: '不错', //反馈信息
    physicalState: '健康', //身体状态
  });
}

const listVisit = (req, res) => {
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
      items: visitInfo,
    },
  });
};

const statisticsVisit = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      totalNum: 121,
      items: [
        {
          type: '生日慰问',
          number: 12, //数量
        },
        {
          type: '住院慰问',
          number: 34,
        },
        {
          type: '节日慰问',
          number: 22,
        },
        {
          type: '日常走访',
          number: 33,
        },
        {
          type: '异地安置人员慰问',
          number: 12,
        },
        {
          type: '遗属慰问',
          number: 8,
        },
      ],
    },
  });
};

const getVisitDetail = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      id: '8adcf7ea73c305670173c305efe8', //id
      userId: '4028b23f739458e201739458e263', //userId
      userRealName: '走访慰问', //姓名
      type: '402883ea73c687ef0173c687ef71', //走访类型
      address: '海南', //地址
      time: '2020-08-06', //时间
      leader: '张三', //慰问领导
      entourage: '李四', //陪同人员
      consolationGoods: '手机', //慰问品
      consolationMoney: '1000', //慰问金
      userAge: null,
      birthday: '2020-07-28', //出生日期
      photoAttachmentId: null, //图片id
      photoAttachmentName: null, //图片名称
      photoAttachmentPath: null, //图片路径
      photoAttachmentUrl: null, //图片url
      organizationName: null,
      dictSex: '8adcf7c96a48fae4016a4925e34b', //性别
      dictRetirementType: '8adcf7c96a48fae4016a4925f601', //离退休类型
      spouseName: null, //遗属姓名
      spouseBirthOfDate: null, //遗属出生日期
      picAttachmentInfo: null, //图片信息
      organizationId: '1000', //单位id
      feedback: '不错', //反馈信息
      physicalState: '健康', //身体状态
    },
  });
};

export default {
  'GET /visit': listVisit,
  'GET /visit/statistics': statisticsVisit,
  'GET /visit/:id': getVisitDetail,
  'DELETE /visit': noResponse,
  'PUT /visit/:id': noResponse,
  'POST /visit': noResponse,
};
