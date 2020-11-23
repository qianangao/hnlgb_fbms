import React from 'react';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({ smDownloadMgt, dispatch }) => {
  const { tableRef } = smDownloadMgt;

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 64,
    },
    { title: '文件名', align: 'center', dataIndex: 'fileName' },
    {
      title: '文件地址',
      align: 'center',
      dataIndex: 'fileUrl',
      hideInSearch: true,
      render: text => (
        // /files_server/ 文件服务地址前缀
        <a rel="noopener noreferrer" target="_blank" href={`/files_server/${text}`}>
          {text}
        </a>
      ),
    },
    {
      title: '导出状态',
      align: 'center',
      dataIndex: 'status',
      valueEnum: {
        0: { text: '导出中' },
        1: { text: '导出成功' },
        2: { text: '导出失败' },
      },
    },
    {
      title: '创建时间',
      valueType: 'date',
      align: 'center',
      dataIndex: 'gmtCreate',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      valueType: 'dateRange',
      align: 'center',
      dataIndex: 'gmtCreate',
      hideInTable: true,
    },
  ];

  const getDownloadList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'smDownloadMgt/getDownloadList',
        payload: { ...params },
        resolve,
      });
    });

  return (
    <ProTable
      rowKey="id"
      headerTitle="文件下载记录"
      actionRef={tableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getDownloadList(params)}
      columns={columns}
    />
  );
};

export default connect(({ smDownloadMgt }) => ({
  smDownloadMgt,
}))(Table);
