import React from 'react';
import { Button, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({ openAddModal, openModifyModal, dailyBroadcast, dispatch, opendetailModal }) => {
  const { tableRef, publishStatus } = dailyBroadcast;
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
      title: '标题',
      align: 'center',
      dataIndex: 'headline',
    },
    {
      title: '创建单位',
      align: 'center',
      dataIndex: 'createOrgName',
      hideInSearch: true,
    },
    {
      title: publishStatus === 0 ? '保存时间' : '发布时间',
      valueType: 'date',
      align: 'center',
      dataIndex: publishStatus === 0 ? 'createTime' : 'releaseTime',
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
        publishStatus === 0 ? (
          <a
            key={`${employeeData.id}up`}
            onClick={() => {
              openModifyModal(employeeData);
            }}
          >
            编辑
          </a>
        ) : (
          <a
            key={`${employeeData.id}up`}
            onClick={() => {
              opendetailModal(employeeData);
            }}
          >
            详情
          </a>
        ),
      ],
    },
  ];

  // 列表
  const getEmployeeList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'dailyBroadcast/dailyBroadcastList',
        payload: { ...params },
        resolve,
      });
    });
  // 删除
  const deleteReturnworkPerson = ids => {
    dispatch({
      type: 'dailyBroadcast/deleteDailyBroadcast',
      payload: {
        ids,
      },
    });
  };

  return (
    <ProTable
      rowKey="id"
      headerTitle="每日播报"
      actionRef={tableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getEmployeeList(params)}
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
                title: '确认删除每日播报？',
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

export default connect(({ dailyBroadcast, global }) => ({
  dailyBroadcast,
  enums: global.enums,
}))(Table);
