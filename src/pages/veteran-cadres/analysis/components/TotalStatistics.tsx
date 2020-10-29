import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Row, Col, Card, Table } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import { DoublePie } from '@/components/Charts';

const TotalStatistics = ({ chartData, chartLoading, dispatch }) => {
  const CHART1_PATH = 'all';
  const CHART2_PATH = 'sex';

  useEffect(() => {
    dispatch({
      type: 'vcAnalysisChart/getChartData',
      payload: { path: CHART1_PATH },
    });
    dispatch({
      type: 'vcAnalysisChart/getChartData',
      payload: { path: CHART2_PATH },
    });
  }, []);

  const dealChart1Data = (data = {}) => {
    const {
      woman = 0,
      man = 0,
      retiredRe = 0, // 离休
      retired = 0, // 退休
      amount = 0,
    } = data;

    return {
      data: [
        { x: '女性', y: woman },
        { x: '男性', y: man },
      ],
      data2: [
        { x: '离休', y: retiredRe },
        { x: '退休', y: retired },
      ],
      table: [
        { sort1: '离退休干部总人数', sort2: amount },
        { sort1: '离休', sum1: retiredRe, sort2: '退休', sum2: retired },
        { sort1: '男性', sum1: man, sort2: '女性', sum2: woman },
      ],
    };
  };

  const renderChart1SumAmount = (value, row, index) => {
    const obj = {
      children: value,
      props: {},
    };
    if (index === 0) {
      obj.props.colSpan = value ? 2 : 0;
    }
    return obj;
  };

  const chart1TableColumns = [
    { align: 'center', dataIndex: 'sort1', key: 'sort1', render: renderChart1SumAmount },
    { align: 'center', dataIndex: 'sum1', key: 'sum1', render: renderChart1SumAmount },
    { align: 'center', dataIndex: 'sort2', key: 'sort2', render: renderChart1SumAmount },
    { align: 'center', dataIndex: 'sum2', key: 'sum2', render: renderChart1SumAmount },
  ];

  const dealChart2Data = (data = {}) => {
    const {
      retiredRe = 0, // 离休
      retired = 0, // 退休
      retiredReMan = 0, // 离休男性
      retiredReWoman = 0, // 离休女性
      retiredMan = 0, // 退休男性
      retiredWoman = 0, // 退休女性
    } = data;

    return {
      data: [
        { x: '退休女性', y: retiredWoman },
        { x: '退休男性', y: retiredMan },
      ],
      data2: [
        { x: '离休女性', y: retiredReWoman },
        { x: '离休男性', y: retiredReMan },
      ],
      table: [
        { sort: '离休', total: retiredRe, man: retiredReMan, woman: retiredReWoman },
        { sort: '退休', total: retired, man: retiredMan, woman: retiredWoman },
      ],
    };
  };

  const chart2TableColumns = [
    { align: 'center', dataIndex: 'sort', key: 'sort', title: '' },
    { align: 'center', dataIndex: 'total', key: 'total', title: '离退休干部' },
    { align: 'center', dataIndex: 'man', key: 'man', title: '男性' },
    { align: 'center', dataIndex: 'woman', key: 'woman', title: '女性' },
  ];

  return (
    <GridContent>
      <Row gutter={24} type="flex">
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <Card loading={chartLoading} bordered={false}>
            <DoublePie
              title="离退休干部总体情况表"
              data={dealChart1Data(chartData[CHART1_PATH]).data}
              data2={dealChart1Data(chartData[CHART1_PATH]).data2}
              hasLegend
              height={248}
            />
            <Table
              columns={chart1TableColumns}
              dataSource={dealChart1Data(chartData[CHART1_PATH]).table}
              bordered
              size="middle"
              pagination={false}
              showHeader={false}
            />
          </Card>
        </Col>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <Card loading={chartLoading} bordered={false}>
            <DoublePie
              title="离退休干部总体情况表（性别划分）"
              data={dealChart2Data(chartData[CHART2_PATH]).data}
              data2={dealChart2Data(chartData[CHART2_PATH]).data2}
              hasLegend
              height={248}
            />
            <Table
              columns={chart2TableColumns}
              dataSource={dealChart2Data(chartData[CHART2_PATH]).table}
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
}))(TotalStatistics);
