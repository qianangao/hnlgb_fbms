const noResponse = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {},
  });
};

const lifeServiceInfo = [];

for (let i = 0; i < 20; i++) {
  lifeServiceInfo.push({
    id: '402883e973e5c2ce0173e5c2cooo' + i, //id
    title: '黑色的幽默',
    context: 'context',
    pushStatus: '0',
    createUserId: 'createUserId',
    organizationName: 'organizationName',
    createTime: '2020-3-24',
    pushTime: '2020-4-14',
    attachmentInfo: {
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      id: '234567788997543',
      fileName: '这是个附件',
    },
    fileId: 'fileId',
    fileName: 'fileName',
    fileUrl: 'fileUrl',
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
      items: lifeServiceInfo,
    },
  });
};

const detailHelpElderlyInfo = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      id: '402883e973e5c2ce0173e5c2ce9d', //id
      title: '黑色的幽默',
      context: 'context',
      pushStatus: '0',
      createUserId: 'createUserId',
      organizationName: 'organizationName',
      createTime: '2020-3-24',
      pushTime: '2020-4-14',
      attachmentInfo: {
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        id: '234567788997543',
        fileName: '这是个附件',
      },
      fileId: 'fileId',
      fileName: 'fileName',
      fileUrl: 'fileUrl',
    },
  });
};

export default {
  'GET /help_old': list,
  'POST /help_old': noResponse,
  'DELETE /help_old': noResponse,
  'PUT /help_old/:id': noResponse,
  'GET /help_old/:id': detailHelpElderlyInfo,
};
