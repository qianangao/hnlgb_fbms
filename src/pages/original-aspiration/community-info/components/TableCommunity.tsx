import React from 'react';
import ProTable from '@ant-design/pro-table';
import { Button, Popconfirm, Modal } from 'antd';
import { connect } from 'umi';

const Table = ({
  oaCommunity,
  dispatch,
  openDetailModal,
  openModifyModal,
  openAddCommnityModal,
  openAddActivityModal,
  enums,
}) => {
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
    { title: '社团名称', align: 'center', dataIndex: 'clubName' },
    {
      title: '社团类型',
      align: 'center',
      dataIndex: 'dictClubType',
      valueEnum: enums.dictClubType,
      hideInTable: true,
    },
    { title: '发布单位', align: 'center', dataIndex: 'organizationName', hideInSearch: true },
    { title: '发布时间', align: 'center', dataIndex: 'createTime', hideInSearch: true },

    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 200,
      fixed: 'right',
      render: (dom, Data) => [
        <a key={`${Data.id}detail`} onClick={() => openDetailModal(Data)}>
          查看
        </a>,
        <a key={`${Data.id}up`} onClick={() => openModifyModal(Data)}>
          编辑
        </a>,
        <a key={`${Data.id}up`} onClick={() => openAddActivityModal(Data.id)}>
          发布活动
        </a>,
        <Popconfirm
          key={`${Data.id}del`}
          title="确认删除该社团吗？"
          placement="topRight"
          onConfirm={() => deleteCommunityInfo([Data.id])}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  const getCommunityList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'oaCommunity/getCommunityList',
        payload: { ...params },
        resolve,
      });
    });

  const deleteCommunityInfo = ids => {
    dispatch({
      type: 'oaCommunity/deleteCommunity',
      payload: {
        ids,
      },
    });
  };

  return (
    <ProTable
      rowKey="id"
      headerTitle="社团信息"
      actionRef={tableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getCommunityList(params)}
      columns={columns}
      toolBarRender={(_, { selectedRowKeys }) => [
        <Button
          type="primary"
          onClick={() => {
            openAddCommnityModal();
          }}
        >
          新增
        </Button>,
        selectedRowKeys && selectedRowKeys.length && (
          <Button
            onClick={() => {
              Modal.confirm({
                title: '确认批量删除社团？',
                content: '一旦确定将无法恢复',
                onOk: () => {
                  deleteCommunityInfo(selectedRowKeys);
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

export default connect(({ oaCommunity, global }) => ({
  oaCommunity,
  enums: global.enums,
}))(Table);
