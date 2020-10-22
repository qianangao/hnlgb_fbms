const noResponse = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {},
  });
};

const ResultInfo = [];
const TopicInfo = [];
for (let i = 0; i < 20; i++) {
  ResultInfo.push({
    id: '50f191b39d90449daac91a00544c2e8k' + i,
    userId: '50f191b39d90449daac91a00544c2e88', //userId
    name: '张三', //姓名
    dictSex: '8adcf7c96a48fae4016a4925e34b', //性别
    fraction: 12, //测评分数
    dictAssessGrade: 'fd9bdcdf0cfe11eba1036c4b90894a7d', //测评等级
    assessTime: '2020-10-13 11:04:15', //测评时间
  });
}

for (let i = 0; i < 20; i++) {
  TopicInfo.push({
    id: '8adcf7ea751b91e201751b9462a1' + i, //id
    subject: '连续开几个小时会就想躺下。', //题目
    optionA: 'A.没有', //选项A
    optionB: 'B.有，但程度浅', //选项B
    optionC: 'C.有，程度深', //选项C
    optionD: 'D.有', //选项D
    createUserId: '1', //创建人id
    gmtCreate: '2020-10-12 14:51:51', //创建时间
    createOrgId: '1000', //创建单位
  });
}

const resultList = (req, res) => {
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
      items: ResultInfo,
    },
  });
};
const topicList = (req, res) => {
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
      items: TopicInfo,
    },
  });
};

const detailHealthAssessmentResult = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      userId: '50f191b39d90449daac91a00544c2e88',
      isAssess: 1, //是否测评 0否 1是
      fraction: 12, //测评分数
      dictAssessGrade: 'B', //测评等级 字典值
      assessTime: '2020-10-13 11:04:15', //测评时间
      healthAssessToVo: [
        {
          id: '8adcf7ea751b91e201751b9462a1', //id
          subject: '连续开几个小时会就想躺下。', //题目
          optionA: 'A.没有', //选项A
          optionB: 'B.有，但程度浅', //选项B
          optionC: 'C.有，程度深', //选项C
          optionD: 'D.有', //选项D
          createUserId: '1', //创建人id
          gmtCreate: '2020-10-12 14:51:51', //创建时间
          createOrgId: '1000', //创建单位
          answer: 'C',
        },
        {
          id: '8adcf7ea751b91e201751b9462a0', //id
          subject: '你是不是最美的人。', //题目
          optionA: 'A.是', //选项A
          optionB: 'B.大概', //选项B
          optionC: 'C.很是', //选项C
          optionD: 'D.不是', //选项D
          createUserId: '1', //创建人id
          gmtCreate: '2020-10-12 14:51:51', //创建时间
          createOrgId: '1000', //创建单位
          answer: 'A',
        },
      ],
    },
  });
};

const detailHealthAssessmentTopic = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      id: '8adcf7ea751b91e201751b9462a1', //id
      subject: '连续开几个小时会就想躺下。', //题目
      optionA: 'A.没有', //选项A
      optionB: 'B.有，但程度浅', //选项B
      optionC: 'C.有，程度深', //选项C
      optionD: 'D.有', //选项D
      createUserId: '1', //创建人id
      gmtCreate: '2020-10-12 14:51:51', //创建时间
      createOrgId: '1000', //创建单位
    },
  });
};
const statisticsInfo = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      totalNumber: 1, //总数
      statistics: [
        {
          type: '09b2a81c0cff11eba1036c4b90894a70', //评级
          number: 5, //数量
        },
        {
          type: '047cf8090cff11eba1036c4b90894a7d',
          number: 3,
        },
        {
          type: 'fd9bdcdf0cfe11eba1036c4b90894a9d',
          number: 2,
        },
      ],
    },
  });
};

export default {
  'GET /health_assess/user': resultList,
  'GET /health_assess': topicList,
  'GET /health_assess/statistics': statisticsInfo,
  'DELETE /health_assess': noResponse,
  'PUT /health_assess/:id': noResponse,
  'GET /health_assess/user/:id': detailHealthAssessmentResult,
  'GET /health_assess/:id': detailHealthAssessmentTopic,
};
