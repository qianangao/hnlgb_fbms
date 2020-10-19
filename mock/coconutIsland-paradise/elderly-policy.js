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
    title: '涉老政策' + i, //涉老政策标题
    pushTime: '2020-08-09', //发布时间
    createTime: '2020-08-08', //发布时间
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
      title: '涉老政策', //标题
      pushTime: '2020-3-18', //发布时间
      context:
        '在这个风起云涌的战场上暴风少年登场在战胜烈火重重的咆哮声喧闹整个世界硝烟狂飞的讯号 机甲时代正来到热血逆流而上', //内容
      fileId: 'fileId',
      fileName: 'fileName',
      fileUrl: 'fileUrl',
      createOrgName: '市委老干部局',
      attachmentInfo: {
        id: 'id',
        url: 'url',
        fileName: 'fileName',
      },
    },
  });
};

export default {
  'GET /concerning_old': list,
  'POST /concerning_old': noResponse,
  'DELETE /concerning_old': noResponse,
  'PUT /concerning_old/:id': noResponse,
  'GET /concerning_old/:id': detailElderlyPolicyInfo,
};
