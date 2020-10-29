import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Row, Col, Card, Table } from 'antd';
import DataSet from '@antv/data-set';
import { GridContent } from '@ant-design/pro-layout';
import { Bar } from '@/components/Charts';

const Treatment = ({ chartData, chartLoading, dispatch }) => {
  const CHART_PATH = 'treatment';

  useEffect(() => {
    dispatch({
      type: 'vcAnalysisChart/getChartData',
      payload: {
        path: CHART_PATH,
      },
    });
  }, []);

  const dealChartData = (data = []) => {
    const dv = new DataSet.View();

    dv.source(data).transform({
      type: 'map',
      callback(row, i) {
        // 加工数据后返回新的一行，默认返回行数据本身
        let x = '';
        switch (i) {
          case 0:
            x = '二次时期';
            break;
          case 1:
            x = '抗日前期';
            break;
          case 2:
            x = '抗日后期';
            break;
          case 3:
            x = '解放时期';
            break;
          case 4:
            x = '总计';
            break;
          default:
            break;
        }
        row.x = x;
        return row;
      },
    });

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

  const chartTableColumns = [
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
              title="离退休干部总体情况表（按时期划分）"
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
}))(Treatment);
