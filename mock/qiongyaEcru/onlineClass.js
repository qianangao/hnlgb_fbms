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
    attachmentInfo: null,
    clickNum: 0, //点击数
    dictEmbedMode: null,
    fileId: null,
    filePath: null,
    fileUrl: null,
    id: '8adcf70a73b359ff0173b365abfb' + i, //id
    name: '网络课堂' + i, //标题
    num: null,
    photoAttachmentId: 'string', //照片id
    picAttachmentInfo: {
      fileName: '测试图片', //照片上传时名称
      id: '8adcf70a73b359ff0173b365abfb', //照片id
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', //照片地址
    },
    picUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', //照片地址
    publishTime: '2020-08-24T08:33:00.972Z', //发布时间
    releaseDepartmentName: '省委老干部局', //发布单位
    type: 'string', //类型
    url: 'https://ant.design/components/select-cn/', //链接地址
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

const detailOnlineStudy = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      attachmentInfo: null,
      clickNum: 0, //点击数
      dictEmbedMode: null,
      fileId: null,
      filePath: null,
      fileUrl: null,
      id: 'string', //id
      name: '网络课堂', //标题
      num: null,
      photoAttachmentId: 'string', //照片id
      picAttachmentInfo: {
        fileName: '测试图片', //照片上传时名称
        id: '8adcf70a73b359ff0173b365abfb', //照片id
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', //照片地址
      },
      picUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', //照片地址
      publishTime: '2020-08-24T08:33:00.972Z', //发布时间
      releaseDepartmentName: '省委老干部局', //发布单位
      type: 'string', //类型
      url: 'https://ant.design/components/select-cn/', //链接地址
    },
  });
};

export default {
  'GET /lgbsmp/api/onlineStudy': list,
  'POST /lgbsmp/api/onlineStudy': noResponse,
  'DELETE /lgbsmp/api/onlineStudy': noResponse,
  'PUT /lgbsmp/api/onlineStudy/:id': noResponse,
  'GET /lgbsmp/api/onlineStudy/:id': detailOnlineStudy,
};
