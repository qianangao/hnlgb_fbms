const noResponse = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {},
  });
};

const achievementInfo = [];

for (let i = 0; i < 8; i++) {
  achievementInfo.push({
    id: '402883e973e5c2ce0173e5c2ce9' + i, //id
    title: '成果展台标题' + i, //标题
    updateTime: '2020-08-25', //保存时间
    realName: '请勿删除', //保存人
    pushTime: '2020-08-25', //发布时间
    organizationName: '省委老干部局', //发布单位
  });
}

const listAchievement = (req, res) => {
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
      items: achievementInfo,
    },
  });
};

const getAchievementDetail = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      id: '1111', //id
      title: '成果展台标题1', //标题
      resultSummary:
        '成果总结-成果总结-成果总结-成果总结-成果总结-成果总结-成果总结-成果总结-成果总结-成果总结-成果总结', //成果总结
      dictResultType: 'eb25678765rdfghjgfd123456', //成果类型
      isPublished: 1, //发布状态，1代表已发布
      createTime: '2020-08-25', //创建时间
      updateTime: '2020-08-25', //更新时间
      pushTime: '2020-08-25', //发布时间
      realName: '请勿删除', //保存人
      organizationName: '省委老干部局', //发布单位
    },
  });
};

export default {
  'GET /result-display': listAchievement,
  'GET /result-display/:id': getAchievementDetail,
  'DELETE /result-display': noResponse,
  'PUT /result-display/:id': noResponse,
  'POST /result-display': noResponse,
};
