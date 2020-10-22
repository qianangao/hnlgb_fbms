import React, { useEffect } from 'react';
import { Button, Popconfirm, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({
  openActivityModifyModal,
  oaVolunteerTeam,
  dispatch,
  opendetailActivityModal,
  openRegisteredModal,
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
      title: `主题`,
      align: 'center',
      dataIndex: 'activityName',
    },
    {
      title: `所属团队`,
      align: 'center',
      dataIndex: 'teamName',
      hideInSearch: true,
    },

    {
      title: publishStatus === 0 ? '保存时间' : '发布时间',
      valueType: 'date',
      align: 'center',
      dataIndex: publishStatus === 0 ? 'gmtCreate' : 'releaseTime',
      hideInSearch: true,
    },

    {
      title: publishStatus === 0 ? '保存单位' : '发布单位',
      align: 'center',
      dataIndex: publishStatus === 0 ? 'organizationName' : 'releaseOrganizationName',
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
              openActivityModifyModal(Data);
            }}
          >
            编辑
          </a>
        ) : (
          <a
            key={`${Data.id}detail`}
            onClick={() => {
              opendetailActivityModal(Data);
            }}
          >
            详情
          </a>
        ),
        publishStatus === 1 ? (
          <a
            key={`${Data.id}up`}
            onClick={() => {
              openRegisteredModal(Data);
            }}
          >
            报名列表
          </a>
        ) : (
          ''
        ),
        <Popconfirm
          key={`${Data.id}del`}
          title="确认删除？"
          placement="topRight"
          onConfirm={() => deleteActivity([Data.id])}
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
  const getList = params => {
    return new Promise(resolve => {
      dispatch({
        type: 'oaVolunteerTeam/getActivityList',
        payload: { ...params, publishState: publishStatus },
        resolve,
      });
    });
  };

  // 删除
  const deleteActivity = ids => {
    dispatch({
      type: 'oaVolunteerTeam/deleteActivity',
      payload: {
        ids,
      },
    });
  };

  return (
    <ProTable
      rowKey="id"
      headerTitle="团队活动信息"
      actionRef={tableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getList(params)}
      toolBarRender={(_, { selectedRowKeys }) => [
        selectedRowKeys && selectedRowKeys.length && (
          <Button
            onClick={() => {
              Modal.confirm({
                title: '确认批量删除？',
                content: '一旦确定将无法恢复',
                onOk: () => {
                  deleteActivity(selectedRowKeys);
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

export default connect(({ oaVolunteerTeam }) => ({
  oaVolunteerTeam,
}))(Table);
