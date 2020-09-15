const noResponse = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {},
  });
};

const activityCenterInfo = [];

for (let i = 0; i < 20; i++) {
  activityCenterInfo.push({
    id: '4028b23f73eae1b30173eae1xl1' + i, //id
    title: '跳个广场舞' + i, //活动中心名称
    coreAdd: '这就是街舞天台', //活动中心地址
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
      items: activityCenterInfo,
    },
  });
};

const detailActivityCenterInfo = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      id: '4028b23f73eae1b30173eae1xl', //id
      title: '跳个广场舞', //活动中心名称
      coreAdd: '这就是街舞天台', //活动中心地址
      phoneNumber: '13000001786', //联系电话
      organizationName: '省委老干部局', //所属单位
      context: '我要跳舞', //内容
      fileId: 'fileId',
      fileName: 'fileName',
      fileUrl: 'fileUrl',
      url: 'url', //缩略图路径
      urlId: 'urlId', //缩略图
      urlName: '我是缩略图',
      createOrgId: 'createOrgId',
    },
  });
};

export default {
  'GET /activity': list,
  'POST /activity': noResponse,
  'DELETE /activity': noResponse,
  'PUT /activity/:id': noResponse,
  'GET /activity/:id': detailActivityCenterInfo,
};
