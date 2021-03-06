import React from 'react';
import { Button, Popconfirm, Modal, Badge } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({
  openAddModal,
  openModifyModal,
  lifeService,
  dispatch,
  openDetailModal,
  openCommentModal,
  enums,
  publishStatus,
}) => {
  const { tableRef } = lifeService;
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
      title: '类型',
      align: 'center',
      dataIndex: 'type',
      valueEnum: enums.dictLifeServiceType,
      hideInSearch: true,
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
      width: 200,
      fixed: 'right',
      render: (dom, data) => [
        publishStatus === 0 ? (
          <a
            key={`${data.id}up`}
            onClick={() => {
              openModifyModal(data);
            }}
          >
            编辑
          </a>
        ) : (
          <a
            key={`${data.id}detail`}
            onClick={() => {
              openDetailModal(data);
            }}
          >
            详情
          </a>
        ),
        publishStatus === 1 && (
          <a
            key={`${data.id}audit`}
            style={{ marginRight: 25 }}
            onClick={() => {
              openCommentModal(data.id);
            }}
          >
            <Badge count={data.commentNum} offset={[10, 0]}>
              审核评论
            </Badge>
          </a>
        ),
        <Popconfirm
          key={`${data.id}del`}
          title="确认删除该生活服务吗？"
          placement="topRight"
          onConfirm={() => deleteReturnworkPerson([data.id])}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  // 列表
  const getLifeServiceList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'lifeService/lifeServiceInfoList',
        payload: { ...params, pushStatus: publishStatus },
        resolve,
      });
    });
  const deleteReturnworkPerson = ids => {
    dispatch({
      type: 'lifeService/deleteLifeServiceInfo',
      payload: {
        ids,
      },
    });
  };
  return (
    <ProTable
      rowKey="id"
      headerTitle="生活服务"
      actionRef={tableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getLifeServiceList(params)}
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
                title: '确认删除选择生活服务信息？',
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

export default connect(({ lifeService, global }) => ({
  lifeService,
  enums: global.enums,
}))(Table);
