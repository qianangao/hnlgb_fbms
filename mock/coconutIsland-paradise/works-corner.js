const noResponse = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {},
  });
};

const worksCornerInfo = [];

for (let i = 0; i < 20; i++) {
  worksCornerInfo.push({
    id: '402883e973e5c2ce0173e5c2sg8q' + i, //id
    headline: 'headline', //标题
    context: 'context', //内容
    type: 'type', //类型（字典值）
    attachmentId: 'attachmentId', //缩略图id
    attachmentName: 'attachmentName', //附件名服务器上的名字
    originalName: '附件文件名', //附件文件名
    attachmentType: 'attachmentType', //附件类型
    path: 'path', //路径
    attachmentUrl: 'attachmentUrl', //缩略图url
    createUserId: 'createUserId', //创建人id
    createOrgId: 'createOrgId', //创建单位id
    createOrgName: 'createOrgName', //创建单位
    gmtCreate: '2020-10-12', //创建时间
    gmtModified: '2020-9-18', //保存时间
    releaseTime: '2020-3-28', //发布时间
    attachmentInfo: {
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      id: '234567788997543',
      fileName: 'demo图片',
    },
    organizationId: 'organizationId', //创建单位id
    approver: 'approver', //审核人
    approveDate: '', //审核时间
    dictApproveStatus: '0', //审核状态  0 待审核  1审核通过 2审核不通过
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
      items: worksCornerInfo,
    },
  });
};

const detailWorksCornerInfo = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      id: '402883e973e5c2ce0173e5c2ce9d', //id
      headline: 'headline', //标题
      context: 'context', //内容
      type: 'type', //类型（字典值）
      attachmentId: 'attachmentId', //缩略图id
      attachmentName: 'attachmentName', //附件名服务器上的名字
      originalName: '附件文件名', //附件文件名
      attachmentType: 'attachmentType', //附件类型
      path: 'path', //路径
      attachmentUrl: 'attachmentUrl', //缩略图url
      createUserId: 'createUserId', //创建人id
      createOrgId: 'createOrgId', //创建单位id
      createOrgName: 'createOrgName', //创建单位
      gmtCreate: '', //创建时间
      gmtModified: '', //保存时间
      releaseTime: '', //发布时间
      attachmentInfo: {
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        id: '234567788997543',
        fileName: 'demo图片',
      },
      organizationId: 'organizationId', //创建单位id
      approver: 'approver', //审核人
      approveDate: '', //审核时间
      dictApproveStatus: 'dictApproveStatus', //审核状态  0 待审核  1审核通过 2审核不通过
    },
  });
};

export default {
  'GET /work_corner': list,
  'POST /work_corner': noResponse,
  'DELETE /work_corner': noResponse,
  'PUT /work_corner/:id': noResponse,
  'GET /work_corner/:id': detailWorksCornerInfo,
};
