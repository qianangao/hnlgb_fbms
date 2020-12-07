import React, { useEffect } from 'react';
import { connect } from 'umi';
import DetailFormPage from '@/components/DetailFormPage';

const DetailForm = ({ id, dispatch, detailPoliticsNewsData }) => {
  useEffect(() => {
    if (id) {
      dispatch({
        type: 'politicsNews/detailPoliticsNews',
        payload: { id },
      });
    }
  }, [id]);

  return (
    <DetailFormPage
      title={detailPoliticsNewsData.headline}
      releaseTime={detailPoliticsNewsData.releaseTime}
      orgName={detailPoliticsNewsData.createOrgName}
      content={detailPoliticsNewsData.context}
      extraFile={detailPoliticsNewsData.cephFile}
    />
  );
};

export default connect(({ politicsNews, loading }) => ({
  detailPoliticsNewsData: politicsNews.detailPoliticsNewsData,
  loading: loading.models.politicsNews,
}))(DetailForm);
