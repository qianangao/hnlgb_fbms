import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';
import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import { Statistic, Card, Row, Col, Spin } from 'antd';
import FontIcon from '@/components/FontIcon';
import MonitorDetail from './components/MonitorDetail';

const content = [
  { title: '目前老同志总数', field: 'cadreTotalNum', icon: 'users' },
  { title: '目前录入单位总数', field: 'orgTotalNum', icon: 'company' },
  { title: '目前工作人员总数', field: 'staffTotalNum', icon: 'gonguzorenyuan' },
  { title: '本月新增老同志数', field: 'addNum', icon: 'userup' },
  { title: '老同志月活跃数', field: 'cadreActiveNum', icon: 'userup', hasList: true },
  { title: '工作人员月活跃数', field: 'staffActiveNum', icon: 'gonguzorenyuan', hasList: true },
  { title: '老同志累计登录数', field: 'lgbLoginNum', icon: 'userup', hasList: true },
  { title: '工作人员累计登录数', field: 'workLoginNum', icon: 'gonguzorenyuan', hasList: true },
];
const MonitorCenter = ({ loading, sumData, dispatch }) => {
  const monitorDetailRef = useRef({});
  useEffect(() => {
    dispatch({
      type: 'smMonitorCenter/getSummaryData',
      payload: {},
    });
  }, []);

  const cardClickHandler = item => {
    dispatch({
      type: 'smMonitorCenter/save',
      payload: {
        selectMonitorItem: item,
      },
    });

    monitorDetailRef.current.showModal(item);
  };

  const getDetailData = params => {
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

  const orgChangeHander = orgId => {
    dispatch({
      type: 'smMonitorCenter/getSummaryData',
      payload: {
        orgIdForDataSelect: orgId,
      },
    });
  };

  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <Spin spinning={loading}>
        <Row gutter={[16, 16]}>
          {content.map(item => (
            <Col key={item.field} xs={24} sm={12} md={8} lg={8} xl={8} xxl={6}>
              <Card
                hoverable={item.hasList}
                style={{ textAlign: 'center' }}
                onClick={() => {
                  item.hasList && cardClickHandler(item);
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
      <MonitorDetail key="CountDetail" getRef={monitorDetailRef} getDetailData={getDetailData} />
    </OrgTreeLayout>
  );
};

export default connect(({ smMonitorCenter, loading }) => ({
  sumData: smMonitorCenter.sumData,
  loading: loading.effects['smMonitorCenter/getSummaryData'],
}))(MonitorCenter);
