import React, { useEffect } from 'react';
import { connect } from 'umi';
import DetailFormPage from '@/components/DetailFormPage';

const DetailForm = ({ id, dispatch, detailSeniorUniversityData }) => {
  useEffect(() => {
    if (id) {
      dispatch({
        type: 'seniorUniversity/detailSeniorUniversityInfo',
        payload: { id },
      });
    }
  }, [id]);

  return (
    <DetailFormPage
      title={detailSeniorUniversityData.universityName}
      releaseTime={detailSeniorUniversityData.releaseTime}
      orgName={detailSeniorUniversityData.createOrgName}
      content={detailSeniorUniversityData.teachingActivities}
    />
  );
};

export default connect(({ seniorUniversity, loading }) => ({
  detailSeniorUniversityData: seniorUniversity.detailSeniorUniversityData,
  loading: loading.models.seniorUniversity,
}))(DetailForm);
