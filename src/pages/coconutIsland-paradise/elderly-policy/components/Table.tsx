import React from 'react';
import { Button, Popconfirm, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({
  openAddModal,
  openModifyModal,
  elderlyPolicy,
  dispatch,
  opendetailModal,
  publishStatus,
}) => {
  const { tableRef } = elderlyPolicy;
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
      dataIndex: 'title',
    },
    {
      title: publishStatus === 0 ? '保存时间' : '发布时间',
      valueType: 'date',
      align: 'center',
      dataIndex: publishStatus === 0 ? 'createTime' : 'pushTime',
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
        publishStatus === 0 ? (
          <a
            key={`${Data.id}up`}
            onClick={() => {
              openModifyModal(Data);
            }}
          >
            编辑
          </a>
        ) : (
          <a
            key={`${Data.id}detail`}
            onClick={() => {
              opendetailModal(Data);
            }}
          >
            详情
          </a>
        ),
        <Popconfirm
          key={`${Data.id}del`}
          title="确认删除该涉老政策吗？"
          placement="topRight"
          onConfirm={() => deleteReturnworkPerson([Data.id])}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  // 列表
  const getElderlyPolicyList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'elderlyPolicy/elderlyPolicyInfoList',
        payload: { ...params, pushStatus: publishStatus },
        resolve,
      });
    });
  const deleteReturnworkPerson = ids => {
    dispatch({
      type: 'elderlyPolicy/deleteElderlyPolicyInfo',
      payload: {
        ids,
      },
    });
  };
  return (
    <ProTable
      rowKey="id"
      headerTitle="涉老政策"
      actionRef={tableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getElderlyPolicyList(params)}
      toolBarRender={(_, { selectedRowKeys }) => [
        publishStatus === 0 ? (
          <Button type="primary" onClick={() => openAddModal()}>
            新增
          </Button>
        ) : null,
        selectedRowKeys && selectedRowKeys.length && (
          <Button
            onClick={() => {
              Modal.confirm({
                title: '确认删除选择涉老政策信息？',
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

export default connect(({ elderlyPolicy }) => ({
  elderlyPolicy,
}))(Table);
