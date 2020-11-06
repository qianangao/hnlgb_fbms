import React from 'react';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const TableMembers = ({ oaCommunity, enums, dispatch, id }) => {
  const { tableRef } = oaCommunity;

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 64,
    },
    { title: '姓名', align: 'center', dataIndex: 'realName', hideInSearch: true },
    {
      title: '性别',
      align: 'center',
      dataIndex: 'dictSex',
      valueEnum: enums.dictSex,
      hideInSearch: true,
    },
    { title: '联系电话', align: 'center', dataIndex: 'phonenumber', hideInSearch: true },
    {
      title: '原工作单位及职务',
      align: 'center',
      dataIndex: 'originalUnitAndPosition',
      hideInSearch: true,
    },
  ];

  const getMemberList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'oaCommunity/getMemberList',
        payload: { ...params, clubId: id },
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

export default connect(({ oaCommunity, global }) => ({
  oaCommunity,
  enums: global.enums,
}))(TableMembers);
