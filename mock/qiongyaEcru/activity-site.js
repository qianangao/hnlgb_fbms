const noResponse = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {},
  });
};

const staffItems = [];

for (let i = 0; i < 10; i++) {
  staffItems.push({
    gmtCreate: '2020-11-23T11:03:11.983Z', //创建时间
    id: 'string' + i, //id
    name: 'string' + i, //名称
    address: 'string', //地址
    remarks: 'string', //备注
  });
}

const siteList = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      currentPage: 1,
      pageSize: 20,
      totalNum: 10,
      isMore: 0,
      totalPage: 1,
      startIndex: 0,
      items: staffItems,
    },
  });
};

export default {
  'POST /field_manage': noResponse,
  'PUT /field_manage/:id': noResponse,
  'DELETE /field_manage': noResponse,
  'GET /field_manage': siteList,
};
