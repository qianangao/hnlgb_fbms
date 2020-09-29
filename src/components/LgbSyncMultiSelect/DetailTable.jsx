import React from 'react';
import { Button, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const DetailTable = ({ enums, actionRef, openAddModal, reloadDataHandler, getLgbs, deleteLgb }) => {
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 64,
    },
    { title: '姓名', align: 'center', dataIndex: 'realName' },
    {
      title: '工作单位',
      align: 'center',
      dataIndex: 'organizationName',
      hideInSearch: true,
    },
    {
      title: '手机号码',
      align: 'center',
      dataIndex: 'phonenumber',
      hideInSearch: true,
    },
    {
      title: '政治面貌',
      align: 'center',
      dataIndex: 'dictPoliticalStatus',
      valueEnum: enums.dictPoliticalStatus,
      hideInSearch: true,
    },
  ];
  const getLgbList = params => {
    return getLgbs(params);
  };

  const deleteItems = keys => {
    const params = { userIds: keys };
    deleteLgb &&
      deleteLgb(params).then(_ => {
        reloadDataHandler();
      });
  };

  return (
    <ProTable
      rowKey="id"
      headerTitle="人员列表"
      search={false}
      actionRef={actionRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getLgbList(params)}
      toolBarRender={(_, { selectedRowKeys }) => [
        <Button type="primary" onClick={() => openAddModal()}>
          新增
        </Button>,
        selectedRowKeys && selectedRowKeys.length && (
          <Button
            onClick={() => {
              Modal.confirm({
                title: '确认删除选择人员？',
                content: '一旦确定将无法恢复',
                onOk: () => {
                  deleteItems(selectedRowKeys);
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

export default connect(({ global }) => ({
  enums: global.enums,
}))(DetailTable);
