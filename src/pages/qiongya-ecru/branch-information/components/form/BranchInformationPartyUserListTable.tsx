import React from 'react';
import ProTable from '@ant-design/pro-table';
import { Popconfirm, Button, Modal } from 'antd';
import { connect } from 'umi';

const BranchInformationPartyUserListTable = ({
  branchInformation,
  dispatch,
  id,
  openAddPartyModal,
  enums,
}) => {
  const { tableRef } = branchInformation;

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
      render: (dom, employeeData) => [
        <Popconfirm
          key={`${employeeData.id}del`}
          title="确认删除该成员吗？"
          placement="topRight"
          onConfirm={() => deleteMember([employeeData.id])}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  const getPartyUserList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'branchInformation/partyUserList',
        payload: { ...params, id },
        resolve,
      });
    });

  const deleteMember = ids => {
    dispatch({
      type: 'branchInformation/deleteMember',
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
      request={async params => getPartyUserList(params)}
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
            openAddPartyModal();
          }}
        >
          新增成员
        </Button>,
      ]}
    />
  );
};

export default connect(({ branchInformation, global }) => ({
  branchInformation,
  enums: global.enums,
}))(BranchInformationPartyUserListTable);
