const noResponse = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {},
  });
};

const list = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      currentPage: 1,
      pageSize: 20,
      totalNum: 9,
      isMore: 1,
      totalPage: 2,
      startIndex: 0,
      items: [
        {
          id: '1111',
          placeName: '会议室',
          placePosition: '7楼会议室',
          describe: '此会议室。。。。',
          createTime: '',
          url: 'http://8.8.8.8:8080/api/inspection/1111',
        },
        {
          id: '222',
          placeName: '会议室2',
          placePosition: '7楼会议室2',
          describe: '此会议室2222。。。。',
          createTime: '',
        },
        {
          id: '3333',
          placeName: '会议室3',
          placePosition: '7楼会议室3',
          describe: '此会议室3。。。。',
          createTime: '',
        },
        {
          id: '4',
          placeName: '会议室4',
          placePosition: '7楼会议室4',
          describe: '此会议室4。。。。',
          createTime: '',
        },
        {
          id: '5',
          placeName: '会议室5',
          placePosition: '7楼会议室5',
          describe: '此会议室5。。。。',
          createTime: '',
        },
        {
          id: '6',
          placeName: '会议室6',
          placePosition: '7楼会议室6',
          describe: '此会议室6。。。。',
          createTime: '',
        },
        {
          id: '7',
          placeName: '会议室7',
          placePosition: '7楼会议室7',
          describe: '此会议室7。。。。',
          createTime: '',
        },
        {
          id: '8',
          placeName: '会议室8',
          placePosition: '7楼会议室8',
          describe: '此会议室。8。。。',
          createTime: '',
        },
        {
          id: '9',
          placeName: '会议室9',
          placePosition: '7楼会议室9',
          describe: '此会议室9。。。。',
          createTime: '',
        },
      ],
    },
  });
};
export default {
  'POST /place/add': noResponse,
  'PUT /place/update/:id': noResponse,
  'DELETE /place/delete': noResponse,
  'GET /place/list': list,
};
