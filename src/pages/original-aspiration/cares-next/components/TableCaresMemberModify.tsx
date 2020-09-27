import React from 'react';
import ProTable from '@ant-design/pro-table';
import { Popconfirm, Button, Modal } from 'antd';
import { connect } from 'umi';

const TableCaresMember = ({
  oaCaresNext,
  dispatch,
  id,
  openMemberModifyModel,
  openMemberAddModal,
  enums,
}) => {
  const { tableRef } = oaCaresNext;

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 64,
    },
    { title: '姓名', align: 'center', dataIndex: 'memberName' },
    { title: '性别', align: 'center', dataIndex: 'dictSex', valueEnum: enums.dictSex },
    { title: '联系电话', align: 'center', dataIndex: 'phoneNumber' },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 200,
      fixed: 'right',
      render: (dom, Data) => [
        <a key={`${Data.id}up`} onClick={() => openMemberModifyModel(Data)}>
          编辑
        </a>,
        <Popconfirm
          key={`${Data.id}del`}
          title="确认删除该成员吗？"
          placement="topRight"
          onConfirm={() => deleteMember([Data.id])}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  const getMemberList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'oaCaresNext/getMemberList',
        payload: { ...params, mechanismId: id },
        resolve,
      });
    });

  const deleteMember = ids => {
    dispatch({
      type: 'oaCaresNext/deleteMember',
      payload: {
        ids,
      },
    });
  };

  return (
    <ProTable
      headerTitle="成员"
      rowKey="id"
      actionRef={tableRef}
      rowSelection={[]}
      options={false}
      search={false}
      scroll={{ x: 'max-content' }}
      request={async params => getMemberList(params)}
      columns={columns}
      toolBarRender={(_, { selectedRowKeys }) => [
        selectedRowKeys && selectedRowKeys.length && (
          <Button
            onClick={() => {
              Modal.confirm({
                title: '确认批量删除？',
                content: '一旦确定将无法恢复',
                onOk: () => {
                  deleteMember(selectedRowKeys);
                },
              });
            }}
          >
            批量删除
          </Button>
        ),
        <Button
          type="primary"
          onClick={() => {
            openMemberAddModal();
          }}
        >
          新增成员
        </Button>,
      ]}
    />
  );
};

export default connect(({ oaCaresNext, global }) => ({
  oaCaresNext,
  enums: global.enums,
}))(TableCaresMember);
