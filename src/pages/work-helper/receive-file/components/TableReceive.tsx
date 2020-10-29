import React from 'react';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({ receiveFile, dispatch, opendetailModal }) => {
  const { tableRef } = receiveFile;
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
      title: `标题`,
      align: 'center',
      dataIndex: 'title',
    },
    {
      title: '创建单位',
      align: 'center',
      dataIndex: 'createOrgName',
      hideInSearch: true,
    },
    {
      title: '发布时间',
      valueType: 'date',
      align: 'center',
      dataIndex: 'gmtModified',
      hideInSearch: true,
    },
    {
      title: '阅读状态',
      align: 'center',
      dataIndex: 'isRead',
      hideInSearch: true,
      render: (_, record) => <span>{record.isRead === 0 ? '未读' : '已读'}</span>,
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 180,
      fixed: 'right',
      render: (dom, employeeData) => [
        <a
          key={`${employeeData.id}up`}
          onClick={() => {
            opendetailModal(employeeData);
          }}
        >
          详情
        </a>,
      ],
    },
  ];

  // 列表
  const getEmployeeList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'receiveFile/fileLists',
        payload: { ...params },
        resolve,
      });
    });

  return (
    <ProTable
      rowKey="id"
      headerTitle="接收文件"
      actionRef={tableRef}
      scroll={{ x: 'max-content' }}
      request={async params => getEmployeeList(params)}
      columns={columns}
    />
  );
};

export default connect(({ receiveFile, global }) => ({
  receiveFile,
  enums: global.enums,
}))(Table);
