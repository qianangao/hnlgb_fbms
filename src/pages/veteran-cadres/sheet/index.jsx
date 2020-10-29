import React, { Component, Suspense } from 'react';
import { Button, Card, Tabs, message } from 'antd';
import { DownloadOutlined, PrinterOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import PageLoading from '@/components/PageLoading';
import { downloadXlsFile, printElement } from '@/utils';
import styles from './style.less';

const RetireReTotalTwoYears = React.lazy(() => import('./components/RetireReTotalTwoYears'));
const OfficeStatistics = React.lazy(() => import('./components/OfficeStatistics'));
const CauseStatistics = React.lazy(() => import('./components/CauseStatistics'));
const EnterpriseStatistics = React.lazy(() => import('./components/EnterpriseStatistics'));
const RetireTotalTwoYears = React.lazy(() => import('./components/RetireTotalTwoYears'));
const RetireBase = React.lazy(() => import('./components/RetireBase'));

class AnalysisSheet extends Component {
  selectKey = 'RetireReTotalTwoYears';

  chartList = [
    {
      label: '离休干部两年数字变化情况统计表',
      key: 'RetireReTotalTwoYears',
      viewRender: () => <RetireReTotalTwoYears />,
    },
    {
      label: '机关离休干部基本情况统计表',
      key: '8adcf7df6afc354a016afc354a83',
      viewRender: () => <OfficeStatistics />,
    },
    {
      label: '事业单位离休干部基本情况统计表',
      key: '8adcf7df6afc354a016afc356c0a',
      viewRender: () => <CauseStatistics />,
    },
    {
      label: '企业离休干部基本情况统计表',
      key: '8adcf7df6afc354a016afc358fa2',
      viewRender: () => <EnterpriseStatistics />,
    },
    {
      label: '退休干部两年数字变化情况统计表',
      key: 'RetireTotalTwoYears',
      viewRender: () => <RetireTotalTwoYears />,
    },
    { label: '退休干部基本情况统计表', key: 'RetireBase', viewRender: () => <RetireBase /> },
  ];

  state = {
    printLoading: false,
  };

  tabChangeHandler = key => {
    this.selectKey = key;
  };

  downLoadHander = () => {
    const elem = this.chartList.find(item => {
      return item.key === this.selectKey;
    });
    const table = document.getElementById(elem.key).outerHTML;
    const html = `<html><head><meta charset='utf-8' /></head><body>${table}</body></html>`;

    downloadXlsFile(html, elem.label);
  };

  printHander = () => {
    const elem = this.chartList.find(item => {
      return item.key === this.selectKey;
    });
    this.setState({ printLoading: true });
    printElement(document.getElementById(elem.key))
      .then(_ => {
        this.setState({ printLoading: false });
      })
      .catch(err => {
        console.error('err: ', err);
        this.setState({ printLoading: false });
        message.warning('打印文件异常，请重试！');
      });
  };

  render() {
    return (
      <PageHeaderWrapper>
        <div className={styles.container}>
          <Card
            bordered={false}
            bodyStyle={{
              padding: 0,
            }}
          >
            <Tabs
              onChange={this.tabChangeHandler}
              tabBarExtraContent={
                <>
                  <Button type="primary" icon={<DownloadOutlined />} onClick={this.downLoadHander}>
                    下载
                  </Button>
                  <Button
                    type="primary"
                    icon={<PrinterOutlined />}
                    loading={this.state.printLoading}
                    onClick={this.printHander}
                  >
                    打印
                  </Button>
                </>
              }
            >
              {this.chartList.map(item => (
                <Tabs.TabPane tab={item.label} key={item.key}>
                  <Suspense fallback={<PageLoading />}>{item.viewRender()}</Suspense>
                </Tabs.TabPane>
              ))}
            </Tabs>
          </Card>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default AnalysisSheet;
