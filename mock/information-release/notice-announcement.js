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
    headline: '通知通告', //姓名
    gmtCreate: '2020-08-13 03:00:16', //创建时间
    createOrgName: '省委老干部局',
    createTime: '',
    remark: '描述',
    organizationName: '离退休老干部',
    createTime: '2020-05-01',
    releaseTime: '2020-09-09',
    activityName: 'string', //活动名称
    count: 0,
    dictActivityType: 'string', //活动类别
    dictActivityTypeName: 'string', //活动类别名称
    dictNoticeType: '活动通知', //通知类型
    gmtCreate: 'string', //创建时间
    gmtModified: 'string', //修改时间
    isStick: 0, //是否置顶
    noticeStatus: 0, //通知状态
    organizationId: 'string', //单位id
    organizationName: 'string', //单位名称
    subject: '通知通告', //通知主题
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

const detailNoticeAnnouncement = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      id: '402883e973e5c2ce0173e5c2ce9d', //userId

      attachmentId: {
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        uid: '呵呵呵呵哒',
        name: 'demo图片',
      },
      content: '<p>大大飒飒大阿斯顿撒的撒大飒飒大阿萨的撒大飒飒大啊撒大师萨的</p>',
      releaseTime: '2020-08-13 03:00:16',
      activityName: 'string', //活动名称
      count: 0,
      dictActivityType: 'string', //活动类别
      dictActivityTypeName: 'string', //活动类别名称
      dictNoticeType: '活动通知', //通知类型
      gmtCreate: '2020-08-13 03:00:16', //创建时间
      gmtModified: 'string', //修改时间
      isStick: 0, //是否置顶
      noticeStatus: 0, //通知状态
      organizationId: 1000, //单位id
      organizationName: '省委老干部局11', //单位名称
      subject: '通知通告', //通知主题
      releaseTime: '2020-08-13 03:00:16',
    },
  });
};

export default {
  'GET /noticeAnnouncement': list,
  'POST /noticeAnnouncement': noResponse,
  'DELETE /noticeAnnouncement': noResponse,
  'PUT /noticeAnnouncement/:id': noResponse,
  'GET /noticeAnnouncement/:id': detailNoticeAnnouncement,
};
