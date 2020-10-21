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
    dictForm: '集中', //学习形式
    host: '张国强', //主持人
    id: '1234887522778' + i, //id
    number: 2, //人数
    points: '要点内容', //要点
    theme: '主题', //主题
    time: '2020-08-20', //时间
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

const detailOrgLife = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      dictForm: '自学', //学习形式
      host: '张国强', //主持人
      id: '1234887522778', //id
      number: 2, //人数
      points: '要点内容', //要点
      theme: '主题', //主题
      time: '2020-08-20T01:10:58.101Z', //时间
    },
  });
};

export default {
  'GET /lgbsmp/api/learning_record': list,
  'POST /lgbsmp/api/learning_record': noResponse,
  'DELETE /lgbsmp/api/learning_record': noResponse,
  'PUT /lgbsmp/api/learning_record/:id': noResponse,
  'GET /lgbsmp/api/learning_record/:id': detailOrgLife,
};
