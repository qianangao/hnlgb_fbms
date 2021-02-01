import React from 'react';
import { Button, Popconfirm, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({ openAddModal, openModifyModal, specialty, enums, dispatch }) => {
  const { tableRef } = specialty;
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
      title: '姓名',
      align: 'center',
      dataIndex: 'realName',
    },
    {
      title: '性别',
      align: 'center',
      dataIndex: 'dictSex',
      valueEnum: enums.dictSex,
    },
    {
      title: '级别',
      align: 'center',
      dataIndex: 'dictRetirementLevel',
      valueEnum: enums.dictRetirementLevel,
    },
    {
      title: '原工作单位和职务',
      align: 'center',
      dataIndex: 'originalUnitAndPosition',
    },
    {
      title: '现享受待遇',
      align: 'center',
      dataIndex: 'dictTreatmentNow',
      valueEnum: enums.dictTreatmentNow,
    },
    {
      title: '专业特长',
      align: 'center',
      dataIndex: 'hobby',
    },
    {
      title: '成果',
      align: 'center',
      dataIndex: 'achievements',
    },
    {
      title: '类型',
      align: 'center',
      dataIndex: 'administrativeRank',
      valueEnum: enums.dictAdministrativeRank,
    },
    {
      title: '职称等级',
      align: 'center',
      dataIndex: 'titleGrade',
      valueEnum: enums.dictTitleGrade,
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
          title="确定删除该项吗？"
          placement="topRight"
          onConfirm={() => deleteReturnworkPerson([employeeData.id])}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  // 列表
  const getEmployeeList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'specialty/specialtyList',
        payload: { ...params },
        resolve,
      });
    });
  // 删除
  const deleteReturnworkPerson = ids => {
    dispatch({
      type: 'specialty/deleteSpecialty',
      payload: {
        ids,
      },
    });
  };

  return (
    <ProTable
      rowKey="id"
      headerTitle="银发人才信息"
      actionRef={tableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getEmployeeList(params)}
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

export default connect(({ specialty, global }) => ({
  specialty,
  enums: global.enums,
}))(Table);
