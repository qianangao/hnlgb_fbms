import React, { useEffect } from 'react';
import { Button, Popconfirm, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({
  openAddModal,
  openModifyModal,
  wrSupportDifficult,
  enums,
  dispatch,
  tableType,
}) => {
  const { tableRef } = wrSupportDifficult;
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
      dataIndex: 'dictSex',
      valueEnum: enums.dictSex,
      hideInSearch: true,
    },
    {
      title: '出生日期',
      valueType: 'date',
      align: 'center',
      dataIndex: 'dateOfBirth',
      hideInSearch: true,
    },
    {
      title: '离退休类型',
      align: 'center',
      dataIndex: 'dictRetirementType',
      valueEnum: enums.dictRetirementType,
      hideInSearch: true,
    },
    {
      title: '帮扶原因',
      align: 'center',
      dataIndex: 'helpReason',
      valueEnum: enums.dictHelpReason,
      hideInTable: true,
    },
    {
      title: '帮扶时间',
      valueType: 'dateRange',
      align: 'center',
      dataIndex: 'searchTime',
      hideInTable: true,
    },
    {
      title: '帮扶时间',
      valueType: 'date',
      align: 'center',
      dataIndex: 'helpDate',
      hideInSearch: true,
    },
    {
      title: '帮扶金额(元)',
      align: 'center',
      dataIndex: 'helpMoney',
      hideInSearch: true,
    },
    {
      title: '帮扶单位',
      align: 'center',
      dataIndex: 'helpOrganization',
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

  useEffect(() => {
    tableRef.current && tableRef.current.reloadAndRest();
  }, [tableType]);

  // 列表
  const getList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'wrSupportDifficult/getSupportDifficultList',
        payload: { ...params, helpType: tableType },
        resolve,
      });
    });
  // 删除
  const deleteReturnworkPerson = ids => {
    dispatch({
      type: 'wrSupportDifficult/deleteSupportDifficult',
      payload: {
        ids,
      },
    });
  };

  return (
    <ProTable
      rowKey="id"
      headerTitle="困难帮扶信息"
      actionRef={tableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getList(params)}
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

export default connect(({ wrSupportDifficult, global }) => ({
  wrSupportDifficult,
  enums: global.enums,
}))(Table);
