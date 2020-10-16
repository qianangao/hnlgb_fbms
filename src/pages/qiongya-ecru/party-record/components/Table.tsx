import React from 'react';
import { Button, Popconfirm, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({
  openAddModal,
  openModifyModal,
  partyRecord,
  dispatch,
  enums,
  openMembersModifyModal,
}) => {
  const { tableRef } = partyRecord;
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
      title: `姓名`,
      align: 'center',
      dataIndex: 'userName',
    },
    {
      title: '性别',
      align: 'center',
      dataIndex: 'dictSex',
      valueEnum: enums.dictSex,
      hideInSearch: true,
    },
    {
      title: '缴纳年月',
      align: 'center',
      valueType: 'data',
      dataIndex: 'paymentTime',
      hideInSearch: true,
    },
    {
      title: '支部名称',
      align: 'center',
      dataIndex: 'partyName',
      valueEnum: enums.dictNation,
    },
    {
      title: '缴纳状态',
      align: 'center',
      dataIndex: 'dictPaymentState',
      valueEnum: enums.dictNation,
      render: (_, record) => <span>{record ? '未缴纳' : '已缴纳'}</span>,
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
          编辑党费
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
          title="确认删除党费记录吗？"
          placement="topRight"
          onConfirm={() => deleteReturnworkPerson([employeeData.id])}
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
        type: 'partyRecord/partyRecordList',
        payload: { ...params },
        resolve,
      });
    });
  // 删除
  const deleteReturnworkPerson = ids => {
    dispatch({
      type: 'partyRecord/deletePartyRecord',
      payload: {
        ids,
      },
    });
  };
  // 导出
  const exportPartyRecord = ids => {
    dispatch({
      type: 'partyRecord/exportPartyRecord',
      payload: {
        ids,
      },
    });
  };
  return (
    <ProTable
      rowKey="id"
      headerTitle="党费记录"
      actionRef={tableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getEmployeeList(params)}
      toolBarRender={(_, { selectedRowKeys }) => [
        <Button type="primary" onClick={() => openAddModal()}>
          新增
        </Button>,
        <Button type="primary" onClick={() => exportPartyRecord(selectedRowKeys)}>
          导出
        </Button>,
        selectedRowKeys && selectedRowKeys.length && (
          <Button
            onClick={() => {
              Modal.confirm({
                title: '确认删除党费记录？',
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

export default connect(({ partyRecord, global }) => ({
  partyRecord,
  enums: global.enums,
}))(Table);
