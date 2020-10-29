import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Row, Col, Card, Table } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import { Pie } from '@/components/Charts';

const RetiredInstitutional = ({ chartData, chartLoading, dispatch }) => {
  const CHART_PATH = 'institution';

  useEffect(() => {
    dispatch({
      type: 'vcAnalysisChart/getChartData',
      payload: { path: CHART_PATH },
    });
  }, []);

  const dealChartData = (data = {}) => {
    const {
      office, // 机关
      cause, // 事业单位
      enterprise, // 企业
    } = data;

    return {
      data: [
        { x: '机关', y: office },
        { x: '事业单位', y: cause },
        { x: '企业', y: enterprise },
      ],
      table: [data],
    };
  };
  const chartTableColumns = [
    { align: 'center', dataIndex: 'retireTotal', key: 'retireTotal', title: '退休干部数' },
    { align: 'center', dataIndex: 'office', key: 'office', title: '机关' },
    { align: 'center', dataIndex: 'cause', key: 'cause', title: '事业单位' },
    { align: 'center', dataIndex: 'enterprise', key: 'enterprise', title: '企业' },
  ];

  return (
    <GridContent>
      <Row gutter={24} type="flex">
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Card loading={chartLoading} bordered={false}>
            <Pie
              title="退休干部按机构性质划分"
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
}))(RetiredInstitutional);
