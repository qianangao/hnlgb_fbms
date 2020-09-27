import React, { useEffect } from 'react';
import { connect } from 'umi';
import DetailFormPage from '@/components/DetailFormPage';

const DetailForm = ({ id, dispatch, detailHelpElderlyData }) => {
  useEffect(() => {
    if (id) {
      dispatch({
        type: 'helpElderly/detailHelpElderlyInfo',
        payload: { id },
      });
    }
  }, [id]);

  return (
    <DetailFormPage
      detailData={detailHelpElderlyData}
      // title={detailHelpElderlyData.title}
      // releaseTime={detailHelpElderlyData.pushTime}
      // orgName={detailHelpElderlyData.organizationName}
      // content={detailHelpElderlyData.context}
      // extraFile={detailHelpElderlyData.attachmentInfo}
    />
  );
};

export default connect(({ helpElderly, loading }) => ({
  detailHelpElderlyData: helpElderly.detailHelpElderlyData,
  loading: loading.models.helpElderly,
}))(DetailForm);
