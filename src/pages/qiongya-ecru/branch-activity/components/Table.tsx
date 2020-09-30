import React from 'react';
import { Button, Popconfirm, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({
  openAddModal,
  openModifyModal,
  branchActivity,
  dispatch,
  opendetailModal,
  publishStatus,
  tableType,
  enums,
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
      dataIndex: 'activityNoticeName',
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
      valueEnum: enums.dictNation,
    },
    {
      title: publishStatus === 0 ? '保存时间' : '发布时间',
      valueType: 'date',
      align: 'center',
      dataIndex: publishStatus === 0 ? 'createTime' : 'releaseTime',
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
        publishStatus === 0 ? (
          <a
            key={`${employeeData.id}up`}
            onClick={() => {
              openModifyModal(employeeData);
            }}
          >
            编辑
          </a>
        ) : (
          <a
            key={`${employeeData.id}up`}
            onClick={() => {
              opendetailModal(employeeData);
            }}
          >
            查看
          </a>
        ),
        <Popconfirm
          key={`${employeeData.id}del`}
          title="确认删除支部活动吗？"
          placement="topRight"
          onConfirm={() => deleteReturnworkPerson([employeeData.id])}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  // 列表
  const getEmployeeList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'branchActivity/branchActivityList',
        payload: { ...params, publishState: publishStatus, dictActivityChildType: tableType },
        resolve,
      });
    });
  // 删除
  const deleteReturnworkPerson = ids => {
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
                title: '确认删除支部活动？',
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

export default connect(({ branchActivity, global }) => ({
  branchActivity,
  enums: global.enums,
}))(Table);
