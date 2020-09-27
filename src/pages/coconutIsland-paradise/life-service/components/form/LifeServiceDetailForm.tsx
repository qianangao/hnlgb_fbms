import React, { useEffect } from 'react';
import { connect } from 'umi';
import DetailFormPage from '@/components/DetailFormPage';

const DetailForm = ({ id, dispatch, detailLifeServiceData }) => {
  useEffect(() => {
    if (id) {
      dispatch({
        type: 'lifeService/detailLifeServiceInfo',
        payload: { id },
      });
    }
  }, [id]);

  return (
    <DetailFormPage
      detailData={detailLifeServiceData}
      // title={detailLifeServiceData.headline}
      // releaseTime={detailLifeServiceData.releaseTime}
      // orgName={detailLifeServiceData.createOrgName}
      // content={detailLifeServiceData.context}
      // extraFile={detailLifeServiceData.attachmentInfo}
    />
  );
};

export default connect(({ lifeService, loading }) => ({
  detailLifeServiceData: lifeService.detailLifeServiceData,
  loading: loading.models.lifeService,
}))(DetailForm);
