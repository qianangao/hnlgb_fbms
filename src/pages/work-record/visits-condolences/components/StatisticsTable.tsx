import React, { useEffect } from 'react';
import { Progress } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';

const Table = ({ wrVisitsCondolences, enums, dispatch, tableType, visitTotalNumber }) => {
  const { tableRef } = wrVisitsCondolences;
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
      title: `姓名`,
      align: 'center',
      dataIndex: 'userRealName',
      hideInTable: true,
    },

    {
      title: '慰问时间',
      valueType: 'dateRange',
      align: 'center',
      dataIndex: 'searchTime',
      hideInTable: true,
    },
    {
      title: '走访类型',
      align: 'center',
      dataIndex: 'type',
      valueEnum: enums.dictTreatmentNow,
      hideInSearch: true,
      width: 100,
    },
    {
      title: `走访总数`,
      align: 'center',
      dataIndex: 'number',
      hideInSearch: true,
      width: 100,
    },
    {
      title: `当前走访类型总数/总走访总数`,
      align: 'center',
      dataIndex: 'progress',
      hideInSearch: true,
      width: 300,
      render: (text, record) => {
        let remark = (record.number / visitTotalNumber) * 100;
        remark = Math.round(remark * 100) / 100;
        return <Progress percent={remark} status="active" />;
      },
    },
  ];

  useEffect(() => {
    tableRef.current && tableRef.current.reloadAndRest();
  }, [tableType]);

  // 列表
  const getVisitList = params => {
    return new Promise(resolve => {
      dispatch({
        type: 'wrVisitsCondolences/getVisitStatistics',
        payload: { ...params },
        resolve,
      });
    });
  };

  return (
    <ProTable
      rowKey="id"
      headerTitle={`走访总数:${visitTotalNumber}`}
      actionRef={tableRef}
      scroll={{ x: 'max-content' }}
      pagination={false}
      request={async params => getVisitList(params)}
      columns={columns}
    />
  );
};

export default connect(({ wrVisitsCondolences, global }) => ({
  wrVisitsCondolences,
  visitTotalNumber: wrVisitsCondolences.visitTotalNumber,
  enums: global.enums,
}))(Table);
