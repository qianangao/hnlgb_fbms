import React from 'react';
import ProTable from '@ant-design/pro-table';
import { Button, Popconfirm, Modal } from 'antd';
import { connect } from 'umi';

const Table = ({
  oaCaresNext,
  dispatch,
  openDetailModal,
  openModifyModal,
  openAddCaresModal,
  openAddTrendsModal,
}) => {
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
    { title: '组织名称', align: 'center', dataIndex: 'mechanismName' },
    { title: '发布单位', align: 'center', dataIndex: 'organizationName', hideInSearch: true },
    { title: '发布时间', align: 'center', dataIndex: 'releaseTime', hideInSearch: true },
    {
      title: '姓名',
      align: 'center',
      dataIndex: 'name',
      hideInTable: true,
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 200,
      fixed: 'right',
      render: (dom, employeeData) => [
        <a key={`${employeeData.id}up`} onClick={() => openDetailModal(employeeData)}>
          查看
        </a>,
        <a key={`${employeeData.id}up`} onClick={() => openModifyModal(employeeData)}>
          编辑
        </a>,
        <a key={`${employeeData.id}up`} onClick={() => openAddTrendsModal(employeeData.id)}>
          发布动态
        </a>,
        <Popconfirm
          key={`${employeeData.id}del`}
          title="确认删除该组织吗？"
          placement="topRight"
          onConfirm={() => deleteCaresInfo([employeeData.id])}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  const getHobbyList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'oaCaresNext/getCaresList',
        payload: { ...params },
        resolve,
      });
    });

  const deleteCaresInfo = ids => {
    dispatch({
      type: 'oaCaresNext/deleteCares',
      payload: {
        ids,
      },
    });
  };

  return (
    <ProTable
      headerTitle="关工组织信息"
      rowKey="id"
      actionRef={tableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getHobbyList(params)}
      columns={columns}
      toolBarRender={(_, { selectedRowKeys }) => [
        <Button
          type="primary"
          onClick={() => {
            openAddCaresModal();
          }}
        >
          新增
        </Button>,
        selectedRowKeys && selectedRowKeys.length && (
          <Button
            onClick={() => {
              Modal.confirm({
                title: '确认批量删除？',
                content: '一旦确定将无法恢复',
                onOk: () => {
                  deleteCaresInfo(selectedRowKeys);
                },
              });
            }}
          >
            批量删除
          </Button>
        ),
      ]}
    />
  );
};

export default connect(({ oaCaresNext }) => ({
  oaCaresNext,
}))(Table);
