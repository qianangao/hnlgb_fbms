import { Button, Popconfirm, Modal } from 'antd';
import React from 'react';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const CommentTable = ({ branchActivity, dispatch, activityId, enums }) => {
  const { commentTableRef } = branchActivity;
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
      width: 100,
      fixed: 'right',
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
      render: (dom, employeeData) => [
        <Popconfirm
          key={`${employeeData.id}app`}
          title="确认审该评论信息吗？"
          placement="topRight"
          okText="通过"
          cancelText="不通过"
          onConfirm={() => {
            commentAudit(employeeData.id, 1);
          }}
          onCancel={() => {
            commentAudit(employeeData.id, 2);
          }}
        >
          <a>审核</a>
        </Popconfirm>,
        <Popconfirm
          key={`${employeeData.id}del`}
          title="确认删除评论吗？"
          placement="topRight"
          onConfirm={() => deleteComment([employeeData.id])}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  // 列表
  const branchActivityList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'branchActivity/getCommentList',
        payload: { ...params, activityId },
        resolve,
      });
    });
  // 删除
  const deleteComment = ids => {
    dispatch({
      type: 'branchActivity/deleteComment',
      payload: {
        ids,
      },
    });
  };
  // 审核
  const commentAudit = (id, commentStatus) => {
    const auditId = [id];
    dispatch({
      type: 'branchActivity/commentAudit',
      payload: {
        ids: auditId,
        commentStatus,
      },
    });
  };
  return (
    <ProTable
      rowKey="id"
      actionRef={commentTableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => branchActivityList(params)}
      toolBarRender={(_, { selectedRowKeys }) => [
        selectedRowKeys && selectedRowKeys.length && (
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
          </Button>
        ),
      ]}
      columns={columns}
    />
  );
};

export default connect(({ branchActivity, global }) => ({
  branchActivity,
  enums: global.enums,
}))(CommentTable);
