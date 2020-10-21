import React from 'react';
import { Button, Popconfirm, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({ openAddModal, openModifyModal, outRegister, enums, dispatch }) => {
  const { tableRef } = outRegister;
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
      title: '目的地',
      align: 'center',
      dataIndex: 'destination',
      hideInSearch: false,
    },
    {
      title: '申请时间',
      valueType: 'date',
      align: 'center',
      dataIndex: 'applicationTime',
      hideInSearch: true,
    },
    {
      title: '申请时间',
      valueType: 'dateRange',
      align: 'center',
      dataIndex: 'applicationTime',
      hideInTable: true,
    },
    {
      title: '出国时间',
      valueType: 'date',
      align: 'center',
      dataIndex: 'abroadTime',
      hideInSearch: true,
    },
    {
      title: '出国时间',
      valueType: 'dateRange',
      align: 'center',
      dataIndex: 'abroadTime',
      hideInTable: true,
    },
    {
      title: '返回时间',
      valueType: 'date',
      align: 'center',
      dataIndex: 'returnTime',
      hideInSearch: true,
    },
    {
      title: '事由',
      align: 'center',
      dataIndex: 'reason',
      hideInSearch: true,
    },
    {
      title: '姓名',
      align: 'center',
      dataIndex: 'realName',
      hideInSearch: false,
    },
    {
      title: '离退休类型',
      align: 'center',
      dataIndex: 'dictRetirementType',
      valueEnum: enums.dictRetirementType,
      hideInSearch: false,
    },
    {
      title: '现享受待遇',
      align: 'center',
      type: 'date',
      dataIndex: 'dictTreatmentNow',
      valueEnum: enums.dictTreatmentNow,
      hideInSearch: true,
    },
    {
      title: '原工作单位和职务',
      align: 'center',
      dataIndex: 'originalUnitAndPosition',
      hideInSearch: true,
    },
    {
      title: '性别',
      align: 'center',
      dataIndex: 'dictSex',
      valueEnum: enums.dictSex,
      hideInSearch: true,
    },
    {
      title: '出生日期',
      align: 'center',
      type: 'date',
      dataIndex: 'dateOfBirth',
      hideInSearch: true,
    },
    {
      title: '单位id',
      align: 'center',
      dataIndex: 'organizationId',
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
          编辑
        </a>,
        <Popconfirm
          key={`${employeeData.id}del`}
          title="确认删除该外出登记信息吗？"
          placement="topRight"
          onConfirm={() => {
            deleteOutRegister([employeeData.id]);
          }}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  // 列表
  const getOutRegisterList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'outRegister/outRegisterInfoList',
        payload: { ...params },
        resolve,
      });
    });
  const deleteOutRegister = ids => {
    dispatch({
      type: 'outRegister/deleteOutRegisterInfo',
      payload: {
        ids,
      },
    });
  };
  return (
    <ProTable
      rowKey="id"
      headerTitle="外出登记"
      actionRef={tableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getOutRegisterList(params)}
      toolBarRender={(_, { selectedRowKeys }) => [
        <Button type="primary" onClick={() => openAddModal()}>
          新增
        </Button>,
        selectedRowKeys && selectedRowKeys.length && (
          <Button
            onClick={() => {
              Modal.confirm({
                title: '确认删除选择外出登记信息？',
                content: '一旦确定将无法恢复',
                onOk: () => {
                  deleteOutRegister(selectedRowKeys);
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

export default connect(({ outRegister, global }) => ({
  outRegister,
  enums: global.enums,
}))(Table);
