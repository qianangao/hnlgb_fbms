import mockjs, { Random } from 'mockjs';

const getDictionary = (req, res) => {
  const { name } = req.query;

  const a = mockjs.mock({
    code: 0,
    msg: 'success',
    'data|10': [
      {
        chineseName: '@name',
        code: /[A-Z][A-Z][A-Z][A-Z][A-Z][A-Z][A-Z][A-Z][A-Z]/,
        isCommonlyUsed: 1,
      },
    ],
  });

  a.data.push({
    chineseName: '男',
    code: '8adcf7c96a48fae4016a4925e34b',
    isCommonlyUsed: 1,
  });

  return res.json(a);
};

const getOrgTree = (req, res) => {
  const { name, id } = req.query;

  const a = {
    code: 0,
    msg: 'success',
    data: [
      {
        id: '1' + id, //id
        sort: null,
        organizationName: '测试单位1', //单位名称
        parentEmployerId: id || '1000', //父单位id
        parentOrganizationName: '省委老干部局', //父单位名称
        isLgbMinistry: null,
        dictOrganizationType: '8adcf7c96a48fae4016a4925f3e3', //单位性质
        organizationTelphone: null,
        dictRank: 1, //单位级别
        children: null,
        isSubunit: 1,
        gmtCreate: null,
        communityAddress: null,
      },
      {
        id: '2' + id, //id
        sort: 0,
        organizationName: '测试单位2',
        parentEmployerId: id || '1000', //父单位id
        parentOrganizationName: '省委老干部局',
        isLgbMinistry: 0,
        dictOrganizationType: '8adcf7c96a48fae4016a4925f3e3',
        organizationTelphone: 'string',
        dictRank: 1,
        children: null,
        isSubunit: 1,
        gmtCreate: null,
        communityAddress: null,
      },
      {
        id: '3' + id, //id
        sort: 0,
        organizationName: '测试单位3',
        parentEmployerId: id || '1000', //父单位id
        parentOrganizationName: '省委老干部局',
        isLgbMinistry: 0,
        dictOrganizationType: '8adcf7c96a48fae4016a4925f3e3',
        organizationTelphone: 'string',
        dictRank: 1,
        children: null,
        isSubunit: 0,
        gmtCreate: null,
        communityAddress: null,
      },
    ],
  };

  return res.json(a);
};

const searchOrgTree = (req, res) => {
  const a = {
    code: 0,
    msg: 'success',
    data: [
      {
        id: '1000', //id
        sort: null,
        organizationName: '省委老干部局', //单位名称
        parentEmployerId: '0', //父单位id
        parentOrganizationName: null,
        isLgbMinistry: null,
        dictOrganizationType: '8adcf7c96a48fae4016a4925f3e3', //单位性质
        organizationTelphone: null,
        dictRank: null,
        children: [
          //子单位信息
          {
            id: '2c948a827409c4aa017409c4aa63',
            sort: null,
            organizationName: '测试单位',
            parentEmployerId: '1000',
            parentOrganizationName: '省委老干部局',
            isLgbMinistry: null,
            dictOrganizationType: '8adcf7c96a48fae4016a4925f3e3',
            organizationTelphone: null,
            dictRank: null,
            children: [
              {
                id: '4028b23f738f519401738f321b9',
                sort: null,
                organizationName: '测试单位1-1',
                parentEmployerId: '1000',
                parentOrganizationName: '省委老干部局',
                isLgbMinistry: null,
                dictOrganizationType: '8adcf7c96a48fae4016a4925f3e3',
                organizationTelphone: null,
                dictRank: null,
                children: null,
                isSubunit: null,
                gmtCreate: '2020-07-27T08:09:15.000+0000',
                communityAddress: null,
              },
            ],
            isSubunit: 1,
            gmtCreate: '2020-08-20T02:48:38.000+0000',
            communityAddress: null,
          },
          {
            id: '4028b23f738f519401738f5194b9',
            sort: null,
            organizationName: '测试单位',
            parentEmployerId: '1000',
            parentOrganizationName: '省委老干部局',
            isLgbMinistry: null,
            dictOrganizationType: '8adcf7c96a48fae4016a4925f3e3',
            organizationTelphone: null,
            dictRank: null,
            children: null,
            isSubunit: null,
            gmtCreate: '2020-07-27T08:09:15.000+0000',
            communityAddress: null,
          },
        ],
        isSubunit: null,
        gmtCreate: '2018-09-12T10:41:25.000+0000',
        communityAddress: null,
      },
    ],
  };
  return res.json(a);
};

const uploadFile = (req, res) => {
  res.json({
    code: 0,
    msg: 'success',
    data: {
      fileUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      id: '呵呵呵呵哒',
      fileName: 'demo图片',
    },
  });
};

export default {
  'GET /dictionary': getDictionary,
  'GET /organization/directly-child/:id': getOrgTree,
  'GET /organization/all-child': searchOrgTree,
  'POST /attachmentsftpto': uploadFile,
};
