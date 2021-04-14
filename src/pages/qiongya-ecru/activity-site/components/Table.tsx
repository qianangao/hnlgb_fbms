import React from 'react';
import { Button, Popconfirm, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({ qeActivitySite, openModifyModal, dispatch }) => {
  const { tableRef } = qeActivitySite;

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 64,
    },
    { title: '地点名称', align: 'center', dataIndex: 'name' },
    { title: '地点地址', align: 'center', dataIndex: 'address', hideInSearch: true },
    { title: '备注', align: 'center', dataIndex: 'remarks', hideInSearch: true },
    {
      title: '是否共享',
      align: 'center',
      dataIndex: 'isShare',
      valueEnum: {
        0: '否',
        1: '共享',
      },
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 180,
      fixed: 'right',
      render: (dom, siteData) => [
        <a key={`${siteData.id}up`} onClick={() => openModifyModal(siteData)}>
          编辑
        </a>,
        <Popconfirm
          key={`${siteData.id}del`}
          title="确认删除该活动地点吗？该操作不可恢复"
          placement="topRight"
          onConfirm={() => deleteSites([siteData.id])}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  const getSiteList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'qeActivitySite/getList',
        payload: { ...params },
        resolve,
      });
    });

  const deleteSites = ids => {
    dispatch({
      type: 'qeActivitySite/deleteSites',
      payload: {
        ids,
      },
    });
  };

  return (
    <ProTable
      rowKey="id"
      headerTitle="活动地点信息"
      actionRef={tableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getSiteList(params)}
      toolBarRender={(_, { selectedRowKeys }) => [
        <Button type="primary" onClick={() => openModifyModal()}>
          新增
        </Button>,
        selectedRowKeys && selectedRowKeys.length && (
          <Button
            onClick={() => {
              Modal.confirm({
                title: '确认删除所选择活动地点？该操作不可恢复',
                onOk: () => {
                  deleteSites(selectedRowKeys);
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

export default connect(({ qeActivitySite, global }) => ({
  qeActivitySite,
  enums: global.enums,
}))(Table);
