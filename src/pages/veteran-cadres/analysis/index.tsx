import React, { Suspense } from 'react';
import { Tabs } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import PageLoading from '@/components/PageLoading';
import styles from './style.less';

const TotalStatistics = React.lazy(() => import('./components/TotalStatistics'));
const Treatment = React.lazy(() => import('./components/Treatment'));
const RetiredReInstitutional = React.lazy(() => import('./components/RetiredReInstitutional'));
const RetiredInstitutional = React.lazy(() => import('./components/RetiredInstitutional'));
const PartyMember = React.lazy(() => import('./components/PartyMember'));

const chartList = [
  { label: '离退休干部总体情况表', viewRender: () => <TotalStatistics /> },
  { label: '离休干部按时期及享受待遇划分表', viewRender: () => <Treatment /> },
  { label: '离休干部按机构性质划分', viewRender: () => <RetiredReInstitutional /> },
  { label: '退休干部按机构性质划分', viewRender: () => <RetiredInstitutional /> },
  { label: '离退休干部党员情况', viewRender: () => <PartyMember /> },
];

const AnalysisChart = () => {
  return (
    <PageHeaderWrapper>
      <div className={styles.container}>
        <Tabs type="card">
          {chartList.map((item, i) => (
            <Tabs.TabPane tab={item.label} key={i}>
              <Suspense fallback={<PageLoading />}>{item.viewRender()}</Suspense>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
    </PageHeaderWrapper>
  );
};

export default AnalysisChart;
