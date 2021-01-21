import React from 'react';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({ toDoList, dispatch }) => {
  const { tableRef } = toDoList;
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 64,
    },
    {
      title: `模块类型`,
      align: 'center',
      dataIndex: 'moduleType',
      valueEnum: {
        0: { text: '作品园地' },
        1: { text: '生活服务' },
        2: { text: '支部活动' },
        3: { text: '活动信息' },
      },
    },
    {
      title: `事件类型`,
      align: 'center',
      dataIndex: 'eventType',
      valueEnum: {
        0: { text: '信息发布' },
        1: { text: '评论' },
      },
    },
    // {
    //   title: `只看本单位`,
    //   align: 'center',
    //   dataIndex: 'onlySelf',
    //   valueEnum: {
    //     1: { text: '是' },
    //     0: { text: '否' },
    //   },
    //   hideInTable: true,
    // },
    {
      title: `事件内容`,
      align: 'center',
      dataIndex: 'eventContent',
      width: 400,
      hideInSearch: true,
    },
    {
      title: `处理状态`,
      align: 'center',
      dataIndex: 'processStatus',
      hideInSearch: true,
      valueEnum: {
        0: { text: '未处理' },
        1: { text: '已处理' },
      },
    },
    {
      title: '创建单位',
      align: 'center',
      dataIndex: 'orgName',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      align: 'center',
      dataIndex: 'gmtCreate',
      hideInSearch: true,
    },
  ];

  // 列表
  const getEmployeeList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'toDoList/toDoList',
        payload: { ...params, processStatus: 0 },
        resolve,
      });
    });

  return (
    <ProTable
      rowKey="id"
      headerTitle="待办事项"
      actionRef={tableRef}
      scroll={{ x: 'max-content' }}
      request={async params => getEmployeeList(params)}
      columns={columns}
    />
  );
};

export default connect(({ toDoList, global }) => ({
  toDoList,
  enums: global.enums,
}))(Table);
