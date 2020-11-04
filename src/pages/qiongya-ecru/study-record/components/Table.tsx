import React from 'react';
import { Button, Popconfirm, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({
  openAddModal,
  openModifyModal,
  studyRecord,
  dispatch,
  enums,
  openMembersModifyModal,
}) => {
  const { tableRef } = studyRecord;
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
      title: `学习主题`,
      align: 'center',
      dataIndex: 'theme',
    },
    {
      title: '学习时间',
      align: 'center',
      valueType: 'date',
      dataIndex: 'time',
      hideInSearch: true,
    },
    {
      title: '主持人',
      align: 'center',
      dataIndex: 'host',
    },
    {
      title: '学习人数',
      align: 'center',
      dataIndex: 'number',
      hideInSearch: true,
    },
    {
      title: '学习形式',
      align: 'center',
      dataIndex: 'dictForm',
      valueEnum: enums.dictPartyType,
    },
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
          编辑学习
        </a>,
        <a
          key={`${Data.id}up`}
          onClick={() => {
            openMembersModifyModal(Data);
          }}
        >
          编辑成员
        </a>,
        <Popconfirm
          key={`${Data.id}del`}
          title="确认删除学习记录吗？"
          placement="topRight"
          onConfirm={() => deleteReturnworkPerson([Data.id])}
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
        type: 'studyRecord/studyRecordList',
        payload: { ...params },
        resolve,
      });
    });
  // 删除
  const deleteReturnworkPerson = ids => {
    dispatch({
      type: 'studyRecord/deleteStudyRecord',
      payload: {
        ids,
      },
    });
  };

  return (
    <ProTable
      rowKey="id"
      headerTitle="学习记录"
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
                title: '确认删除学习记录？',
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

export default connect(({ studyRecord, global }) => ({
  studyRecord,
  enums: global.enums,
}))(Table);
