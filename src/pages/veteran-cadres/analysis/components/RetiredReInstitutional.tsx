import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Row, Col, Card, Table } from 'antd';
import DataSet from '@antv/data-set';
import { GridContent } from '@ant-design/pro-layout';
import { Bar } from '@/components/Charts';

const RetiredReInstitutional = ({ chartData, chartLoading, dispatch }) => {
  const CHART1_PATH = 'institution/period';
  const CHART2_PATH = 'institution/treatment';

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

  const commonDealData = data => {
    const dv = new DataSet.View();

    dv.source(data).transform({
      type: 'map',
      callback(row, i) {
        // 加工数据后返回新的一行，默认返回行数据本身
        let x = '';
        switch (i) {
          case 0:
            x = '机关';
            break;
          case 1:
            x = '事业单位';
            break;
          case 2:
            x = '企业';
            break;
          case 3:
            x = '总计';
            break;
          default:
            break;
        }
        row.x = x;
        return row;
      },
    });

    return dv;
  };

  const dealChart1Data = (data = []) => {
    const dv = commonDealData(data);
    const dvTable = new DataSet.View().source(dv);

    dv.transform({
      type: 'rename',
      map: {
        total: '总计',
        dictRevolutionPeriod2: '二次时期',
        dictRevolutionPeriod3: '抗日前期',
        dictRevolutionPeriod4: '抗日后期',
        dictRevolutionPeriod5: '解放时期',
      },
    }).transform({
      type: 'fold',
      fields: ['总计', '二次时期', '抗日前期', '抗日后期', '解放时期'], // 展开字段集
      key: 'time', // key字段
      value: 'y', // value字段
    });

    return {
      data: dv,
      table: dvTable.rows,
    };
  };

  const chart1TableColumns = [
    { align: 'center', dataIndex: 'x', key: 'x', title: '' },
    {
      align: 'center',
      dataIndex: 'dictRevolutionPeriod2',
      key: 'dictRevolutionPeriod2',
      title: '二次时期',
    },
    {
      align: 'center',
      dataIndex: 'dictRevolutionPeriod3',
      key: 'dictRevolutionPeriod3',
      title: '抗日前期',
    },
    {
      align: 'center',
      dataIndex: 'dictRevolutionPeriod4',
      key: 'dictRevolutionPeriod4',
      title: '抗日后期',
    },
    {
      align: 'center',
      dataIndex: 'dictRevolutionPeriod5',
      key: 'dictRevolutionPeriod5',
      title: '解放时期',
    },
    { align: 'center', dataIndex: 'total', key: 'total', title: '总计' },
  ];

  const dealChart2Data = (data = []) => {
    const dv = commonDealData(data);
    const dvTable = new DataSet.View().source(dv);

    dv.transform({
      type: 'rename',
      map: {
        total: '总计',
        provincialDepartment: '省部级',
        bureaus: '厅局级',
        countyArea: '县处级',
        sectionBelow: '科以下',
      },
    }).transform({
      type: 'fold',
      fields: ['总计', '省部级', '厅局级', '县处级', '科以下'], // 展开字段集
      key: 'rank', // key字段
      value: 'y', // value字段
    });

    return {
      data: dv,
      table: dvTable.rows,
    };
  };

  const chart2TableColumns = [
    { align: 'center', dataIndex: 'x', key: 'x', title: '' },
    {
      align: 'center',
      dataIndex: 'provincialDepartment',
      key: 'provincialDepartment',
      title: '省部级',
    },
    { align: 'center', dataIndex: 'bureaus', key: 'bureaus', title: '厅局级' },
    { align: 'center', dataIndex: 'countyArea', key: 'countyArea', title: '县处级' },
    { align: 'center', dataIndex: 'sectionBelow', key: 'sectionBelow', title: '科以下' },
    { align: 'center', dataIndex: 'total', key: 'total', title: '总计' },
  ];

  return (
    <GridContent>
      <Row gutter={24} type="flex">
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Card loading={chartLoading} bordered={false}>
            <Bar
              title="离休干部按机构性质划分（机构及时期）"
              data={dealChart1Data(chartData[CHART1_PATH]).data}
              datagroup
              showLegend
              active
              height={295}
              padding={[10, 120, 30, 30]}
              color="time"
            />
            <Table
              columns={chart1TableColumns}
              dataSource={dealChart1Data(chartData[CHART1_PATH]).table}
              bordered
              size="middle"
              pagination={false}
            />
          </Card>
        </Col>
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Card loading={chartLoading} bordered={false}>
            <Bar
              title="离休干部按机构性质划分（机构及待遇）"
              data={dealChart2Data(chartData[CHART2_PATH]).data}
              datagroup
              showLegend
              active
              height={295}
              padding={[10, 120, 30, 30]}
              color="rank"
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
}))(RetiredReInstitutional);
