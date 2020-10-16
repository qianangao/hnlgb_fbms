import React, { useEffect } from 'react';
import { Button, Popconfirm, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({
  openAddModal,
  openModifyModal,
  wrVisitsCondolences,
  enums,
  dispatch,
  tableType,
}) => {
  const { tableRef } = wrVisitsCondolences;
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
      dataIndex: 'userRealName',
    },
    {
      title: '性别',
      align: 'center',
      dataIndex: 'dictSex',
      valueEnum: enums.dictSex,
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
      title: '出生日期',
      valueType: 'date',
      align: 'center',
      dataIndex: 'birthday',
      hideInSearch: true,
    },
    {
      title: '慰问时间',
      valueType: 'dateRange',
      align: 'center',
      dataIndex: 'searchTime',
      hideInTable: true,
    },
    { title: '慰问领导', align: 'center', dataIndex: 'leader', hideInSearch: true },
    { title: '慰问地点', align: 'center', dataIndex: 'address', hideInSearch: true },
    {
      title: '慰问时间',
      valueType: 'date',
      align: 'center',
      dataIndex: 'time',
      hideInSearch: true,
    },
    { title: '陪同人员', align: 'center', dataIndex: 'entourage', hideInSearch: true },
    { title: '慰问品', align: 'center', dataIndex: 'consolationGoods', hideInSearch: true },

    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 180,
      fixed: 'right',
      render: (dom, Data) => [
        <a
          key={`${Data.id}up`}
          onClick={() => {
            openModifyModal(Data);
          }}
        >
          编辑
        </a>,

        <Popconfirm
          key={`${Data.id}del`}
          title="确认删除？"
          placement="topRight"
          onConfirm={() => deleteReturnworkPerson([Data.id])}
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
  const getVisitList = params => {
    return new Promise(resolve => {
      dispatch({
        type: 'wrVisitsCondolences/getVisitList',
        payload: { ...params, type: tableType },
        resolve,
      });
    });
  };

  // 删除
  const deleteReturnworkPerson = ids => {
    dispatch({
      type: 'wrVisitsCondolences/deleteVisit',
      payload: {
        ids,
      },
    });
  };

  return (
    <ProTable
      rowKey="id"
      headerTitle={`${tableType}信息`}
      actionRef={tableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getVisitList(params)}
      toolBarRender={(_, { selectedRowKeys }) => [
        <Button type="primary" onClick={() => openAddModal()}>
          新增
        </Button>,
        selectedRowKeys && selectedRowKeys.length && (
          <Button
            onClick={() => {
              Modal.confirm({
                title: '确认批量删除？',
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

export default connect(({ wrVisitsCondolences, global }) => ({
  wrVisitsCondolences,
  enums: global.enums,
}))(Table);
