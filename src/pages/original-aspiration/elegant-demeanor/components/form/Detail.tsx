import React, { useEffect } from 'react';
import { connect } from 'umi';
import DetailFormPage from '@/components/DetailFormPage';

const Detail = ({ id, dispatch, detailElegantDemeanorData }) => {
  useEffect(() => {
    if (id) {
      dispatch({
        type: 'oaElegantDemeanor/detailElegantDemeanor',
        payload: { id },
      });
    }
  }, [id]);

  return (
    <DetailFormPage
      title={detailElegantDemeanorData.title}
      orgName={detailElegantDemeanorData.organizationName}
      releaseTime={detailElegantDemeanorData.pushTime}
      content={detailElegantDemeanorData.context}
    />
  );
};

export default connect(({ oaElegantDemeanor, loading }) => ({
  detailElegantDemeanorData: oaElegantDemeanor.detailElegantDemeanorData,
  loading: loading.models.oaElegantDemeanor,
}))(Detail);
