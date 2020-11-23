import React from 'react';
import { Button, Popconfirm, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({ vcDeathInfo, openModifyModal, openReminiscenceModal, enums, dispatch }) => {
  const { tableRef } = vcDeathInfo;

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 64,
    },
    { title: '姓名', align: 'center', dataIndex: 'realName', fixed: 'left', width: 70 },
    { title: '性别', align: 'center', dataIndex: 'dictSex', valueEnum: enums.dictSex },
    { title: '民族', align: 'center', dataIndex: 'dictNation', valueEnum: enums.dictNation },
    {
      title: '出生日期',
      valueType: 'date',
      align: 'center',
      dataIndex: 'dateOfBirth',
      hideInSearch: true,
    },
    {
      title: '出生日期',
      valueType: 'dateRange',
      align: 'center',
      dataIndex: 'dateOfBirth',
      hideInTable: true,
    },
    {
      title: '离世时间',
      valueType: 'date',
      align: 'center',
      dataIndex: 'dieDate',
      hideInSearch: true,
    },
    {
      title: '离世时间',
      valueType: 'dateRange',
      align: 'center',
      dataIndex: 'dieDate',
      hideInTable: true,
    },

    { title: '原工作单位及职务', align: 'center', dataIndex: 'originalUnitAndPosition' },
    {
      title: '离退休类型',
      align: 'center',
      dataIndex: 'dictRetirementType',
      valueEnum: enums.dictRetirementType,
    },
    {
      title: '职级',
      align: 'center',
      dataIndex: 'dictRetirementLevel',
      valueEnum: enums.dictRetirementLevel,
    },

    {
      title: '现享受待遇',
      align: 'center',
      dataIndex: 'dictTreatmentNow',
      valueEnum: enums.dictTreatmentNow,
    },
    {
      title: '追思缅怀',
      align: 'center',
      dataIndex: 'isReminiscence',
      valueEnum: {
        0: { text: '未缅怀', status: 'Processing' },
        1: { text: '已缅怀', status: 'Success' },
      },
    },
    // TODO 接口暂时未加
    // {
    //   title: '缅怀类型',
    //   align: 'center',
    //   dataIndex: 'reminiscenceType',
    //   valueEnum: enums.dictReminiscenceType,
    // },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 200,
      fixed: 'right',
      render: (dom, employeeData) => [
        <a key={`${employeeData.id}up`} onClick={() => openModifyModal(employeeData)}>
          编辑
        </a>,
        <Popconfirm
          key={`${employeeData.id}del`}
          title="确认将该人员恢复在世吗？"
          placement="topRight"
          onConfirm={() => deleteReturnworkPerson([employeeData.id])}
        >
          <a>恢复在世</a>
        </Popconfirm>,
        employeeData.isReminiscence === 0 && (
          <a
            key={`${employeeData.id}up`}
            onClick={() => openReminiscenceModal(employeeData.userId)}
          >
            追思缅怀
          </a>
        ),
      ],
    },
  ];

  const getEmployeeList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'vcDeathInfo/getList',
        payload: { ...params },
        resolve,
      });
    });

  const deleteReturnworkPerson = ids => {
    dispatch({
      type: 'vcDeathInfo/deleteLgb',
      payload: {
        ids,
      },
    });
  };

  return (
    <ProTable
      rowKey="id"
      headerTitle="离世信息"
      actionRef={tableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getEmployeeList(params)}
      toolBarRender={(_, { selectedRowKeys }) => [
        selectedRowKeys && selectedRowKeys.length && (
          <Button
            onClick={() => {
              Modal.confirm({
                title: '确认将选择人员恢复在世？',
                onOk: () => {
                  deleteReturnworkPerson(selectedRowKeys);
                },
              });
            }}
          >
            批量恢复在世
          </Button>
        ),
      ]}
      columns={columns}
    />
  );
};

export default connect(({ vcDeathInfo, global }) => ({
  vcDeathInfo,
  enums: global.enums,
}))(Table);
