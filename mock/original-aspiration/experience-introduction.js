const noResponse = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {},
  });
};

const ExperienceInfo = [];

for (let i = 0; i < 8; i++) {
  ExperienceInfo.push({
    id: '402883e973e5c2ce0173e5c2ce9' + i, //id
    title: '经验介绍标题', //标题
    workIntroduction: '经验介绍内容', //工作经验简介
    updateTime: '2020-08-25', //保存时间
    realName: '请勿删除', //保存人
    pushTime: '2020-08-25', //发布时间
    organizationName: '省委老干部局', //发布单位
  });
}

const listExperience = (req, res) => {
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
      items: ExperienceInfo,
    },
  });
};

const getExperienceDetail = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      id: '1111', //id
      title: '经验介绍标题', //标题
      workIntroduction: '经验介绍内容', //工作经验简介
      isPublished: 1, //状态，已发布
      createTime: '2020-08-25', //创建时间
      updateTime: '2020-08-25', //保存时间
      pushTime: '2020-08-25', //发布时间
      realName: '请勿删除', //发布人
      organizationName: '省委老干部局', //发布单位
    },
  });
};

export default {
  'GET /experience-introduction': listExperience,
  'GET /experience-introduction/:id': getExperienceDetail,
  'DELETE /experience-introduction': noResponse,
  'PUT /experience-introduction/:id': noResponse,
  'POST /experience-introduction': noResponse,
};
