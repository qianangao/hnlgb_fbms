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
    id: '8adcf7ea7400c0bf017400d5c11a' + i, //id
    userId: '402883e973e5c2ce0173e5c2ce9d', //userId
    passCheckPhotoId: '402883e973e5c2ce0173e5c2c90e9', //港澳台通行证照片id
    passportPhotoId: '402883e973e5c2ce0173e5c2ce9d7', //护照照片id
    realName: '伍仟', //姓名
    dictRetirementType: '8adcf7c96a48fae4016a4925f601', //离退休类型
    dictTreatmentNow: '8adcf7c96a48fae4016a492643c9', //先享受待遇
    originalUnitAndPosition: '局长', //原工作单位及职务
    dictSex: '8adcf7c96a48fae4016a4925e34b', //性别
    dateOfBirth: '2020-08-12', //出生日期
    organizationId: '1000', //单位id
    passportPhoto: {
      id: '8adcf70a73b359ff0173b365abfb', //护照照片id
      url: 'http://10.124.133.192:80/attachment/5d/9e/073c445e0fed317f30bf351ce3.jpg', //护照照片url
      fileName: '1111.jpg', //护照照片名字
    },
    passCheckPhoto: {
      id: '8adcf70a73b359ff0173b365abfb', //港澳台通行证照片id
      url: 'http://10.124.133.192:80/attachment/5d/9e/073c445e0fed317f30bf351ce3.jpg', //港澳台通行证照片url
      fileName: '1111.jpg', //港澳台通行证照片名字
    },
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

const licenseRegister = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      id: '402883e973e5c2ce0173e5c2ce9m', //userId
      passCheckPhotoId: '402883e973e5c2ce0173e5c2c90e9', //港澳台通行证照片id
      passportPhotoId: '402883e973e5c2ce0173e5c2ce9d7', //护照照片id
    },
  });
};

export default {
  'GET /licence_register': list,
  'POST /licence_register': noResponse,
  'DELETE /licence_register': noResponse,
  'PUT /licence_register/:id': noResponse,
  'GET /licence_register/:id': licenseRegister,
};
