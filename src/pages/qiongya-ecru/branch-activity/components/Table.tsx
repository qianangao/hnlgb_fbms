import { Button, Popconfirm, Modal } from 'antd';
import React, { useEffect } from 'react';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({
  openAddModal,
  openModifyModal,
  branchActivity,
  dispatch,
  opendetailModal,
  publishState,
  tableType,
  openCommentModal,
}) => {
  const { tableRef } = branchActivity;
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
      title: `活动名称`,
      align: 'center',
      dataIndex: 'activityName',
    },
    {
      title: '活动时间',
      align: 'center',
      valueType: 'date',
      dataIndex: 'activityDate',
      hideInSearch: true,
    },
    {
      title: '活动地点',
      align: 'center',
      dataIndex: 'activityAdd',
      hideInSearch: true,
    },
    {
      title: '主持人',
      align: 'center',
      dataIndex: 'host',
      hideInSearch: true,
    },
    {
      title: '支部名称',
      align: 'center',
      dataIndex: 'partyName',
    },
    {
      title: publishState === 0 ? '保存时间' : '发布时间',
      valueType: 'date',
      align: 'center',
      dataIndex: publishState === 0 ? 'gmtCreate' : 'releaseTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 180,
      fixed: 'right',
      render: (dom, employeeData) => [
        publishState === 0
          ? [
              <a
                key={`${employeeData.id}up`}
                onClick={() => {
                  openModifyModal(employeeData);
                }}
              >
                编辑活动
              </a>,
            ]
          : [
              <a
                key={`${employeeData.id}up`}
                onClick={() => {
                  opendetailModal(employeeData);
                }}
              >
                查看活动
              </a>,
              <a
                key={`${employeeData.id}check`}
                onClick={() => {
                  openCommentModal(employeeData);
                }}
              >
                查看评论
              </a>,
            ],
        <Popconfirm
          key={`${employeeData.id}del`}
          title="确认删除支部活动吗？"
          placement="topRight"
          onConfirm={() => deleteBranchActivity([employeeData.id])}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  useEffect(() => {
    tableRef.current && tableRef.current.reloadAndRest();
  }, [tableType]);

  // 列表
  const branchActivityList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'branchActivity/branchActivityList',
        payload: { ...params, publishState, dictOrgLife: tableType },
        resolve,
      });
    });
  // 删除
  const deleteBranchActivity = ids => {
    dispatch({
      type: 'branchActivity/deleteBranchActivity',
      payload: {
        ids,
      },
    });
  };

  return (
    <ProTable
      rowKey="id"
      headerTitle="支部活动"
      actionRef={tableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => branchActivityList(params)}
      toolBarRender={(_, { selectedRowKeys }) => [
        publishState === 0 ? (
          <Button type="primary" onClick={() => openAddModal()}>
            新增
          </Button>
        ) : null,
        selectedRowKeys && selectedRowKeys.length && (
          <Button
            onClick={() => {
              Modal.confirm({
                title: '确认删除支部活动？',
                content: '一旦确定将无法恢复',
                onOk: () => {
                  deleteBranchActivity(selectedRowKeys);
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
}))(Table);
