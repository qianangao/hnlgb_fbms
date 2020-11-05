const noResponse = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {},
  });
};

const activityInfo = [];

for (let i = 0; i < 8; i++) {
  activityInfo.push({
    id: '402883e973e5c2ce0173e5c2ce9' + i, //id
    activityTitle: '活动信息主题', //主题名称
    updateTime: '2020-08-24', //保存时间
    realName: '请勿删除', //保存人
    pushTime: '2020-08-24', //发布时间
    organizationName: '省委老干部局', //发布单位
  });
}

const listActivity = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      currentPage: 1,
      pageSize: 20,
      totalNum: 10,
      isMore: 1,
      totalPage: 2,
      startIndex: 0,
      items: activityInfo,
    },
  });
};

const getActivityDetail = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      id: '8adcf7ff7404bcd5017404bcd5e2', //id
      dictActivityClassification: 'string', //活动分类
      activityIntroduction: 'string', //活动简介
      activityTitle: 'string', //活动标题
      activityContent: 'test', //活动内容
      isPublished: 1, //状态：已发布
      createTime: '2020-08-20', //创建时间
      updateTime: '2020-08-20', //最近一次修改时间
      pushTime: '2020-08-20', //发布时间
      realName: '请勿删除', //老干部名称
      organizationName: '省委老干部局', //发布单位
    },
  });
};

export default {
  'GET /activity/information': listActivity,
  'GET /activity/information/:id': getActivityDetail,
  'DELETE /activity/information': noResponse,
  'PUT /activity/information/:id': noResponse,
  'POST /activity/information': noResponse,
};
