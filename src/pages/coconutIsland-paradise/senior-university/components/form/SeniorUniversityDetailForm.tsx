import React, { useEffect } from 'react';
import { connect } from 'umi';
import DetailFormPage from '@/components/DetailFormPage';

const DetailForm = ({ id, dispatch, detailSeniorUniversityData }) => {
  detailSeniorUniversityData.headline = detailSeniorUniversityData.universityName;
  detailSeniorUniversityData.context = detailSeniorUniversityData.universitySynopsis;
  useEffect(() => {
    if (id) {
      dispatch({
        type: 'seniorUniversity/detailSeniorUniversityInfo',
        payload: { id },
      });
    }
  }, [id]);

  return <DetailFormPage detailData={detailSeniorUniversityData} />;
};

export default connect(({ seniorUniversity, loading }) => ({
  detailSeniorUniversityData: seniorUniversity.detailSeniorUniversityData,
  loading: loading.models.seniorUniversity,
}))(DetailForm);
