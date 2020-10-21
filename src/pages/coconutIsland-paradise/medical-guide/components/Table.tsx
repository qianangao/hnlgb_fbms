import React from 'react';
import { Button, Popconfirm, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({ openAddModal, openModifyModal, medicalGuide, dispatch }) => {
  const { tableRef } = medicalGuide;
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
      title: '医院名称',
      align: 'center',
      dataIndex: 'name',
    },
    {
      title: '医院网址',
      align: 'center',
      dataIndex: 'url',
      width: 200,
      hideInSearch: true,
      render: _ => <a href={_}>{_}</a>,
    },
    {
      title: '医院地址',
      align: 'center',
      dataIndex: 'address',
    },
    {
      title: '联系电话',
      align: 'center',
      dataIndex: 'phone',
      hideInSearch: true,
    },
    {
      title: '创建单位',
      align: 'center',
      dataIndex: 'createOrgName',
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
          title="确认删除该就医指南吗？"
          placement="topRight"
          onConfirm={() => deleteReturnworkPerson([employeeData.id])}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  // 列表
  const getMedicalGuideList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'medicalGuide/medicalGuideInfoList',
        payload: { ...params },
        resolve,
      });
    });
  const deleteReturnworkPerson = ids => {
    dispatch({
      type: 'medicalGuide/deleteMedicalGuideInfo',
      payload: {
        ids,
      },
    });
  };
  return (
    <ProTable
      rowKey="id"
      headerTitle="就医指南"
      actionRef={tableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getMedicalGuideList(params)}
      toolBarRender={(_, { selectedRowKeys }) => [
        <Button type="primary" onClick={() => openAddModal()}>
          新增
        </Button>,
        selectedRowKeys && selectedRowKeys.length && (
          <Button
            onClick={() => {
              Modal.confirm({
                title: '确认删除选择就医指南信息？',
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

export default connect(({ medicalGuide, global }) => ({
  medicalGuide,
  enums: global.enums,
}))(Table);
