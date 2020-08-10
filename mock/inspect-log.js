const list = (req, res) => {
  res.send({
    code: 0,
    msg: 'success',
    data: {
      currentPage: 1,
      pageSize: 10,
      totalNum: 2,
      isMore: 1,
      totalPage: 2,
      startIndex: 0,
      items: [
        {
          id: 1,
          name: '张三', // 巡检员姓名
          phone: '18710001000', // 巡检员联系电话
          placeId: '00001', // 巡检打卡地址id
          placePosition: '会议室1', // 巡检打卡地址
          createTime: 1321312312, // 巡检打卡时间
        },
        {
          id: 2,
          name: '张三', // 巡检员姓名
          phone: '18710001000', // 巡检员联系电话
          placeId: '00001', // 巡检打卡地址id
          placePosition: '会议室2', // 巡检打卡地址
          createTime: 1321319912, // 巡检打卡时间
        },
      ],
    },
  });
};
export default {
  'GET /log/list': list,
};
