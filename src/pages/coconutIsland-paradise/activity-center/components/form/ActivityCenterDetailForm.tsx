import React, { useEffect } from 'react';
import { connect } from 'umi';
import DetailFormPage from '@/components/DetailFormPage';

const DetailForm = ({ id, dispatch, detailActivityCenterData }) => {
  useEffect(() => {
    if (id) {
      dispatch({
        type: 'activityCenter/detailActivityCenterInfo',
        payload: { id },
      });
    }
  }, [id]);

  return (
    <DetailFormPage
      title={detailActivityCenterData.title}
      releaseTime={detailActivityCenterData.releaseTime}
      orgName={detailActivityCenterData.organizationName}
      content={detailActivityCenterData.context}
      extraFile={detailActivityCenterData.attachmentInfo}
    />
  );
};

export default connect(({ activityCenter, loading }) => ({
  detailActivityCenterData: activityCenter.detailActivityCenterData,
  loading: loading.models.activityCenter,
}))(DetailForm);
