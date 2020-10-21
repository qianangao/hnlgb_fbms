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
    id: '8adcf7ea7400c0bf017400e521d9' + (i + ''), //id
    region: '测试', //region
    regionName: '陕西省西安市', //地区名称
    detailedAddress: '陕西省西安市欧亚一路', //详细地址
    name: '工作人员电话簿', //姓名
    telephone: '15202432974', //电话
    createUserId: '1',
    createOrgId: '1000',
    gmtCreate: '2020-08-18 17:27:30',
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

const detailStaffDirectory = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      id: '8adcf7ea7400c0bf017400e521d9', //id
      region: '测试', //region
      regionCode: '1000/1000-1001/1000-1001-1002/1000-1001-1002-1003', //地区名称
      regionName: '延庆区四海镇西沟里村民委员会', //地区名称
      detailedAddress: '陕西省西安市欧亚一路', //详细地址
      name: '工作人员电话簿', //姓名
      telephone: '15202432974', //电话
      createUserId: '1',
      createOrgId: '1000',
      gmtCreate: '2020-08-18 17:27:30',
    },
  });
};

export default {
  'GET /staffDirectory': list,
  'POST /staffDirectory': noResponse,
  'DELETE /staffDirectory': noResponse,
  'PUT /staffDirectory/:id': noResponse,
  'GET /staffDirectory/:id': detailStaffDirectory,
};
