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
    id: '402883e973e5c2ce0173e5c2ce9d' + (i + ''), //userId
    organizationId: '1000', //单位id
    headline: '新闻动态', //姓名
    gmtCreate: '2020-08-13 03:00:16', //创建时间
    createOrgName: '省委老干部局',
    createTime: '',
    remark: '描述',
    organizationName: '离退休老干部',
    createTime: '2020-05-01',
    releaseTime: '2020-09-09',
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
      id: '402883e973e5c2ce0173e5c2ce9d', //userId
      organizationId: '1000', //单位id
      headline: '新闻动态', //姓名
      gmtCreate: '2020-08-13 03:00:16', //创建时间
      createOrgName: '省委老干部局11',
      attachmentInfo: {
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        uid: '呵呵呵呵哒',
        fileName: 'demo图片',
      },
      createTime: '',
      remark: '描述',
      context:
        '<p>飒飒是阿萨斯萨达是大飒飒是阿萨斯萨达是大飒飒是阿萨斯萨达是大飒飒是阿萨斯萨达是大飒飒是阿萨斯萨达是大飒飒是阿萨</p>',
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
