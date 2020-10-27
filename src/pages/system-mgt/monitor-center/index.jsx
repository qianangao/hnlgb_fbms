import React, { Component } from 'react';
import { connect } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Statistic, Card, Row, Col, Spin } from 'antd';
import FontIcon from '@/components/FontIcon';
import MonitorDetail from './components/MonitorDetail';

class MonitorCenter extends Component {
  content = [
    { title: '目前老同志总数', field: 'cadreTotalNum', icon: 'users' },
    { title: '目前录入单位总数', field: 'orgTotalNum', icon: 'company' },
    { title: '目前工作人员总数', field: 'staffTotalNum', icon: 'gonguzorenyuan' },
    { title: '本月新增老同志数', field: 'addNum', icon: 'userup' },
    { title: '老同志月活跃数', field: 'cadreActiveNum', icon: 'userup', hasList: true },
    { title: '工作人员月活跃数', field: 'staffActiveNum', icon: 'gonguzorenyuan', hasList: true },
    { title: '老同志累计登录数', field: 'lgbLoginNum', icon: 'userup', hasList: true },
    { title: '工作人员累计登录数', field: 'workLoginNum', icon: 'gonguzorenyuan', hasList: true },
  ];

  monitorDetailRef = null;

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'smMonitorCenter/getSummaryData',
      payload: {},
    });
  }

  cardClickHandler = item => {
    const { dispatch } = this.props;

    dispatch({
      type: 'smMonitorCenter/save',
      payload: {
        selectMonitorItem: item,
      },
    });

    this.monitorDetailRef.showModal(item);
  };

  getDetailData = params => {
    const { dispatch } = this.props;
    return new Promise(resolve => {
      dispatch({
        type: 'smMonitorCenter/getMonitorPersonList',
        payload: {
          ...params,
        },
        resolve,
      });
    });
  };

  render() {
    const { smMonitorCenter, loading } = this.props;
    const { sumData } = smMonitorCenter;
    return (
      <PageHeaderWrapper>
        <Spin spinning={loading}>
          <Row gutter={[16, 16]}>
            {this.content.map(item => (
              <Col key={item.field} xs={24} sm={12} md={8} lg={8} xl={8} xxl={6}>
                <Card
                  hoverable={item.hasList}
                  style={{ textAlign: 'center' }}
                  onClick={() => {
                    item.hasList && this.cardClickHandler(item);
                  }}
                >
                  <Statistic
                    title={item.title}
                    value={sumData[item.field]}
                    prefix={<FontIcon style={{ width: 30, height: 30 }} type={`${item.icon}`} />}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </Spin>
        <MonitorDetail
          key="CountDetail"
          getRef={ref => {
            this.monitorDetailRef = ref;
          }}
          getDetailData={this.getDetailData}
        />
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ smMonitorCenter, loading }) => ({
  smMonitorCenter,
  loading: loading.effects['smMonitorCenter/getSummaryData'],
}))(MonitorCenter);
