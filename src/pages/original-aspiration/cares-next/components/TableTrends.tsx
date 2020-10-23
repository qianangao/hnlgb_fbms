import React from 'react';
import ProTable from '@ant-design/pro-table';
import { Button, Popconfirm, Modal } from 'antd';
import { connect } from 'umi';

const Table = ({ oaCaresNext, openTrendsDetailModal, dispatch }) => {
  const { tableRef } = oaCaresNext;

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
    { title: '所属组织', align: 'center', dataIndex: 'mechanismName', hideInSearch: true },
    { title: '发布时间', align: 'center', dataIndex: 'createTime', hideInSearch: true },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 200,
      fixed: 'right',
      render: (dom, employeeData) => [
        <a key={`${employeeData.id}detail`} onClick={() => openTrendsDetailModal(employeeData)}>
          查看
        </a>,
        <Popconfirm
          key={`${employeeData.id}del`}
          title="确认删除该动态吗？"
          placement="topRight"
          onConfirm={() => deleteTrendsInfo([employeeData.id])}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  const getList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'oaCaresNext/getTrendsList',
        payload: { ...params },
        resolve,
      });
    });

  const deleteTrendsInfo = ids => {
    dispatch({
      type: 'oaCaresNext/deleteTrends',
      payload: {
        ids,
      },
    });
  };

  return (
    <ProTable
      headerTitle="关工动态信息"
      rowKey="id"
      actionRef={tableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getList(params)}
      columns={columns}
      toolBarRender={(_, { selectedRowKeys }) => [
        selectedRowKeys && selectedRowKeys.length && (
          <Button
            onClick={() => {
              Modal.confirm({
                title: '确认批量删除？',
                content: '一旦确定将无法恢复',
                onOk: () => {
                  deleteTrendsInfo(selectedRowKeys);
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

export default connect(({ oaCaresNext }) => ({
  oaCaresNext,
}))(Table);
