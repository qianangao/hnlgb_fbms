import React from 'react';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const TableCaresMember = ({ oaCaresNext, enums, dispatch, id }) => {
  const { tableRef } = oaCaresNext;

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 64,
    },
    { title: '姓名', align: 'center', dataIndex: 'memberName', hideInSearch: true },
    {
      title: '性别',
      align: 'center',
      dataIndex: 'dictSex',
      valueEnum: enums.dictSex,
      hideInSearch: true,
    },
    { title: '联系电话', align: 'center', dataIndex: 'phoneNumber', hideInSearch: true },
  ];

  const getMemberList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'oaCaresNext/getMemberList',
        payload: { ...params, mechanismId: id },
        resolve,
      });
    });

  return (
    <ProTable
      headerTitle="成员"
      actionRef={tableRef}
      options={false}
      search={false}
      scroll={{ x: 'max-content' }}
      request={async params => getMemberList(params)}
      columns={columns}
    />
  );
};

export default connect(({ oaCaresNext, global }) => ({
  oaCaresNext,
  enums: global.enums,
}))(TableCaresMember);
