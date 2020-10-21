import React from 'react';
import { Button, Popconfirm, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({ openAddModal, openModifyModal, healthEducation, dispatch }) => {
  const { tableRef } = healthEducation;
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
      dataIndex: 'theme',
    },
    {
      title: '发布时间',
      align: 'center',
      dataIndex: 'createTime',
      hideInSearch: true,
    },
    {
      title: '发布单位',
      align: 'center',
      dataIndex: 'organizationName',
      hideInSearch: true,
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
          编辑
        </a>,
        <Popconfirm
          key={`${Data.id}del`}
          title="确认删除该保健教育信息吗？"
          placement="topRight"
          onConfirm={() => deleteReturnworkPerson([Data.id])}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  // 列表
  const getHealthEducationList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'healthEducation/healthEducationInfoList',
        payload: { ...params },
        resolve,
      });
    });
  const deleteReturnworkPerson = ids => {
    dispatch({
      type: 'healthEducation/deleteHealthEducationInfo',
      payload: {
        ids,
      },
    });
  };
  return (
    <ProTable
      rowKey="id"
      headerTitle="保健教育"
      actionRef={tableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getHealthEducationList(params)}
      toolBarRender={(_, { selectedRowKeys }) => [
        <Button type="primary" onClick={() => openAddModal()}>
          新增
        </Button>,
        selectedRowKeys && selectedRowKeys.length && (
          <Button
            onClick={() => {
              Modal.confirm({
                title: '确认删除选择保健教育信息？',
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

export default connect(({ healthEducation }) => ({
  healthEducation,
}))(Table);
