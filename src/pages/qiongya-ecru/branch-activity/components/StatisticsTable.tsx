import React, { useEffect, useState } from 'react';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import { Progress } from 'antd';

const Table = ({ wrVisitsCondolences, enums, dispatch, tableType }) => {
  const { tableRef } = wrVisitsCondolences;
  const [orgLife, setOrgLife] = useState(false);
  const columnsMonth = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
      width: 64,
    },
    {
      title: '支部名称',
      align: 'center',
      dataIndex: 'partyName',
      hideInTable: true,
    },
    {
      title: '支部类型',
      align: 'center',
      dataIndex: 'dictOrgLife',
      valueEnum: enums.dictOrgLife,
      hideInTable: true,
    },
    {
      title: '年份',
      align: 'center',
      dataIndex: 'dateTime',
      hideInTable: true,
    },
    {
      title: '年份',
      align: 'center',
      dataIndex: 'year',
      hideInSearch: true,
      width: 100,
    },
    {
      title: '月份',
      align: 'center',
      dataIndex: 'month',
      hideInSearch: true,
      width: 100,
    },
    {
      title: `活动次数`,
      align: 'center',
      dataIndex: 'num',
      hideInSearch: true,
      width: 100,
    },
    {
      title: `活动次数/活动总数`,
      align: 'center',
      dataIndex: 'progress',
      hideInSearch: true,
      width: 200,
      render: (text, record) => {
        let remark = (record.num / record.totalNum) * 100;
        remark = Math.round(remark * 100) / 100;
        return <Progress percent={remark} status="active" />;
      },
    },
  ];
  const columnsOrgLife = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
      align: 'right',
      fixed: 'left',
      width: 64,
    },
    {
      title: '支部名称',
      align: 'center',
      dataIndex: 'partyName',
      hideInTable: true,
    },
    {
      title: '支部类型',
      align: 'center',
      dataIndex: 'dictOrgLife',
      valueEnum: enums.dictOrgLife,
      hideInTable: true,
    },
    {
      title: '年份',
      align: 'center',
      dataIndex: 'dateTime',
      hideInTable: true,
    },
    {
      title: '支部类型',
      align: 'center',
      dataIndex: 'dictOrgLife',
      valueEnum: enums.dictOrgLife,
      hideInSearch: true,
    },
    {
      title: `活动次数`,
      align: 'center',
      dataIndex: 'total',
      hideInSearch: true,
    },
    {
      title: `活动次数/活动总数`,
      align: 'center',
      dataIndex: 'progress',
      hideInSearch: true,
      width: 300,
      render: (text, record) => {
        let remark = (record.total / record.totalNum) * 100;
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
    const { dictOrgLife } = params;
    return new Promise(resolve => {
      setOrgLife(!!dictOrgLife);
      dispatch({
        type: dictOrgLife
          ? 'branchActivity/getOrgLifeStatisticsVo'
          : 'branchActivity/getOrgLifeByMonth',
        payload: { ...params },
        resolve,
      });
    });
  };

  return (
    <ProTable
      rowKey="id"
      actionRef={tableRef}
      scroll={{ x: 'max-content' }}
      pagination={false}
      request={async params => getVisitList(params)}
      columns={orgLife ? columnsOrgLife : columnsMonth}
    />
  );
};

export default connect(({ wrVisitsCondolences, global }) => ({
  wrVisitsCondolences,
  totalNumber: wrVisitsCondolences.totalNumber,
  enums: global.enums,
}))(Table);
