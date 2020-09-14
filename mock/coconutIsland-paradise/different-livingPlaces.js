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
    realName: '异地人员' + i, //姓名
    dictSex: '8adcf7c96a48fae4016a4925e34b', //性别
    dateOfBirth: '2020-08-12', //出生日期
    currentResidence: '精灵城堡', //当前居住地
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
      offSiteAddressVillage: '1000/1000-1001/1000-1001-1002/1000-1001-1002-1003', //异地居住地址
      offSiteAddressList: '延庆区四海镇西沟里村民委员会',
    },
  });
};

export default {
  'GET /differentLivingPlaces': list,
  'POST /differentLivingPlaces': noResponse,
  'DELETE /differentLivingPlaces': noResponse,
  'PUT /differentLivingPlaces/:id': noResponse,
  'GET /differentLivingPlaces/:id': detailDifferentLivingPlaces,
};
