import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'umi';
import moment from 'moment';
import { Alert, Statistic, Card, Row, Col, Spin } from 'antd';
import OrgTreeLayout from '@/layouts/OrgTreeLayout';
import FontIcon from '@/components/FontIcon';
import MonitorDetail from './components/MonitorDetail';

const content = [
  { title: '目前老干部总数', field: 'cadreTotalNum', icon: 'users' },
  { title: '目前录入单位总数', field: 'orgTotalNum', icon: 'company' },
  { title: '目前工作人员总数', field: 'staffTotalNum', icon: 'gonguzorenyuan' },
  { title: '本月新增老干部数', field: 'addNum', icon: 'userup' },
  { title: '老干部月活跃数', field: 'cadreActiveNum', icon: 'userup', hasList: true },
  { title: '工作人员月活跃数', field: 'staffActiveNum', icon: 'gonguzorenyuan', hasList: true },
  { title: '老干部累计登录数', field: 'lgbLoginNum', icon: 'userup', hasList: true },
  { title: '工作人员累计登录数', field: 'workLoginNum', icon: 'gonguzorenyuan', hasList: true },
];
const MonitorCenter = ({ loading, sumData, dispatch }) => {
  const monitorDetailRef = useRef({});
  const [orgId, setOrgId] = useState('');
  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: ['dictSex', 'dictNation', 'dictPoliticalStatus'],
      },
    });

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
          orgIdForDataSelect: orgId,
        },
        resolve,
      });
    });
  };

  const orgChangeHander = id => {
    setOrgId(id);
    dispatch({
      type: 'smMonitorCenter/getSummaryData',
      payload: {
        orgIdForDataSelect: id,
      },
    });
  };

  return (
    <OrgTreeLayout onOrgSelect={orgChangeHander}>
      <Spin spinning={loading}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Alert
              message={`统计截止日期：${moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')}`}
              type="info"
              showIcon
            />
          </Col>
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
