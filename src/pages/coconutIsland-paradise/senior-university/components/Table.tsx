import React from 'react';
import { Button, Popconfirm, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({ openAddModal, openModifyModal, seniorUniversity, dispatch }) => {
  const { tableRef } = seniorUniversity;
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
      title: '大学名称',
      align: 'center',
      dataIndex: 'universityName',
    },
    {
      title: '大学网址',
      align: 'center',
      dataIndex: 'url',
      width: 200,
      hideInSearch: true,
      render: text => (
        <a rel="noopener noreferrer" target="_blank" href={text}>
          {text}
        </a>
      ),
    },
    {
      title: '大学地址',
      align: 'center',
      dataIndex: 'address',
      hideInSearch: true,
    },
    {
      title: '联系电话',
      align: 'center',
      dataIndex: 'phone',
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
        <a
          key={`${Data.id}up`}
          onClick={() => {
            openModifyModal(Data);
          }}
        >
          编辑
        </a>,
        <Popconfirm
          key={`${Data.id}del`}
          title="确认删除该老年大学吗？"
          placement="topRight"
          onConfirm={() => deleteReturnworkPerson([Data.id])}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  // 列表
  const getSeniorUniversityList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'seniorUniversity/seniorUniversityInfoList',
        payload: { ...params },
        resolve,
      });
    });
  const deleteReturnworkPerson = ids => {
    dispatch({
      type: 'seniorUniversity/deleteSeniorUniversityInfo',
      payload: {
        ids,
      },
    });
  };
  return (
    <ProTable
      rowKey="id"
      headerTitle="老年大学"
      actionRef={tableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getSeniorUniversityList(params)}
      toolBarRender={(_, { selectedRowKeys }) => [
        <Button type="primary" onClick={() => openAddModal()}>
          新增
        </Button>,
        selectedRowKeys && selectedRowKeys.length && (
          <Button
            onClick={() => {
              Modal.confirm({
                title: '确认删除选择老年大学信息？',
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

export default connect(({ seniorUniversity }) => ({
  seniorUniversity,
}))(Table);
