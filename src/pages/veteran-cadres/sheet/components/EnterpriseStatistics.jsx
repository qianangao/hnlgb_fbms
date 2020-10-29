import React, { useEffect } from 'react';
import { Spin } from 'antd';
import { connect } from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import RetireReBaseTemplate from './RetireReBaseTemplate';

const EnterpriseStatistics = ({ sheetData, organizationName, sheetLoading, dispatch }) => {
  const SHEET_ID = '8adcf7df6afc354a016afc358fa2';
  useEffect(() => {
    dispatch({
      type: 'vcAnalysisSheet/getRetireReBasicsData',
      payload: {
        dictUnitNature: SHEET_ID,
      },
    });
  }, []);

  return (
    <GridContent>
      <Spin spinning={sheetLoading}>
        <RetireReBaseTemplate
          sheetData={sheetData}
          id={SHEET_ID}
          title="企业离休干部基本情况统计表"
          organizationName={organizationName}
        />
      </Spin>
    </GridContent>
  );
};

export default connect(({ user, vcAnalysisSheet, loading }) => ({
  organizationName: user.userInfo.organizationName,
  sheetData: vcAnalysisSheet.sheetData,
  sheetLoading: loading.effects['vcAnalysisSheet/getRetireReBasicsData'],
}))(EnterpriseStatistics);
