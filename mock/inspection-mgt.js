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
      pageSize: 10,
      totalNum: 4,
      isMore: 1,
      totalPage: 2,
      startIndex: 0,
      items: [
        {
          id: 1,
          name: '张三', // 巡检员姓名
          phone: '18710001000', // 巡检员联系电话
          password: '123456', // 巡检员登录密码
          createTime: 1595833160044, //添加时间
        },
        {
          id: 2,
          name: '张三2', // 巡检员姓名
          phone: '18710001002', // 巡检员联系电话
          password: '123456', // 巡检员登录密码
          createTime: '2020-07-22', //添加时间
        },
        {
          id: 3,
          name: '张三3', // 巡检员姓名
          phone: '18710001003', // 巡检员联系电话
          password: '123456', // 巡检员登录密码
          createTime: '', //添加时间
        },
        {
          id: 4,
          name: '张三4', // 巡检员姓名
          phone: '18710001004', // 巡检员联系电话
          password: '123456', // 巡检员登录密码
          createTime: '', //添加时间
        },
      ],
    },
  });
};
export default {
  'POST /inspection_user/add': noResponse,
  'PUT /inspection_user/update/:id': noResponse,
  'DELETE /inspection_user/delete': noResponse,
  'GET /inspection_user/list': list,
};
