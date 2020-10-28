import React from 'react';
import { Button, Popconfirm, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({ smStaffMgt, openModifyModal, enums, dispatch }) => {
  const { tableRef, searchRoleData } = smStaffMgt;

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
    { title: '用户名', align: 'center', dataIndex: 'userName', hideInSearch: true },
    {
      title: '性别',
      align: 'center',
      dataIndex: 'dictSex',
      valueEnum: enums.dictSex,
      hideInSearch: true,
    },
    {
      title: '角色',
      align: 'center',
      dataIndex: 'roleId',
      valueEnum: searchRoleData,
      hideInSearch: true,
    },
    {
      title: '出生日期',
      align: 'center',
      dataIndex: 'dateOfBirth',
      valueType: 'date',
      hideInSearch: true,
    },
    { title: '所属单位', align: 'center', dataIndex: 'organizationName', hideInSearch: true },
    {
      title: '工作人员状态',
      align: 'center',
      dataIndex: 'state',
      // 工作人员状态 1在职 2离职 3退休
      valueEnum: {
        1: { text: '在职' },
        2: { text: '离职' },
        3: { text: '退休' },
      },
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      dataIndex: 'id',
      width: 180,
      fixed: 'right',
      render: (dom, orgData) => [
        <a key={`${orgData.id}up`} onClick={() => openModifyModal(orgData)}>
          编辑
        </a>,
        <Popconfirm
          key={`${orgData.id}del`}
          title="确认删除该工作人员吗？该操作不可恢复"
          placement="topRight"
          onConfirm={() => deleteStaffs([orgData.id])}
        >
          <a>删除</a>
        </Popconfirm>,
        <Popconfirm
          key={`${orgData.id}del`}
          title="确认重置该工作人员密码吗"
          placement="topRight"
          onConfirm={() => resetStaffPwd(orgData.id)}
        >
          <a>重置密码</a>
        </Popconfirm>,
      ],
    },
  ];

  const getStaffList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'smStaffMgt/getStaffList',
        payload: { ...params },
        resolve,
      });
    });

  const deleteStaffs = ids => {
    dispatch({
      type: 'smStaffMgt/deleteStaffs',
      payload: {
        ids,
      },
    });
  };

  const resetStaffPwd = id => {
    dispatch({
      type: 'smStaffMgt/resetStaffPwd',
      payload: {
        id,
      },
    });
  };

  return (
    <ProTable
      rowKey="id"
      headerTitle="工作人员信息"
      actionRef={tableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getStaffList(params)}
      toolBarRender={(_, { selectedRowKeys }) => [
        <Button type="primary" onClick={() => openModifyModal()}>
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

export default connect(({ smStaffMgt, global }) => ({
  smStaffMgt,
  enums: global.enums,
}))(Table);
