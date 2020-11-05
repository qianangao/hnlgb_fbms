import { Button, Popconfirm, Modal } from 'antd';
import React from 'react';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({
  openAddModal,
  openModifyModal,
  branchInformation,
  dispatch,
  enums,
  openMembersModifyModal,
}) => {
  const { tableRef } = branchInformation;
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
      title: `支部名称`,
      align: 'center',
      dataIndex: 'partyName',
    },
    {
      title: '支部类型',
      align: 'center',
      dataIndex: 'dictPartyType',
      valueEnum: enums.dictPartyType,
      hideInSearch: true,
    },
    {
      title: '支部类别',
      align: 'center',
      dataIndex: 'dictPartyCategory',
      valueEnum: enums.dictPartyCategory,
    },
    {
      title: '书记',
      align: 'center',
      dataIndex: 'branchSecretaryName',
      hideInSearch: true,
    },
    {
      title: '副书记',
      align: 'center',
      dataIndex: 'branchDeputySecretaryOneName',
      hideInSearch: true,
    },
    {
      title: '换届时间',
      valueType: 'date',
      align: 'center',
      dataIndex: 'dateForChangingLeaders',
      hideInSearch: true,
    },
    {
      title: '换届地点',
      align: 'center',
      dataIndex: 'venues',
      hideInSearch: true,
    },
    {
      title: '党员数量',
      align: 'center',
      dataIndex: 'partyMemberNum',
      hideInSearch: true,
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
            openModifyModal(employeeData);
          }}
        >
          编辑支部
        </a>,
        <a
          key={`${employeeData.id}up`}
          onClick={() => {
            openMembersModifyModal(employeeData);
          }}
        >
          编辑成员
        </a>,
        <Popconfirm
          key={`${employeeData.id}del`}
          title="确认删除支部信息吗？"
          placement="topRight"
          onConfirm={() => deleteBranchInformation([employeeData.id])}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  // 列表
  const getEmployeeList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'branchInformation/branchInformationList',
        payload: { ...params },
        resolve,
      });
    });
  // 删除
  const deleteBranchInformation = ids => {
    dispatch({
      type: 'branchInformation/deleteBranchInformation',
      payload: {
        ids,
      },
    });
  };

  return (
    <ProTable
      rowKey="id"
      headerTitle="支部信息"
      actionRef={tableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getEmployeeList(params)}
      toolBarRender={(_, { selectedRowKeys }) => [
        <Button type="primary" onClick={() => openAddModal()}>
          新增
        </Button>,
        selectedRowKeys && selectedRowKeys.length && (
          <Button
            onClick={() => {
              Modal.confirm({
                title: '确认删除支部信息？',
                content: '一旦确定将无法恢复',
                onOk: () => {
                  deleteBranchInformation(selectedRowKeys);
                },
              });
            }}
          >
            批量删除
          </Button>
        ),
      ]}
      columns={columns}
    />
  );
};

export default connect(({ branchInformation, global }) => ({
  branchInformation,
  enums: global.enums,
}))(Table);
