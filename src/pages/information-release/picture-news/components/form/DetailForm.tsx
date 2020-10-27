import React, { useEffect } from 'react';
import { connect } from 'umi';
import DetailFormPage from '@/components/DetailFormPage';

const DetailForm = ({ id, dispatch, detailNewsDynamicData }) => {
  useEffect(() => {
    if (id) {
      dispatch({
        type: 'pictureNews/detailNewsDynamic',
        payload: { id },
      });
    }
  }, [id]);

  return (
    <DetailFormPage
      title={detailNewsDynamicData.headline}
      releaseTime={detailNewsDynamicData.releaseTime}
      orgName={detailNewsDynamicData.createOrgName}
      content={detailNewsDynamicData.context}
      extraFile={detailNewsDynamicData.cephFile}
    />
  );
};

export default connect(({ pictureNews, loading }) => ({
  detailNewsDynamicData: pictureNews.detailNewsDynamicData,
  loading: loading.models.pictureNews,
}))(DetailForm);
