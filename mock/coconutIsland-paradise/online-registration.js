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
    },
  });
};

export default {
  'GET /online_registration': list,
  'POST /online_registration': noResponse,
  'DELETE /online_registration': noResponse,
  'PUT /online_registration/:id': noResponse,
  'GET /online_registration/:id': detailOnlineRegistrationInfo,
};
