import React, { useEffect } from 'react';
import { Button, Popconfirm, Modal, Badge } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({
  openAddModal,
  openModifyModal,
  oaActivityHome,
  enums,
  dispatch,
  opendetailModal,
  openCommentModal,
  publishStatus,
}) => {
  const { tableRef } = oaActivityHome;
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
      title: `标题`,
      align: 'center',
      dataIndex: 'activityTitle',
    },
    {
      title: '活动分类',
      align: 'center',
      dataIndex: 'dictActivityClassification',
      valueEnum: enums.dictActivityClassification,
      hideInTable: true,
    },

    {
      title: publishStatus === 0 ? '保存时间' : '发布时间',
      valueType: 'date',
      align: 'center',
      dataIndex: publishStatus === 0 ? 'updateTime' : 'pushTime',
      hideInSearch: true,
    },

    {
      title: publishStatus === 0 ? '保存人' : '发布单位',
      align: 'center',
      dataIndex: publishStatus === 0 ? 'realName' : 'organizationName',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 180,
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
              opendetailModal(data);
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
          title="确认删除该活动信息？"
          placement="topRight"
          onConfirm={() => deleteReturnworkPerson([data.id])}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  useEffect(() => {
    tableRef.current && tableRef.current.reloadAndRest();
  }, [publishStatus]);

  // 列表
  const getEmployeeList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'oaActivityHome/getActivityList',
        payload: { ...params, isPublished: publishStatus },
        resolve,
      });
    });
  // 删除
  const deleteReturnworkPerson = ids => {
    dispatch({
      type: 'oaActivityHome/deleteActivity',
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
      request={async params => getEmployeeList(params)}
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
                title: '确认批量删除活动信息？',
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

export default connect(({ oaActivityHome, global }) => ({
  oaActivityHome,
  enums: global.enums,
}))(Table);
