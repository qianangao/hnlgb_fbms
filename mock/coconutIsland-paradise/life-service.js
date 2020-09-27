const noResponse = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {},
  });
};

const lifeServiceInfo = [];

for (let i = 0; i < 20; i++) {
  lifeServiceInfo.push({
    id: '402883e973e5c2ce0173e5c2ce9d' + i, //id
    type: '家政上门服务' + i, //服务类型
    title: '蓝色一望无际',
    context: 'context',
    pushStatus: 'pushStatus',
    createUserId: 'createUserId',
    organizationName: 'organizationName',
    createTime: '2020-3-24',
    pushTime: '2020-4-14',
    num: 15, //点赞数
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
      items: lifeServiceInfo,
    },
  });
};

const detailLifeServiceInfo = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      id: '402883e973e5c2ce0173e5c2ce9d', //id
      type: '家政上门服务', //服务类型
      title: '蓝色一望无际',
      context: 'context',
      pushStatus: 'pushStatus',
      createUserId: 'createUserId',
      organizationName: 'organizationName',
      createTime: '2020-3-24',
      pushTime: '2020-4-14',
      num: 15, //点赞数
    },
  });
};

export default {
  'GET /life_service': list,
  'POST /life_service': noResponse,
  'DELETE /life_service': noResponse,
  'PUT /life_service/:id': noResponse,
  'GET /life_service/:id': detailLifeServiceInfo,
};
