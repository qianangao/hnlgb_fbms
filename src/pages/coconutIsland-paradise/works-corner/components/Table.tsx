import React from 'react';
import { Button, Popconfirm, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({
  openAddModal,
  openModifyModal,
  worksCorner,
  dispatch,
  openDetailModal,
  enums,
  publishStatus,
}) => {
  const { tableRef } = worksCorner;
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
      dataIndex: 'headline',
    },
    {
      title: '作品类别',
      align: 'center',
      dataIndex: 'type',
      valueEnum: enums.dictWorkCornerType,
    },
    {
      title: '发布时间',
      valueType: 'date',
      align: 'center',
      dataIndex: 'releaseTime',
      hideInSearch: true,
    },
    {
      title: '审核人',
      align: 'center',
      dataIndex: 'approver',
      hideInSearch: true,
    },
    {
      title: '审核状态',
      align: 'center',
      dataIndex: 'dictApproveStatus',
      fixed: 'right',
      valueEnum: {
        0: { text: '待审核', status: 'Processing' },
        1: { text: '审核通过', status: 'Success' },
        2: { text: '审核不通过', status: 'Error' },
      },
      hideInSearch: true,
    },
    {
      title: '审核状态',
      align: 'center',
      dataIndex: 'approveStatus',
      valueEnum: {
        0: { text: '待审核' },
        1: { text: '审核通过' },
        2: { text: '审核不通过' },
      },
      hideInTable: true,
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 180,
      fixed: 'right',
      render: (dom, employeeData) => [
        <a
          key={`${employeeData.id}up`}
          onClick={() => {
            openDetailModal(employeeData);
          }}
        >
          详情
        </a>,

        <Popconfirm
          key={`${employeeData.id}app`}
          title="确认审批该作品吗？"
          placement="topRight"
          okText="通过"
          cancelText="驳回"
          onConfirm={() => {
            approval(employeeData.id, 1);
          }}
          onCancel={() => {
            approval(employeeData.id, 2);
          }}
        >
          <a>审批作品</a>
        </Popconfirm>,

        <a
          key={`${employeeData.id}audit`}
          onClick={() => {
            openModifyModal(employeeData);
          }}
        >
          审核评论
        </a>,
      ],
    },
  ];

  // 列表
  const getWorksCornerList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'worksCorner/worksCornerInfoList',
        payload: { ...params, status: publishStatus },
        resolve,
      });
    });

  const approval = (id, status) => {
    dispatch({
      type: 'worksCorner/approval',
      payload: {
        id,
        status,
      },
    });
  };
  const deleteReturnworkPerson = ids => {
    dispatch({
      type: 'worksCorner/deleteWorksCornerInfo',
      payload: {
        ids,
      },
    });
  };
  return (
    <ProTable
      rowKey="id"
      headerTitle="作品园地"
      actionRef={tableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getWorksCornerList(params)}
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
                title: '确认删除选择作品园地信息？',
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

export default connect(({ worksCorner, global }) => ({
  worksCorner,
  enums: global.enums,
}))(Table);
