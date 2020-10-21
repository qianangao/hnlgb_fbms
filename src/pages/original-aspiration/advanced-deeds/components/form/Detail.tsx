import React, { useEffect } from 'react';
import { connect } from 'umi';
import DetailFormPage from '@/components/DetailFormPage';

const Detail = ({ id, dispatch, detailDeedsData, deedsType }) => {
  useEffect(() => {
    if (id) {
      dispatch({
        type: `oaAdvancedDeeds/${deedsType === 'personal' ? 'detailPersonal' : 'detailCollective'}`,
        payload: { id },
      });
    }
  }, [id]);

  return (
    <DetailFormPage
      title={detailDeedsData.title}
      orgName={detailDeedsData.organizationName}
      releaseTime={detailDeedsData.pushTime}
      content={detailDeedsData.introduction}
    />
  );
};

export default connect(({ oaAdvancedDeeds, loading }) => ({
  detailDeedsData: oaAdvancedDeeds.detailDeedsData,
  loading: loading.models.oaAdvancedDeeds,
}))(Detail);
