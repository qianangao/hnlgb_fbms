import React from 'react';
import { Button, Popconfirm, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({ openAddModal, openModifyModal, hospitalRegistration, enums, dispatch }) => {
  const { tableRef } = hospitalRegistration;
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
      dataIndex: 'userName',
    },
    {
      title: '年龄',
      align: 'center',
      dataIndex: 'age',
      hideInSearch: true,
    },
    {
      title: '出生日期',
      align: 'center',
      dataIndex: 'dateOfBirth',
      hideInSearch: true,
    },
    {
      title: '原工作单位及职务',
      align: 'center',
      dataIndex: 'originalUnitAndPosition',
      hideInSearch: true,
    },
    {
      title: '医院名',
      align: 'center',
      dataIndex: 'hospitalName',
    },
    {
      title: '住院时间',
      valueType: 'date',
      align: 'center',
      dataIndex: 'lengthOfStay',
      hideInSearch: true,
    },
    {
      title: '住院时间',
      valueType: 'dateRange',
      align: 'center',
      dataIndex: 'lengthOfStay',
      hideInTable: true,
    },
    {
      title: '出院时间',
      align: 'center',
      type: 'date',
      dataIndex: 'dischargeTime',
      hideInSearch: true,
    },
    {
      title: '科室',
      align: 'center',
      dataIndex: 'department',
      hideInSearch: true,
    },
    {
      title: '病床',
      align: 'center',
      dataIndex: 'hospitalBed',
      hideInSearch: true,
    },
    {
      title: '病情',
      align: 'center',
      dataIndex: 'condition',
      hideInSearch: true,
    },
    {
      title: '治疗结果',
      align: 'center',
      dataIndex: 'therapeuticOutcome',
      hideInSearch: true,
    },
    {
      title: '性别',
      align: 'center',
      dataIndex: 'dictSex',
      valueEnum: enums.dictSex,
      hideInSearch: true,
    },
    {
      title: '离退休类型',
      align: 'center',
      dataIndex: 'dictRetirementType',
      valueEnum: enums.dictRetirementType,
      hideInSearch: true,
    },
    {
      title: '是否看望',
      align: 'center',
      dataIndex: 'isVisit',
      valueEnum: {
        0: '否',
        1: '是',
      },
      hideInSearch: true,
    },
    {
      title: '审核人',
      align: 'center',
      dataIndex: 'approver',
      hideInSearch: true,
    },
    {
      title: '审核时间',
      align: 'center',
      dataIndex: 'approveDate',
      hideInSearch: true,
      valueType: 'date',
    },
    {
      title: '审核状态',
      align: 'center',
      dataIndex: 'dictApproveStatus',
      initialValue: 'all',
      filters: true,
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        2: {
          text: '审核不通过',
          status: 'Error',
        },
        1: {
          text: '审核通过',
          status: 'Success',
        },
        0: {
          text: '待审核',
          status: 'Processing',
        },
      },
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
            if (employeeData.dictApproveStatus === 0 || employeeData.dictApproveStatus === 2) {
              openModifyModal(employeeData);
            }
          }}
        >
          编辑
        </a>,
        <Popconfirm
          key={`${employeeData.id}del`}
          title="确认删除该住院登记信息吗？"
          placement="topRight"
          onConfirm={() => {
            deleteHospitalRegistration([employeeData.id]);
          }}
        >
          <a>删除</a>
        </Popconfirm>,
        <Popconfirm
          key={`${employeeData.id}app`}
          title="确认审批该住院登记信息吗？"
          placement="topRight"
          okText="通过"
          cancelText="驳回"
          onConfirm={() => {
            approvalHospitalRegistration(employeeData.id, 1);
          }}
          onCancel={() => {
            approvalHospitalRegistration(employeeData.id, 2);
          }}
        >
          <a>审批</a>
        </Popconfirm>,
      ],
    },
  ];

  // 列表
  const getHospitalRegistrationList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'hospitalRegistration/hospitalRegistrationInfoList',
        payload: { ...params },
        resolve,
      });
    });
  const deleteHospitalRegistration = ids => {
    dispatch({
      type: 'hospitalRegistration/deleteHospitalRegistrationInfo',
      payload: {
        ids,
      },
    });
  };
  const approvalHospitalRegistration = (id, status) => {
    dispatch({
      type: 'hospitalRegistration/approvalHospitalRegistrationInfo',
      payload: {
        id,
        status,
      },
    });
  };
  return (
    <ProTable
      rowKey="id"
      headerTitle="住院登记"
      actionRef={tableRef}
      rowSelection={[]}
      scroll={{ x: 'max-content' }}
      request={async params => getHospitalRegistrationList(params)}
      toolBarRender={(_, { selectedRowKeys }) => [
        <Button type="primary" onClick={() => openAddModal()}>
          新增
        </Button>,
        selectedRowKeys && selectedRowKeys.length && (
          <Button
            onClick={() => {
              Modal.confirm({
                title: '确认删除选择住院登记信息？',
                content: '一旦确定将无法恢复',
                onOk: () => {
                  deleteHospitalRegistration(selectedRowKeys);
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

export default connect(({ hospitalRegistration, global }) => ({
  hospitalRegistration,
  enums: global.enums,
}))(Table);
