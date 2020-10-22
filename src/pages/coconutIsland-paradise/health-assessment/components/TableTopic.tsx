import React from 'react';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const TableTopic = ({  openTopicModifyModal,healthAssessment, dispatch }) => {
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
      title: '标题',
      align: 'center',
      dataIndex: 'subject',
    },
    {
      title: '选项A',
      align: 'center',
      dataIndex: 'optionA',
      hideInSearch: true,
    },
    {
      title: '选项B',
      align: 'center',
      dataIndex: 'optionB',
      hideInSearch: true,
    },
    {
      title: '选项C',
      align: 'center',
      dataIndex: 'optionC',
      hideInSearch: true,
    },
    {
      title: '选项D',
      align: 'center',
      dataIndex: 'optionD',
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
            openTopicModifyModal(Data);
          }}
        >
          编辑
        </a>,
      ],
    },
  ];

  // 列表
  const getHealthAssessmentTopicList = params =>
    new Promise(resolve => {
      dispatch({
        type: 'healthAssessment/healthAssessmentTopicList',
        payload: { ...params },
        resolve,
      });
    });

  return (
    <ProTable
      rowKey="id"
      headerTitle="健康测评题目"
      actionRef={tableRef}
      scroll={{ x: 'max-content' }}
      request={async params => getHealthAssessmentTopicList(params)}
      columns={columns}
    />
  );
};

export default connect(({ healthAssessment }) => ({
  healthAssessment,
}))(TableTopic);
