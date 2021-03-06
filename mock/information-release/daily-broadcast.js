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
    headline: '每日播报', //姓名
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

const detailDailyBroadcast = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      id: '402883e973e5c2ce0173e5c2ce9d', //userId
      organizationId: '1000', //单位id
      headline: '每日播报', //姓名
      gmtCreate: '2020-08-13 03:00:16', //创建时间
      createOrgName: '省委老干部局',
      attachmentInfo: {
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        uid: '呵呵呵呵哒',
        name: 'demo图片',
      },
      createTime: '',
      remark: '描述',
      context: '<p>大大飒飒大阿斯顿撒的撒大飒飒大阿萨的撒大飒飒大啊撒大师萨的</p>',
      releaseTime: '2020-08-13 03:00:16',
      releaseDepartment: '省委老干部局',
    },
  });
};

export default {
  'GET /daily-report': list,
  'POST /daily-report': noResponse,
  'DELETE /daily-report': noResponse,
  'PUT /daily-report/:id': noResponse,
  'GET /daily-report/:id': detailDailyBroadcast,
};
