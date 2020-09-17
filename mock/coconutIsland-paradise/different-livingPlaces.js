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
    id: '4028b23f73eae1b30173eae1bm1' + i, //id
    userName: '异地人员' + i, //姓名
    dictSex: '8adcf7c96a48fae4016a4925e34b', //性别
    dateOfBirth: '2020-08-12', //出生日期
    currentResidence: '精灵城堡', //当前居住地
    address: '', //异地住址
    addressCode: '', //住址码
    addressDiy: '小区，一单元。。。', //详细地址
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

const detailDifferentLivingPlaces = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      id: '402883e973e5c2ce0173e5c2ce9m', //userId
      realName: '伍仟', //姓名
      dictSex: '8adcf7c96a48fae4016a4925e34b', //性别
      dateOfBirth: '2020-08-12', //出生日期
      addressCode: '1000/1000-1001/1000-1001-1002/1000-1001-1002-1003', //异地居住地址
      address: '延庆区四海镇西沟里村民委员会',
      addressDiy: '小区，一单元。。。', //详细地址
    },
  });
};

export default {
  'GET /user_address': list,
  'POST /user_address': noResponse,
  'DELETE /user_address': noResponse,
  'PUT /user_address/:id': noResponse,
  'GET /user_address/:id': detailDifferentLivingPlaces,
};
