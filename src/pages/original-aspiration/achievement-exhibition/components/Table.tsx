import React from 'react';
import { Button, Popconfirm, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({
  openAddModal,
  openModifyModal,
  oaAchievementExhibition,
  enums,
  dispatch,
  opendetailModal,
}) => {
  const { tableRef, publishStatus } = oaAchievementExhibition;
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
      dataIndex: 'title',
    },
    {
      title: '成果分类',
      align: 'center',
      dataIndex: 'dictResultType',
      valueEnum: enums.dictResultType,
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
            详情
          </a>
        ),
        <Popconfirm
          key={`${employeeData.id}del`}
          title="确认删除该成果信息？"
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
        type: 'oaAchievementExhibition/getAchievementList',
        payload: { ...params },
        resolve,
      });
    });
  // 删除
  const deleteReturnworkPerson = ids => {
    dispatch({
      type: 'oaAchievementExhibition/deleteAchievement',
      payload: {
        ids,
      },
    });
  };

  return (
    <ProTable
      rowKey="id"
      headerTitle="成果信息"
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
                title: '确认批量删除成果信息？',
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

export default connect(({ oaAchievementExhibition, global }) => ({
  oaAchievementExhibition,
  enums: global.enums,
}))(Table);
