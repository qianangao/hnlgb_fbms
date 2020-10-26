import React, { useEffect } from 'react';
import { connect } from 'umi';
import DetailFormPage from '@/components/DetailFormPage';

const DetailForm = ({ id, dispatch, detailNewsDynamicData }) => {
  useEffect(() => {
    if (id) {
      dispatch({
        type: 'newsDynamic/detailNewsDynamic',
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

export default connect(({ newsDynamic, loading }) => ({
  detailNewsDynamicData: newsDynamic.detailNewsDynamicData,
  loading: loading.models.newsDynamic,
}))(DetailForm);
