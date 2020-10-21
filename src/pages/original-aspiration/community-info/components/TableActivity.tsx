import React from 'react';
import ProTable from '@ant-design/pro-table';
import { Button, Popconfirm, Modal } from 'antd';
import { connect } from 'umi';

const Table = ({ oaCommunity, openActivityDetailModal, dispatch }) => {
  const { tableRef } = oaCommunity;

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 64,
    },
    { title: '主题', align: 'center', dataIndex: 'theme' },

    { title: '发布单位', align: 'center', dataIndex: 'organizationName', hideInSearch: true },
    { title: '所属社团', align: 'center', dataIndex: 'clubName', hideInSearch: true },
    { title: '发布时间', align: 'center', dataIndex: 'createTime', hideInSearch: true },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 200,
      fixed: 'right',
      render: (dom, Data) => [
        <a key={`${Data.id}detail`} onClick={() => openActivityDetailModal(Data)}>
          查看
        </a>,
        <Popconfirm
          key={`${Data.id}del`}
          title="确认删除该活动吗？"
          placement="topRight"
          onConfirm={() => deleteActivityInfo([Data.id])}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  const getActivityList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'oaCommunity/getActivityList',
        payload: { ...params },
        resolve,
      });
    });

  const deleteActivityInfo = ids => {
    dispatch({
      type: 'oaCommunity/deleteActivity',
      payload: {
        ids,
      },
    });
  };

  return (
    <ProTable
      rowKey="id"
      headerTitle="活动信息"
      actionRef={tableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getActivityList(params)}
      columns={columns}
      toolBarRender={(_, { selectedRowKeys }) => [
        selectedRowKeys && selectedRowKeys.length && (
          <Button
            onClick={() => {
              Modal.confirm({
                title: '确认批量删除活动信息？',
                content: '一旦确定将无法恢复',
                onOk: () => {
                  deleteActivityInfo(selectedRowKeys);
                },
              });
            }}
          >
            批量删除
          </Button>
        ),
      ]}
    />
  );
};

export default connect(({ oaCommunity }) => ({
  oaCommunity,
}))(Table);
