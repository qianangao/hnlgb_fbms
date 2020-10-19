import React from 'react';
import { connect } from 'umi';
import DetailFormPage from '@/components/DetailFormPage';

const DetailForm = ({ detailOnlineRegistrationData }) => {
  return (
    <>
      <DetailFormPage
        title={detailOnlineRegistrationData.title}
        releaseTime={detailOnlineRegistrationData.releaseTime}
        orgName={detailOnlineRegistrationData.organizationName}
        content={detailOnlineRegistrationData.context}
        extraFile={detailOnlineRegistrationData.attachmentInfo}
      />
    </>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.onlineRegistration,
}))(DetailForm);
