import React from 'react';
import { Button, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const DictionaryTable = ({
  smDictionaryMgt,
  openModifyModal,
  openAddModal,
  dispatch,
  chineseName,
}) => {
  const { tableRef, staffListData1 } = smDictionaryMgt;

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      fixed: 'left',
      width: 64,
    },
    { title: '字典代码', align: 'center', dataIndex: 'name', hideInSearch: true },
    { title: '类型名称', align: 'center', dataIndex: 'chineseName', hideInSearch: true },
    { title: '字段名称', align: 'center', dataIndex: 'remarks', hideInSearch: true },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 180,
      fixed: 'right',
      render: (dom, orgData) => [
        <a key={`${orgData.id}up`} onClick={() => openModifyModal(orgData, 'edit')}>
          编辑
        </a>,
      ],
    },
  ];

  const getStaffList = () =>
    new Promise(resolve => {
      dispatch({
        type: 'smDictionaryMgt/getStaffList1',
        payload: { chineseName },
        resolve,
      });
    });

  return (
    <ProTable
      rowKey="id"
      headerTitle="字典信息"
      actionRef={tableRef}
      search={false}
      destroyOnClose
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getStaffList(params)}
      toolBarRender={(_, { selectedRowKeys }) => [
        <Button type="primary" onClick={() => openAddModal(staffListData1[0])}>
          新增
        </Button>,
        selectedRowKeys && selectedRowKeys.length && (
          <Button
            onClick={() => {
              Modal.confirm({
                title: '确认删除所选择单位？该操作不可恢复',
                onOk: () => {
                  deleteStaffs(selectedRowKeys);
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

export default connect(({ smDictionaryMgt, global }) => ({
  smDictionaryMgt,
  staffListData1: smDictionaryMgt.staffListData1,
  enums: global.enums,
}))(DictionaryTable);
