import React, { useEffect } from 'react';
import { connect } from 'umi';
import DetailFormPage from '@/components/DetailFormPage';

const DetailForm = ({ id, dispatch, detailElderlyPolicyData }) => {
  useEffect(() => {
    if (id) {
      dispatch({
        type: 'elderlyPolicy/detailElderlyPolicyInfo',
        payload: { id },
      });
    }
  }, [id]);

  return (
    <DetailFormPage
      title={detailElderlyPolicyData.title}
      releaseTime={detailElderlyPolicyData.pushTime}
      orgName={detailElderlyPolicyData.createOrgName}
      content={detailElderlyPolicyData.context}
      extraFile={detailElderlyPolicyData.attachmentInfo}
    />
  );
};

export default connect(({ elderlyPolicy, loading }) => ({
  detailElderlyPolicyData: elderlyPolicy.detailElderlyPolicyData,
  loading: loading.models.elderlyPolicy,
}))(DetailForm);
