const noResponse = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {},
  });
};

const staffInfo = [];

for (let i = 0; i < 20; i++) {
  staffInfo.push({
    id: '402883e973e5c2ce0173e5c2897p' + (i + ''), //userId
    organizationId: '1000', //单位id
    headline: '新闻动态', //姓名
    gmtCreate: '2020-08-13 03:00:16', //创建时间
    createOrgName: '省委老干部局',
    createTime: '',
    remark: '描述',
    organizationName: '离退休老干部',
    createTime: '2020-05-01',
    releaseTime: '2020-09-09',
    attachmentInfo: {
      url:
        'https://hbimg.huabanimg.com/108ed08f2e761818e39c8b650c37359361c0c5375ef78-zL6o7A_fw658/format/webp',
      uid: '呵呵呵呵哒',
      name: '图片新闻',
    },
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
      items: staffInfo,
    },
  });
};

const detailNewsDynamic = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      id: '402883e973e5c2ce0173e5c2897p1', //userId
      organizationId: '1000', //单位id
      headline: '新闻动态', //姓名
      gmtCreate: '2020-08-13 03:00:16', //创建时间
      createOrgName: '省委老干部局11',
      attachmentInfo: {
        url:
          'https://hbimg.huabanimg.com/108ed08f2e761818e39c8b650c37359361c0c5375ef78-zL6o7A_fw658/format/webp',
        uid: '呵呵呵呵哒',
        name: '图片新闻',
      },
      createTime: '',
      remark: '描述',
      context: '<p>图片新闻测试</p>',
      releaseTime: '2020-08-13 03:00:16',
    },
  });
};

export default {
  'GET /newsDynamic': list,
  'POST /newsDynamic': noResponse,
  'DELETE /newsDynamic': noResponse,
  'PUT /newsDynamic/:id': noResponse,
  'GET /newsDynamic/:id': detailNewsDynamic,
};
