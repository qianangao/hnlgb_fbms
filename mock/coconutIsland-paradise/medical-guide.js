const noResponse = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {},
  });
};

const medicalGuideInfo = [];

for (let i = 0; i < 20; i++) {
  medicalGuideInfo.push({
    id: '4028b23f73eae1b30173ertyu1' + i, //id
    name: '就医指南' + i, //就医指南名称
    url: 'https://www.jianshu.com/p/f478f15c1671', //医院网址
    address: '陕西省西安市....', //医院名称
    phone: '177。。。。', //联系电话
    synopsis: '这家医院非常好', //简介
    createOrgName: '省委老干部局', //创建单位
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
      items: medicalGuideInfo,
    },
  });
};

const detailMedicalGuideInfo = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      id: '4028b23f73eae1b30173ertyu1', //id
      name: '就医指南', //就医指南名称
      url: 'https://www.jianshu.com/p/f478f15c1671', //医院网址
      address: '陕西省西安市....', //医院名称
      phone: '177。。。。', //联系电话
      synopsis: '这家医院非常好', //简介
      createOrgName: '省委老干部局', //创建单位
    },
  });
};

export default {
  'GET /medical_guide': list,
  'POST /medical_guide': noResponse,
  'DELETE /medical_guide': noResponse,
  'PUT /medical_guide/:id': noResponse,
  'GET /medical_guide/:id': detailMedicalGuideInfo,
};
