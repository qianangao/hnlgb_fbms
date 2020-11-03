import React from 'react';
import { Button, Popconfirm, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const CommentTable = ({ oaActivityHome, dispatch, id, enums }) => {
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
      title: `姓名`,
      align: 'center',
      dataIndex: 'commentUserName',
    },
    {
      title: '性别',
      align: 'center',
      dataIndex: 'sex',
      valueEnum: enums.dictSex,
      hideInSearch: true,
    },
    {
      title: '出生日期',
      align: 'center',
      valueType: 'date',
      dataIndex: 'dateOfBirth',
      hideInSearch: true,
    },
    {
      title: '现管单位',
      align: 'center',
      dataIndex: 'createOrgName',
      hideInSearch: true,
    },
    {
      title: '评论时间',
      align: 'center',
      valueType: 'date',
      dataIndex: 'createTime',
      hideInSearch: true,
    },
    {
      title: '评论内容',
      align: 'center',
      dataIndex: 'commentContent',
      hideInSearch: true,
    },
    {
      title: '审核状态',
      align: 'center',
      dataIndex: 'commentStatus',
      filters: true,
      valueEnum: {
        2: {
          text: '审核不通过',
          status: 'Error',
        },
        1: {
          text: '审核通过',
          status: 'Success',
        },
        0: {
          text: '待审核',
          status: 'Processing',
        },
      },
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 180,
      fixed: 'right',
      render: (dom, data) => [
        <Popconfirm
          key={`${data.id}app`}
          title="确认审批该评论信息吗？"
          placement="topRight"
          okText="通过"
          cancelText="不通过"
          onConfirm={() => {
            commentAudit([data.id], 1);
          }}
          onCancel={() => {
            commentAudit([data.id], 2);
          }}
        >
          <a>审批</a>
        </Popconfirm>,
        <Popconfirm
          key={`${data.id}del`}
          title="确认删除评论吗？"
          placement="topRight"
          onConfirm={() => deleteComment([data.id])}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  // 列表
  const getCommentList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'oaActivityHome/getCommentList',
        payload: { ...params, activityId: id },
        resolve,
      });
    });
  // 删除
  const deleteComment = ids => {
    dispatch({
      type: 'oaActivityHome/deleteComment',
      payload: {
        ids,
      },
    });
  };
  // 审核
  const commentAudit = (ids, commentStatus) => {
    dispatch({
      type: 'oaActivityHome/commentAudit',
      payload: {
        ids,
        commentStatus,
      },
    });
  };
  return (
    <ProTable
      rowKey="id"
      actionRef={tableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getCommentList(params)}
      toolBarRender={(_, { selectedRowKeys }) => [
        selectedRowKeys &&
          selectedRowKeys.length && [
            <Button
              onClick={() => {
                Modal.confirm({
                  title: '确认删除评论吗？',
                  content: '一旦确定将无法恢复',
                  onOk: () => {
                    deleteComment(selectedRowKeys);
                  },
                });
              }}
            >
              批量删除
            </Button>,
            <Button
              onClick={() => {
                Modal.confirm({
                  title: '确认批量通过评论吗？',
                  onOk: () => {
                    commentAudit(selectedRowKeys, 1);
                  },
                });
              }}
            >
              批量通过
            </Button>,
          ],
      ]}
      columns={columns}
    />
  );
};

export default connect(({ oaActivityHome, global }) => ({
  oaActivityHome,
  enums: global.enums,
}))(CommentTable);
