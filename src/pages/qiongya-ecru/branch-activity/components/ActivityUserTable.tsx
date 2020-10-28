import React from 'react';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const ActivityUserTable = ({ partyId, branchActivity, dispatch, enums }) => {
  const { tableRef } = branchActivity;
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 64,
    },
    { title: '姓名', align: 'center', dataIndex: 'realName' },
    {
      title: '工作单位',
      align: 'center',
      dataIndex: 'organizationName',
      hideInSearch: true,
    },
    {
      title: '手机号码',
      align: 'center',
      dataIndex: 'phonenumber',
      hideInSearch: true,
    },
    {
      title: '政治面貌',
      align: 'center',
      dataIndex: 'dictPoliticalStatus',
      valueEnum: enums.dictPoliticalStatus,
      hideInSearch: true,
    },
  ];

  // 列表
  const branchActivityList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'branchInformation/getPartyUserList',
        payload: { ...params, id: partyId },
        resolve,
      });
    });

  return (
    <ProTable
      rowKey="id"
      headerTitle="支部活动"
      actionRef={tableRef}
      scroll={{ x: 'max-content' }}
      request={async params => branchActivityList(params)}
      columns={columns}
    />
  );
};

export default connect(({ branchActivity, global }) => ({
  branchActivity,
  enums: global.enums,
}))(ActivityUserTable);
