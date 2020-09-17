const noResponse = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {},
  });
};

const seniorUniversityInfo = [];

for (let i = 0; i < 20; i++) {
  seniorUniversityInfo.push({
    id: '4028b23f73eae1b30173eae1dd1' + i, //id
    universityName: 'universityName', //大学名称
    url: 'http://www.baidu.com', //大学网址
    address: 'address', //大学地址
    phone: 'phone', //联系电话
    universitySynopsis: 'universitySynopsis', //大学介绍
    teachingActivities: 'teachingActivities', //教学安排
    createOrgName: 'createOrgName', //创建单位
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
      items: seniorUniversityInfo,
    },
  });
};

const detailSeniorUniversityInfo = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      id: '4028b23f73eae1b30173eae1dd1', //id
      universityName: 'universityName', //大学名称
      url: 'http://www.baidu.com', //大学网址
      address: 'address', //大学地址
      phone: 'phone', //联系电话
      universitySynopsis: 'universitySynopsis', //大学介绍
      teachingActivities: 'teachingActivities', //教学安排
      createOrgName: 'createOrgName', //创建单位
    },
  });
};

export default {
  'GET /university': list,
  'POST /university': noResponse,
  'DELETE /university': noResponse,
  'PUT /university/:id': noResponse,
  'GET /university/:id': detailSeniorUniversityInfo,
};
