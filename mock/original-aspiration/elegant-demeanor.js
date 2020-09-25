const noResponse = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {},
  });
};

const DemeanorInfo = [];

for (let i = 0; i < 8; i++) {
  DemeanorInfo.push({
    id: '402883e973e5c2ce0173e5c2ce9' + i, //id
    pushStatus: 0, //状态，草稿箱
    title: '五老风采标题', //标题
    type: '老党员', //五老类型
    context: '五老风采内容', //内容
    fileId: '34555555', //附件id
    fileName: 'fileName', //附件名称
    fileUrl: 'fileUrl', //附件地址
    createUserId: 'createUserId', //创建人员id
    realName: '请勿删除', //老同志名称
    organizationName: '海南省委老干部局', //发布单位
    createTime: '2020-09-21', //创建时间
    pushTime: '2020-09-21', //发布时间
  });
}

const listDemeanor = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      currentPage: 1,
      pageSize: 20,
      totalNum: 10,
      isMore: 1,
      totalPage: 2,
      startIndex: 0,
      items: DemeanorInfo,
    },
  });
};

const getDemeanorDetail = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      id: '1111', //id
      pushStatus: 0, //状态，草稿箱
      title: '五老风采标题', //标题
      type: '老党员', //五老类型
      context: '五老风采内容', //内容
      fileId: 'fileId', //附件id
      fileName: 'fileName', //附件名称
      fileUrl: 'fileUrl', //附件地址
      createUserId: 'createUserId', //创建人员id
      realName: '请勿删除', //老同志名称
      organizationName: '海南省委老干部局', //发布单位
      createTime: '2020-09-21', //创建时间
      pushTime: '2020-09-21', //发布时间
      attachmentInfo: {
        id: '123456',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        name: '五老照片',
      },
    },
  });
};

export default {
  'GET /style_five_old': listDemeanor,
  'GET /style_five_old/:id': getDemeanorDetail,
  'DELETE /style_five_old': noResponse,
  'PUT /style_five_old/:id': noResponse,
  'POST /style_five_old': noResponse,
};
