import React, { useEffect } from 'react';
import { connect } from 'umi';
import DetailFormPage from '@/components/DetailFormPage';

const DetailForm = ({ id, dispatch, detailPolicyStipulateData }) => {
  useEffect(() => {
    if (id) {
      dispatch({
        type: 'policyStipulate/detailPolicyStipulate',
        payload: { id },
      });
    }
  }, [id]);

  return (
    <DetailFormPage
      title={detailPolicyStipulateData.title}
      releaseTime={detailPolicyStipulateData.gmtModified}
      orgName={detailPolicyStipulateData.createOrgName}
      content={detailPolicyStipulateData.content}
      extraFile={detailPolicyStipulateData.attachmentInfo}
    />
  );
};

export default connect(({ policyStipulate, loading }) => ({
  detailPolicyStipulateData: policyStipulate.detailPolicyStipulateData,
  loading: loading.models.policyStipulate,
}))(DetailForm);
