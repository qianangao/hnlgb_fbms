import React, { useEffect } from 'react';
import { connect } from 'umi';
import DetailCornerForm from '@/components/DetailCornerForm';

const DetailForm = ({ id, dispatch, detailWorksCornerData }) => {
  useEffect(() => {
    if (id) {
      dispatch({
        type: 'worksCorner/detailWorksCornerInfo',
        payload: { id },
      });
    }
  }, [id]);

  return (
    <DetailCornerForm
      title={detailWorksCornerData.headline}
      releaseTime={detailWorksCornerData.releaseTime}
      userName={detailWorksCornerData.createUserName}
      content={detailWorksCornerData.context}
      extraFile={detailWorksCornerData.attachmentInfo}
    />
  );
};

export default connect(({ worksCorner, loading }) => ({
  detailWorksCornerData: worksCorner.detailWorksCornerData,
  loading: loading.models.worksCorner,
}))(DetailForm);
