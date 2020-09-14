const noResponse = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {},
  });
};

const elderlyPolicyInfo = [];

for (let i = 0; i < 20; i++) {
  elderlyPolicyInfo.push({
    id: '4028b23f73eae1b30173eae1cc1' + i, //id
    name: '涉老政策' + i, //涉老政策标题
    publishTime: '2020-08-09', //发布时间
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
      items: elderlyPolicyInfo,
    },
  });
};

const detailElderlyPolicyInfo = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      id: '4028b23f73eae1b30173eae1xl1', //id
      name: '涉老政策', //标题
      publishTime: '2020-3-18', //发布时间
      context:
        '在这个风起云涌的战场上暴风少年登场在战胜烈火重重的咆哮声喧闹整个世界硝烟狂飞的讯号 机甲时代正来到热血逆流而上', //内容
      fileId: 'fileId',
      fileName: 'fileName',
      fileUrl: 'fileUrl',
    },
  });
};

export default {
  'GET /elderlyPolicy': list,
  'POST /elderlyPolicy': noResponse,
  'DELETE /elderlyPolicy': noResponse,
  'PUT /elderlyPolicy/:id': noResponse,
  'GET /elderlyPolicy/:id': detailElderlyPolicyInfo,
};
