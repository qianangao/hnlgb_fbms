import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Row, Col, Card, Table } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import { Pie } from '@/components/Charts';

const PartyMember = ({ chartData, chartLoading, dispatch }) => {
  const CHART_PATH = 'party';

  useEffect(() => {
    dispatch({
      type: 'vcAnalysisChart/getChartData',
      payload: { path: CHART_PATH },
    });
  }, []);

  const dealChartData = (data = {}) => {
    const {
      toRetirePartyMember, // 离休党员
      retirePartyMember, // 退休党员
    } = data;

    return {
      data: [
        { x: '离休党员', y: toRetirePartyMember },
        { x: '退休党员', y: retirePartyMember },
      ],
      table: [data],
    };
  };
  const chartTableColumns = [
    { align: 'center', dataIndex: 'total', key: 'total', title: '总计' },
    {
      align: 'center',
      dataIndex: 'toRetirePartyMember',
      key: 'toRetirePartyMember',
      title: '离休党员',
    },
    {
      align: 'center',
      dataIndex: 'retirePartyMember',
      key: 'retirePartyMember',
      title: '退休党员',
    },
  ];

  return (
    <GridContent>
      <Row gutter={24} type="flex">
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Card loading={chartLoading} bordered={false}>
            <Pie
              title="离退休干部党员情况"
              data={dealChartData(chartData[CHART_PATH]).data}
              datagroup
              showLegend
              active
              height={295}
              padding={[10, 120, 30, 30]}
              color="rank"
            />
            <Table
              columns={chartTableColumns}
              dataSource={dealChartData(chartData[CHART_PATH]).table}
              bordered
              size="middle"
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </GridContent>
  );
};

export default connect(({ vcAnalysisChart, loading }) => ({
  chartData: vcAnalysisChart.chartData,
  chartLoading: loading.effects['vcAnalysisChart/getChartData'],
}))(PartyMember);
