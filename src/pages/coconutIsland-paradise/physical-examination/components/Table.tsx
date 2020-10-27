import React from 'react';
import { Button, Popconfirm, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({
  openAddModal,
  openModifyModal,
  opPhysicalExamination,
  openRegisteredModal,
  dispatch,
}) => {
  const { tableRef } = opPhysicalExamination;
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
      dataIndex: 'subject',
    },
    {
      title: '体检时间',
      valueType: 'dateRange',
      align: 'center',
      dataIndex: 'activityDate',
      hideInTable: true,
    },
    {
      title: '体检时间',
      valueType: 'date',
      align: 'center',
      dataIndex: 'activityDate',
      hideInSearch: true,
    },
    {
      title: '体检地点',
      align: 'center',
      dataIndex: 'activityAdd',
      hideInSearch: true,
    },

    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 180,
      fixed: 'right',
      render: (dom, data) => [
        <a
          key={`${data.id}up`}
          onClick={() => {
            openModifyModal(data);
          }}
        >
          编辑
        </a>,
        <a
          key={`${data.id}up`}
          onClick={() => {
            openRegisteredModal(data);
          }}
        >
          报名列表
        </a>,
        <Popconfirm
          key={`${data.id}del`}
          title="确认删除？"
          placement="topRight"
          onConfirm={() => deleteReturnworkPerson([data.id])}
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
        type: 'opPhysicalExamination/physicalExaminationList',
        payload: { ...params, type: 3 },
        resolve,
      });
    });
  // 删除
  const deleteReturnworkPerson = ids => {
    dispatch({
      type: 'opPhysicalExamination/deletePhysicalExamination',
      payload: {
        ids,
      },
    });
  };

  return (
    <ProTable
      rowKey="id"
      headerTitle="体检信息"
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
                title: '确认删除？',
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

export default connect(({ opPhysicalExamination, global }) => ({
  opPhysicalExamination,
  enums: global.enums,
}))(Table);
