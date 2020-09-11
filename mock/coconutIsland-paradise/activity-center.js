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
    name: '跳个广场舞' + i, //活动中心名称
    address: '这就是街舞天台', //活动中心地址
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
      id: '4028b23f73eae1b30173eae1xl1', //id
      name: '跳个广场舞', //活动中心名称
      address: '这就是街舞天台', //活动中心地址
      phoneNumber: '13000001786', //联系电话
      organizationName: '省委老干部局', //所属单位
      publishTime: '2020-3-18', //发布时间
      context: '我要跳舞', //内容
      fileId: 'fileId',
      fileName: 'fileName',
      fileUrl: 'fileUrl',
    },
  });
};

export default {
  'GET /activityCenter': list,
  'POST /activityCenter': noResponse,
  'DELETE /activityCenter': noResponse,
  'PUT /activityCenter/:id': noResponse,
  'GET /activityCenter/:id': detailActivityCenterInfo,
};
