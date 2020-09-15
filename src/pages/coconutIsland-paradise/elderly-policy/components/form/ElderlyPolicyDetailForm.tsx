import React, { useEffect } from 'react';
import { connect } from 'umi';
import DetailFormPage from '@/components/DetailFormPage';

const DetailForm = ({ id, dispatch, detailElderlyPolicyData }) => {
  detailElderlyPolicyData.headline = detailElderlyPolicyData.title;
  detailElderlyPolicyData.releaseTime = detailElderlyPolicyData.pushTime;
  useEffect(() => {
    if (id) {
      dispatch({
        type: 'elderlyPolicy/detailElderlyPolicyInfo',
        payload: { id },
      });
    }
  }, [id]);

  return <DetailFormPage detailData={detailElderlyPolicyData} />;
};

export default connect(({ elderlyPolicy, loading }) => ({
  detailElderlyPolicyData: elderlyPolicy.detailElderlyPolicyData,
  loading: loading.models.elderlyPolicy,
}))(DetailForm);
