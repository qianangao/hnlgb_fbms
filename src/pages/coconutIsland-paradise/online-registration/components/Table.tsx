import React from 'react';
import { Button, Popconfirm, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({
  openAddModal,
  openModifyModal,
  openDetailModal,
  openSelectModal,
  onlineRegistration,
  dispatch,
  publishStatus,
}) => {
  const { tableRef } = onlineRegistration;
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
      title: '网络报名名称',
      align: 'center',
      dataIndex: 'title',
    },
    {
      title: '网络报名地址',
      align: 'center',
      dataIndex: 'coreAdd',
      hideInSearch: true,
    },
    {
      title: '联系电话',
      align: 'center',
      dataIndex: 'phoneNumber',
      hideInSearch: true,
    },
    {
      title: '所属单位',
      align: 'center',
      dataIndex: 'organizationName',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 300,
      fixed: 'right',
      render: (dom, employeeData) => [
        publishStatus === 0 ? (
          <>
            <a
              key={`${employeeData.id}up`}
              onClick={() => {
                openModifyModal(employeeData);
              }}
            >
              编辑
            </a>
            <a
              key={`${employeeData.id}select`}
              onClick={() => {
                openSelectModal(employeeData);
              }}
            >
              选择人员/单位
            </a>
          </>
        ) : (
          <a
            key={`${employeeData.id}detail`}
            onClick={() => {
              openDetailModal(employeeData);
            }}
          >
            详情
          </a>
        ),
        <Popconfirm
          key={`${employeeData.id}del`}
          title="确认删除该网络报名吗？"
          placement="topRight"
          onConfirm={() => deleteReturnworkPerson([employeeData.id])}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  // 列表
  const getOnlineRegistrationList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'onlineRegistration/onlineRegistrationInfoList',
        payload: { ...params, pushStatus: publishStatus },
        resolve,
      });
    });
  const deleteReturnworkPerson = ids => {
    dispatch({
      type: 'onlineRegistration/deleteOnlineRegistrationInfo',
      payload: {
        ids,
      },
    });
  };
  return (
    <ProTable
      rowKey="id"
      headerTitle="网络报名"
      actionRef={tableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getOnlineRegistrationList(params)}
      toolBarRender={(_, { selectedRowKeys }) => [
        publishStatus === 0 ? (
          <Button type="primary" onClick={() => openAddModal()}>
            新增
          </Button>
        ) : null,
        selectedRowKeys && selectedRowKeys.length && (
          <Button
            onClick={() => {
              Modal.confirm({
                title: '确认删除选择网络报名信息？',
                content: '一旦确定将无法恢复',
                onOk: () => {
                  deleteReturnworkPerson(selectedRowKeys);
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

export default connect(({ onlineRegistration, global }) => ({
  onlineRegistration,
  enums: global.enums,
}))(Table);
