import React, { useEffect } from 'react';
import { connect } from 'umi';
import DetailFormPage from '@/components/DetailFormPage';

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
    <DetailFormPage
      detailData={detailWorksCornerData}
      // title={detailWorksCornerData.headline}
      // releaseTime={detailWorksCornerData.releaseTime}
      // orgName={detailWorksCornerData.createOrgName}
      // content={detailWorksCornerData.context}
      // extraFile={detailWorksCornerData.attachmentInfo}
    />
  );
};

export default connect(({ worksCorner, loading }) => ({
  detailWorksCornerData: worksCorner.detailWorksCornerData,
  loading: loading.models.worksCorner,
}))(DetailForm);
