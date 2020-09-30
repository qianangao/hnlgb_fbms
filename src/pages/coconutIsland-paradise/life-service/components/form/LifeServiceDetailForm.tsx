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
      title={detailLifeServiceData.title}
      releaseTime={detailLifeServiceData.pushTime}
      orgName={detailLifeServiceData.organizationName}
      content={detailLifeServiceData.context}
    />
  );
};

export default connect(({ lifeService, loading }) => ({
  detailLifeServiceData: lifeService.detailLifeServiceData,
  loading: loading.models.lifeService,
}))(DetailForm);
