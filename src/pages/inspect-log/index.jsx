import React from 'react';
import { connect } from 'umi';
import ProTable from '@ant-design/pro-table';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

const InspectLog = ({ dispatch }) => {
  const colunms = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      fixed: 'left',
      width: 64,
    },
    { title: '巡检姓名', dataIndex: 'name', align: 'center' },
    { title: '巡检电话', dataIndex: 'phone', align: 'center' },
    { title: '巡检地址', dataIndex: 'placePosition', align: 'center' },
    {
      title: '巡检打卡时间',
      valueType: 'dateTime',
      align: 'center',
      dataIndex: 'createTime',
    },
  ];

  const getInspectLog = params =>
    new Promise(resolve => {
      dispatch({
        type: 'inspectLog/getList',
        payload: {
          ...params,
        },
        resolve,
      });
    });

  return (
    <PageHeaderWrapper>
      <ProTable
        search={false}
        rowKey="id"
        request={params => getInspectLog(params)}
        columns={colunms}
        pagination={{
          showSizeChanger: true,
        }}
      />
    </PageHeaderWrapper>
  );
};

export default connect(({ inspectLog, loading }) => ({
  inspectLog,
  loading: loading.effects['inspectLog/getList'],
}))(InspectLog);
