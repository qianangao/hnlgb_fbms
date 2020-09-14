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

  return <DetailFormPage detailData={detailNewsDynamicData} />;
};

export default connect(({ newsDynamic, loading }) => ({
  detailNewsDynamicData: newsDynamic.detailNewsDynamicData,
  loading: loading.models.newsDynamic,
}))(DetailForm);
