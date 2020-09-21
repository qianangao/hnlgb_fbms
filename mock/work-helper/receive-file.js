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
    id: '402883e973e5c2ce0173e5c2ce9d' + (i + ''), //userId
    organizationId: '1000', //单位id
    title: '收发文件', //姓名
    gmtCreate: '2020-08-13 03:00:16', //创建时间
    createOrgName: '测试单位2',
    createTime: '',
    remark: '描述',
    organizationName: '离退休老干部',
    createTime: '2020-08-01',
    releaseTime: '2020-09-01',
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

const detailReceiveFile = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      id: '402883e973e5c2ce0173e5c2ce9d', //userId
      organizationId: '1000', //单位id
      title: '收发文件', //姓名
      gmtCreate: '2020-08-13 03:00:16', //创建时间
      createOrgName: '测试单位2',
      attachmentInfo: {
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        uid: '8adcf70a73b359ff0173b365abfb',
        name: '测试',
      },
      content: '<p>大大飒飒大阿斯顿撒的撒大飒飒大阿萨的撒大飒飒大啊撒大师萨的</p>',
      releaseTime: '2020-08-13 03:00:16',
      releaseDepartment: '测试老干部局',
      isRelease: 0,
      createUserId: '1',
      createOrgId: '1000',
      enclosureId: '8adcf70a73b359ff0173b365abfb', //附件id
    },
  });
};

export default {
  'GET /receiveFile': list,
  'POST /receiveFile': noResponse,
  'DELETE /receiveFile': noResponse,
  'PUT /receiveFile/:id': noResponse,
  'GET /receiveFile/:id': detailReceiveFile,
};
