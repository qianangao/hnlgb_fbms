import React from 'react';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({ smRoleRule, openRuleModal, dispatch }) => {
  const { tableRef } = smRoleRule;

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 64,
    },
    { title: '角色名称', align: 'center', dataIndex: 'roleName' },
    { title: '角色描述', align: 'center', dataIndex: 'remark' },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 180,
      fixed: 'right',
      render: (dom, roleData) => [
        <a key={`${roleData.id}up`} onClick={() => openRuleModal(roleData.id)}>
          权限配置
        </a>,
      ],
    },
  ];

  const getRoleList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'smRoleRule/getRoleList',
        payload: { ...params },
        resolve,
      });
    });

  return (
    <ProTable
      rowKey="id"
      headerTitle="角色信息"
      actionRef={tableRef}
      scroll={{ x: 'max-content' }}
      request={async params => getRoleList(params)}
      columns={columns}
    />
  );
};

export default connect(({ smRoleRule }) => ({
  smRoleRule,
}))(Table);
