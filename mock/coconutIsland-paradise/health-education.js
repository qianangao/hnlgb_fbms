const noResponse = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {},
  });
};

const healthEducationInfo = [];

for (let i = 0; i < 16; i++) {
  healthEducationInfo.push({
    id: '8a7d8567751154fb017511dbty' + i, //id
    theme: '保健教育', //标题
    createTime: '2020-09-17', //发布时间
    organizationName: '省委老干部局', //发布单位
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
      items: healthEducationInfo,
    },
  });
};

const detailHealthEducation = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      id: '8a7d8567751154fb017511dbty', //id
      theme: '保健教育', //标题
      createTime: '2020-09-17', //发布时间
      organizationName: '省委老干部局', //发布单位
      content:
        '我们举两个例子，第一个，他的这个体制，没有畅通的运行体制，什么样的法律你在执行过程当中都会落空。你比如说从中央到省，到市，到县，到乡镇，到社区，你这套系统是否畅通，你这套体制是否是通的。',
    },
  });
};

export default {
  'GET /health-education': list,
  'POST /health-education': noResponse,
  'DELETE /health-education': noResponse,
  'PUT /health-education/:id': noResponse,
  'GET /health-education/:id': detailHealthEducation,
};
