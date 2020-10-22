import React, { useEffect } from 'react';
import { Button, Popconfirm, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({
  openAddModal,
  openModifyModal,
  oaElegantDemeanor,
  enums,
  dispatch,
  openDetailModal,
  publishStatus,
}) => {
  const { tableRef } = oaElegantDemeanor;
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
      title: '五老类型',
      align: 'center',
      dataIndex: 'type',
      valueEnum: enums.dictFiveOldType,
      hideInTable: true,
    },

    {
      title: publishStatus === 0 ? '保存时间' : '发布时间',
      valueType: 'date',
      align: 'center',
      dataIndex: publishStatus === 0 ? 'createTime' : 'pushTime',
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
              openDetailModal(Data);
            }}
          >
            详情
          </a>
        ),
        <Popconfirm
          key={`${Data.id}del`}
          title="确认删除该五老风采？"
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

  // 列表
  const getEmployeeList = params => {
    return new Promise(resolve => {
      dispatch({
        type: 'oaElegantDemeanor/getElegantDemeanorList',
        payload: { ...params, pushStatus: publishStatus },
        resolve,
      });
    });
  };

  // 删除
  const deleteReturnworkPerson = ids => {
    dispatch({
      type: 'oaElegantDemeanor/deleteElegantDemeanor',
      payload: {
        ids,
      },
    });
  };

  return (
    <ProTable
      rowKey="id"
      headerTitle="五老风采信息"
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
                title: '确认批量删除五老风采？',
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

export default connect(({ oaElegantDemeanor, global }) => ({
  oaElegantDemeanor,
  enums: global.enums,
}))(Table);
