import React, { useEffect } from 'react';
import { Button, Popconfirm, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({
  openAddModal,
  openModifyModal,
  oaVolunteerTeam,
  enums,
  dispatch,
  opendetailModal,
  tableType,
  publishStatus,
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
    {
      title: `标题`,
      align: 'center',
      dataIndex: 'title',
    },
    {
      title: '事迹分类',
      align: 'center',
      dataIndex: tableType === 'personal' ? 'dictPerson' : 'dictUnit',
      valueEnum: tableType === 'personal' ? enums.dictPerson : enums.dictUnit,
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
      render: (dom, Data) => [
        publishStatus === 0 ? (
          <a
            key={`${Data.id}up`}
            onClick={() => {
              openModifyModal(Data);
            }}
          >
            编辑
          </a>
        ) : (
          <a
            key={`${Data.id}detail`}
            onClick={() => {
              opendetailModal(Data);
            }}
          >
            详情
          </a>
        ),
        <Popconfirm
          key={`${Data.id}del`}
          title="确认删除该事迹信息？"
          placement="topRight"
          onConfirm={() => deleteReturnworkPerson([Data.id])}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  useEffect(() => {
    tableRef.current && tableRef.current.reloadAndRest();
  }, [publishStatus]);
  useEffect(() => {
    tableRef.current && tableRef.current.reloadAndRest();
  }, [tableType]);

  // 列表
  const getDeedsList = params => {
    return new Promise(resolve => {
      dispatch({
        type:
          tableType === 'personal'
            ? 'oaVolunteerTeam/getPersonalList'
            : 'oaVolunteerTeam/getCollectiveList',
        payload: { ...params, isPublished: publishStatus },
        resolve,
      });
    });
  };

  // 删除
  const deleteReturnworkPerson = ids => {
    dispatch({
      type:
        tableType === 'personal'
          ? 'oaVolunteerTeam/deletePersonal'
          : 'oaVolunteerTeam/deleteCollective',
      payload: {
        ids,
      },
    });
  };

  return (
    <ProTable
      rowKey="id"
      headerTitle={tableType === 'personal' ? '基本志愿服务信息' : '专项志愿服务信息'}
      actionRef={tableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getDeedsList(params)}
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
                title: '确认批量删除事迹信息？',
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

export default connect(({ oaVolunteerTeam, global }) => ({
  oaVolunteerTeam,
  enums: global.enums,
}))(Table);
