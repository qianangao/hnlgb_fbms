import React, { useEffect } from 'react';
import { connect } from 'umi';
import DetailFormPage from '@/components/DetailFormPage';

const Detail = ({ id, dispatch, detailExperienceData }) => {
  useEffect(() => {
    if (id) {
      dispatch({
        type: 'oaExperienceIntroduction/detailExperience',
        payload: { id },
      });
    }
  }, [id]);

  return (
    <DetailFormPage
      title={detailExperienceData.title}
      orgName={detailExperienceData.organizationName}
      releaseTime={detailExperienceData.pushTime}
      content={detailExperienceData.workIntroduction}
    />
  );
};

export default connect(({ oaExperienceIntroduction, loading }) => ({
  detailExperienceData: oaExperienceIntroduction.detailExperienceData,
  loading: loading.models.oaExperienceIntroduction,
}))(Detail);
