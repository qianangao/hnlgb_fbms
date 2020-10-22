import React from 'react';
import ProTable from '@ant-design/pro-table';
import { Button, Popconfirm, Modal } from 'antd';
import { connect } from 'umi';

const Table = ({
  oaVolunteerTeam,
  dispatch,
  openModifyModal,
  openAddModal,
  openAddActivityModal,
  openMembersModifyModal,
}) => {
  const { tableRef } = oaVolunteerTeam;

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 64,
    },
    { title: '团队名称', align: 'center', dataIndex: 'teamName' },

    { title: '创建时间', align: 'center', dataIndex: 'createDate', hideInSearch: true },
    { title: '创建单位', align: 'center', dataIndex: 'createOrgName', hideInSearch: true },
    { title: '成员数', align: 'center', dataIndex: 'signUpNumCurrent', hideInSearch: true },

    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 200,
      fixed: 'right',
      render: (dom, Data) => [
        <a key={`${Data.id}up`} onClick={() => openModifyModal(Data)}>
          编辑团队
        </a>,
        <a key={`${Data.id}detail`} onClick={() => openMembersModifyModal(Data)}>
          查看成员
        </a>,
        <a key={`${Data.id}release`} onClick={() => openAddActivityModal(Data.id)}>
          发布活动
        </a>,
        <Popconfirm
          key={`${Data.id}del`}
          title="确认删除？"
          placement="topRight"
          onConfirm={() => deleteTeamInfo([Data.id])}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  const getList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'oaVolunteerTeam/getTeamList',
        payload: { ...params },
        resolve,
      });
    });

  const deleteTeamInfo = ids => {
    dispatch({
      type: 'oaVolunteerTeam/deleteTeam',
      payload: {
        ids,
      },
    });
  };

  return (
    <ProTable
      rowKey="id"
      headerTitle="志愿团队信息"
      actionRef={tableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getList(params)}
      columns={columns}
      toolBarRender={(_, { selectedRowKeys }) => [
        <Button
          type="primary"
          onClick={() => {
            openAddModal();
          }}
        >
          新增
        </Button>,
        selectedRowKeys && selectedRowKeys.length && (
          <Button
            onClick={() => {
              Modal.confirm({
                title: '确认批量删除？',
                content: '一旦确定将无法恢复',
                onOk: () => {
                  deleteTeamInfo(selectedRowKeys);
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

export default connect(({ oaVolunteerTeam }) => ({
  oaVolunteerTeam,
}))(Table);
