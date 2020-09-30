import React, { useEffect } from 'react';
import { connect } from 'umi';
import DetailFormPage from '@/components/DetailFormPage';

const DetailForm = ({ id, dispatch, detailOnlineRegistrationData }) => {
  useEffect(() => {
    if (id) {
      dispatch({
        type: 'onlineRegistration/detailOnlineRegistrationInfo',
        payload: { id },
      });
    }
  }, [id]);

  return (
    <DetailFormPage
      title={detailOnlineRegistrationData.title}
      releaseTime={detailOnlineRegistrationData.releaseTime}
      orgName={detailOnlineRegistrationData.organizationName}
      content={detailOnlineRegistrationData.context}
      extraFile={detailOnlineRegistrationData.attachmentInfo}
    />
  );
};

export default connect(({ onlineRegistration, loading }) => ({
  detailOnlineRegistrationData: onlineRegistration.detailOnlineRegistrationData,
  loading: loading.models.onlineRegistration,
}))(DetailForm);
