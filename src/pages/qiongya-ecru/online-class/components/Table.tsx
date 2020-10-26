import React from 'react';
import { Button, Popconfirm, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({ openAddModal, openModifyModal, onlineClass, dispatch, tableType }) => {
  const { tableRef } = onlineClass;
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
      dataIndex: 'name',
    },
    {
      title: '缩略图url地址',
      align: 'center',
      dataIndex: 'cephFile',
      hideInSearch: true,
      render: text => {
        return (
          text && (
            <a title={text.fileUrl} href={text} target="_blank" rel="noopener noreferrer">
              {text.fileUrl}
            </a>
          )
        );
      },
    },
    {
      title: '网络链接地址',
      align: 'center',
      dataIndex: 'url',
      hideInSearch: true,
      render: text => {
        return (
          <a title={text} href={text} target="_blank" rel="noopener noreferrer">
            {text}
          </a>
        );
      },
    },
    {
      title: '发布单位',
      align: 'center',
      dataIndex: 'releaseDepartmentName',
      hideInSearch: true,
    },
    {
      title: '发布时间',
      valueType: 'date',
      align: 'center',
      dataIndex: 'publishTime',
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
        <a
          key={`${employeeData.id}up`}
          onClick={() => {
            openModifyModal(employeeData);
          }}
        >
          编辑
        </a>,
        <Popconfirm
          key={`${employeeData.id}del`}
          title="确认删除网络课堂吗？"
          placement="topRight"
          onConfirm={() => deleteOnlineClass([employeeData.id])}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  // 列表
  const onlineClassList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'onlineClass/onlineClassList',
        payload: { ...params, type: tableType },
        resolve,
      });
    });
  // 删除
  const deleteOnlineClass = ids => {
    dispatch({
      type: 'onlineClass/deleteOnlineClass',
      payload: {
        ids,
      },
    });
  };

  return (
    <ProTable
      rowKey="id"
      headerTitle="网络课堂"
      actionRef={tableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => onlineClassList(params)}
      toolBarRender={(_, { selectedRowKeys }) => [
        <Button type="primary" onClick={() => openAddModal()}>
          新增
        </Button>,
        selectedRowKeys && selectedRowKeys.length && (
          <Button
            onClick={() => {
              Modal.confirm({
                title: '确认删除网络课堂？',
                content: '一旦确定将无法恢复',
                onOk: () => {
                  deleteOnlineClass(selectedRowKeys);
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

export default connect(({ onlineClass, global }) => ({
  onlineClass,
  enums: global.enums,
}))(Table);
