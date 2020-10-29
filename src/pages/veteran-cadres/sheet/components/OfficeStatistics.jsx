import React, { useEffect } from 'react';
import { Spin } from 'antd';
import { connect } from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import RetireReBaseTemplate from './RetireReBaseTemplate';

const OfficeStatistics = ({ sheetData, organizationName, sheetLoading, dispatch }) => {
  const SHEET_ID = '8adcf7df6afc354a016afc354a83';
  useEffect(() => {
    dispatch({
      type: 'retiredCadresAnalysisSheet/getRetireReBasicsData',
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
          title="机关离休干部基本情况统计表"
          organizationName={organizationName}
        />
      </Spin>
    </GridContent>
  );
};

export default connect(({ user, retiredCadresAnalysisSheet, loading }) => ({
  organizationName: user.userInfo.organizationName,
  sheetData: retiredCadresAnalysisSheet.sheetData,
  sheetLoading: loading.effects['retiredCadresAnalysisSheet/getRetireReBasicsData'],
}))(OfficeStatistics);
