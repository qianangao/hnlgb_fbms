import React, { useEffect } from 'react';
import { connect } from 'umi';
import DetailFormPage from '@/components/DetailFormPage';

const Detail = ({ id, dispatch, detailAchievementData }) => {
  useEffect(() => {
    if (id) {
      dispatch({
        type: 'oaAchievementExhibition/detailAchievement',
        payload: { id },
      });
    }
  }, [id]);

  return (
    <DetailFormPage
      title={detailAchievementData.title}
      orgName={detailAchievementData.organizationName}
      releaseTime={detailAchievementData.pushTime}
      content={detailAchievementData.resultSummary}
    />
  );
};

export default connect(({ oaAchievementExhibition, loading }) => ({
  detailAchievementData: oaAchievementExhibition.detailAchievementData,
  loading: loading.models.oaAchievementExhibition,
}))(Detail);
