import React from 'react';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const TableResult = ({ openResultDetailModal, healthAssessment, dispatch,enums }) => {
  const { tableRef } = healthAssessment;
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
      dataIndex: 'name',
    },
    {
      title: '性别',
      align: 'center',
      dataIndex: 'dictSex',
      hideInSearch: true,
      valueEnum: enums.dictSex
    },
    {
      title: '测评分数',
      align: 'center',
      dataIndex: 'fraction',
      hideInSearch: true,
    },
    {
      title: '测评等级',
      align: 'center',
      dataIndex: 'dictAssessGrade',
      hideInSearch: true,
      valueEnum: enums.dictAssessGrade
    },
    {
      title: '测评时间',
      align: 'center',
      dataIndex: 'assessTime',
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
          key={`${Data.id}detail`}
          onClick={() => {
            openResultDetailModal(Data);
          }}
        >
          查看
        </a>,
      ],
    },
  ];

  // 列表
  const getHealthAssessmentResultList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'healthAssessment/healthAssessmentResultList',
        payload: { ...params },
        resolve,
      });
    });
  return (
    <ProTable
      rowKey="id"
      headerTitle="健康测评结果"
      actionRef={tableRef}
      scroll={{ x: 'max-content' }}
      request={async params => getHealthAssessmentResultList(params)}
      columns={columns}
    />
  );
};

export default connect(({ healthAssessment,global }) => ({
  healthAssessment,
  enums: global.enums,
}))(TableResult);
