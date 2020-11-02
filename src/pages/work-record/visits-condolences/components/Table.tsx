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
  const columns1 = [
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
      title: '看望时间',
      valueType: 'dateRange',
      align: 'center',
      dataIndex: 'searchTime',
      hideInTable: true,
    },
    { title: '看望领导', align: 'center', dataIndex: 'leader', hideInSearch: true },
    {
      title: tableType === '生日看望' ? '看望地点' : '看望医院',
      align: 'center',
      dataIndex: 'address',
      hideInSearch: true,
    },
    {
      title: '看望时间',
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
  const columns2 = [
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
      title: tableType === '日常走访' ? '走访时间' : '慰问时间',
      valueType: 'dateRange',
      align: 'center',
      dataIndex: 'searchTime',
      hideInTable: true,
    },
    {
      title: tableType === '日常走访' ? '走访领导' : '慰问领导',
      align: 'center',
      dataIndex: 'leader',
      hideInSearch: true,
    },
    {
      title: tableType === '日常走访' ? '走访地点' : '慰问地点',
      align: 'center',
      dataIndex: 'address',
      hideInSearch: true,
    },
    {
      title: tableType === '日常走访' ? '走访时间' : '慰问时间',
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
    let visitType = '';
    if (tableType === '生日看望') {
      visitType = '402883ea73c687ef0173c687ef71';
    } else if (tableType === '住院看望') {
      visitType = '402883ea73c689120173c68912b9';
    } else if (tableType === '节日慰问') {
      visitType = '402883ea73c68c090173c68c09f4';
    } else if (tableType === '日常走访') {
      visitType = '402883ea73c68c5d0173c68c5da8';
    } else if (tableType === '易地安置人员慰问') {
      visitType = '402883ea73c68c7f0173c68c7f63';
    } else if (tableType === '遗属慰问') {
      visitType = '402883ea73c68c3e0173c68c3e22';
    }
    return new Promise(resolve => {
      dispatch({
        type: 'wrVisitsCondolences/getVisitList',
        payload: { ...params, type: visitType },
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
      headerTitle={`${tableType}`}
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
      columns={tableType === '生日看望' || tableType === '住院看望' ? columns1 : columns2}
    />
  );
};

export default connect(({ wrVisitsCondolences, global }) => ({
  wrVisitsCondolences,
  enums: global.enums,
}))(Table);
