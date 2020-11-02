import React from 'react';
import { Button, Popconfirm, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({
  openAddModal,
  openModifyModal,
  openDetailModal,
  openModifyUnitModal,
  openAddSilhouetteModal,
  openRegisteredModal,
  activityCenter,
  dispatch,
  publishStatus,
}) => {
  const { tableRef } = activityCenter;
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
      title: '活动中心名称',
      align: 'center',
      dataIndex: 'title',
    },
    {
      title: '活动中心地址',
      align: 'center',
      dataIndex: 'coreAdd',
      hideInSearch: true,
    },
    {
      title: '所属单位',
      align: 'center',
      dataIndex: 'createOrgName',
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
        publishStatus === 0 && (
          <a
            key={`${data.id}up`}
            onClick={() => {
              openModifyModal(data);
            }}
          >
            编辑活动
          </a>
        ),
        publishStatus === 0 && (
          <a
            key={`${data.id}upUnit`}
            onClick={() => {
              openModifyUnitModal(data);
            }}
          >
            编辑单位
          </a>
        ),
        publishStatus === 1 && (
          <a
            key={`${data.id}detail`}
            onClick={() => {
              // 入参1：活动id；入参2：1：代表活动详情，2：代表剪影详情
              openDetailModal(data.id, '1');
            }}
          >
            详情
          </a>
        ),
        publishStatus === 1 && (
          <a
            key={`${data.id}detail`}
            onClick={() => {
              openRegisteredModal(data.id);
            }}
          >
            报名列表
          </a>
        ),
        publishStatus === 1 && data.isSilhouette === 1 && (
          <a
            key={`${data.id}detail`}
            onClick={() => {
              openDetailModal(data.id, '2');
            }}
          >
            查看剪影
          </a>
        ),
        publishStatus === 1 && data.isSilhouette === 0 && (
          <a
            key={`${data.id}detail`}
            onClick={() => {
              openAddSilhouetteModal(data.id);
            }}
          >
            发布剪影
          </a>
        ),
        <Popconfirm
          key={`${data.id}del`}
          title="确认删除该活动中心吗？"
          placement="topRight"
          onConfirm={() => deleteReturnworkPerson([data.id])}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  // 列表
  const getActivityCenterList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'activityCenter/activityCenterInfoList',
        payload: { ...params, pushStatus: publishStatus },
        resolve,
      });
    });
  const deleteReturnworkPerson = ids => {
    dispatch({
      type: 'activityCenter/deleteActivityCenterInfo',
      payload: {
        ids,
      },
    });
  };
  return (
    <ProTable
      rowKey="id"
      headerTitle="活动中心"
      actionRef={tableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getActivityCenterList(params)}
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
                title: '确认删除选择活动中心信息？',
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

export default connect(({ activityCenter, global }) => ({
  activityCenter,
  enums: global.enums,
}))(Table);
