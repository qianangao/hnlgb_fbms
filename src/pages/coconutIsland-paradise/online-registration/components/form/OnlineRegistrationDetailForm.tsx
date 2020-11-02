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
      title={detailOnlineRegistrationData && detailOnlineRegistrationData.title}
      releaseTime={detailOnlineRegistrationData && detailOnlineRegistrationData.releaseTime}
      orgName={detailOnlineRegistrationData && detailOnlineRegistrationData.organizationName}
      content={detailOnlineRegistrationData && detailOnlineRegistrationData.context}
      extraFile={detailOnlineRegistrationData && detailOnlineRegistrationData.attachmentInfo}
    />
  );
};

export default connect(({ onlineRegistration }) => ({
  detailOnlineRegistrationData: onlineRegistration.detailOnlineRegistrationData,
}))(DetailForm);
