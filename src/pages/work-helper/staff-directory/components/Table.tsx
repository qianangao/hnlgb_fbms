import React from 'react';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({ staffDirectory, dispatch }) => {
  const { tableRef } = staffDirectory;
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
      title: `姓名`,
      align: 'center',
      dataIndex: 'realName',
      hideInSearch: true,
    },
    {
      title: `姓名`,
      align: 'center',
      dataIndex: 'name',
      hideInTable: true,
    },
    {
      title: '电话',
      align: 'center',
      dataIndex: 'phonenumber',
    },
  ];

  // 列表
  const getEmployeeList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'staffDirectory/staffDirectoryList',
        payload: { ...params },
        resolve,
      });
    });

  return (
    <ProTable
      rowKey="id"
      headerTitle="工作人员电话簿"
      actionRef={tableRef}
      scroll={{ x: 'max-content' }}
      request={async params => getEmployeeList(params)}
      columns={columns}
    />
  );
};

export default connect(({ staffDirectory, global }) => ({
  staffDirectory,
  enums: global.enums,
}))(Table);
