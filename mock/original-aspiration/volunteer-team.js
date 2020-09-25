const noResponse = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {},
  });
};

const TeamInfo = [];

for (let i = 0; i < 10; i++) {
  TeamInfo.push({
    id: '402883e973e5c2ce0173e5c2ce9' + i, //id
    teamType: '基本志愿服务', // mock  志愿团队类型
    teamClassification: '红色传承', // mock  志愿团队粗分类
    teamSubclassification: '红色宣传', //mock  志愿团队细分类
    teamName: '志愿团队名称', //团队名称
    teamContext: '志愿团队介绍', //团队介绍
    createDate: '2020-09-21', //团队创建时间
    chargePerson: '团队负责人', //团队负责人
    phoneNumber: '18888888888', //团队联系电话
    signUpNumCurrent: '3', //团队成员数
    createOrgId: '海南省委老干部局', //创建单位
  });
}

const listTeam = (req, res) => {
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
      items: TeamInfo,
    },
  });
};

const getTeamDetail = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      id: '8a7d93137424b5fc017424b5fc7b', //id
      title: '个人先进事迹标题', //标题
      introduction: '个人先进事迹内容', //简介
      dictPerson: '老干部', //分
      createTime: '2020-08-25', //创建时间
      updateTime: '2020-08-25', //更新时间
      isPublished: 1, //已发布
      pushTime: '2020-08-25', //发布时间
      realName: '请勿删除', //老同志
      organizationName: '省委老干部局', //发布单位
    },
  });
};

export default {
  'GET /team': listTeam,
  'GET /team/:id': getTeamDetail,
  'DELETE /team': noResponse,
  'PUT /team/:id': noResponse,
  'POST /team': noResponse,
};
