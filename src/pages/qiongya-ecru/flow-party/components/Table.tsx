import React from 'react';
import { Button, Popconfirm, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({ openAddModal, openModifyModal, flowParty, enums, dispatch }) => {
  const { tableRef } = flowParty;
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
      title: '姓名',
      align: 'center',
      dataIndex: 'realName',
    },
    {
      title: '性别',
      align: 'center',
      dataIndex: 'sex',
      valueEnum: enums.dictSex,
      hideInSearch: true,
    },
    {
      title: '年龄',
      align: 'center',
      dataIndex: 'age',
      hideInSearch: true,
    },
    {
      title: '民族',
      align: 'center',
      dataIndex: 'dictNation',
      valueEnum: enums.dictNation,
      hideInSearch: true,
    },
    {
      title: '原工作单位及职务',
      align: 'center',
      dataIndex: 'originalUnitAndPosition',
      hideInSearch: true,
    },
    {
      title: '入党时间',
      align: 'center',
      dataIndex: 'partyTime',
      hideInSearch: true,
    },
    {
      title: '现居住市县',
      align: 'center',
      dataIndex: 'addressDiy',
      hideInSearch: true,
    },
    {
      title: '详细住址',
      align: 'center',
      dataIndex: 'homeAddressDiy',
      hideInSearch: true,
    },
    {
      title: '开始流动时间',
      align: 'center',
      dataIndex: 'startTime',
      hideInSearch: true,
    },
    {
      title: '结束流动时间',
      align: 'center',
      dataIndex: 'endTime',
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
          title="确认删除该流动党员登记信息吗？"
          placement="topRight"
          onConfirm={() => deleteFlowParty([employeeData.id])}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  // 列表
  const getFlowPartyList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'flowParty/flowPartyList',
        payload: { ...params },
        resolve,
      });
    });
  const deleteFlowParty = ids => {
    dispatch({
      type: 'flowParty/deleteFlowParty',
      payload: {
        ids,
      },
    });
  };
  return (
    <ProTable
      rowKey="id"
      headerTitle="流动党员登记"
      actionRef={tableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getFlowPartyList(params)}
      toolBarRender={(_, { selectedRowKeys }) => [
        <Button type="primary" onClick={() => openAddModal()}>
          新增
        </Button>,
        selectedRowKeys && selectedRowKeys.length && (
          <Button
            onClick={() => {
              Modal.confirm({
                title: '确认删除选择流动党员登记信息？',
                content: '一旦确定将无法恢复',
                onOk: () => {
                  deleteFlowParty(selectedRowKeys);
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

export default connect(({ flowParty, global }) => ({
  flowParty,
  enums: global.enums,
}))(Table);
